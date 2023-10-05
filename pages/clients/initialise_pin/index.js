import React, { useEffect, useState } from "react";
import { useReducer } from "react";
import Table from "../../../components/Custom/Table/index";
import { Button, Result, Modal } from "antd";
import apiClient from "api";
import { BiEdit } from "react-icons/bi";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import Swal from "sweetalert2";
import { MdOutlineResetTv } from "react-icons/md";
const { confirm } = Modal;

export default function Index() {
  const reducer = (prevState, action) => ({ ...prevState, ...action });
  const [state, dispatch] = useReducer(reducer, {});

  const showPropsConfirm = (value) => {
    Swal.fire({
      title: "Initialise Pin?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#52c41a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes! Initialise",
    }).then((result) => {
      if (result.isConfirmed) {
        initialisePin(value.accountNumber);
      }
    });
  };

  async function initialisePin(id) {
    dispatch({ uploading: true });

    let response = await apiClient({
      method: "POST",
      url: "/payment/initpin",
      body: {
        AccountNum: id,
      },
    });

    dispatch({ uploading: false });

    if (response.data.status === "01") {
      Swal.fire({
        title: "Account initialised Successfully",
        text: "Account initialised Successfully to server.",
        denyButtonText: "Retry",
        icon: "success",
        confirmButtonColor: "gray",
      }).then(() => {
        window.location.reload();
      });
      return;
    } else {
      Swal.fire({
        title: "Failed",
        text: "Please upload user documents first",
        icon: "warning",
        confirmButtonColor: "gray",
      });
    }
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
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, value) => {
        if (value.statut === 1) {
          return (
            <Button
              type="outlined"
              onClick={() => showPropsConfirm(value)}
              className="!rounded"
            >
              <MdOutlineResetTv />
            </Button>
          );
        } else {
          return <p style={{color: "orange"}}>Activate Account</p>;
        }
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

  console.log("data", state.data);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <header className="flex space-x-4 mb-4 justify-between">
        <h2 className="text-lg font-bold font">Initialise Pin </h2>
      </header>
      <div className={"table-custom"} style={{ overflowX: "auto" }}>
        <Table
          columns={columns}
          dataSource={state.data}
          loading={state.loading}
          showIndex={true}
          showFilter={true}
          optional={true}
          actions={
            <Button href="/users/adduser" type="primary" size="large">
              Ajouter un utilisateur
            </Button>
          }
        />
      </div>
    </>
  );
}
