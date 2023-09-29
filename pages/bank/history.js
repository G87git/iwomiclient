import { useEffect, useReducer } from "react";
import RTable from "@/components/RTable";
import apiClient from "api";
import { FaEye } from "react-icons/fa";

export default function History() {
  const reducer = (prevState, newState) => ({ ...prevState, ...newState });
  const [state, dispatch] = useReducer(reducer, { data: [] });

  const columns = [
    {
      Header: "Institution",
      accessor: "institution",
    },
    {
      Header: "Branch",
      accessor: "branch",
    },
    {
      Header: "Accounts",
      accessor: "accounts",
    },
    {
      Header: "Currency",
      accessor: "currency",
    },
    {
      Header: "Key",
      accessor: "key",
    },
    {
      Header: "Date created",
      accessor: "date",
    },
    {
        Header: "Amount",
        accessor: "amount",
      },
    {
        Header: "Sens",
        accessor: "sens",
      },
    {
        Header: "Transaction Code",
        accessor: "Transaction",
      },
    {
        Header: "Piece",
        accessor: "piece",
      },
    {
      Header: "Action",
      accessor: "action",
      Cell: () => {
        return <a>
          <FaEye />
        </a>
      }
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


