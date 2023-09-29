import { useEffect, useReducer } from "react";
import Button from "@/components/button";
import RTable from "@/components/RTable";
import apiClient from "api";
import { FaEye } from "react-icons/fa";
import { useRouter } from "next/router";

export default function ConsultFees() {
  const router = useRouter()
  const id = router.query.id;
  const reducer = (prevState, newState) => ({ ...prevState, ...newState });
  const [state, dispatch] = useReducer(reducer, { data: [] });

  const columns = [
    {
      Header: "Branch",
      accessor: "age",
    },
    {
      Header: "Currency",
      accessor: "currency",
    },
    {
      Header: "Chapter",
      accessor: "chapter",
    },
    {
      Header: "Amount",
      accessor: "mont",
    },
    {
      Header: "Sufixe",
      accessor: "sufixe",
    },
    {
      Header: "Operation Code",
      accessor: "codeope",
    },
    {
      Header: "Free fields1",
      accessor: "chl1",
    },
    {
      Header: "Free fields2",
      accessor: "chl2",
    },
    {
      Header: "Movement Number",
      accessor: "mvtnum",
    },
    {
        Header: "Free fields3",
        accessor: "chl3",
      },
    {
        Header: "Accounting Date",
        accessor: "dco",
      },

      {
        Header: "Free fields4",
        accessor: "chl4",
      },
      {
        Header: "Value date",
        accessor: "dval",
      },
      {
        Header: "Amount",
        accessor: "mont2",
      },
      {
        Header: "Sense",
        accessor: "sens",
      },
      {
        Header: "Label",
        accessor: "lib",
      },

      {
        Header: "Free fields5",
        accessor: "chl5",
      },

      {
        Header: "Accounting Document",
        accessor: "pieco",
      },

      {
        Header: "Free fields6",
        accessor: "chl6",
      },
      {
        Header: "Free fields7",
        accessor: "chl7",
      },
      {
        Header: "Free fields8",
        accessor: "chl8",
      },
      {
        Header: "Free fields9",
        accessor: "chl9",
      },
      {
        Header: "Free fields10",
        accessor: "chl10",
      },
      {
        Header: "Free fields11",
        accessor: "chl11",
      },
      {
        Header: "Free fields12",
        accessor: "chl12",
      },
      {
        Header: "Free fields13",
        accessor: "chl13",
      },
      {
        Header: "Free fields14",
        accessor: "chl14",
      },
      {
        Header: "Free fields15",
        accessor: "chl15",
      },
      {
        Header: "Free fields16",
        accessor: "chl16",
      },
      {
        Header: "Free fields17",
        accessor: "chl17",
      },
      {
        Header: "Free fields18",
        accessor: "chl18",
      },
      {
        Header: "Free fields19",
        accessor: "chl19",
      },
      {
        Header: "Free fields20",
        accessor: "chl20",
      },
      {
        Header: "Free fields21",
        accessor: "chl21",
      },
      {
        Header: "Free fields22",
        accessor: "chl22",
      },
      {
        Header: "Free fields23",
        accessor: "chl23",
      },
      {
        Header: "Free fields24",
        accessor: "chl24",
      },
      {
        Header: "Free fields25",
        accessor: "chl25",
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
      url: `/monet/genHistDetails/${id}`,
    });
    dispatch({ data: response.data.data || [], loading: false });
  }

  useEffect(() => {
    fetchData();
  }, [id]);

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

