import { useEffect, useReducer } from "react";
import Button from "@/components/button";
import RTable from "@/components/RTable";
import apiClient from "api";

export default function Payout() {
  const reducer = (prevState, newState) => ({ ...prevState, ...newState });
  const [state, dispatch] = useReducer(reducer, { data: [] });

  const columns = [
    {
      Header: "Merchant Code",
      accessor: "mercd",
    },
    {
      Header: "Merchant Name",
      accessor: "nom",
    },
    {
      Header: "Amount",
      accessor: "mont",
    },
    {
      Header: "Charges",
      accessor: "fees",
    },
    {
      Header: "Status",
      accessor: "sta",
    },
    {
      Header: "Demandeur",
      accessor: "muser",
    },
    {
      Header: "Date",
      accessor: "dou",
    },
  ];

  async function fetchData() {
    dispatch({ loading: true });
    let response = await apiClient({
      method: "post",
      url: "/monet/merchantgetListPayoutAdmin",
      body: {
        etab: "001",
      },
    });
    dispatch({ data: response.data.data || [], loading: false });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <header className="flex space-x-4 mb-4 justify-between">
        <h2 className="text-lg font-bold">Transactions </h2>
      </header>

      <RTable
        // actions={
        //   <div className='flex gap-2'>
        //     <Button>Generate Compensation file</Button>
        //     <Button>Generate MOMO Compensation file</Button>
        //   </div>
        // }
        columns={columns}
        data={state.data}
        loading={state.loading}
        getSelectedFlatRows={(rows) => console.log(rows)}
      />
    </>
  );
}
