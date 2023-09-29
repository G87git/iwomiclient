import { useEffect, useReducer } from "react";
import { FaPen, FaSearch, FaTrash, FaUsers } from "react-icons/fa";
import readXlsxFile from "read-excel-file";
import Button from "@/components/button";
import RTable from "@/components/RTable";
import IconButton from "@/components/IconButton";
import apiClient from "api";
import { Modal, Upload, Button as AntButton, Form } from "antd";
import { useDisclosure } from "hooks";
import Input from "@/components/Input";
import Select from "@/components/Select";

export default function LoadUsers() {
  const reducer = (prevState, newState) => ({ ...prevState, ...newState });
  const [state, dispatch] = useReducer(reducer, { data: [] });
  let [form] = Form.useForm();
  const { onClose, onOpen, open } = useDisclosure();
  const {
    onClose: onCloseAdd,
    onOpen: onOpenAdd,
    open: openAdd,
  } = useDisclosure();
  const {
    onClose: onCloseLoad,
    onOpen: onOpenLoad,
    open: openLoad,
  } = useDisclosure();

  const columns = [
    {
      Header: "Client Code",
      accessor: "cli",
    },
    {
      Header: "First Name",
      accessor: "fname",
    },
    {
      Header: "Middle Name",
      accessor: "mname",
    },
    {
      Header: "Last Name",
      accessor: "lname",
    },
    {
      Header: "Gender",
      accessor: "sexe",
    },
    {
      Header: "Phone Number",
      accessor: "phone",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Bank Code",
      accessor: "bankc",
    },
    {
      Header: "NCC",
      accessor: "ncc",
    },
    {
      Header: "Document Type",
      accessor: "tpid",
    },
    {
      Header: "ID Number",
      accessor: "npid",
    },
    {
      Header: "Account Number",
      accessor: "ncp",
    },
    {
      Header: "Branch Code",
      accessor: "age",
    },
    {
      Header: "Currency of The Account",
      accessor: "dev",
    },
    {
      Header: "Type Of Account",
      accessor: "tycp",
    },
    {
      Header: "Key",
      accessor: "cle",
    },
    {
      Header: "Label Of The Account",
      accessor: "descr",
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row: { original = {} } }) => {
        let alias = original.alias;
        return (
          <div className="flex space-x-4 w-full">
            <IconButton
              href={`/monetic/mercant/consult/${alias}`}
              icon={<FaSearch className="text-gray-600" title="Consulter" />}
            />
            <IconButton
              href={`/monetic/mercant/edit/${alias}`}
              icon={<FaPen className="text-green-600" title="Editer" />}
            />
            <IconButton
              href={`/monetic/mercant/users/${alias}?cdmar=${original.mercd}`}
              icon={
                <FaUsers
                  className="text-yellow-600"
                  title="Consult mechant users"
                />
              }
            />
            <IconButton
              onClick={() => {
                dispatch({ ...state, code: alias, showDelModal: true });
              }}
              icon={<FaTrash className="text-red-500" title="Supprimer" />}
            />
          </div>
        );
      },
    },
  ];

  async function fetchData() {
    dispatch({ loading: true });
    let response = await apiClient({
      method: "post",
      url: "/getClientList",
      body: {
        uti: "000192",
        etab: "001",
      },
    });
    dispatch({ data: response.data.data || [], loading: false });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const props = {
    name: "file",
    async onChange(info) {
      if (info.file.status !== "uploading") {
        const fileData = await readXlsxFile(info.file.originFileObj);
        let data = fileData
          .filter((_, i) => i !== 0)
          .map((d) => {
            let [
              cli,
              fname,
              mname,
              lname,
              sexe,
              phone,
              email,
              bankc,
              ncc,
              tpid,
              npid,
              ncp,
              age,
              dev,
              tycp,
              cle,
              descr,
            ] = d;
            return {
              cli,
              fname,
              mname,
              lname,
              sexe,
              phone,
              email,
              bankc,
              ncc,
              tpid,
              npid,
              ncp,
              age,
              dev,
              tycp,
              cle,
              descr,
            };
          });

        dispatch({ excelData: data });
      }
    },
  };

  const loadUsers = async (users = []) => {
    if (users.length === 0) {
      return Modal.warning({ title: "No user to load" });
    }
    dispatch({ loadingUsers: true });
    let response = await apiClient({
      method: "post",
      url: "/loadClientData",
      body: {
        uti: "000192",
        etab: "001",
        data: users,
      },
    });

    if (response.data.status === "01") {
      Modal.success({ title: "Clients Loaded" });
      fetchData();
    } else {
      Modal.error({ title: "An error occured!" });
    }
  };

  return (
    <>
      <header className="flex space-x-4 mb-4 justify-between">
        <h2 className="text-lg font-bold">Load Client </h2>
      </header>

      <RTable
        actions={
          <div className="flex gap-2">
            <Button onClick={onOpen}>Upload Excel</Button>
            <Button onClick={onOpenAdd}>Add Raw</Button>
            <Button onClick={onOpenLoad}>Load Bank</Button>
          </div>
        }
        columns={columns}
        data={state.data}
        loading={state.loading}
        getSelectedFlatRows={(rows) => console.log(rows)}
      />

      <Modal
        title="Load Users"
        width={1000}
        visible={open}
        onOk={() => loadUsers(state.excelData)}
        onCancel={onClose}
      >
        {!state.excelData && (
          <Upload {...props}>
            <AntButton>Upload file</AntButton>
          </Upload>
        )}
        <RTable
          columns={columns.filter((h) => h.accessor !== "action")}
          data={state.excelData || []}
          hideFilter
        />
      </Modal>
      <Modal
        title="Add Client"
        visible={openAdd}
        width={1000}
        onOk={() => {
          form.submit();
        }}
        onCancel={onCloseAdd}
      >
        <Form
          form={form}
          onFinish={(e) => {
            Modal.confirm({
              title: "Are you sure you want to continue?",
              onOk: () => {
                loadUsers([e]);
              },
            });
          }}
          labelCol={{ span: "10" }}
          labelAlign="left"
        >
          <div className="grid grid-cols-2 gap-x-10">
            {columns.map((e, i) => {
              if (e.accessor !== "action") {
                return (
                  <Form.Item label={e.Header} name={e.accessor} rules={[{required: true, message: `${e.Header} is required`}]}>
                    <Input />
                  </Form.Item>
                );
              }
            })}
          </div>
        </Form>
      </Modal>
      <Modal
        title="Load Client"
        visible={openLoad}
        onOk={onCloseLoad}
        onCancel={onCloseLoad}
        okText="Search"
      >
        <Form layout="vertical">
          <Form.Item label="Branch">
            <Select />
          </Form.Item>
          <Form.Item label="Account Number">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
