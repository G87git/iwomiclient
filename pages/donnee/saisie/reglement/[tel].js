import { FiUsers } from "react-icons/fi";
import { AiOutlineArrowLeft } from "react-icons/ai";
import PageLayout from "@/components/pageLayout";
import { useRouter } from "next/router";
import { Row, Col, Menu, Dropdown, Button, Select, Modal } from "antd";
import { ArrowLeftOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import Link from "next/link";
//import Button from "@/components/button";
import useModal from "antd/lib/modal/useModal";
import React, { useState, useEffect } from "react";
import PostData from "model/PostData";
import Swal from "sweetalert2";

//import { Container, Row, Col } from "reactstrap";

const Saisie_reglement = () => {
  // const Modal = useModal();
  const router = useRouter();
  const { tel } = router.query;
  const { Option } = Select;

  const [loading, setLoading] = useState(false);

  const reducer = (prevState, action) => ({ ...prevState, ...action });
  const [state, dispatch] = React.useReducer(reducer, {
    body: {},
    country: { country: "CMR", ctry: "CMR" },
    // userModal: !id,
  });

  function handleChange({ target }) {
    console.log(target);
    dispatch({ body: { ...state.body, [target.name]: target.value } });
  }

  useEffect(() => {
    const userId = localStorage.getItem("uname");
    const etab = localStorage.getItem("cetab");

    dispatch({ userId, etab });
    // console.log("this is from useEffect ", state.userId);
    if (!tel) return;
    PostData(
      { method: "get", url: `api/getNomenDataByTabcd/9094`, body: {} },
      (res) => {
        if (res !== "Error") {
          dispatch({ agence_list: res.data });
        }
      }
    );

    //devise dropdown
    PostData(
      { method: "get", url: `api/getNomenDataByTabcd/9022`, body: {} },
      (res) => {
        if (res !== "Error") {
          dispatch({ devise: res.data });
        }
      }
    );
    //mode de transfert dropdown
    PostData(
      { method: "get", url: `api/getNomenDataByTabcd/9023`, body: {} },
      (res) => {
        if (res !== "Error") {
          dispatch({ mode_trans: res.data });
        }
      }
    );

    PostData(
      { method: "post", url: `/opiback/clientsConsultOpi`, body: { tel } },
      (res) => {
        if (res !== "Error") {
          dispatch({
            nomcl: res.data.nom,
            codecl: res.data.cli,
          });
          // console.log("from the service", state.codecl);
        }
      }
    );

    getAccountList(state.codecl);
  }, [tel, state.codecl]);

  function getAccountList(cli) {
    //numero de compte
    //  console.log("this is cli", state.codecl);
    // let cli = state.codecl;
    PostData(
      {
        method: "post",
        url: `/client/listCptCli`,
        body: { cli: "CLI0596", etab: "001" },
      },
      (res) => {
        if (res !== "Error") {
          dispatch({ clicpt: res.data });
        }
      }
    );
  }

  function handleSaveReglement(e) {
    var body = {
      ...state.body,
      uti: state.userId,
      utimo: state.userId,
      etab: "001",
      nomcl: state.nomcl,
      codecl: state.codecl,
    };

    // console.log(body);

    PostData(
      { method: "post", url: "/opiback/saveSaisiReglement", body },
      (res) => {
        if (res !== "Error") {
          setLoading(true);
          if (res.status === "01") {
            Modal.success({
              title: "Success",
              content: <p>{res.message}</p>,
              onOk: () => {
                router.push(`/donnee/hist/saisiehist/${state.codecl}`);
                setLoading(false);
              },
            });
          } else {
            Modal.error({
              title: "Error",
              content: <p>An error occured, check your Network Connection</p>,
              onOk: () => {
                setLoading(false);
              },
            });
          }
          //   Modal.error({
          //     title: "Error",

          //     content:<p>An Error Occured</p> ,
          //   });
          // }
          //  dispatch({ isSubmitting: false });
          setLoading(false);
        }
      }
    );
  }

  return (
    <div>
      {/* <PageLayout title="Gestions utilisateurs" Icon={FiUsers}> */}

      {/* <h2 className="text-lg font-bold my-2 mx-7">Ajouter un Utilisateur </h2> */}
      <h2
        className="text-lg font-bold"
        style={{ cursor: "pointer" }}
        onClick={() => router.back()}
      >
        <ArrowLeftOutlined /> &nbsp; Nouvelle Reglement{" "}
      </h2>

      <fieldset className="border border-gray-700 p-4 max-w-5xl rounded space-y-4">
        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col flex-1">
            <label>Agence</label>
            <div className="inline-block relative">
              <Select
                defaultValue="Choisir L'Agence "
                //  onChange={handleTypeChange}
                required
                name="age"
                value={state.body.age}
                onChange={(value) => {
                  handleChange({ target: { name: "age", value } });
                }}
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              >
                {state.agence_list &&
                  state.agence_list.map(
                    (agence, index) =>
                      agence.acscd && (
                        <option key={index} value={agence.acscd}>
                          {agence.lib1}
                        </option>
                      )
                  )}
              </Select>

              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <label>Mode de Transfert</label>
            <div className="inline-block relative">
              <Select
                defaultValue="Choisir le Mode de Transfert"
                //  onChange={handleTypeChange}
                required
                name="modeTransfer"
                value={state.body.modeTransfer}
                onChange={(value) => {
                  handleChange({ target: { name: "modeTransfer", value } });
                }}
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              >
                {state.mode_trans &&
                  state.mode_trans.map(
                    (mode, index) =>
                      mode.acscd && (
                        <option key={index} value={mode.acscd}>
                          {mode.lib1}
                        </option>
                      )
                  )}
              </Select>

              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col flex-1">
            <label>Devise</label>
            <div className="inline-block relative">
              <Select
                defaultValue="Choisir le Devise "
                //  onChange={handleTypeChange}
                required
                name="dev"
                value={state.body.dev}
                onChange={(value) => {
                  handleChange({ target: { name: "dev", value } });
                }}
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              >
                {state.devise &&
                  state.devise.map(
                    (dvs, index) =>
                      dvs.acscd && (
                        <option key={index} value={dvs.acscd}>
                          {dvs.lib1}
                        </option>
                      )
                  )}
              </Select>

              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <label>Numéro de compte du client</label>
            <div className="inline-block relative">
              {/* <Select defaultValue="Choisir le Compte "
           
            required
            name="gender"
           value={state.body.cpt}
            onChange={(value)=> {
              handleChange({target: {name: "cpt", value}})
            }}
            className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
            >
           <Option value="909998">909998</Option>
          <Option value="96060596">909998</Option>
          
          
         </Select> */}

              <Select
                defaultValue="Choisir Le Compte ..."
                //  onChange={handleTypeChange}
                required
                name="cpt"
                value={state.body.cpt}
                onChange={(value) => {
                  handleChange({ target: { name: "cpt", value } });
                }}
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              >
                {state.clicpt &&
                  state.clicpt.map(
                    (compte, index) =>
                      compte.cpt && (
                        <option key={index} value={compte.cpt}>
                          {compte.cpt}
                        </option>
                      )
                  )}
              </Select>

              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col flex-1">
            <label>Numéro de compte du Frais</label>
            <div className="inline-block relative">
              <Select
                defaultValue="Choisir Numéro de compte du Frais"
                required
                name="comptFrai"
                value={state.body.comptFrai}
                onChange={(value) => {
                  handleChange({ target: { name: "comptFrai", value } });
                }}
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              >
                <Option value="909877">909877</Option>
                <Option value="988765">988765</Option>
              </Select>

              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <label> Motif</label>
            <div className="inline-block relative">
              <textarea
                type="text"
                name="motif"
                value={state.body.motif}
                onChange={handleChange}
                //  onChange={(value)=> {
                //    handleChange({target: {name: "motif", value}})
                //  }}
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />

              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col flex-1">
            <label>Reference ticket de Reglement)</label>
            <div className="inline-block relative">
              <input
                type="text"
                name="reftikr"
                value={state.body.reftikr}
                onChange={handleChange}
                //  onChange={(value)=> {
                //    handleChange({target: {name: "motif", value}})
                //  }}
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />

              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <label> Numero de Domiciliation </label>
            <div className="inline-block relative">
              <input
                type="text"
                name="numd"
                value={state.body.numd}
                onChange={handleChange}
                //  onChange={(value)=> {
                //    handleChange({target: {name: "motif", value}})
                //  }}
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />

              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col flex-1">
            {/* <label>Reference ticket de Reglement)</label> */}
            {/* <div className="inline-block relative">
  
              <input
                  type="text"
                  name="reftikr"
                  value={state.body.reftikr}
                  onChange={handleChange}
                 
                  className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
                />
               
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  
                </div>
              </div> */}
          </div>
          <div className="flex flex-col flex-1">
            <label> Date de Reglement</label>
            <div className="inline-block relative">
              <input
                type="date"
                name="dater"
                value={state.body.dater}
                onChange={handleChange}
                //  onChange={(value)=> {
                //    handleChange({target: {name: "motif", value}})
                //  }}
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />

              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
            </div>
          </div>
        </div>

        <Button onClick={handleSaveReglement} loading={loading} type="primary">
          Sauvegarder
        </Button>
      </fieldset>
    </div>
    // </PageLayout>
  );
};

export default Saisie_reglement;
