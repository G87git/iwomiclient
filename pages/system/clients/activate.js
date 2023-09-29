import { useEffect, useReducer } from "react";
import {
  FaCheck,
  FaPen,
  FaSearch,
  FaTimes,
  FaTrash,
  FaUsers,
} from "react-icons/fa";
import readXlsxFile from "read-excel-file";
import Button from "@/components/button";
import RTable from "@/components/RTable";
import IconButton from "@/components/IconButton";
import apiClient from "api";
import { Modal, Upload, Button as AntButton, Form, Badge } from "antd";
import { useDisclosure } from "hooks";
import Input from "@/components/Input";
import Select from "@/components/Select";

export default function Activate() {
  const reducer = (prevState, newState) => ({ ...prevState, ...newState });
  const [state, dispatch] = useReducer(reducer, { data: [] });

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
      Header: "Status",
      accessor: "eta",
      Cell: ({ value }) => {
        return (
          <div
            className={`${
              value === "1" ? "bg-red-500" : "bg-green-500"
            } text-white px-4 text-center py-1 `}
          >
            {" "}
            {value === "1" ? "Disactivated" : "Activated"}
          </div>
        );
      },
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row: { original = {} } }) => {
        return (
          <div className="flex space-x-4 w-full">
            {/* <IconButton
              icon={<FaSearch className="text-gray-600" title="Consulter" />}
            /> */}
            <IconButton
              onClick={() => {
                Modal.confirm({
                  title: "Are you sure you want to continue?",
                  onOk: () => {
                    validateClients(original);
                  },
                });
              }}
              icon={<FaCheck className="text-green-600" title="Editer" />}
            />
            <IconButton
                          onClick={() => {
                            Modal.confirm({
                              title: "Are you sure you want to continue?",
                              onOk: () => {
                                validateClients(original);
                              },
                            });
                          }}
              icon={<FaTimes className="text-red-500" title="Supprimer" />}
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

  function getSelectedRows(row, stateKey) {
    const stateData = state[stateKey] || [];
    const arr = [];
    for (let i of row) {
      arr.push(i.original);
    }
    if (JSON.stringify(stateData) !== JSON.stringify(arr)) {
      dispatch({ [stateKey]: arr });
    }
  }

  async function validateClients(dataObj) {
    if (!state.selectedRows || state.selectedRows.length === 0 || !dataObj) {
      return Modal.warning({ title: "No row was selected!" });
    }

    let data =  (dataObj ? [dataObj] : state?.selectedRows ? state?.selectedRows : []).map(({ cli }) => ({ cli }));
    dispatch({ activiting: true });
    let response = await apiClient({
      method: "post",
      url: "/activateClientUnactivate",
      body: {
        uti: "000192",
        etab: "001",
        data,
      },
    });

    if (response.data.status === "01") {
      Modal.success({ title: "Success" });
    } else {
      Modal.error({ title: "An error occured" });
    }
    dispatch({ activiting: false });
  }

  return (
    <>
      <header className="flex space-x-4 mb-4 justify-between">
        <h2 className="text-lg font-bold">Manage Client </h2>
      </header>

      <RTable
        actions={
          <div className="flex gap-2">
            <Button
              onClick={() => {
                Modal.confirm({
                  title: "Are you sure you want to continue?",
                  onOk: validateClients,
                });
              }}
            >
              Activate
            </Button>
            <Button
              onClick={() => {
                Modal.confirm({
                  title: "Are you sure you want to continue?",
                  onOk: validateClients,
                });
              }}
              danger
            >
              Disactivate
            </Button>
          </div>
        }
        columns={columns}
        data={state.data}
        loading={state.loading}
        getSelectedFlatRows={(rows) => getSelectedRows(rows, "selectedRows")}
      />
    </>
  );
}
