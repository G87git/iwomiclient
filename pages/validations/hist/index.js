
//import { FiUsers } from "react-icons/fi";
import PageLayout from "@/components/pageLayout";
import TableComponent from "@/components/Table";
//import { users } from "data/activity";
import { useEffect, useState } from "react";
import ActionButton from "antd/lib/modal/ActionButton";
import { Button, Table } from "antd";
import {AiOutlineEye} from "react-icons/ai";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import PostData from "model/PostData";
import RTable from "@/components/RTable";

import button from "@/components/button";

export default function Historique() {

    const [usersData, setUsersData] = useState([]);
    const [state, dispatch] = useState([]);

   // const userId = localStorage.getItem("uname");

  const columns = [

        { Header: "#", accessor: "index",disableFilters: true },
        { Header: "Reference", accessor: "refreg" },
        { Header: "Code Client", accessor: "codecl" },
        { Header: "Nom Du Client", accessor: "nomcl" },
        { Header: "Montant", accessor: "mntreg", disableFilters: true },
        { header: "Agence", accessor: "age" },
       
        { Header: "Action", accessor: "action", disableFilters: true },
  ]

    // const columns = [
    // {title:"#", dataIndex:"index", disableFilters: true },
    // { title: "Référence du règlement", dataIndex: "num" },
    // { title: "Date règlement", dataIndex: "date" },
    // {
    //   title: "Montant règlement en devise",
    //   dataIndex: "mtDev",
    //   disableFilters: true,
    // },
    // { title: "Devise", dataIndex: "dev" },
    // { title: "Taux", dataIndex: "tau", disableFilters: true },
    // {
    //   title: "Montant du règlement (XAF)",
    //   dataIndex: "amount",
    //   disableFilters: true,
    // },
    // { title: "Nom du Bénéficiaire", dataIndex: "name" },
    // { title: "Pays du fournisseur", dataIndex: "pays" },
    // { title: "Statut", dataIndex: "stt" },
    // { title: "Action", dataIndex: "action", disableFilters: true },
    
    // ]

    

    useEffect(() => {

      const userId = localStorage.getItem("uname");
       

        const body = {
          etab:"001",
        //  uname:"Pierre"
          uname:userId
        }

        PostData({method: "post", url: "/opiback/getHistOpiReglements", body}, res => {

          if (res !== "Error") {
            var data = res.data.map((elm, i) => ({
              index:i+1,
              ...elm,
  
              action: (
                    <div className="flex space-x-4 w-full justify-center">
              <Button href={`/validations/hist/histdetail/${elm.refreg}`}>
                
                <AiOutlineEye className="text-green-600 inline" title="Détails"/>{" "}
              </Button>
              
                {/* <Button type="link" href={"/donnee/saisie_reglement"}>
                <FaTrash className="text-red-500"  /> {" "}
                </Button> */}
              
            </div>
               
              ),
             
            }));
          dispatch({data});
  
          }

        });

      }, []);



      return (
        <>
         

         
            <header className="flex space-x-4 mb-4 justify-between">
           <h2 className="text-lg font-bold">Historique</h2>

           {/* <Button href="/users/listusers" className="btn">
           <FaPlus className="mr-2" />
           <span>Ajouter un utilisateur</span>
           </Button> */}
           </header>


           
           <RTable
            columns={columns}
            data={state.data || []}

           />
      
            {/* <TableComponent
              columns={columns}
              data={usersData} 
              hideCheckbox
            
            /> */}
         
    
        </>
      );
   



}

