import { useEffect, useReducer } from "react";
import RTable from "@/components/RTable";
import apiClient from "api";
import {  FaSearch } from "react-icons/fa";
import Link from "next/link";

export default function Fees() {
  const reducer = (prevState, newState) => ({ ...prevState, ...newState });
  const [state, dispatch] = useReducer(reducer, { data: [] });

  const columns = [
    {
      Header: "File Name",
      accessor: "fileName",
    },
    {
      Header: "Line Number",
      accessor: "nbfile",
    },
    {
      Header: "Generated Date",
      accessor: "dmo",
    },
    {
      Header: "Last to Modify",
      accessor: "dou",
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({row: {original}}) => {
        return <Link href={`/monetic/fees/${original.fileName}`}>
          <a>
          <FaSearch  />
        </a>
        </Link>
      }
    },
  ];

  async function fetchData() {
    dispatch({ loading: true });
    let response = await apiClient({
      method: "get",
      url: "/monet/genHist/001",
    });
    dispatch({ data: response.data.data || [], loading: false });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <header className="flex space-x-4 mb-4 justify-between">
        <h2 className="text-lg font-bold">Fees History </h2>
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

