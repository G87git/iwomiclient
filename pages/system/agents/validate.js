import { useEffect, useReducer } from "react";
import apiClient from "api";
import RTable from "@/components/RTable";
import { Form, Modal, Spin } from "antd";
import Input from "@/components/Input";
import { useDisclosure } from "hooks";
import { FaCheck, FaTimes } from "react-icons/fa";
import IconButton from "@/components/IconButton";
import { getStatus } from "utils";

export default function ValidateAgent() {
  const [valForm] = Form.useForm();
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
      Cell: ({ row: { original } }) => {
        return (
          <div className="flex space-x-4 w-full">
            <>
              <IconButton
                onClick={() => {
                  valOnOpen();
                  dispatch({ currentId: original.flowId });
                  fetchFields(original.flowId);
                }}
                icon={<FaCheck className="text-green-600" title="Approve" />}
              />
              <IconButton
                onClick={() => {
                  valOnOpen();
                  dispatch({ currentId: original.flowId, isReject: true });
                  fetchFields(original.flowId);
                }}
                icon={<FaTimes className="text-red-600" title="Reject" />}
              />
            </>
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
        data={state.data || []}
        loading={state.loading}
        columns={fields}
      />

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
