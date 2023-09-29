import { Table, Row, Col, Form, Input } from "antd";
//import { users } from "data/activity";
import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Modal, Button } from "antd";
import PostData from "model/PostData";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import ButtonComponent from "@/components/buttonComponent";
//import Button from "@/components/button";
import Swal from "sweetalert2";
import Search from "@/components/Search";

export default function Listusers() {
  const [usersData, setUsersData] = useState([]);
  const [state, dispatch] = useState([]);
  const [code, setCode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  function showDelModal() {
    setIsModalVisible(true);
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
    { title: "#", dataIndex: "index", disableFilters: true },
    { title: "Nom", dataIndex: "fname" },
    { title: "Prenom", dataIndex: "lname", disableFilters: true },
    { title: "Matricule", dataIndex: "matcl" },
    { title: "Email", dataIndex: "email" },

    { 
      title: "Profile", dataIndex: "prfle", key:"prfle", disableFilters: true,
       render:(prfle) => state.profiles ? state.profiles[prfle] : prfle 

      //state.profiles ? state.profiles[prfle] : prfle || prfle,
   },

    { title: "Date", dataIndex: "crtd", disableFilters: true },
    { title: "Action", dataIndex: "action", disableFilters: true },
  ];

  const searchFields = columns
    .filter((column) => !column.disableFilters)
    .map((col) => {
      return {
        label: col.title,
        name: col.dataIndex,
      };
    });



  useEffect(() => {
    PostData(
      {
        method: "post",
        url: "/getAllUsers",
        body: { cetab: localStorage.getItem("cetab") },
      },
      (res) => {
        if (res !== "Error") {
          var data = res.data.map((elm, i) => ({
            index: i + 1,
            ...elm,
            
            action: (
              <div className="flex space-x-4 w-full">
                <Button href={`/users/consult/${elm.uname}`}>
                  {" "}
                  <AiOutlineEye
                    className="text-red-600 inline"
                    title="Consulter"
                    />{" "}
                </Button>
                <Button href={`/users/edit/${elm.uname}`}>
                  {" "}
                  <FaEdit className="text-green-600 inline" title="Editer" />{" "}
                </Button>
                <Button
                  onClick={() => {
                    showDelM(elm.uname);
                  }}
                >
                  {" "}
                  <FaTrash className="text-red-500 inline" title="Supprimer" />{" "}
                </Button>
              </div>
            ),
          }));
          
          if (!state.profiles) {
            PostData({ method: "get", url: "/getProfiles", body: {} }, (res) => {
              setLoading(false);
              if (res !== "Error") {
                let profiles = {};
                let profileSelect = [];
                for (let profile of res.data) {
                  profiles = { ...profiles, [profile.acscd]: profile.name };
                  profileSelect.push({ label: profile.name, value: profile.acscd });
                }
                dispatch({ profiles, profileSelect, data});
              }
            });
          }

        }
      }
    );
  }, []);


  function handleSearch () {

  }
  
  function showDelM(code) {
    setCode({uname:code});
    showDelModal();
  }
  function hideDelM() {
    console.log(code.uname);
    const body = { cetab: "001", uname: code.uname };
    PostData({ method: "post", url: "/deleUserByUname", body }, (res) => {
      if (res !== "Error") {
        if (res.status === "01") {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: res.message,
          }).then((e) => {
            // dispatch({ refresh: parseInt(state.refresh) + 1 });
         //   refreshPage();
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error Occured",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Network Error",
        });
      }
    });
  }

  return (
    <>
      <header className="flex space-x-4 mb-4 justify-between">
        <h2 className="text-lg font-bold">Utilisateurs </h2>

        <Button href="/users/adduser" type="primary" size="large">
          Ajouter un utilisateur
        </Button>
      </header>

      <Search  fields={searchFields} onSearch={handleSearch} />
      <Table
        columns={columns}
        dataSource={state.data}
        loading={loading}
        //  dataSource={usersData}
        hideCheckbox
      />

      <Modal
        title="Supprimer un Utilisateur"
        visible={isModalVisible}
        onOk={hideDelM}
        onCancel={() => {    setIsModalVisible(false);}}
        footer={[

          <Button key="submit" type="primary" 
        //  onClick={hideDelM}
        onClick={() => {
          setIsModalVisible(false);
          hideDelM();
        }}
          
          >
          Oui
        </Button>,
          <Button
            key="back"
            type="secondary"
            onClick={() => {
              setIsModalVisible(false);
            }}
          >
            Non
          </Button>,
        
        ]}
      >
        <h3>Souhaitez-vous Supprimer cet Utilisateur ?</h3>
      </Modal>
    </>
  );
}
