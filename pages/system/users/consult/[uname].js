import { FiUsers } from "react-icons/fi";
import {AiOutlineArrowLeft} from "react-icons/ai"
import PageLayout from "@/components/pageLayout";
import { Row, Col, Dropdown, Menu, Select } from "antd";
import { useRouter } from "next/router";
//import { Row, Col } from "next/link";
import { ArrowLeftOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import Link from "next/link";
import Button from "@/components/button";
import ButtonComponent from "@/components/buttonComponent";
import PostData from "model/PostData";
import useModal from "antd/lib/modal/useModal";
import Swal from "sweetalert2";
import React, {useEffect} from "react";

//import { Container, Row, Col } from "reactstrap";

const getDate = (date) => {
  const [day, month, year] = date.split(" ")[0].split("/");
  return `${year}-${month.length === 1 ? `0${month}` : month}-${
    day.length === 1 ? `0${day}` : day
  }`;
};

export default function AddUser(){
    const Modal = useModal();
    const push = useRouter();
    const router = useRouter();
    const { Option } = Select;

    const {uname} = router.query;

    const reducer = (prevState, action) => ({ ...prevState, ...action });
    const [state, dispatch] = React.useReducer(reducer, {
      body: {}, country: { country: "CMR", ctry: "CMR" },
     // userModal: !id,
    });

    function handleChange({target}) {
      console.log(target);
      dispatch({ body: { ...state.body, [target.name]: target.value } });
    }

    
  function handleSelectChange({ target: { name, value } }) {
    dispatch({ body: { ...state.body, [name]: value } });
  }
  

    function handleTypeChange(value) {
      console.log(`selected ${value}`);
   
    }

    useEffect(() => {
      if (!uname) return;
        PostData(
          { method: "get", url: `api/getNomenDataByTabcd/0033`, body: {} },
          (res) => {
            if (res !== "Error") {
              dispatch({ titles: res.data });
              console.log(state.titles);
            }
          }
        );
      //  console.log(uname);
    
        if (uname) {
          dispatch({ isSubmitting: true });
          PostData(
            {
              method: "post",
              url: "/getUserByUname",
              body: { cetab:"001", uname},
            },
            (res) => {
              if (res !== "Error") {
                dispatch({
                  body: {
                    ...res.data,
                    birdy: res.data.birdy
                      ? getDate(res.data.birdy)
                      : res.data.birdy,
                    hixdt: res.data.hixdt
                      ? getDate(res.data.hixdt)
                      : res.data.hixdt,
                  },
                  isSubmitting: false,
                });
              } else {
              //  Alert.error("Failed to load user informations");
                dispatch({ fetchSevice: false });
              }
            }
          );
        }
        PostData({ method: "get", url: "/getProfiles", body: {} }, (res) => {
          if (res !== "Error") {
            dispatch({ profiles: res.data, fetchingProfile: false });
          } else {
            Swal.fire({
              title: "Internet Connection",
              icon: "question",
              text: "Connection timeout",
            }).then((e) => {
              dispatch({ fetchingProfile: false });
            });
          }
        });
    },
    

      [uname]);

    function submitForm(e) {
      dispatch({ isSubmitting: true });
      const cuser = "12";
      const cetab = "001";
      var body = { ...state.body, cuser, cetab };
      console.log(body);

      // if (id) {
      //   body = {
      //     ...state.body,
      //     cuser,
      //     cetab,
      //     birdy: format(new Date(state.body.birdy), "dd/MM/yyyy HH:MM:SS"),
      //     hixdt: format(new Date(state.body.hixdt), "dd/MM/yyyy HH:MM:SS"),
      //   };
      // }
      PostData(
        { method: "post", url: "/updateUser", body },
        (res) => {
          if (res !== "Error") {
            if (res.status === "01") {
              Swal.fire({
                title: "Success",
                icon: "success",
                text: res.message,
              })
            } else {
              Swal.fire({
                title: "Error",
                icon: "error",
                text: res.message,
              }).then((e) => {
                dispatch({ isSubmitting: false });
              });
            }
            dispatch({ isSubmitting: false });
          } else {
            Swal.fire({
              title: "Internet Connection",
              icon: "question",
              text: "Check Network Connection",
            }).then((e) => {
              dispatch({ isSubmitting: false });
            });
          }
        }
      );
    }



  return (
      <div>
    {/* <PageLayout title="Gestions utilisateurs" Icon={FiUsers}> */}

    
      
      {/* <h2 className="text-lg font-bold my-2 mx-7">Ajouter un Utilisateur </h2> */}
      <h2 className="text-lg font-bold"  style={{ cursor: "pointer" }} onClick={() => router.back()}><ArrowLeftOutlined/> &nbsp; Consulter un Utilisateur </h2>
      
                      
      
    

      <fieldset className="border border-gray-700 p-4 max-w-7xl rounded space-y-4">
        {/* <legend className="text-sm font-semibold px-2">
          Ajouter un utilisateur
        </legend> */}

    

        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col flex-1">
            <label>Titre</label>
            <div className="inline-block relative">
            <Select defaultValue="Choisir le titre"
           //  onChange={handleTypeChange}
            disabled
            name="ttle"
            value={state.body.ttle}
            onChange={(value)=> {
              handleChange({target: {name: "ttle", value}})
            }}
            
            className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
            >
               {/* <option>Choisir le titre</option> */}
                          {state.titles &&
                            state.titles.map(
                              (title, index) =>
                                title.acscd && (
                                  <option key={index} value={title.acscd}>
                                    {title.lib1}
                                  </option>
                                )
                            )}
          
         </Select>
        </div>
          </div>
          <div className="flex flex-col flex-1">
            <label>Date de Recruitement</label>
            <div className="inline-block relative">
              <input
                type="text"
                name="hixdt"
                disabled
                value={state.body.hixdt}
               
                disabled
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
        <div className="flex flex-col flex-1">
            <label>Sexe</label>
            <div className="inline-block relative">
            <input
                 type="text"
                 disabled
                 name="gnder"
                 value={state.body.gnder}
               
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
        
        </div>
          </div>
          <div className="flex flex-col flex-1">
            <label>Profil</label>
            <div className="inline-block relative">
            <Select defaultValue="Choisir un profil"
           //  onChange={handleTypeChange}
            disabled
            name="prfle"
            value={state.body.prfle}
            //onChange={handleChange}
            onChange={(value)=> {
              handleChange({target: {name: "prfle", value}})
            }}
            className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
            >
             {/* <option>Choisir un profil</option> */}
                            {state.profiles &&
                              state.profiles.map((profile, i) => (
                                <option key={i} value={profile.acscd}>
                                  {profile.name}
                                </option>
                              ))}
         </Select>
        </div>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col flex-1">
            <label>Nom</label>
            <div className="inline-block relative">
              <input
                 type="text"
                 disabled
                 name="lname"
                 value={state.body.lname}
               
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <label> Matricule</label>
            <div className="inline-block relative">
              <input
                type="text"
                disabled
                name="matcl"
                value={state.body.matcl}
                
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col flex-1">
            <label>Prénom</label>
            <div className="inline-block relative">
              <input
               // type="text"
               disabled
                type="text"
                name="fname"
                value={state.body.fname}
               
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
                type="text"
                name="addrs"
                disabled
                value={state.body.addrs}
                
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
          </div>
        </div>
      

        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col flex-1">
            <label>Email</label>
            <div className="inline-block relative">
              <input
                type="email"
                disabled
                name="email"
                value={state.body.email}
               
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <label>Téléphone</label>
            <div className="inline-block relative">
              <input
                type="text"
                disabled
                name="phone"
                value={state.body.phone}
               
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col flex-1">
            <label>Nom D'utilisateur</label>
            <div className="inline-block relative">
              <input
                
                type="text"
                name="uname"
                disabled
                value={state.body.uname}
              
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <label>Pays</label>
            <div className="inline-block relative">
              <input
                type="text"
                name="ctry"
                disabled
                value={state.body.ctry}
                
                disabled
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col flex-1">
            <label>Date de Naissance</label>
            <div className="inline-block relative">
              <input
                type="text"
                disabled
                name="birdy"
                disabled
                value={state.body.birdy}
               
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            {/* <label>Agence</label> */}
            {/* <div className="inline-block relative">
              <input
                type="text"
                disabled
                name="agence"
                disabled
                value={state.body.agence}
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div> */}
          </div>
        </div>

       
        {/* <ButtonComponent onClick={submitForm}>Sauvegarder</ButtonComponent> */}
      </fieldset>
      </div>
    // </PageLayout>
  );
}

//export default AddUser;
