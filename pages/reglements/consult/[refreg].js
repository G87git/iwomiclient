import { FiUsers } from "react-icons/fi";
import {AiOutlineArrowLeft} from "react-icons/ai"
import PageLayout from "@/components/pageLayout";
import { Row, Col, Dropdown, Menu, Select, Modal, Button } from "antd";
import { useRouter } from "next/router";
//import { Row, Col } from "next/link";
import { ArrowLeftOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import Link from "next/link";
//import Button from "@/components/button";
import ButtonComponent from "@/components/buttonComponent";
import PostData from "model/PostData";
import useModal from "antd/lib/modal/useModal";
import Swal from "sweetalert2";
import React, {useEffect} from "react";
import {format} from "date-fns";

//import { Container, Row, Col } from "reactstrap";

export default function Consultclient(){

  

   




  const getDate = (date) => {
    const [day, month, year] = date.split(" ")[0].split("/");
    return `${year}-${month.length === 1 ? `0${month}` : month}-${
      day.length === 1 ? `0${day}` : day
    }`;
  };

    const Modal = useModal();
   
    const router = useRouter();
    const { Option } = Select;
    const {refreg, numd, reftikr, dater} = router.query;
    

    const reducer = (prevState, action) => ({ ...prevState, ...action });
    const [state, dispatch] = React.useReducer(reducer, {
      body: {}, country: { country: "CMR", ctry: "CMR" },
     // userModal: !id,
    });

    function handleChange({target}) {
      console.log(target);
      dispatch({ body: { ...state.body, [target.name]: target.value } });
    }

    

    useEffect(() => {
     if (!refreg, !numd, !dater, !reftikr) return;
      //console.log(tel);
  
      if (refreg) {
        dispatch({ isSubmitting: true });
        PostData(
          {
            method: "post",
            url: "/api1/getReglement",
            body: {noReglement:refreg,
              dater,
              reftikr,
              numd
            },
          },
          (res) => {
            if (res !== "Error") {
              dispatch({
                body: {
                  ...res.data,
                 
                },
                isSubmitting: false,
              });
              console.log(state.body);
            } else {
              //Alert.error("Failed to load user informations");
              Modal.error({title:"error", content:<p>Failed to load user informations</p>});
              dispatch({ fetchSevice: false });
            }
          }
        );
      }

   
    }, [refreg, dater, reftikr, numd]);

  


  return (
      <div>
    {/* <PageLayout title="Gestions utilisateurs" Icon={FiUsers}> */}

    
      
      {/* <h2 className="text-lg font-bold my-2 mx-7">Ajouter un Utilisateur </h2> */}
      <h2 className="text-lg font-bold"  style={{ cursor: "pointer" }} onClick={() => router.back()}><ArrowLeftOutlined/> &nbsp;Consulter un Reglement </h2>
      
                      
      
    

      <fieldset className="border border-gray-700 p-4 max-w-7xl rounded space-y-4">
       


        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col flex-1">
            <h1>Reference Reglement</h1>
            <div className="inline-block relative">
            <input
                 type="text"
                 disabled
                 name="refreg"
                 value={refreg}
                // value={state.body.refreg}
                onChange={handleChange}
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
        </div>
          </div>
          <div className="flex flex-col flex-1">
            <label>Code Client</label>
            <div className="inline-block relative">
              <input
                type="text"
              //  max={format(new Date(), "yyyy-MM-dd")}
                name="codecl"
                disabled
                value={state.body.codecl}
                onChange={handleChange}
               
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
        <div className="flex flex-col flex-1">
            <label>Nom Client</label>
            <div className="inline-block relative">
            <input
                 type="text"
                 disabled
                 name="nomcl"
                 value={state.body.nomcl}
               // onChange={handleChange}
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
        </div>
          </div>
          <div className="flex flex-col flex-1">
            <label>Compte</label>
            <div className="inline-block relative">
            <input
            disabled
                 type="text"
                 name="cpt"
                 value={state.body.cpt}
               // onChange={handleChange}
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
        </div>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col flex-1">
            <label>Nom Beneficiere</label>
            <div className="inline-block relative">
              <input
              disabled
                 type="text"
                 name="nomb"
                 value={state.body.nomb}
               // onChange={handleChange}
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <label> Devise</label>
            <div className="inline-block relative">
              <input
              disabled
                type="text"
                name="dev"
                value={state.body.dev}
               // onChange={handleChange}
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col flex-1">
            <label>Montant</label>
            <div className="inline-block relative">
              <input
               // type="text"
               disabled
                type="text"
                name="mntreg"
                value={state.body.mntreg}
               // onChange={handleChange}
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <label>Montant en XAF</label>
            <div className="inline-block relative">
              <input
              disabled
                type="text"
                name="mntregx"
                
                value={state.body.mntregx}
               // onChange={handleChange}
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
          </div>
        </div>

      

        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col flex-1">
            <label>Reference BEAC</label>
            <div className="inline-block relative">
              <input
              disabled
                type="text"
                name="refbe"
                value={state.body.refbe}
              //  onChange={handleChange}
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <label>Reference SGS/PR</label>
            <div className="inline-block relative">
              <input
              disabled
                type="text"
                name="refsgs"
                value={state.body.refsgs}
                //onChange={handleChange}
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col flex-1">
            <label>Reference Ticket Imputation</label>
            <div className="inline-block relative">
              <input
              disabled
                
                type="text"
                name="reftiki"
                value={state.body.reftiki}
                onChange={handleChange}
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <label>Date de modification</label>
            <div className="inline-block relative">
              <input
              disabled
                type="text"
                name="dmo"
                
                value={state.body.dmo}
                onChange={handleChange}
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col flex-1">
            <label>Date de création</label>
            <div className="inline-block relative">
              <input
              disabled
                type="text"
                max={format(new Date(), "yyyy-MM-dd")}
                name="dou"
                
                value={state.body.dou}
                onChange={handleChange}
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <label>Utilisateur Modifié </label> 
             <div className="inline-block relative">
              <input
              disabled
                type="text"
                name="utimo"
                
                value={state.body.utimo}
              //  onChange={handleChange}
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
          </div>
        </div>

       
        {/* <Button type="primary" onClick={submitForm}>Sauvegarder</Button> */}
      </fieldset>
      </div>
    // </PageLayout>
  );
}

//export default AddUser;
