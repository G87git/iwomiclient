
//import { FiUsers } from "react-icons/fi";
import PageLayout from "@/components/pageLayout";
import { Upload, message, Table} from "antd";
import TableComponent from "@/components/Table";
import { Modal, Button, Form, Input, Radio } from "antd";
import PostData from "model/PostData";
import Swal from "sweetalert2";
import RTable from "@/components/RTable";

//import config from "../../../model/config";
import config from "model/config";

import { useRouter } from "next/router";
//import { users } from "data/activity";
import { ArrowLeftOutlined, CloudDownloadOutlined } from "@ant-design/icons";

import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { InboxOutlined } from "@ant-design/icons";
import {AiOutlineEye} from "react-icons/ai";

//import Button from "@/components/button";

export default function Fichier() {

  const [loading, setLoading] = useState(true);

  const [state, dispatch] = useState([]);
  const [form] = Form.useForm();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isCmtModalVisible, setIsCmtModalVisible] = useState(false);

    function showModal(){
        setIsModalVisible(true);
      };

      const showCommentModal = () => {
        setIsCmtModalVisible(true);
      };
    
      function handleOk() {
        setIsModalVisible(false);
        setIsCmtModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
        showCommentModal(true);
      };
      function handleClose(){
        setIsModalVisible(false);
       // showCommentModal(true);
      };

    
    const router = useRouter();
    
    const {refreg} = router.query;


  const { Dragger } = Upload;
 // const { getFieldDecorator } = form;

    //const [usersData, setUsersData] = useState([]);

    const columns = [
      {Header:"#", accessor:"index", disableFilters: true},
      { Header: "Nom Fichier", accessor: "nomfich" },
    //  { Header: "Fichier", accessor: "fichchg" },
      { Header: "Ref", accessor: "reftikr", disableFilters: true },
     
      { Header: "Date", accessor: "dou", disableFilters: true },
      { Header: "Date Mod", accessor: "dmo", disableFilters: true },
     
      { Header: "Action", accessor: "action", disableFilters: true },

  ]
   

    function downloadFile(val_id){

      
        let utimo = state.userId;
        let id = val_id;

    //    href={config.baseUrl + "/opiback/download/" + hashname}

      PostData({method: "get", url: `/opiback/downloadFilep/`+id+"/"+utimo},
       res => {
      
      //   if(res !== 'Error'){

         
      //   if(res.status === "01"){
      //    // Swal.fire({text:res.message, icon:"success"});
      //     Modal.success({title:"Success, content: <p>{res.message}</p>"});
         
      //     return
      //   }
      //   else if(res.status == "100"){
      //     Modal.warning({title:"Warning, content: <p>{res.message}</p>"});
      //   //  dispatch({ isSearching:false});
      //     return
      //   }
      //   else {
      //     Modal.error({title:"Error", content: <p>{res.message}</p>});
      //   //  dispatch({ isSearching:false});
      //     return
      //   }
      // }

    }
    );
    }
 

    useEffect(() => {
      
      const userId = localStorage.getItem("uname");
      dispatch({userId});

     // console.log("this is from useEffect ", state.userId);

     
     

     // if(!refreg) return

     const body = {
      refreg
     }
    
    

      PostData({method: "post", url: "/opiback/getPendingOpiReglementsDetails", body}, res => {
      
        if (res !== "Error") {
          setLoading(false);
          const data = res.data.map((elm, i) => ({
            index:i+1,
            ...elm,
            nomfich: (
              <a
                download
                href={config.baseUrl + "/opiback/downloadFilep/" + elm.id + "/"+ elm.utimo}
              >
                {" "}
                {elm.nomfich}{" "}
              </a>
            ),
            action: (
              <div className="flex space-x-4 w-full justify-center">
               
                {/* <button 
                onClick={()=>{

                  downloadFile(elm.id);

                }}
                
                >
                  {" "}
                  <CloudDownloadOutlined className="text-red-500" title="Télécharger"/>{" "}
                </button> */}
                <button onClick={()=>{
                  showModal();
                  dispatch({id:elm.id});
                }} >
                  {" "}
                  <FaEdit className="text-red-500" title="Valider"/>{" "}
                </button>
              </div>
            ),
          }));
          dispatch({data});
        //  console.log(state.data);
          

        }

      });



      }, [refreg]);


      function validateFile(valStatus){

     //  console.log("At the validate method now ", state.userId);

        const body = {
          stava:valStatus,
          etab:"001",
         // user:"admin",
         // user:state.userId,
          user:localStorage.getItem("uname"),
          id:state.id
        }


        PostData({method: "post", url: "/opiback/validateOpifich", body}, res => {
      
          if(res !== 'Error'){
  
            if(res.status === "2"){
              Modal.warning({title:"Warning", content: <p>{res.message}</p>});
            
            //  dispatch({ isSearching:false});
             // return
            }
         
          else if(res.status === "01"){
            
            Modal.success({title:"Success", content: <p>{res.message}</p>});
           // dispatch({ isSearching:false});
            return
          }
          else if(res.status == "100"){
            
            Modal.warning({title:"Warning", content: <p>{res.message}</p>});
          //  dispatch({ isSearching:false});
            return
          }
          else {
            
            Modal.error({title:"Error", content: <p>Unknown Error occured</p>});
          //  dispatch({ isSearching:false});
            return
          }
        }
  
      });

      }



      return (
        <>
         

         
            <header className="flex space-x-4 mb-4 justify-between">
           <h2 className="text-lg font-bold"  style={{ cursor: "pointer" }} onClick={() => router.back()}><ArrowLeftOutlined/> &nbsp;Fichiers </h2>
         
 
           </header>
      

             <RTable
              columns={columns}
              data={state.data || []}
              loading={loading}
              hideCheckbox

            
            />

        <Modal title="Validation" visible={isModalVisible} onOk={handleOk} onCancel={handleClose} 

        
        
        footer={[
            <Button key="back" type="secondary" onClick={handleCancel}>
              Rejeter
            </Button>,
            <Button key="submit" type="primary"  onClick={()=>{
              handleOk();
              validateFile("ap");
            }
            }>
              Accepter
            </Button>,
           
          ]}  
        
        >
            <h3>Souhaitez-vous Accepter ou Rejeter ce fichier ?</h3>

      </Modal>

      <Modal title="Commentaire" visible={isCmtModalVisible}  onCancel={handleOk}

       
        
        footer={[
            
            <Button key="submit" type="primary"  onClick={()=>{
              handleOk();
              validateFile("rej");
            }
            }
            
            >
              Confirmer
            </Button>,
           
          ]}  
        
        >


         <div >
            
            <Form layout="vertical" form={form}>
           
            <Form.Item label="" name="desc">
              <Input.TextArea
               // onChange={(e) => setExtra({ ...extra, desc: e.target.value })}
              />
            </Form.Item>
          </Form>
        </div>


        
        
      </Modal>

     
         
    
        </>
      );
   



}

