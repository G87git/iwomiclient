import React from "react";
import { HiDuplicate } from "react-icons/hi";
import { useRouter } from "next/router";
import { AutoComplete, InputNumber } from "rsuite";
import { Table, Row, Col, Input, Button, Modal } from "antd";
import PostData from "../../../../model/PostData";
import {ArrowLeftOutlined} from "@ant-design/icons";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import { getNomenclature } from "utils/nomenclature";

const {info} = Modal;
export default function ReviewNomenclature({data, col}) {
  const router = useRouter();
  const params = router.query;
  const bodyData = {
    crtd: new Date().toLocaleString(),
    mdfi: new Date().toLocaleString(),
    muser: "12",
    cuser: "12",
    cetab: "001",
  };

  const reducer = (prevState, action) => ({ ...prevState, ...action });
  const [state, dispatch] = React.useReducer(reducer, {
    body: bodyData,
    col: [],
    dataLoading: true,
  });
  // const { languageData, actionInclude } = useCtx();

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

  React.useEffect(() => {
    if (!params.tabcd) return;
    PostData(
      {
        method: "get",
        url: `api/getNomenDataByTabcd/${params.tabcd}`,
        body: {},
      },
      (res) => {
        dispatch({ dataLoading: false });
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
              <div className="flex gap-2">
                <button
                  // disabled={!actionInclude("nomencl_data_update")}
                  className="text-green-500 text-lg"
                  onClick={() => {
                    loadUpdateData(tab);
                  }}
                >
                  <FaEdit />
                </button>
                <button
                  title="Dupliquer une anomalie"
                  className="text-yellow-500 text-lg"
                  onClick={() => loadDupeData(tab)}
                >
                  <HiDuplicate />
                </button>
                <button
                  // disabled={!actionInclude("nomencl_data_delete")}
                  className="text-red-500 text-lg"
                  onClick={() => {
                    showDelM(tab.acscd);
                  }}
                >
                  <FaTrash />
                </button>
              </div>
            ),
          }));

          const col = JSON.parse(res.col);
          var columns = col.map((c) => {
            return {
              title: c.name,
              dataIndex: c.format,
              key: c.format,
              Cell: NomenCell,
            };
          });
          columns.push({ title: "Action", dataIndex: "action" });
          dispatch({ data: data, col, columns });
        }
      }
    );
  }, [state.refresh, params.tabcd]);

  function handleSubmit(e) {
    if (state.body.acscd.replaceAll(" ", "") !== "") {
      dispatch({ isSubmiting: true });
      e.preventDefault();
      const dat = state.body;
      var body = { ...state.body, tabcd: params.tabcd };
      body.mdp1 && (body.mdp1 = Encrpt(body.mdp1));
      body.mdp2 && (body.mdp2 = Encrpt(body.mdp2));
      body.mdp3 && (body.mdp3 = Encrpt(body.mdp3));
      body.mdp4 && (body.mdp4 = Encrpt(body.mdp4));
      body.mdp5 && (body.mdp5 = Encrpt(body.mdp5));

      PostData(
        {
          method: "post",
          url: state.update
            ? `/api/updateNomenDataByTabcd/${params.tabcd}`
            : "/api/addNomenDataByTabcd",
          body,
        },
        (res) => {
          if (res !== "Error") {
            console.log(res);
            if (res.status === "01") {
              Modal.success({title:"success",
              content:<p>{ `Data successfully ${
                state.update ? "updated!" : "added!"
              }` } </p>,
              onOk:()=>{
                   dispatch({
                  body: bodyData,
                  update: false,
                  isSubmiting: false,
                  refresh: !state.refresh,
                });

              }
            
            })

            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: res.message,
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
      tabcd: params.tabcd,
      acscd: state.code,
    };
    PostData({ method: "post", url: "/api/deleNomenDataByTabcd", body }, (res) => {
      dispatch({showDelModal: false, isDeleting: false});
      if (res !== "Error") {
        if (res.status === "01") {
          info({title: "Success", content: <p>Data successfully deleted</p>, onOk: () => {dispatch({refresh: !state.refresh})}})
        } else {
          Modal.error({title: "Error", content: <p>{res.message}</p>})
        }
      } else {
        Modal.error({title: "Error", content: <p></p>})
      }
    });
  }

  const types = {
    lib: { type: "text" },
    taux: { type: "float" },
    mnt: { type: "number" },
    dat: { type: "date" },
    mdp: { type: "password" },
  };



  var columns = col.map((c) => {
    return {
      title: c.name,
      dataIndex: c.format,
      key: c.format,
      Cell: NomenCell,
    };
  });
  columns.push({ title: "Action", dataIndex: "action" });



  return (
    <div className="review_anom">
      {
        // actionInclude("nomencl_data_create")
        true && (
          <div className="bg-white rounded p-3 mb-2">
            <h6 className="mb-sm-0 font-size-14"  style={{ cursor: "pointer" }} onClick={() => router.back()}> <ArrowLeftOutlined/> &nbsp;
              {state.update ? "Modifier Champ" : "Ajouter Nouveau Champ"}

              {/* <h2 className="text-lg font-bold"  style={{ cursor: "pointer" }} onClick={() => router.back()}><ArrowLeftOutlined/> &nbsp; Ajouter un Client </h2> */}
            </h6>
            <br />
            <form>
              <Row gutter={[6, 6]}>
                {col.map((col, i) => {
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
                            handleChange({
                              name: col.format,
                              value: parseInt(e),
                            })
                          }
                        />
                      </div>
                    );
                  } else if (col.isRich) {
                    return (
                      <Col lg={6} key={i}>
                        <h6 className="text-dark">{col.name}</h6>
                        <textarea
                          type={type ? type.type : "text"}
                          placeholder={col.format}
                          contentEditable="false"
                          name={col.format}
                          required={col.format === "acscd"}
                          value={state.body[col.format] || ""}
                          onChange={(e) => {
                            handleChange({
                              name: col.format,
                              value: e.target.value,
                            });
                          }}
                          className="form-control"
                        ></textarea>
                      </Col>
                    );
                  } else {
                    return (
                      <Col span={6} key={i}>
                        <h6 className="text-dark">{col.name}</h6>
                        <Input
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
                        />
                      </Col>
                    );
                  }
                })}
              </Row>
              <br />
              <div className="d-flex align-items-center">
                <Button
                  onClick={handleSubmit}
                  type="primary"
                  loading={state.isSubmiting}
                >
                  Add
                </Button>
              </div>
            </form>
          </div>
        )
      }

      <Table
        //  hideAdvancedSearch
        dataSource={data}
        columns={columns}
        loading={state.dataLoading}
      />

      <Modal
        title="Delete"
        visible={state.showDelModal}
        onOk={handleDelete}
        confirmLoading={state.isDeleting}
        onCancel={() => {dispatch({showDelModal: false, code: null})}}
      >
        <p>Deleted data can not be recovered. Are you sure you want to continue?</p>
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



export async function getServerSideProps(context) {
  let query = context.query;
  let response = await getNomenclature(query.tabcd);
  return {
    props: { data: response.data, col: response.col},
  };
}
