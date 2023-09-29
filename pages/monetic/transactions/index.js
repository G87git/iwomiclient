import { useEffect, useReducer } from "react";
import Button from "@/components/button";
import RTable from "@/components/RTable";
import apiClient from "api";
import { Modal } from "antd";

export default function Transactions() {
  const reducer = (prevState, newState) => ({ ...prevState, ...newState });
  const [state, dispatch] = useReducer(reducer, { data: [] });

  const columns = [
    {
      Header: "Merchant Name",
      accessor: "mername",
    },
    {
      Header: "Terminal Name",
      accessor: "tpename",
    },
    {
      Header: "IMEI Number",
      accessor: "imei",
    },
    {
      Header: "Internal ID",
      accessor: "internal_id",
    },
    {
      Header: "External ID",
      accessor: "external_id",
    },
    {
      Header: "Phone Number",
      accessor: "tel",
    },
    {
      Header: "Operation Type",
      accessor: "optype",
    },
    {
      Header: "Amount",
      accessor: "amount",
    },
    {
      Header: "Charges",
      accessor: "fees",
    },
    {
      Header: "Amount to be paid to the merchant",
      accessor: "montant_v",
    },
    {
      Header: "Amount debited to the customer",
      accessor: "montant_d",
    },
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "Collection State",
      accessor: "state",
    },
    {
      Header: "Reason",
      accessor: "reason",
    },
    {
      Header: "Message",
      accessor: "message",
    },
    {
      Header: "Creation date",
      accessor: "cdate",
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
      url: "/monet/transactionHist/001",
    });
    dispatch({ data: response.data.data || [], loading: false });
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function generateFile(url) {
    dispatch({ [url]: true });
    try {
      await apiClient({
        method: "post",
        url: "/monet/" + url,
        body: {
          user: "000192",
          etab: "001",
        },
      });
      Modal.success({title: "Success"})
    } catch (error) {
      console.log(error);
      Modal.error({ title: "An error occured!" });
    }

    dispatch({ [url]: false });
  }

  return (
    <>
      <header className="flex space-x-4 mb-4 justify-between">
        <h2 className="text-lg font-bold">Transactions </h2>
      </header>

      <RTable
        actions={
          <div className="flex gap-2">
            <Button
              onClick={() => {
                Modal.confirm({
                  title: "Do you want to continue?",
                  onOk: () => generateFile("GenerateEtebacFile"),
                });
              }}
              loading={state.GenerateEtebacFile}
            >
              Generate Compensation file
            </Button>
            <Button
              onClick={() => {
                Modal.confirm({
                  title: "Do you want to continue?",
                  onOk: () => generateFile("compenseMomoGenFile"),
                });
              }}
              loading={state.compenseMomoGenFile}
            >
              Generate MOMO Compensation file
            </Button>
          </div>
        }
        columns={columns}
        data={state.data}
        loading={state.loading}
        getSelectedFlatRows={(rows) => console.log(rows)}
      />
    </>
  );
}
