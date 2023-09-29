import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { ArrowLeftOutlined } from "@ant-design/icons";
import PostData from "../../../../model/PostData";
import Swal from "sweetalert2";
import { Col, Input, Row, Button, Modal } from "antd";
import { withSuccess } from "antd/lib/modal/confirm";

export default function EditNomen() {
  const router = useRouter();
  const query = router.query;
  const reducer = (prevState, action) => ({ ...prevState, ...action });
  const [state, dispatch] = React.useReducer(reducer, {
    col: { acscd: "Access Code" },
    dropdown: {},
    requireFields: [],
    textAreaFields: [],
  });

  function handleChange({ target }) {
    console.log("we are here");
    if (target.attributes["isHeader"] !== undefined) {
      dispatch({ [target.name]: target.value });
    } else {
      dispatch({ col: { ...state.col, [target.name]: target.value } });
    }
  }

  
  React.useEffect(() => {
    if (!query.tabcd) return;
      PostData({ method: "get", url: `/api/getAllNomen`, body: {} }, (res) => {
        if (res !== "Error") {
          const data = res.data.find((e) => e.tabcd === query.tabcd);
          const cols = JSON.parse(data.colstt) || [];
          // let dropdown = {};
          // for (let i of cols) {
          //   if (i.dropdown) {
          //     dropdown = { ...dropdown, [i.format]: { ...i.dropdown } };
          //   }
          // }
          var colset = {};
          for (let j in cols) {
            colset = { ...colset, [cols[j].format]: cols[j].name };
          }
          dispatch({
            col: colset,
            tabcd: data.tabcd,
            tbnam: data.tbnam,
            cetab: data.cetab,
            isLoading: false,
          });
        }
      });
  }, [query.tabcd]);


  function submitForm() {

    var col = [];
    for (let i in state.col) {
      let obj = {
        required: state.requireFields.includes(i),
        isRich: state.textAreaFields.includes(i),
      };
      if (state.dropdown[i]) {
        obj = {
          ...obj,
          format: i,
          name: state.col[i],
          dropdown: { ...state.dropdown[i] },
        };
      } else {
        obj = { ...obj, format: i, name: state.col[i] };
      }
      col.push(obj);
    }
    
    var body = {
      tabcd: state.tabcd,
      tbnam: state.tbnam,
      cetab: "001",
      user: "12",
      colstt: JSON.stringify(col),
    };

    dispatch({saving: true})
    PostData(
      {
        method: "post",
        url: "api/updateNomen",
        body,
      },
      (res) => {
        dispatch({saving: false})
        if (res !== "Error") {
          switch (res.status) {
            case "01":
              dispatch({
                col: { acscd: "Access Code" },
                dropdown: {},
                tabcd: "",
                tbnam: "",
              });
              // alert("case 01")
              Modal.success({title:"Success", content: <p>{res.message}</p>  });
             
              // .then((e) => {
              //   dispatch({ isLoading: false });
              // });
              // Alert.success("Table was succesfully created.");
              break;
            case "02":
              Modal.info({title:"Info", content: <p>{res.message}</p>  });
             

              // Alert.info("Table unique code already exist");
              break;
            case "03":
              alert("case 03")
                // Swal.fire({
                //   title: "Info",
                //   icon: "info",
                //   text: message.TABLE_NAME_EXIST,
                // })
                .then((e) => {
                  dispatch({ isLoading: false });
                });
              // Alert.info("Table name already exist. Please try another name.");
              break;
            default:
              alert("case default")
                // Swal.fire({
                //   title: "Error",
                //   icon: "error",
                //   text: message.ERROR_INPUT,
                // })
                .then((e) => {
                  dispatch({ isLoading: false });
                });
          }
        } else {
          //alert("An error occured")

          Swal.fire({
            title: "Error",
            icon: "error",
            text: "An Error occured please check your internet connection",
          });
          dispatch({ isLoading: false });
        }
      }
    );
  }

  var lib = [];
  var taux = [];
  var mnt = [];
  var mdp = [];
  var dat = [];
  for (let i = 1; i <= 10; i++) {
    lib.push(i);
    if (i < 6) {
      taux.push(i);
      mnt.push(i);
      mdp.push(i);
      dat.push(i);
    }
  }


  return (
    <div>
      {/* <PageLayout title="Gestions utilisateurs" Icon={FiUsers}> */}
      <h2
        className="text-lg font-bold"
        style={{ cursor: "pointer" }}
        onClick={() => router.back()}
      >
        <ArrowLeftOutlined /> &nbsp;Modifier un Nomenclature{" "}
      </h2>
      {/* <h2 className="text-lg font-bold my-2 mx-7">Ajouter un Nomenclature </h2> */}

      <form onSubmit={(e) => e.preventDefault()}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <label htmlFor="productname">Table Code</label>
            <Input
              id="productname"
              name="tabcd"
              value={state.tabcd}
              type="text"
              onChange={handleChange}
              isHeader="true"
              required
            />
          </Col>
          <Col span={8}>
            <label htmlFor="manufacturername">Table name</label>
            <Input
              id="manufacturername"
              name="tbnam"
              value={state.tbnam}
              type="text"
              onChange={handleChange}
              isHeader="true"
              required
            />
          </Col>

          <Col span={8}>
            <label htmlFor="manufacturername">Access code</label>
            <Input
              id="manufacturername"
              name="acscd"
              value={state.col.acscd}
              onChange={handleChange}
              type="text"
            />
          </Col>

          {lib.map((field, i) => (
            <Col span={6} key={i}>
              <label htmlFor="manufacturerbrand">Lib{field}</label>

              <div className="d-flex align-items-center justify-content-center">
                <Input
                  id="manufacturername"
                  name={`lib${field}`}
                  type="text"
                  onChange={handleChange}
                  className="form-control"
                  value={state.col[`lib${field}`] || ""}
                />
              </div>
            </Col>
          ))}

          {taux.map((field, i) => (
            <Col span={6} key={i}>
              <label htmlFor="manufacturerbrand">TAUX{field}</label>

              <div className="d-flex align-items-center justify-content-center">
                <Input
                  id="manufacturername"
                  name={`taux${field}`}
                  type="text"
                  onChange={handleChange}
                  className="form-control"
                  value={state.col[`taux${field}`] || ""}
                />
              </div>
            </Col>
          ))}
          {dat.map((field, i) => (
            <Col span={6} key={i}>
              <label htmlFor="manufacturerbrand">DAT{field}</label>

              <div className="d-flex align-items-center justify-content-center">
                <Input
                  id="manufacturername"
                  name={`dat${field}`}
                  type="text"
                  onChange={handleChange}
                  className="form-control"
                  value={state.col[`dat${field}`] || ""}
                />
              </div>
            </Col>
          ))}

          {mnt.map((field, i) => (
            <Col span={6} key={i}>
              <label htmlFor="manufacturerbrand">MNT{field}</label>

              <div className="d-flex align-items-center justify-content-center">
                <Input
                  id="manufacturername"
                  name={`mnt${field}`}
                  type="text"
                  onChange={handleChange}
                  className="form-control"
                  value={state.col[`mnt${field}`] || ""}
                />
              </div>
            </Col>
          ))}
          {mdp.map((field, i) => (
            <Col span={6} key={i}>
              <label htmlFor="manufacturerbrand">MDP{field}</label>

              <div className="d-flex align-items-center justify-content-center">
                <Input
                  id="manufacturername"
                  name={`mdp${field}`}
                  type="text"
                  onChange={handleChange}
                  className="form-control"
                  value={state.col[`mdp${field}`] || ""}
                />
              </div>
            </Col>
          ))}
        </Row>
        <div className="mt-4">
          <Button
            type="primary"
            onClick={submitForm}
            loading={state.saving}
          >
            {/* {params.id ? languageData.btn.btn_edit : languageData.btn.btn_save} */}
            Modifier
          </Button>
        </div>
      </form>
    </div>
    // </PageLayout>
  );
}

//export default AddNomen;
