
//import { FiUsers } from "react-icons/fi";
import PageLayout from "@/components/pageLayout";
import TableComponent from "@/components/Table";
//import { users } from "data/activity";
import { useEffect, useState } from "react";
import {Table} from "antd";
import {Link} from "next/link";
import {AiOutlineEye} from "react-icons/ai";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import PostData from "model/PostData";
import RTable from "@/components/RTable";


import Button from "@/components/button";

export default function Pending() {

  const [state, dispatch] = useState([]);
  const [loading, setLoading] = useState(true);

  

    const [usersData, setUsersData] = useState([]);

    const columns = [
        { Header: "#", accessor: "index", disableFilters: true },
        { Header: "Reference", accessor: "refreg" },
        { Header: "Code Client", accessor: "codecl" },
        { Header: "Nom Du Client", accessor: "nomcl" },
        { Header: "Montant", accessor: "mntreg", disableFilters: true },
        { Header: "Agence", accessor: "age" },
       
        { Header: "Action", accessor: "action", disableFilters: true },
    
    ]

    const users = [
        {
            num: "SGC095868",
            nom: "OMOKO Yannick",
            mont: "500790",
            age: "Bonanjo"
            
          },
          {
            num: "SGC596905",
            nom: "NDE Yanick",
            mont: "390000",
            age: "Essos"
            
          },
          {
            num: "SGC90856 ",
            nom: "MBI Daniel",
            mont: "390000",
            age: "Bali"
            
          },
          {
            num: "SGC9023656 ",
            nom: "SET Rex",
            mont: "390000",
            age: "Yabassi"
            
          },
       
    ]

   
    useEffect(() => {
      const userId = localStorage.getItem("uname");
      
      const body = {
        etab:"001",
        uname:userId
       }

      PostData({method: "post", url: "/opiback/getPendingOpiReglements", body}, res => {
      
        if (res !== "Error") {
          setLoading(false);
          const data = res.data.map((elm, i) => ({
            index:i+1,
            ...elm,
            action: (
              <div className="flex space-x-4 w-full justify-center">

              <Button href={`/validations/pending/consultfich/${elm.refreg}`}>
                   
                   <AiOutlineEye className="text-green-600 inline" title="Consulter les fichiers" />
                  
               
                  </Button>
                {/* <button>
                  {" "}
                  <AiOutlineEye className="text-red-500" />{" "}
                </button> */}
              </div>
            ),
          }));
          dispatch({data});
          console.log(state.data);

        }

      });
       // return (<Spin/>);
      },
       
       []
       
       );



      return (
        <>
         

         
            <header className="flex space-x-4 mb-4 justify-between">
           <h2 className="text-lg font-bold">Validations En Attente </h2>

           {/* <Button href="/users/listusers" className="btn">
           <FaPlus className="mr-2" />
           <span>Ajouter un utilisateur</span>
           </Button> */}
           </header>
            {/*       
            <TableComponent
              columns={columns}
              data={usersData}
              hideCheckbox
            
            /> */}

            <RTable
            columns={columns}
            data={state.data || []}
            loading={loading}

            />
         
    
        </>
      );
   



}

