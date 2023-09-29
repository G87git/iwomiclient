
//import { FiUsers } from "react-icons/fi";
import PageLayout from "@/components/pageLayout";
import { Spin, Table, Modal } from "antd";
import TableComponent from "@/components/Table";
//import { users } from "data/activity";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {AiOutlineEye} from "react-icons/ai";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { ArrowLeftOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import PostData from "model/PostData";
import RTable from "@/components/RTable";

import Button from "@/components/button";

export default function Operations() {

    const [usersData, setUsersData] = useState([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const {cli} = router.query;

    

    const [state, dispatch] = useState([]);

    const columns = [
      { Header: "#", accessor: "index",disableFilters: true },
      { Header: "Reference", accessor: "refreg" },
    
      { Header: "Nom Du Client", accessor: "nomcl" },
     { Header: "Montant", accessor: "mntreg", disableFilters: true },

      
      { Header: "Mode", accessor: "modeTransfer", Cell: ({value}) => { 
        let a = state.mode || {}; 
       //  console.log(a) 
        return a[value] || "" 
      } },
      // { Header: "Devise", accessor: "dev" },
      { 
        Header: "Devise", accessor: "dev", key:"dev", disableFilters: true,
         render:(dev) => state.devLabel ? state.devLabel[dev] : dev 
  
        //state.profiles ? state.profiles[prfle] : prfle || prfle,
     },
      // { title: "Agence", dataIndex: "age" },
      { Header: "Date", accessor: "dou" },
     
    //  { title: "Action", dataIndex: "action", disableFilters: true },
  
  ]
  
      
          
         
    useEffect(() => {
      if(!cli) return
      const userId = localStorage.getItem("uname");
      
      const body = {
        
        cli
       }

      PostData({method: "post", url: "/opiback/findSaisiDeReglementByCli", body}, res => {
      
        if (res !== "Error") {
          setLoading(false);
          const data = res.data.map((elm, i) => ({
            index:i+1,
            ...elm,
            action: (
              <div className="flex space-x-4 w-full justify-center">
                <button>
                  {" "}
                  <FaEdit className="text-green-600" />{" "}
                </button>
                <button>
                  {" "}
                  <AiOutlineEye className="text-red-500" />{" "}
                </button>
              </div>
            ),
          }));
          dispatch({data});
         // console.log(state.data);

        }

      });
      //devise list
    // if (!state.profiles) {
        PostData({ method: "get", url: "/api/getNomenDataByTabcd/9022", body: {} }, (res) => {
         // setLoading(false);
          if (res !== "Error") {

           //  const devLabel = res.data;

             let devLabel = {};
                let devSelect = [];
                for (let devLab of res.data) {
                  devLabel = { ...devLabel, [devLab.acscd]: devLab.name };
                  devSelect.push({ label: devLab.name, value: devLab.acscd });
                }
                dispatch({ devLabel, devSelect, data});
            

            
            // dispatch({devLabel });
            // console.log(state.profiles);
          }
        });
     // }
     //mode transfert list
     PostData({ method: "get", url: "/api/getNomenDataByTabcd/9023", body: {} }, (res) => {
      // setLoading(false);
       if (res !== "Error") {
        if(res.status === "01"){ 
          let mode = {}; 
  
          res.data.map(d =>{ 
            mode = {...mode, [d.acscd]: d.lib1} 
          }); 
          dispatch({mode}); 
          console.log("this is from the state", state.mode);

        }else { 
            Modal.warning({ 
              title: "Opps", 
              
              content: <p> Une erreur s'est produite... Veuillez vérifier votre connexion Internet et réessayer </p>, 
            }).then((e)=> { 
            }) 
        } 

        
       }
     });
        

      },[cli] );



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
          
           <h2 className="text-lg font-bold"  style={{ cursor: "pointer" }} onClick={() => router.back()}><ArrowLeftOutlined/> &nbsp; Reglements par Client</h2>

           {/* <Button href="/users/listusers" className="btn">
           <FaPlus className="mr-2" />
           <span>Ajouter un utilisateur</span>
           </Button> */}
           </header>
           <RTable   data={state.data || []}  columns={columns} loading={loading} hideCheckbox />
      
         
    
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

