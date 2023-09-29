//import { FiUsers } from "react-icons/fi";
import TableComponent from "@/components/Table";
//import { users } from "data/activity";
import { useEffect, useState } from "react";
import { Modal, Button, Table, Form } from "antd";
//import button from "@/components/button";
import PostData from "model/PostData";
import { FaPlus, FaTrash } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "@/components/Search";
import RTable from "@/components/RTable";

export default function Clients_rejected() {
  const [state, dispatch] = useState([]);
  const [loading, setLoading] = useState(true);
  // const userId = localStorage.getItem("uname");

  const [usersData, setUsersData] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  //   const showCommentModal = () => {
  //     setIsCmtModalVisible(true);
  //   };

  const handleOk = () => {
    setIsModalVisible(false);
    //setIsCmtModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    // showCommentModal(true);
  };

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
    { Header: "NUI", accessor: "ncc" },
    //   { title: "Num de Compte", dataIndex: "compte", disableFilters: true },
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

  function handleSearch() {}

  function reactivateClient(tel) {
    const body = {
      // internal_id:trans,
      etab: "001",
      user: localStorage.getItem("uname"),
      val: "1",
      activ: [{ tel: tel }],
    };
    PostData(
      { method: "post", url: "/opiback/approveRejOpiCli", body },
      (res) => {
        if (res !== "Error") {
          if (res.status === "2") {
            Modal.warning({ title: "warning", content: <p>{res.message}</p> });
            //  dispatch({ isSearching:false});
            return;
          } else if (res.status === "01") {
            Modal.success({ title: "Success", content: <p>{res.message}</p> });

            // dispatch({ isSearching:false});
            return;
          } else if (res.status == "100") {
            Modal.info({ title: "Success", content: <p>{res.message}</p> });
            //  dispatch({ isSearching:false});
            return;
          }
        }
      }
    );
  }

  function addClientUser() {
    PostData(
      { method: "post", url: "/opiback/getListClientValOpi", body },
      (res) => {
        if (res !== "Error") {
          var data = res.data.map((user, i) => ({
            index: i + 1,
            ...user,
          }));
          setUsersData(data);
        }
      }
    );
  }

  useEffect(() => {
    const userId = localStorage.getItem("uname");

    const body = {
      etab: "001",
      uname: userId,
    };

    PostData(
      { method: "post", url: "/opiback/getListClientRejOpi", body },
      (res) => {
        if (res !== "Error") {
          setLoading(false);
          const data = res.data.map((elm, i) => ({
            index: i + 1,
            ...elm,
            action: (
              <div className="flex space-x-4 w-full justify-center">
                <Button
                  onClick={() => {
                    reactivateClient(elm.tel);
                  }}
                >
                  <FaPlus className="text-red-500" title="Relancer" />
                </Button>
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
        <h2 className="text-lg font-bold">Clients Rejetés</h2>
        {/* 
           <Button href="/clients/addClient" type="primary" size="large">
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
          <Button key="submit" type="primary" size="large">
            Sauvegarder
          </Button>,
        ]}
      >
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label>Nom d’utilisateur </label>
            <input type="text" class="border p-2 border-gray-700" />
          </div>
          <div>
            <label>Email de l’utilisateur </label>
            <input type="email" class="border p-2 border-gray-700" />
          </div>
          <div>
            <label>Téléphone portable </label>
            <input type="text" class="border p-2 border-gray-700" />
          </div>
          <div>
            <label>Mot de Passe </label>
            <input type="password" class="border p-2 border-gray-700" />
          </div>
        </div>

        {/* <div class="border p-2 border-gray-700"><h6 class="font-semibold text-sm">Test Letter</h6><p class="text-xs">This is a test lettre coming from the best CO </p></div>
        <div class="border p-2 border-gray-700"><h6 class="font-semibold text-sm">Test Letter</h6><p class="text-xs">This is a test lettre coming from the best CO </p></div> */}

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
