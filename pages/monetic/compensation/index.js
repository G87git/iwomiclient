import { useEffect, useReducer } from "react";
import RTable from "@/components/RTable";
import apiClient from "api";
import Button from "@/components/button";
import { Modal } from "antd";

export default function Compensation() {
  const reducer = (prevState, newState) => ({ ...prevState, ...newState });
  const [state, dispatch] = useReducer(reducer, { data: [] });

  const columns = [
    {
      Header: "Merchant Name",
      accessor: "mername",
    },
    {
      Header: "Phone Number",
      accessor: "tel",
    },
    {
      Header: "Operation Type",
      accessor: "typcomp",
    },
    {
      Header: "Amount",
      accessor: "mon",
    },
    {
      Header: "Compensated Amount",
      accessor: "monc",
    },
    {
      Header: "Deducted Fees",
      accessor: "feestot",
    },
    {
      Header: "Iwomi Commisitions",
      accessor: "feesiw",
    },
    {
      Header: "Bank Commisitions",
      accessor: "feesbi",
    },
    {
      Header: "TVA IWOMI",
      accessor: "tvaiw",
    },
    {
      Header: "TVA Bank",
      accessor: "tvabi",
    },
    {
      Header: "Collection State",
      accessor: "collection_state",
    },
    {
      Header: "Compense file",
      accessor: "compense_file",
    },
    {
      Header: "Compense file generated",
      accessor: "compense_file_gen",
    },
    {
      Header: "Compense file name",
      accessor: "filename",
    },
    {
      Header: "Deduted Account",
      accessor: "d_account",
    },
    {
      Header: "Credited Account",
      accessor: "c_account",
    },
    {
      Header: "Last to Modify",
      accessor: "lmodify",
    },
    {
      Header: "Modification date",
      accessor: "mdate",
    },
  ];

  async function fetchData() {
    dispatch({ loading: true });
    let response = await apiClient({
      method: "get",
      url: "/monet/findCollectionsMo/001",
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

  async function handleVal(val) {
    let body = {
      uti: "000192",
      val,
      etab: "001",
      collecte:
        state.selectedRows?.map((row) => ({
          mercd: row.mercd,
          filename: row.filename,
        })) || [],
    };
    dispatch({ [val]: true });
    try {
      let response = await apiClient({
        method: "post",
        url: "/monet/validateCollections/001",
        body,
      });
      console.log(response);
      if (response.data.status === "01") {
        Modal.success({ title: "Success" });
      } else {
        Modal.error({ title: "An error occured" });
      }
      dispatch({ [val]: false });
    } catch (error) {
      console.log(error);
      dispatch({ [val]: false });
      Modal.error({ title: "An error occured" });
    }
  }

  return (
    <>
      <header className="flex space-x-4 mb-4 justify-between">
        <h2 className="text-lg font-bold">Compensation </h2>
      </header>

      <RTable
        columns={columns}
        data={state.data}
        loading={state.loading}
        getSelectedFlatRows={(rows) => {
          getSelectedRows(rows, "selectedRows");
        }}
        actions={
          <div className="flex items-center gap-4">
            <Button
              disabled={!state.selectedRows || !state.selectedRows.length}
              loading={state.OK}
              onClick={() => {
                Modal.confirm({
                  title: "Are you sure you want to approve selected rows?",
                  onOk: () => handleVal("OK"),
                });
              }}
            >
              Approve
            </Button>
            <Button
              danger
              disabled={!state.selectedRows || !state.selectedRows.length}
              loading={state.NOK}
              onClick={() => {
                Modal.confirm({
                  title: "Are you sure you want to reject selected rows?",
                  onOk: () => handleVal("NOK"),
                });
              }}
            >
              Reject
            </Button>
          </div>
        }
      />
    </>
  );
}
