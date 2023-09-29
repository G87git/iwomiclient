import { useEffect, useReducer } from "react";
import apiClient from "api";
import { useRouter } from "next/router";
import RTable from "@/components/RTable";
import Button from "@/components/button";
import { Form, Modal, Spin } from "antd";
import Input from "@/components/Input";
import { useDisclosure } from "hooks";
import {
  FaLock,
  FaPen,
  FaSearch,
} from "react-icons/fa";
import IconButton from "@/components/IconButton";
import { getStatus } from "utils";

export default function Agents() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [valForm] = Form.useForm();
  const { open, onClose, onOpen } = useDisclosure();
  const {
    open: valOpen,
    onClose: valOnClose,
    onOpen: valOnOpen,
  } = useDisclosure();
  const reducer = (prevState, newState) => ({ ...prevState, ...newState });
  const [state, dispatch] = useReducer(reducer, { data: [] });

  const fields = [
    { Header: "First Name", accessor: "nom", type: "text" },
    { Header: "Last Name", accessor: "pnom", type: "text" },
    { Header: "Phone Number", accessor: "tel", type: "text" },
    { Header: "Document type", accessor: "tpid", type: "text" },
    { Header: "Profile", accessor: "profile", type: "text" },
    { Header: "Email", accessor: "email", type: "text" },
    { Header: "Address", accessor: "adrss", type: "text" },
    { Header: "List Of Autorized Branch", accessor: "lbrch", type: "text" },
    { Header: "Town", accessor: "town", type: "text" },
    { Header: "Id Card Document", accessor: "pie1", type: "text" },
    { Header: "Other Documents", accessor: "pie2", type: "text" },
    {
      Header: "Status",
      accessor: "statusEvolution",
      Cell: ({ value }) => {
        const { name, color } = getStatus(value);
        return (
          <div
            style={{ background: color }}
            className="bg-yellow-500 w-max py-1 px-3 text-white rounded-3xl"
          >
            {name}
          </div>
        );
      },
    },
    {
      Header: "Action",
      accessor: "externalData",
      type: "text",
      Cell: ({ row: { original }, value }) => {
        console.log(value);
        return (
          <div className="flex space-x-4 w-full">
            <IconButton
              onClick={() => {
                form.setFieldsValue(value);
                dispatch({ consult: true });
                onOpen();
              }}
              icon={<FaSearch className="text-gray-600" title="Consulter" />}
            />
            <IconButton
              icon={<FaPen className="text-green-600" title="Editer" />}
              onClick={() => {
                form.setFieldsValue(original);
                dispatch({ edit: true, updateObj: value });
                onOpen();
              }}
            />

            <IconButton
              icon={<FaLock className="text-red-500" title="Supprimer" />}
            />
          </div>
        );
      },
    },
  ];

  async function fetchData() {
    dispatch({ loading: true });
    try {
      let response = await apiClient({
        method: "post",
        url: "/api/v1/agent/consultAllState",
        body: {
          branchSeach: null,
          createUser: null,
          createdDate: {
            lowerBound: null,
            upperBound: null,
          },
          modifyDate: {
            lowerBound: null,
            upperBound: null,
          },
          statusEvolution: null,
          step: null,
        },
      });
      let data = response.data.data?.map((d) => {
        return {
          ...d,
          flowId: d.id,
          ...d.externalData,
        };
      });
      dispatch({ data, loading: false });
    } catch (error) {
      dispatch({ loading: true });
    }
  }
  async function createAgent(data = {}) {
    dispatch({ creating: true });

    try {
      let body = {
        requestData: {
          ...data,
          uti: "000192",
          utimo: "000192",
          npid: "test",
          etab: "test",
          pie1: null,
        },
        branch: "akwa",
        data: null,
        idexten: "string2",
        profile: "0005",
        url: "string2",
        user: "daniel",
        wfcode: "agent_flow",
      };

      let response = await apiClient({
        method: state.edit ? "post" : "put",
        url: state.edit ? "/editAnAgent" : "/api/v1/agent/registerAFlow",
        body: state.edit ? { id: state.updateObj.id, ...data } : body,
      });
      if (response.data.status === "01") {
        Modal.success({ title: "Operation Successful" });
        onClose();
        fetchData();
      } else {
        Modal.error({
          title: "An error occured!",
          content: <p>{response.data.message}</p>,
        });
      }
      dispatch({ creating: false });
    } catch (error) {
      console.log(error);
      Modal.error({
        title: "An error occured!",
      });
    }
  }

  async function validateData(data = {}) {
    dispatch({ validating: true });
    let response = await apiClient({
      method: "put",
      url: "/api/v1/agent/validte",
      body: {
        closeFlow: state.isReject ?? false,
        data,
        profile: "string",
        stateId: state.currentId,
        user: "daniel",
        branch: "akwa",
      },
    });

    if (response.data.status === "01") {
      Modal.success({ title: "Operation successful", onOk: valOnClose });
      fetchData();
    } else {
      Modal.error({ title: "An error occured", onOk: valOnClose });
    }
    dispatch({ validating: false, isReject: null, currentId: null });
  }

  async function fetchFields(id) {
    dispatch({ loadingFields: true });
    let response = await apiClient({
      method: "post",
      url: "/api/v2/workflow/consultCurrentField",
      body: {
        flowConfCode: "agent_flow",
        idstate: id,
        userProfile: "string",
        username: "237683501637",
      },
    });

    let headers = response.data.data?.heading || {};
    let fields = response.data.data.key?.map((key) => {
      return { key, name: headers[key] };
    });
    dispatch({ loadingFields: false, fields });
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <header className="flex space-x-4 mb-4 justify-between">
        <h2 className="text-lg font-bold">Agent Management</h2>
      </header>
      <RTable
        actions={
          <>
            <Button onClick={onOpen}>New Agent </Button>
          </>
        }
        data={state.data || []}
        loading={state.loading}
        columns={fields}
      />

      <Modal
        visible={open}
        onOk={form.submit}
        onCancel={() => {
          form.resetFields();
          onClose();
          dispatch({ consult: null, edit: null, updateObj: null });
        }}
        title={state.consult ? "Consult Agent" : "New Agent"}
        okButtonProps={{ hidden: state.consult }}
        width={1000}
        // okButtonProps={{loading: state.creating}}
        okText={state.edit ? "Update Agent" : "Create Agent"}
      >
        <div>
          <Form
            labelCol={{ span: "8" }}
            onFinish={createAgent}
            labelAlign="left"
            form={form}
          >
            <div className="grid grid-cols-2 gap-x-10">
              <Form.Item label="First Name" name="nom">
                <Input />
              </Form.Item>
              <Form.Item label="Last Name" name="pnom">
                <Input />
              </Form.Item>
              <Form.Item label="Phone" name="tel">
                <Input />
              </Form.Item>
              <Form.Item label="Document Type" name="tpid">
                <Input />
              </Form.Item>
              <Form.Item label="Profile" name="profile">
                <Input />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input />
              </Form.Item>
              <Form.Item label="Address" name="adrss">
                <Input />
              </Form.Item>
              <Form.Item label="Autorized Branch" name="lbrch">
                <Input />
              </Form.Item>
              <Form.Item label="Town" name="town">
                <Input />
              </Form.Item>
              <Form.Item label="Id Card Document" name="pie1">
                <Input />
              </Form.Item>
              <Form.Item label="Other Documents">
                <Input />
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>

      <Modal
        title={state.isReject ? "Reject" : "Validate"}
        visible={valOpen}
        onOk={valForm.submit}
        onCancel={valOnClose}
        okText={state.isReject ? "Reject" : "Validate"}
        okButtonProps={{
          disabled: state.loadingFields,
          loading: state.validating,
          danger: state.isReject,
        }}
      >
        {state.loadingFields && (
          <div className="flex justify-center items-center">
            <Spin />
          </div>
        )}
        {!state.loadingFields && state.fields?.length > 0 && (
          <Form layout="vertical" form={valForm} onFinish={validateData}>
            <div className="space-y-4">
              {state.fields?.map((field) => {
                return (
                  <Form.Item
                    label={field.name}
                    name={field.key}
                    className="m-0 p-0 !mb-0"
                  >
                    <Input />
                  </Form.Item>
                );
              })}
            </div>
          </Form>
        )}
      </Modal>
    </>
  );
}
