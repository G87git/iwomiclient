//import { FiUsers } from "react-icons/fi";
import PageLayout from "@/components/pageLayout";
import { Spin, Table } from "antd";
import TableComponent from "@/components/Table";
//import { users } from "data/activity";
import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import PostData from "model/PostData";
import RTable from "@/components/RTable";

import Button from "@/components/button";
import Modal from "antd/lib/modal/Modal";

export default function Operations() {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [state, dispatch] = useState([]);

  const columns = [
    { Header: "#", accessor: "index", disableFilters: true },
    { Header: "Reference", accessor: "refreg" },
    { Header: "Type Reglement", accessor: "typer" },
    { Header: "Nom Du Client", accessor: "nomcl" },
    { Header: "Montant", accessor: "mntreg", disableFilters: true },

    {
      Header: "Agence",
      accessor: "age",
      Cell: ({ value }) => {
        let a = state.agence || {};
        //  console.log(a)
        return a[value] || "";
      },
    },

    { Header: "Action", accessor: "action", disableFilters: true },
  ];

  useEffect(() => {
    const userId = localStorage.getItem("uname");

    const body = {
      etab: "001",
      uname: userId,
    };

    PostData(
      { method: "post", url: "/opiback/getAllOpiReglements", body },
      (res) => {
        if (res !== "Error") {
          setLoading(false);
          const data = res.data.map((elm, i) => ({
            index: i + 1,
            ...elm,
            action: (
              <div className="flex space-x-4 w-full justify-center">
                {/* <button>
                  {" "}
                  <FaEdit className="text-green-600" />{" "}
                </button> */}
                <Button
                  href={`/reglements/consult/${elm.refreg}?numd=${elm.numd}&dater=${elm.dater}&reftikr=${elm.reftikr}`}
                >
                  {" "}
                  <AiOutlineEye className="text-red-500 inline" />{" "}
                </Button>
              </div>
            ),
          }));
          dispatch({ data });
          console.log(state.data);
        }
      }
    );

    //agence list
    PostData({ method: "get", url: "/api/getNomenDataByTabcd/9094" }, (res) => {
      if (res !== "Error") {
        if (res.status === "01") {
          let agence = {};

          res.data.map((d) => {
            agence = { ...agence, [d.acscd]: d.lib1 };
          });
          dispatch({ agence });
          console.log("this is from the state", state.agence);
        } else {
          Modal.warning({
            title: "Opps",

            content: (
              <p>
                {" "}
                Une erreur s'est produite... Veuillez vérifier votre connexion
                Internet et réessayer{" "}
              </p>
            ),
          }).then((e) => {});
        }
      }
    });

    // return (<Spin/>);
  }, []);

  return (
    <>
      {/* <Helmet>
            <meta charSet="utf-8" />
            <title>IWP | Ptrs in val</title>
          </Helmet> */}

      {/* <div className="container-fluid "> */}
      {/* <PageHeader title="Partners in Validation" breadcrumb={[]} /> */}
      {/* Table Position */}
      <header className="flex space-x-4 mb-4 justify-between">
        <h2 className="text-lg font-bold">Reglements </h2>

        {/* <Button href="/users/listusers" className="btn">
           <FaPlus className="mr-2" />
           <span>Ajouter un utilisateur</span>
           </Button> */}
      </header>
      <RTable
        columns={columns}
        data={state.data || []}
        loading={loading}
        hideCheckbox
      />
    </>
  );

  //  return (
  //     <PageLayout title="Gestions utilisateurs"

  //     >

  //       <header className="flex space-x-4 mb-4 justify-between">
  //         <h2 className="text-lg font-bold">Utilisateurs </h2>

  //         <Button href="/users/add">
  //           <FaPlus className="mr-2" />
  //           <span>Ajouter un utilisateur</span>
  //         </Button>
  //       </header>
  //       <TableComponent data={usersData} columns={columns} hideCheckbox />
  //     </PageLayout>
  //   );
}
