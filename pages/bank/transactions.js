import { useEffect, useReducer } from "react";
import RTable from "@/components/RTable";
import apiClient from "api";
import { FaEye } from "react-icons/fa";

export default function Transactions() {
  const reducer = (prevState, newState) => ({ ...prevState, ...newState });
  const [state, dispatch] = useReducer(reducer, { data: [] });

  const columns = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Phone",
      accessor: "phone",
    },
    {
      Header: "Amount",
      accessor: "amount",
    },
    {
      Header: "Label",
      accessor: "label",
    },
    {
      Header: "Sens",
      accessor: "sens",
    },
    {
      Header: "Date",
      accessor: "date",
    },
    {
        Header: "Type Of Operation",
        accessor: "type_o",
      },
    {
        Header: "Type Of Transaction",
        accessor: "type_t",
      },
    {
        Header: "Status",
        accessor: "status",
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
    <>
      <header className="flex space-x-4 mb-4 justify-between">
        <h2 className="text-lg font-bold">History </h2>
      </header>

      <RTable
        columns={columns}
        data={state.data}
        loading={state.loading}
        getSelectedFlatRows={(rows) => console.log(rows)}
      />
    </>
  );
}


