import { useEffect, useReducer } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Button } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";
import Table from "@/components/Custom/Table";
import apiClient from "api";

export default function Index() {
  const reducer = (prevState, action) => ({ ...prevState, ...action });

  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    data: [],
  });

  function showDelModal() {
    setIsModalVisible(true);
  }

  const columns = [
    {
      title: "First Name",
      key: "firstname",
      dataIndex: "firstname",
      filter: true,
    },
    {
      title: "Last Name",
      key: "lastname",
      dataIndex: "lastname",
      filter: true,
    },
    {
      title: "Account Numer",
      key: "accountNumber",
      dataIndex: "accountNumber",
      filter: true,
    },
    { title: "Email", key: "email", dataIndex: "email", filter: true },
    { title: "Phone", key: "phone", dataIndex: "phone", filter: true },
    {
      title: "Profession",
      key: "proffession",
      dataIndex: "proffession",
      filter: true,
    },
    { title: "Creation Date", key: "creationDate", dataIndex: "creationDate" },
    {
      title: "Residencial Address",
      key: "residentialAddresse",
      dataIndex: "residentialAddresse",
      filter: true,
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

  console.log(state.data);

  return (
    <>
      <header className="flex space-x-4 mb-4 justify-between">
        <h2 className="text-lg font-bold">Utilisateurs </h2>
      </header>

      <Table
        columns={columns}
        loading={state.loading ?? false}
        optional={true}
        showIndex={true}
        dataSource={state.data ?? []}
        showFilter={{ filter: true }}
        actions={
          <Button href="/users/adduser" type="primary" size="large">
            Ajouter un utilisateur
          </Button>
        }
      />
    </>
  );
}
