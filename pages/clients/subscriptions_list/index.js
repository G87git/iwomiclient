import { useEffect, useReducer, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Modal, Button } from "antd";
import PostData from "model/PostData";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { getAllUsers, getProfiles } from "utils/users";
import { getSelectData, matchKeys, mergeData } from "utils";
import Table from "@/components/Custom/Table";
import apiClient from "api";

export default function Index({ usersData = [], profiles }) {
  const [code, setCode] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const reducer = (prevState, action) => ({ ...prevState, ...action });

  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    data: [],
  });

  function showDelModal() {
    setIsModalVisible(true);
  }

  const columns = [
    { title: "First Name", key: "firstname", dataIndex: "firstname" },
    { title: "Last Name", key: "lastname", dataIndex: "lastname" },
    {
      title: "Account Numer",
      key: "accountNumber",
      dataIndex: "accountNumber",
    },
    { title: "Email", key: "email", dataIndex: "email" },
    { title: "Phone", key: "phone", dataIndex: "phone" },
    {
      title: "Profession",
      key: "proffession",
      dataIndex: "proffession",
    },
    { title: "Creation Date", key: "creationDate", dataIndex: "creationDate" },
    {
      title: "Residencial Address",
      key: "residentialAddresse",
      dataIndex: "residentialAddresse",
    },
    {
      title: "Status",
      key: "action",
      dataIndex: "action",
      Cell: ({ row: { original } }) => {
        return (
          <div className="flex space-x-4 w-full">
            <Button href={`/users/consult/${original.uname}`}>
              {" "}
              <AiOutlineEye
                className="text-red-600 inline"
                title="Consulter"
              />{" "}
            </Button>
            <Button href={`/users/edit/${original.uname}`}>
              {" "}
              <FaEdit className="text-green-600 inline" title="Editer" />{" "}
            </Button>
            <Button
              onClick={() => {
                showDelM(original.uname);
              }}
            >
              {" "}
              <FaTrash className="text-red-500 inline" title="Supprimer" />{" "}
            </Button>
          </div>
        );
      },
    },
  ];

  function showDelM(code) {
    setCode({ uname: code });
    showDelModal();
  }

  async function fetchData() {
    dispatch({ loading: true });

    let response = await apiClient({
      method: "get",
      url: "/auth/allUsers",
    });

    dispatch({ data: response.data.data || [], loading: false });
  }

  useEffect(() => {
    fetchData();
  }, []);

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
          }).then((e) => {});
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
      </header>

      <Table
        columns={columns}
        loading={state.loading ?? false}
        optional={true}
        datasourece={state.data ?? []}
        showFilter={{ filter: true }}
        actions={
          <Button href="/users/adduser" type="primary" size="large">
            Ajouter un utilisateur
          </Button>
        }
      />

      <Modal
        title="Supprimer un Utilisateur"
        visible={isModalVisible}
        onOk={hideDelM}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        footer={[
          <Button
            key="submit"
            type="primary"
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

export async function getServerSideProps(_) {
  let users = await getAllUsers();
  let profiles = await getProfiles();
  let usersData = mergeData(users.data, profiles.data, "prfle", "acscd");
  let profileSelect = getSelectData(profiles.data, "name", "acscd");
  return {
    props: { usersData, profileSelect },
  };
}
