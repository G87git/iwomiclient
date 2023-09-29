
//import { FiUsers } from "react-icons/fi";
import PageLayout from "@/components/pageLayout";
import TableComponent from "@/components/Table";
//import { users } from "data/activity";
import { useEffect, useState } from "react";
import { ArrowLeftOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { Modal, button, Table} from "antd";
import PostData from "model/PostData";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import {AiOutlineEye} from "react-icons/ai";

import Button from "@/components/button";
import RTable from "@/components/RTable";
import ButtonComponent from "@/components/buttonComponent";

export default function Client_users() {

    
    const router = useRouter();
    
    const {tel} = router.query;

    const [usersData, setUsersData] = useState([]);

    const [state, dispatch] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isModalVisible, setIsModalVisible] = useState(false);



    const showModal = () => {
        setIsModalVisible(true);
      };

    //   const showCommentModal = () => {
    //     setIsCmtModalVisible(true);
    //   };
    
      const handleOk = () => {
        setIsModalVisible(false);
        //setIsCmtModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
       // showCommentModal(true);
      };

      const columns = [
        { Header: "#", accessor: "index", disableFilters: true },
        { Header: "Nom/Raison Sociale", accessor: "nomuser" },
        
        { Header: "Email", accessor: "emailuser", disableFilters: true },
        { Header: "Téléphone", dataIndex: "tel" },
        
     //   { title: "Num de Compte", dataIndex: "compte", disableFilters: true },
        { Header: "Date", accessor: "dou", disableFilters: true },
        
        { Header: "Action", accessor: "action", disableFilters: true},
      ]

    

    useEffect(() => {

      if (!tel) return;
      
        const body = {
          tel
         }
  
        PostData({method: "post", url: "/opiback/clientsConsultOpi", body}, res => {
        
          if (res !== "Error") {
            setLoading(false);
            const data = res.clilist.map((elm, i) => ({
              index:i+1,
              ...elm,
              action: (
                <div className="flex space-x-4 w-full justify-center">
                
                  <Button  href={`/clients/valcli/consultuser/userdetails/${elm.teluser}`}>
                    {" "}
                    <AiOutlineEye className="text-red-500 inline" />{" "}
                  </Button>
                </div>
              ),
            }));
            dispatch({data});
            console.log(state.data);
  
          }
  
        });
         // return (<Spin/>);
        },
         
         [tel]
         
         );
  


      return (
        <>
         
            <header className="flex space-x-4 mb-4 justify-between">
            <h2 className="text-lg font-bold"  style={{ cursor: "pointer" }} onClick={() => router.back()}><ArrowLeftOutlined/> &nbsp;Utilisateurs de Client </h2>
        
           

           {/* <ButtonComponent onClick={showModal} className="btn">
           <FaPlus className="mr-2" />
           <span>Ajouter un Utilisateur</span>
           </ButtonComponent> */}

          
           </header>
      
            <RTable
              columns={columns}
              //data={usersData.data}
              data={state.data || []}
              loading={loading}
              hideCheckbox
           
            />

              <Modal title="Ajouter un Utilisateur" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} 

        
        
                  footer={[
                 
                 <ButtonComponent key="submit" type="primary"  onClick={handleOk}>
                  Sauvegarder
               </ButtonComponent>,
   
  ]}  

>
        <div className="grid grid-cols-2 gap-2">     
            <div >
               <label>Nom d’utilisateur </label>
               <input type="text" class="border p-2 border-gray-700" />
            </div>
        <div >
            <label>Email de l’utilisateur </label>
            <input type="email" class="border p-2 border-gray-700" />
        </div>
        <div >
            <label>Téléphone portable </label>
            <input type="text" class="border p-2 border-gray-700" />
        </div>
        <div >
            <label>Mot de Passe </label>
            <input type="password" class="border p-2 border-gray-700" />
        </div>
        </div>
    

</Modal>
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

