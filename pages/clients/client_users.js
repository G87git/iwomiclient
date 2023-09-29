
//import { FiUsers } from "react-icons/fi";
import PageLayout from "@/components/pageLayout";
import TableComponent from "@/components/Table";
//import { users } from "data/activity";
import { useEffect, useState } from "react";
import { ArrowLeftOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { Modal, button} from "antd";
import PostData from "model/PostData";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import {AiOutlineEye} from "react-icons/ai";

import Button from "@/components/button";
import ButtonComponent from "@/components/buttonComponent";

export default function Client_users() {

    const router = useRouter();

    const [usersData, setUsersData] = useState([]);

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
    { Header: "Nom", accessor: "nom" },
   
    { Header: "Email", accessor: "email", disableFilters: true },
    { Header: "Téléphone", accessor: "phone" },
    { Header: "NUI", accessor: "nui" },
    { Header: "Num de Compte", accessor: "compte", disableFilters: true },
    
    { Header: "Action", accessor: "action", disableFilters: true},
    ]

    

    useEffect(() => {

      const body = {
       cetab:"001"
      }

        var allUsers = users.map((user,i) => ({
          index:i+1,
          ...user,
          action: (
            <div className="flex space-x-4 w-full justify-center">
                 <button href="/clients/addClient">
                  {" "}
                  <AiOutlineEye className="text-green-600" title="Détails" />{" "}
                </button>
             
              <button>
                {" "}
                <FaTrash className="text-red-500" title="Supprimer" />{" "}
              </button>
            </div>
          ),
        }));
        setUsersData(allUsers);
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
            <h2 className="text-lg font-bold"  style={{ cursor: "pointer" }} onClick={() => router.back()}><ArrowLeftOutlined/> &nbsp;Utilisateurs de Client </h2>
        
           

           <ButtonComponent onClick={showModal} className="btn">
           <FaPlus className="mr-2" />
           <span>Ajouter un Utilisateur</span>
           </ButtonComponent>

          
           </header>
      
            <TableComponent
              columns={columns}
              //data={usersData.data}
              data={usersData}
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

