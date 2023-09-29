import { useEffect, useReducer } from "react";
import {  FaPen, FaSearch, FaTrash, FaUsers } from "react-icons/fa";
import Button from "@/components/button";
import RTable from "@/components/RTable";
import IconButton from "@/components/IconButton";
import apiClient from "api";

export default function MercantValidation() {
  const reducer = (prevState, newState) => ({ ...prevState, ...newState });
  const [state, dispatch] = useReducer(reducer, { data: [] });

  const columns = [
    {
      Header: "Merchant Name",
      accessor: "nom",
    },
    {
      Header: "Phone Number",
      accessor: "tel1",
    },
    {
      Header: "Linked Account",
      accessor: "account",
    },
    {
      Header: "Merchant Code",
      accessor: "mercd",
    },
    {
      Header: "Trade Register",
      accessor: "trade",
    },
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "Suscription Date",
      accessor: "sdate",
    },
    {
      Header: "Expiration Date",
      accessor: "close_date",
    },
    {
      Header: "Operator",
      accessor: "operator",
    },
    {
      Header: "Suscription Package",
      accessor: "sus_package",
    },
    {
      Header: "Suscription Reference",
      accessor: "sus_reference",
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
              icon={<FaUsers className="text-yellow-600" title="Consult mechant users" />}
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
      method: "get",
      url: "/monet/b2wsubscription_list/001",
    });
    dispatch({ data: response.data.data || [], loading: false });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <header className="flex space-x-4 mb-4 justify-between">
        <h2 className="text-lg font-bold">Merchant </h2>
      </header>

      <RTable
        actions={
          <>
            <Button href="/monetic/mercant/create">New Subcription</Button>
          </>
        }
        columns={columns}
        data={state.data}
        loading={state.loading}
        getSelectedFlatRows={(rows) => console.log(rows)}
      />
    </>
  );
}
