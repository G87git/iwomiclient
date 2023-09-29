import { FiUsers } from "react-icons/fi";
import {AiOutlineArrowLeft} from "react-icons/ai"
import PageLayout from "@/components/pageLayout";
import { useRouter } from "next/router";
import { Row, Col, Menu, Dropdown, Select, Modal} from "antd";
import { ArrowLeftOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import Link from "next/link";
import Button from "@/components/button";
import ButtonComponent from "@/components/buttonComponent";
import React, { useEffect, useState } from "react";
import useModal from "antd/lib/modal/useModal";
//import React from "react";
//import { Container, Row, Col } from "reactstrap";

export default function AddClient() {

    const Modal = useModal();
    const router = useRouter();

    const [isCmtModalVisible, setIsCmtModalVisible] = useState(true);

    function showCommentModal(){
        setIsCmtModalVisible(true);
      };
    
      const handleOk = () => {
        //setIsModalVisible(false);
        setIsCmtModalVisible(false);
      };
    
      const handleCancel = () => {
       // setIsModalVisible(false);
        showCommentModal(true);
      };

    const [state, dispatch] = useState([]);

    const { Option } = Select;

    function handleTypeChange(value) {
        console.log(`selected ${value}`);
        dispatch({clientType:value});
      //  showCommentModal();
       //callModal();
      }
      function handleChange(value) {
        console.log(`selected ${value}`);
       // dispatch({clientType:value});
      // callModal();
      }

    const typeDropdown = (
        <Menu 
       // onClick={handleMenuClick}
        >
          <Menu.Item key="1" >
            Personne Physique
          </Menu.Item>
          <Menu.Item key="2"  >
            Personnel Morale
          </Menu.Item>
         
        </Menu>
      );

    const profileDropdown = (
        <Menu 
       // onClick={handleMenuClick}
        >
          <Menu.Item key="1" >
            Admin
          </Menu.Item>
          <Menu.Item key="2"  >
            Personnel RH
          </Menu.Item>
          <Menu.Item key="3" >
            Controleur
          </Menu.Item>
        </Menu>
      );
  
      const titleDropdown = (
        <Menu 
       // onClick={handleMenuClick}
        >
          <Menu.Item key="1" >
            Mr.
          </Menu.Item>
          <Menu.Item key="2"  >
            Mrs.
          </Menu.Item>
          <Menu.Item key="3" >
            Mme
          </Menu.Item>
        </Menu>
      );

      const genderDropdown = (
        <Menu 
       // onClick={handleMenuClick}
        >
          <Menu.Item key="1" >
            Homme
          </Menu.Item>
          <Menu.Item key="2"  >
            Femme
          </Menu.Item>
         
        </Menu>
      );

      const callModal = () => {
       return (
           <>
        <Modal title="Commentaire" visible={true}  onCancel={handleOk}
        footer={[

          <Button key="submit" type="primary"  onClick={handleOk}>
           Confirmer
            </Button>,

            ]}  

    >
    <div className="text-2xl  text-site-theme-primary-hover flex-center gap-2">
   <input 
   type="text"

    />
  </div>


  </Modal>
  </>
       )
        };
  
  


    return (
        
            <>
        {/* <Modal title="Commentaire" visible={isCmtModalVisible}  onCancel={handleOk}
             footer={[
    
               <Button key="submit" type="primary"  onClick={handleOk}>
                Confirmer
                 </Button>,
   
                 ]}  

         >
         <div className="text-2xl  text-site-theme-primary-hover flex-center gap-2">
        <input 
        type="text"
   
         />
       </div>


       </Modal> */}


      {/* <PageLayout title="Gestions utilisateurs" Icon={FiUsers}> */}
  
      
        
        {/* <h2 className="text-lg font-bold my-2 mx-7">Ajouter un Utilisateur </h2> */}
        <h2 className="text-lg font-bold"  style={{ cursor: "pointer" }} onClick={() => router.back()}><ArrowLeftOutlined/> &nbsp; Ajouter un Client </h2>
        
                        
        
        <fieldset className="border border-gray-700 p-4 max-w-4xl rounded space-y-4">

        <div className="flex flex-col flex-1">
            <label><h3>Selectionner Le Type</h3></label>
            <Select defaultValue=""  style={{ width: 230 }} onChange={handleTypeChange} 
            // className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
            
            >
           <Option value="ppy">Personne Physique</Option>
          <Option value="pmo">Personne Morale</Option>
          
      
    </Select>
          </div>

            </fieldset>
  
       
     { (state.clientType === "ppy") &&  ( <fieldset className="border border-gray-700 p-4 max-w-7xl rounded space-y-4">
       
        {/* <legend className="text-sm font-semibold px-2">
        Personne Physique
        </legend> */}

    

        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col flex-1">
            <label>Nom/Raison Sociale</label>
            <div className="inline-block relative">
              <input
                type="text"
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <label>Email du client</label>
            <div className="inline-block relative">
              <input
                type="text"
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
        <div className="flex flex-col flex-1">
            <label>NIU</label>
            <div className="inline-block relative">
              <input
                type="text"
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <label>Comptes Courant</label>
            <div className="inline-block relative">
              <input
                type="text"
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col flex-1">
            <label>Téléphone</label>
            <div className="inline-block relative">
              <input
                type="text"
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <label> Addresse</label>
            <div className="inline-block relative">
              <input
                type="password"
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col flex-1">
            <label>Mot de Passe</label>
            <div className="inline-block relative">
              <input
                type="password"
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <label>Confirmer Mot de Passe </label>
            <div className="inline-block relative">
              <input
                type="password"
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
          </div>
        </div>

      

       
        
       

       
        <ButtonComponent>Sauvegarder</ButtonComponent>
      </fieldset> )}

       {/* Personne Morale */}


      { (state.clientType === "pmo") &&  ( <fieldset className="border border-gray-700 p-4 max-w-7xl rounded space-y-4">
        {/* <legend className="text-sm font-semibold px-2">
        Personne Morale
        </legend> */}

    

<div className="flex gap-4 flex-wrap">
          <div className="flex flex-col flex-1">
            <label>Nom/Raison Sociale</label>
            <div className="inline-block relative">
              <input
                type="text"
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <label>Email de l’entreprise</label>
            <div className="inline-block relative">
              <input
                type="text"
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
        <div className="flex flex-col flex-1">
            <label>NIU</label>
            <div className="inline-block relative">
              <input
                type="text"
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <label>Comptes Courant</label>
            <div className="inline-block relative">
              <input
                type="text"
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col flex-1">
            <label>Téléphone</label>
            <div className="inline-block relative">
              <input
                type="text"
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <label>Numéro du Contribuable</label>
            <div className="inline-block relative">
              <input
                type="password"
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col flex-1">
            <label>Mot de Passe</label>
            <div className="inline-block relative">
              <input
                type="password"
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <label>Confirmer Mot de Passe </label>
            <div className="inline-block relative">
              <input
                type="password"
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
          </div>
        </div>


       
        <ButtonComponent>Sauvegarder</ButtonComponent>
      </fieldset> )}


      </>
        
      
    );
}

//export default AddClient;
