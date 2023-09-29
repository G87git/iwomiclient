import { useEffect, useReducer } from "react";
import RTable from "@/components/RTable";
import apiClient from "api";
import { FaEye } from "react-icons/fa";

export default function Inventory() {
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
      Header: "Generated Date",
      accessor: "g_date",
    },
    {
      Header: "Created Date",
      accessor: "c_date",
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
        <h2 className="text-lg font-bold">Inventory</h2>
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


