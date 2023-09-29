
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
import RTable from "@/components/RTable";

//import Button from "@/components/button";

export default function Fichier() {

  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useState([]);

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
    
    const {refreg} = router.query;


  const { Dragger } = Upload;
 // const { getFieldDecorator } = form;

    const [usersData, setUsersData] = useState([]);

    const columns = [
        {Header:"#", accessor:"index", disableFilters: true},
        { Header: "Nom Fichier", accessor: "nomfich" },
        { Header: "Fichier", accessor: "fichv" },
        { Header: "Fornat Fichier", accessor: "format", disableFilters: true },
       
        { Header: "Date", accessor: "dou", disableFilters: true },
        { Header: "Date Mod", accessor: "dmo", disableFilters: true },
       
        { Header: "Action", accessor: "action", disableFilters: true },

    ]
   

    function downloadFile(id, filename, ids){

      const body = {
        id,
        ids,
        filename,
        utimo:"000192"
        


      }

      PostData({method: "post", url: "/opiback/downloadFilep", body}, res => {
      
        if(res !== 'Error'){

          if(res.status === "2"){
            Swal.fire({text:res.message, icon:"warning"});
          //  dispatch({ isSearching:false});
            return
          }
       
        else if(res.status === "01"){
          Swal.fire({text:res.message, icon:"success"});
         // dispatch({ isSearching:false});
          return
        }
        else if(res.status == "100"){
          Swal.fire({text:"Operation is already Successful!", icon:"success"});
        //  dispatch({ isSearching:false});
          return
        }
        else {
          Swal.fire({text:"Unknown Error occred!", icon:"error"});
        //  dispatch({ isSearching:false});
          return
        }
      }

    });
    }
 

    useEffect(() => {

      if(!refreg) return

     const body = {
      refreg
     }

      PostData({method: "post", url: "/opiback/getHistOpiReglementsDetails", body}, res => {
      
        if (res !== "Error") {
          setLoading(false);
          const data = res.data.map((elm, i) => ({
            index:i+1,
            ...elm,
            action: (
              <div className="flex space-x-4 w-full justify-center">
               
                <button 
                onClick={()=>{

                  downloadFile(elm.id, elm.fichv, elm.ids);

                }}
                
                >
                  {" "}
                  <CloudDownloadOutlined className="text-red-500" title="Télécharger"/>{" "}
                </button>
                {/* <button onClick={showModal} >
                  {" "}
                  <FaEdit className="text-red-500" title="Valider"/>{" "}
                </button> */}
              </div>
            ),
          }));
          dispatch({data});
          console.log(state.data);

        }

      });



      }, [refreg]);



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
      

             <RTable
              columns={columns}
              data={state.data || []}
              loading={loading}
              hideCheckbox
            
            />

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

