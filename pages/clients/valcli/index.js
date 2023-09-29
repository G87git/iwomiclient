//import { FiUsers } from "react-icons/fi";
import TableComponent from "@/components/Table";
//import { users } from "data/activity";
import { useEffect, useState, useReducer } from "react";
import { Modal, Button, Table, Input, Select, Form } from "antd";
//import button from "@/components/button";
import PostData from "model/PostData";
import { FaPlus, FaTrash } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "@/components/Search";
import Swal from "sweetalert2";
import RTable from "@/components/RTable";

export default function Clients() {
  const reducer = (prevState, action) => ({ ...prevState, ...action });
  const [state, dispatch] = useReducer(reducer, { body: {} });

  //const [state, dispatch] = useState([]);

  const [loading, setLoading] = useState(true);

  const [usersData, setUsersData] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  function showModal() {
    setIsModalVisible(true);
  }

  //   const showCommentModal = () => {
  //     setIsCmtModalVisible(true);
  //   };

  const handleOk = () => {
    setIsModalVisible(false);
    //setIsCmtModalVisible(false);
  };

  function handleCancel() {
    setIsModalVisible(false);
    // showCommentModal(true);
  }

  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();

  const getFields = () => {
    const count = expand ? 10 : 6;
    const children = [];

    for (let i = 0; i < count; i++) {
      children.push(
        <Col span={8} key={i}>
          <Form.Item
            name={`field-${i}`}
            label={`Field ${i}`}
            rules={[
              {
                required: true,
                message: "Input something!",
              },
            ]}
          >
            <Input placeholder="placeholder" />
          </Form.Item>
        </Col>
      );
    }

    return children;
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const columns = [
    { Header: "#", accessor: "index", disableFilters: true },
    { Header: "Nom/Raison Sociale", accessor: "nom" },
    { Header: "Type", accessor: "tprod", disableFilters: true },
    { Header: "Email", accessor: "ema", disableFilters: true },
    { Header: "Téléphone", accessor: "tel" },
    // { Header: "NUI", accessor: "ncc" },
    {
      Header: "statut",
      accessor: "eta",
      disableFilters: true,
      Cell: ({ value, row: { values } }) => (
        <Button
          className={`btn py-1 font-size-14 font-normal ${
            value === "0" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => {
            updateStatus({ ...values, value });
          }}
          // disabled={!actionInclude("anormalie_change_status")}
          type={value !== "0" && "primary"}
        >
          {value === "0" ? "Activer" : "Désactiver"}
        </Button>
      ),
    },

    { Header: "Date", accessor: "dou", disableFilters: true },

    { Header: "Action", accessor: "action", disableFilters: true },
  ];

  const searchFields = columns
    .filter((column) => !column.disableFilters)
    .map((col) => {
      return {
        label: col.Header,
        name: col.accessor,
      };
    });

  function refreshPage() {
    window.location.reload(false);
  }

  function handleSearch() {}

  function updateStatus({ tel, value }) {
    console.log("this is what is in value", tel);

    PostData(
      {
        method: "post",
        url: "/opiback/desactivateClientsOpi",
        body: {
          val: value === "0" ? "1" : "0",
          //  val:value,
          etab: "001",
          user: state.user,
          activ: [{ tel: tel }],
        },
        action: "anormalie_change_status",
        //replace
      },
      (res) => {
        if (res.status === "01") {
          //    dispatch({ refresh: !state.refresh, isActivating: false });
          refreshPage();
        } else if (res.status === "2") {
          //    dispatch({ refresh: !state.refresh, isActivating: false });
          Modal.warning({
            title: "Warning",
            content: <p>{res.message}</p>,
            // cancelButtonText: "Fermer",
          });
        } else {
          Modal.error({
            title: "Une erreur s'est produite",
            content: (
              <p>
                Une erreur s'est produite lors de l'activation/desactivation du
                Client
              </p>
            ),
            // cancelButtonText: "Fermer",
          });
        }
      }
    );
  }

  function handleChange({ target }) {
    dispatch({ body: { ...state.body, [target.name]: target.value } });
  }

  function addClientUser() {
    const body = {
      npid: state.npid,
      cli: state.cli,
      uti: state.user,
      ...state.body,
    };

    PostData(
      { method: "post", url: "/opiback/clientsSaveUser", body },
      (res) => {
        if (res !== "Error") {
          if (res.status === "2") {
            Swal.fire({ text: res.message, icon: "warning" });
            //  dispatch({ isSearching:false});
            return;
          } else if (res.status === "01") {
            Modal.success({ title: "Success", content: <p>{res.message}</p> });
            // dispatch({ isSearching:false});
            return;
          } else if (res.status == "100") {
            Modal.info({ content: <p>Operation is already Successful!</p> });
            //  dispatch({ isSearching:false});
            return;
          } else {
            Modal.error({
              title: "Error",
              content: <p>Unknown Error occred!</p>,
            });
            //  dispatch({ isSearching:false});
            return;
          }
        }
      }
    );
  }

  function handleSelectChange(value) {
    console.log(`selected ${value}`);
  }

  function getUserActions() {
    PostData(
      { method: "get", url: `/api/getNomenDataByTabcd/9200`, body: {} },
      (res) => {
        if (res !== "Error") {
          const children = res.data.map((ele) => ele.lib1);
          dispatch({ children });
        }
      }
    );
  }

  useEffect(() => {
    const userId = localStorage.getItem("uname");
    dispatch({ user: userId });

    const body = {
      etab: "001",
      uname: userId,
    };

    PostData(
      { method: "post", url: "/opiback/getListClientValOpi", body },
      (res) => {
        if (res !== "Error") {
          setLoading(false);
          const data = res.data.map((elm, i) => ({
            index: i + 1,
            ...elm,
            action: (
              <div className="flex space-x-4 w-full justify-center">
                {(elm.tprod === "MORALE" || elm.tprod === "morale") && (
                  <Button href={`/clients/valcli/consultuser/${elm.tel}`}>
                    <AiOutlineEye
                      className="text-red-600 inline"
                      title="Consulter les Utilisateurs"
                    />
                  </Button>
                )}

                {(elm.tprod === "MORALE" || elm.tprod === "morale") && (
                  <Button
                    onClick={() => {
                      showModal();
                      getUserActions();
                      dispatch({ cli: elm.cli, npid: elm.npid });
                    }}
                  >
                    <FaPlus
                      className="text-green-600 inline"
                      title="Ajouter un Utilisateur"
                    />
                  </Button>
                )}

                {/* <Button>
               
               <FaTrash className="text-red-500 inline"  title="Supprimer" />
             </Button> */}
              </div>
            ),
          }));
          dispatch({ data });
          console.log(state.data);
        }
      }
    );

    //     setUsersData(allUsers);
  }, []);

  return (
    <>
      {/* <Helmet>
            <meta charSet="utf-8" />
            <title>IWP | Ptrs in val</title>
          </Helmet> */}

      {/* <div className="container-fluid "> */}
      {/* <PageHeader title="Partners in Validation" breadcrumb={[]} /> */}
      {/* Table Position */}
      <header className="flex space-x-4 mb-4 justify-between">
        <h2 className="text-lg font-bold">Clients </h2>

        {/* <Button href="/clients/valcli/addClient" type="primary" size="large">
           Ajouter un Client
           </Button> */}
      </header>
      <Search fields={searchFields} onSearch={handleSearch} />
      <RTable
        columns={columns}
        data={state.data || []}
        loading={loading}
        hideCheckbox
      />

      <Modal
        title="Ajouter un Utilisateur"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            size="large"
            onClick={() => {
              addClientUser();
              handleCancel();
            }}
          >
            Sauvegarder
          </Button>,
        ]}
      >
        <div>
          <Form layout="vertical" form={form}>
            <Form.Item name="title">
              <Input
                placeholder="Nom de L'utilisateur"
                value={state.body.nom}
                name="nom"
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item name="emailuser">
              <Input
                placeholder="Email de l’utilisateur"
                value={state.body.email}
                name="email"
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item name="teluser">
              <Input
                placeholder="Téléphone"
                value={state.body.tel}
                name="tel"
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item name="profile">
              {/* <Input
                 placeholder="Profil"
                  value={state.body.profile}
                  name="profile"
                  onChange={handleChange}
               
                  /> */}
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%", marginTop: "5px" }}
                placeholder="Please select Actions"
                value={state.body.chl3}
                // onChange={handleChange}
                name="chl3"
                onChange={handleSelectChange}
              >
                {state.children?.map((ele) => (
                  <Option key={ele}>{ele}</Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </div>

        {/*     
    <div className="flex flex-col flex-1">
        <label>Email de l’utilisateur</label>
    <input 
    style={{ width: 230 }}
    type="email"
    
    />
    </div>
    <div className="flex flex-col flex-1">
        <label>Téléphone portable</label>
    <input 
    style={{ width: 230 }}
    type="email"
    
    />
    </div>
    <div className="flex flex-col flex-1">
        <label>Mot de Passe</label>
    <input 
    style={{ width: 230 }}
    type="email"
    
    />
    </div>
    <div className="flex flex-col flex-1">
        <label>Confirmer Mot de Passe</label>
    <input 
    style={{ width: 230 }}
    type="email"
    
    />
    </div> */}
      </Modal>
      {/* </div> */}
    </>
  );

  //  return (
  //     <PageLayout title="Gestions utilisateurs"

  //     >

  //       <header className="flex space-x-4 mb-4 justify-between">
  //         <h2 className="text-lg font-bold">Utilisateurs </h2>

  //         <Button href="/users/add">
  //           <FaPlus className="mr-2" />
  //           <span>Ajouter un utilisateur</span>
  //         </Button>
  //       </header>
  //       <TableComponent data={usersData} columns={columns} hideCheckbox />
  //     </PageLayout>
  //   );
}
