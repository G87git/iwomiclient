
//import { FiUsers } from "react-icons/fi";
import PageLayout from "@/components/pageLayout";
import TableComponent from "@/components/Table";
//import { users } from "data/activity";
import { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import {AiOutlineEye} from "react-icons/ai";
import PostData from "model/PostData";

//import Button from "@/components/button";
import { BsGoogle } from "react-icons/bs";
import RTable from "@/components/RTable";

export default function Chargement() {

  const [state, dispatch] = useState([]);
  const [loading, setLoading] = useState(true);

    const [usersData, setUsersData] = useState([]);

    
    const columns = [
      { Header: "#", accessor: "index", disableFilters: true },
      { Header: "Nom/Raison Sociale", accessor: "nom" },
      { Header: "Type", accessor: "tprod", disableFilters: true  },
      { Header: "Email", accessor: "ema", disableFilters: true },
      { Header: "Téléphone", accessor: "tel" },
      { Header: "NUI", accessor: "ncc" },
   //   { title: "Num de Compte", dataIndex: "compte", disableFilters: true },
      { Header: "Date", accessor: "dou", disableFilters: true },
      
      { Header: "Action", accessor: "action", disableFilters: true},
    ]
    //const team = "www.google.com";

    

    useEffect(() => {
      const userId = localStorage.getItem("uname");
      const etab = localStorage.getItem("cetab");

      const body = {
       etab:etab,
       uname:userId
      }


      PostData({method: "post", url: "/opiback/getListClientValOpi", body}, res => {
      
        if (res !== "Error") {
          setLoading(false);
          const data = res.data.map((elm, i) => ({
            index:i+1,
            ...elm,
            action: (
              <div className="flex space-x-4 w-full justify-center">
              
                 <Button href={`/donnee/saisie/reglement/${elm.tel}`} icon={<AiOutlineEye className="text-red-600 inline"  title="Saisie reglement" />}/>
                
                 
                 {/* <AiOutlineEye className="text-red-600" title="Lettres" />
               </Button> */}
              
            
           </div>
            ),
          }));
          dispatch({data});
          console.log(state.data);

        }

      });
      //  setUsersData(allUsers);
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
           <h2 className="text-lg font-bold">Saisie de Dossier</h2>

          
           </header>
      
            <RTable
              columns={columns}
              data={state.data || []}
              hideCheckbox
             loading={loading}
            />
          {/* </div> */}
    
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

