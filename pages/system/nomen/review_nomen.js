import React from "react";
import { HiDuplicate } from "react-icons/hi";
import { useParams, useLocation, useHistory } from "next/router";
import { AutoComplete, Button, Icon, InputNumber, Loader, Modal } from "rsuite";
//import LoaderContainer from "../components/loader";
//import PageHeader from "../components/PageHeader";
//import TableComponent from "../components/Table";
import { Table, Row, Col, Input } from "antd";
//import { Encrpt } from "../model/passwordEncrypt";
import PostData from "../../../model/PostData";
//import message from "../model/messages.json";

import Swal from "sweetalert2";
//import { Helmet } from "react-helmet";
//import { useCtx } from "../context/lang-store";


// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

export default function Review_nomen({ actions = [] }) {
 // const messages = message.fr;
 // const history = useHistory();
  //const params = useParams();
  //const query = useQuery();
  const reducer = (prevState, action) => ({ ...prevState, ...action });
 // const { languageData, actionInclude } = useCtx();
  const bodyData = {
    tabcd: "1000",
    crtd: new Date().toLocaleString(),
    mdfi: new Date().toLocaleString(),
    muser: "12",
    cuser: "12",
    cetab: "001",
  };
  const [state, dispatch] = React.useReducer(reducer, { body: bodyData });
  function showDelM(code) {
    dispatch({ showDelModal: true, code });
  }

  function loadUpdateData(data) {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    let body = {};
    for (let i in data) {
      if (i.replace(/[0-9]/g, "") === "mdp") {
        body = { ...body, [i]: null };
      } else {
        body = { ...body, [i]: data[i] };
      }
    }

    dispatch({ body, update: true });
  }
  function loadDupeData(data) {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    let addData = { ...data };
    delete addData.id;
    let body = {};
    for (let i in addData) {
      if (i.replace(/[0-9]/g, "") === "mdp") {
        body = { ...body, [i]: null };
      } else {
        body = { ...body, [i]: addData[i] };
      }
    }
    dispatch({ body });
  }
const params = {
    code:"1000"
}
  function getData() {
    PostData(
      { method: "get", url: `api/getNomenDataByTabcd/${params.code}`, body: {} },
      (res) => {
        if (res !== "Error") {
          const data = res.data.map((tab) => ({
            ...tab,
            mdp1: (
              <input
                type="password"
                className="no-bg no-border"
                value={tab.mdp1}
                disabled
              />
            ),
            mdp2: (
              <input
                type="password"
                className="no-bg no-border"
                value={tab.mdp2}
                disabled
              />
            ),
            mdp3: (
              <input
                type="password"
                className="no-bg no-border"
                value={tab.mdp3}
                disabled
              />
            ),
            mdp4: (
              <input
                type="password"
                className="no-bg no-border"
                value={tab.mdp4}
                disabled
              />
            ),
            mdp5: (
              <input
                type="password"
                className="no-bg no-border"
                value={tab.mdp5}
                disabled
              />
            ),
            action: (
              <div className="d-flex gap-3">
                <button
                  disabled={!actionInclude("nomencl_data_update")}
                  className="text-warning m-0 p-0 no-bg"
                  onClick={() => {
                    loadUpdateData(tab);
                  }}
                >
                  <i className="mdi mdi-pencil font-size-18"></i>
                </button>
                <button
                  title="Dupliquer une anomalie"
                  className="m-0 p-0 no-bg text-secondary"
                  style={{ cursor: "pointer" }}
                  onClick={() => loadDupeData(tab)}
                >
                  <HiDuplicate className="font-size-18" />
                </button>
                <button
                  disabled={!actionInclude("nomencl_data_delete")}
                  className="text-danger m-0 p-0 no-bg"
                  onClick={() => {
                    showDelM(tab.acscd);
                  }}
                >
                  <i className="mdi mdi-delete font-size-18"></i>
                </button>
              </div>
            ),
          }));
          const col = JSON.parse(res.col);
          var columns = col.map((c) => {
            return { Header: c.name, accessor: c.format, Cell: NomenCell };
          });
          columns.push({ Header: "Action", accessor: "action" });
          dispatch({ data: data, col, columns });
        } 

        // else {
        //   Swal.fire({
        //     icon: "error",
        //     title: "Oops...",
           
        //   }).then((e) => {
        //     dispatch({ refresh: !state.refresh });
        //   });
        // }
      }
    );
  }
  React.useEffect(() => {
    getData();
  }, [state.refresh]);

  function handleSubmit(e) {
    if (state.body.acscd.replaceAll(" ", "") !== "") {
      dispatch({ isSubmiting: true });
      e.preventDefault();
      const dat = state.body;
      var body = { ...state.body };
      body.mdp1 && (body.mdp1 = Encrpt(body.mdp1));
      body.mdp2 && (body.mdp2 = Encrpt(body.mdp2));
      body.mdp3 && (body.mdp3 = Encrpt(body.mdp3));
      body.mdp4 && (body.mdp4 = Encrpt(body.mdp4));
      body.mdp5 && (body.mdp5 = Encrpt(body.mdp5));

      PostData(
        {
          method: "post",
          url: state.update
            ? `/updateNomenDataByTabcd/${params.code}`
            : "/addNomenDataByTabcd",
          body,
        },
        (res) => {
          if (res !== "Error") {
            if (res.status === "01") {
              Swal.fire({
                title: "Success",
                icon: "success",
                text: `Data successfully ${
                  state.update ? "updated!" : "added!"
                }`,
              }).then((e) => {
                dispatch({ body: bodyData, update: false, isSubmiting: false });
              });
              getData();
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
              //  text: messages.SYSTEM_ERROR,
              }).then((e) => {
                dispatch({ isSubmiting: false, body: dat });
              });
            }
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
           //   text: messages.CONNECTION_FAILED,
            });
            dispatch({ isSubmiting: false, body: dat });
          }
        }
      );
    }
  }
  function handleChange({ name, value }) {
    dispatch({ body: { ...state.body, [name]: value } });
  }

  function hideDelM() {
    dispatch({ showDelModal: false });
  }

  function getDropdownData({ service, key, value, stateKey, arg = "" }) {
    let objs = arg.split("|").map((ob) => {
      let [key, value] = ob.split(":");
      return { [key]: value };
    });
    let body = {};
    for (let i of objs) {
      body = { ...body, ...i };
    }
    let method = body.method || "get";
    let arrKey = body.arrKey;
    delete body.method;
    if (!state[stateKey]) {
      PostData({ method, url: "/" + service, body }, (res) => {
        if (res !== "Error") {
          let data = [];
          if (arrKey) {
            arrKey = arrKey.trim();
            data = res[arrKey].map((item) => ({
              label: item[value],
              value: item[key],
            }));
          } else {
            data = res.map((item) => ({
              label: item[value],
              value: item[key],
            }));
          }
          dispatch({ [stateKey]: data });
        }
      });
    }
  }

  function handleDelete() {
    dispatch({ isDeleting: true });
    const body = {
      tabcd: params.code,
      acscd: state.code,
    };
    PostData({ method: "post", url: "/deleNomenDataByTabcd", body }, (res) => {
      if (res !== "Error") {
        if (res.status === "01") {
          Swal.fire({
            title: "Success",
            icon: "success",
           // text: messages.RECORD_SUCCESS_DELETED,
          }).then((e) => {
            dispatch({ showDelModal: false, isDeleting: false });
          });
          getData();
        } else {
          Swal.fire({
            title: "Error",
            icon: "error",
         //   text: messages.RECORD_FAILED_DELETED,
          }).then((e) => {
            dispatch({ showDelModal: false, isDeleting: false });
          });
        }
      } else {
        Swal.fire({
          title: "Internet Connection",
          icon: "question",
         // text: messages.NOT_CONNECT_INTERNET,
        }).then((e) => {
          dispatch({ showDelModal: false, isDeleting: false });
        });
      }
    });
  }
//   if (!state.data) {
//     return <LoaderContainer />;
//   }

  const types = {
    lib: { type: "text" },
    taux: { type: "float" },
    mnt: { type: "number" },
    dat: { type: "date" },
    mdp: { type: "password" },
  };

  function testConnection(e) {
    dispatch({ testing: true });
    e.preventDefault();
    let db = {
      username: state.body.lib3,
      password: state.body.mdp1,
      url: state.body.lib1,
      schema: state.body.lib4,
      type: state.body.lib5,
    };

    let ftp = {
      host: state.body.lib1,
      port: state.body.lib2,
      username: state.body.lib3,
      password: state.body.mdp1,
    };
    if (state.body) {
      PostData(
        {
          method: "post",
          url: params.code === "9004" ? "/testDB" : "testFTP",
          body: params.code === "9004" ? db : ftp,
        },
        (res) => {
          dispatch({ testing: false });
          if (res !== "Error") {
            if (res.status === "01") {
              Swal.fire({
                title: "Successful",
                icon: "success",
                text: res.data,
              });
            } else {
              Swal.fire({
                title: "Failed",
                icon: "warning",
                text: res.data,
              });
            }
          } else {
            Swal.fire({
              title: "Failed",
              icon: "error",
            //  text: messages.NOT_CONNECT_INTERNET,
            });
          }
        }
      );
    }
  }
//   const breadcrumb = [
//     { name: languageData.sidebar.adminsys, path: "/" },
//     {
//       name: languageData.adminsys.nomenclature.title,
//       path: "/nomenclature",
//     },
//     { name: query.get("name"), path: "/" },
//   ];
  return (
    <div className="review_anom">
      {/* <Helmet>
        <title>S2C | Nomenclature | {query.get("name")}</title>
      </Helmet> 
      <PageHeader
        title={
          <span
            className="pointer"
            onClick={() => {
              history.goBack();
            }}
          >
            <Icon icon="left" /> {query.get("name")}
          </span>
        }
        breadcrumb={breadcrumb}
      /> */}

      {/* {
      actionInclude("nomencl_data_create")
       && (
        <div className="bg-white rounded p-3 mb-2">
          <h6 className="mb-sm-0 font-size-14">
            {state.update ? "Modifier Champ" : "Ajouter Nouveau Champ"}
          </h6>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="row py-0">
              {state.col.map((col, i) => {
                if (col.name === "") {
                  return;
                }
                const type = types[col.format.replace(/[0-9]/g, "")] || {
                  type: "text",
                };

                if (col.dropdown) {
                  getDropdownData({ ...col.dropdown, stateKey: col.format });
                  let data = state[col.format] || [];
                  if (col.dropdown.type === "1") {
                    return (
                      <div className="col-sm-3 my-1" key={i}>
                        <h6 className="text-dark">{col.name}</h6>
                        <AutoComplete
                          value={state.body[col.format] || ""}
                          data={data.map(
                            (act) => `${act.label} - ${act.value}`
                          )}
                          onChange={(value) =>
                            handleChange({ name: col.format, value })
                          }
                        />
                      </div>
                    );
                  }
                  return (
                    <div className="col-sm-3 my-1" key={i}>
                      <h6 className="text-dark">{col.name}</h6>
                      <select
                        className="form-select"
                        value={state.body[col.format] || ""}
                        onChange={(e) =>
                          handleChange({
                            name: col.format,
                            value: e.target.value,
                          })
                        }
                        required
                      >
                        <option value={null}>Choisir...</option>
                        {data.map((item, i) => (
                          <option value={item.value} key={i}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                }
                if (type.type === "float") {
                  return (
                    <div className="col-sm-3 my-1" key={i}>
                      <h6 className="text-dark">{col.name}</h6>
                      <InputNumber
                        value={state.body[col.format] || ""}
                        onChange={(e) =>
                          handleChange({ name: col.format, value: e })
                        }
                      />
                    </div>
                  );
                } else if (type.type === "number") {
                  return (
                    <div className="col-sm-3 my-1" key={i}>
                      <h6 className="text-dark">{col.name}</h6>
                      <InputNumber
                        value={state.body[col.format] || ""}
                        onChange={(e) =>
                          handleChange({ name: col.format, value: parseInt(e) })
                        }
                      />
                    </div>
                  );
                } else if (col.isRich) {
                  return (
                    <div className="col-sm-3 my-1" key={i}>
                      <h6 className="text-dark">{col.name}</h6>
                      <textarea
                        type={type ? type.type : "text"}
                        placeholder={col.format}
                        contentEditable="false"
                        name={col.format}
                        required={col.format === "acscd"}
                        value={state.body[col.format] || ""}
                        onChange={(e) => {handleChange({
                                name: col.format,
                                value: e.target.value,
                              });
                        }}
                        className="form-control"
                      ></textarea>
                    </div>
                  );
                } else {
                  return (
                    <div className="col-sm-3 my-1" key={i}>
                      <h6 className="text-dark">{col.name}</h6>
                      <input
                        type={type ? type.type : "text"}
                        placeholder={col.format}
                        contentEditable="false"
                        name={col.format}
                        required={col.format === "acscd"}
                        value={state.body[col.format] || ""}
                        onChange={(e) => {
                          type.decimal
                            ? handleChange({
                                name: col.format,
                                value:
                                  parseInt(e.target.value) ||
                                  state.body[col.format],
                              })
                            : handleChange({
                                name: col.format,
                                value: e.target.value,
                              });
                        }}
                        className="form-control"
                      />
                    </div>
                  );
                }
              })}
            </div>
            <br />
            <div className="d-flex align-items-center">
              {(params.code === "9004" || params.code === "9005") && (
                <button
                  style={{ marginRight: "4px" }}
                  className="btn btn-dark"
                  onClick={testConnection}
                  disabled={!state.body}
                >
                  Test Connection
                </button>
              )}
              <button className="btn btn-primary" disabled={state.isSubmiting}>
                {state.update
                  ? languageData.btn.btn_edit
                  : languageData.btn.btn_add}
              </button>
            
            </div>
          </form>
        </div>
      )} */}

      <Table
        hideAdvancedSearch
        dataSource={state.data}
        columns={state.columns}
      />
      <Modal
        backdrop="static"
        show={state.showDelModal}
        onHide={hideDelM}
        size="xs"
      >
        <Modal.Body>
          {state.isDeleting && (
            <div className="d-flex justify-content-end">
              {/* <Loader /> */}
            </div>
          )}
          <div className="d-flex mb-2">
            <Icon
              icon="remind"
              className="text-center mx-auto"
              style={{
                color: "#ffb300",
                fontSize: 40,
              }}
            />
          </div>
          {/* <p className="text-center">{messages.DElETE_ITEM_IN_TABLE}</p> */}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleDelete} className="bg-dark text-white">
            Oui
          </Button>
          <Button onClick={hideDelM} appearance="subtle">
            Non
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    
  );
}

const NomenCell = ({ value }) => {
  if (value && value.length > 10) {
    return (
      <p
        title={value}
        style={{
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
          width: "200px",
        }}
      >
        {value}
      </p>
    );
  }
  return <p title={value}>{value}</p>;
};
