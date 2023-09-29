import PageWrapper from "@/components/PageWrapper";
import RTable from "@/components/RTable";
import apiClient from "api";
import React, { useEffect, useReducer } from "react";

export default function CancelTransfer() {
  const reducer = (prevState, newState) => ({ ...prevState, ...newState });
  const [state, dispatch] = useReducer(reducer, { data: [] });

  const columns = [
    {
      Header: "Name",
      accessor: "nom",
    },
    {
      Header: "Operation Type",
      accessor: "opp_type",
    },
    {
      Header: "Reciever Name",
      accessor: "reciever",
    },
    {
      Header: "Date",
      accessor: "date",
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row: { original = {} } }) => {
        let alias = original.alias;
        return <div className="flex space-x-4 w-full"></div>;
      },
    },
  ];

  async function fetchData() {
    dispatch({ loading: true });
    let response = await apiClient({
      method: "get",
      url: "/monet/b2wsubscription_list/001",
    });
    dispatch({ data: response.data.data || [], loading: false });
  }

  useEffect(() => {
    // fetchData();
  }, []);

  return (
    <div>
      <PageWrapper title="Cancel Transfer" />
      <RTable columns={columns} data={[]} loading={state.loading} />
    </div>
  );
}
