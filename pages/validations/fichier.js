
//import { FiUsers } from "react-icons/fi";
import PageLayout from "@/components/pageLayout";
import { Upload, message, Table} from "antd";
import TableComponent from "@/components/Table";
import { Modal, Button, Form, Input, Radio } from "antd";
import PostData from "model/PostData";
import Swal from "sweetalert2";

import { useRouter } from "next/router";
//import { users } from "data/activity";
import { ArrowLeftOutlined, CloudDownloadOutlined } from "@ant-design/icons";

import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { InboxOutlined } from "@ant-design/icons";
import {AiOutlineEye} from "react-icons/ai";

//import Button from "@/components/button";

export default function Fichier() {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isCmtModalVisible, setIsCmtModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
      };

      const showCommentModal = () => {
        setIsCmtModalVisible(true);
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
        setIsCmtModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
        showCommentModal(true);
      };

    const router = useRouter();


  const { Dragger } = Upload;
 // const { getFieldDecorator } = form;

    const [usersData, setUsersData] = useState([]);

    const newCol = [
        {title:"#", dataIndex:"index", disableFilters: true},
        { title: "Code Fichier", dataIndex: "code" },
        { title: "Nom Fichier", dataIndex: "nomf" },
        { title: "Fornat Fichier", dataIndex: "format", disableFilters: true },
       
        { title: "Date", dataIndex: "date", disableFilters: true },
       
        { title: "Action", dataIndex: "action", disableFilters: true },

    ]

    const columns = [

    {Header:"#", accessor:"index", disableFilters: true},
    { Header: "Code Fichier", accessor: "code" },
    { Header: "Nom Fichier", accessor: "nomf" },
    { Header: "Fornat Fichier", accessor: "format", disableFilters: true },
   
    { Header: "Date", accessor: "date", disableFilters: true },
   
    { Header: "Action", accessor: "action", disableFilters: true },

    ]

    const users = [
        {
            code: "FSGC293892",
            nomf: "AGENT",
            format: "excel",
            date: "230/05/2021"
            
          },
          {
            code: "FSGC29396052",
            nomf: "AGENT",
            format: "excel",
            date: "28/05/2021"
            
          },
          {
            code: "FSGC2939656560",
            nomf: "AGENT",
            format: "CSV",
            date: "22/05/2021"
            
          }
         
          
          
          
    ]

    useEffect(() => {

     const body = {
      codefich:"fich123456"
     }

      PostData({method: "post", url: "/opiback/getLotOpiFichDetails", body}, res => {
      
        if (res !== "Error") {
          setLoading(false);
          const data = res.data.map((elm, i) => ({
            index:i+1,
            ...elm,
            action: (
              <div className="flex space-x-4 w-full justify-center">
               
                <button>
                  {" "}
                  <CloudDownloadOutlined className="text-red-500" title="Télécharger"/>{" "}
                </button>
                <button onClick={showModal} >
                  {" "}
                  <FaEdit className="text-red-500" title="Valider"/>{" "}
                </button>
              </div>
            ),
          }));
          dispatch({data});
          console.log(state.data);

        }

      });




        const allUsers = users.map((user, i) => ({
            index:i+1,
          ...user,
          action: (
            <div className="flex space-x-4 w-full justify-center">
             
              <button>
                {" "}
                <CloudDownloadOutlined className="text-red-500" title="Télécharger"/>{" "}
              </button>
              <button onClick={showModal} >
                {" "}
                <FaEdit className="text-red-500" title="Valider"/>{" "}
              </button>
            </div>
          ),
        }));
        setUsersData(allUsers);
      }, []);



      return (
        <>
         

         
            <header className="flex space-x-4 mb-4 justify-between">
           <h2 className="text-lg font-bold"  style={{ cursor: "pointer" }} onClick={() => router.back()}><ArrowLeftOutlined/> &nbsp;Fichiers </h2>
         
  {/* <h1 className="text-lg font-bold"> <span onClick={() => router.back()}><ArrowLeftOutlined/></span>&nbsp;  Fichiers
           </h1> */}

           {/* <Button href="/" className="btn">
           <FaPlus className="mr-2" />
           <span>Ajouter une Lettre</span>
           </Button> */}
           </header>
      
            <TableComponent
              columns={columns}
              data={usersData}
              hideCheckbox
            
            />

             {/* <Table
              columns={newCol}
              dataSource={usersData}
              hideCheckbox
            
            /> */}

        <Modal title="Validation" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} 

        
        
        footer={[
            <Button key="back" type="secondary" onClick={handleCancel}>
              Rejeter
            </Button>,
            <Button key="submit" type="primary"  onClick={handleOk}>
              Accepter
            </Button>,
           
          ]}  
        
        >
            <h3>Souhaitez-vous Accepter ou Rejeter ce fichier ?</h3>

      </Modal>

      <Modal title="Commentaire" visible={isCmtModalVisible}  onCancel={handleOk}

       
        
        footer={[
            
            <Button key="submit" type="primary"  onClick={handleOk}>
              Confirmer
            </Button>,
           
          ]}  
        
        >
{/*             
            <div className="text-2xl  text-site-theme-primary-hover flex-center gap-2">
           <input 
           type="text"
           
           />
        </div> */}

         <div >
            <input type="text" class="border p-2 max-w-6xl border-gray-700" />
        </div>


        
        
      </Modal>

     
         
    
        </>
      );
   



}

