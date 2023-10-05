import React, { useEffect } from "react";
import { useReducer } from "react";
import Table from "../../../components/Custom/Table/index";
import { Button, Modal } from "antd";
import apiClient from "api";
import Swal from "sweetalert2";
import { MdOutlineResetTv } from "react-icons/md";
import LoaderContainer from "@/components/loader-container";

export default function Index() {
  const reducer = (prevState, action) => ({ ...prevState, ...action });
  const [state, dispatch] = useReducer(reducer, {});

  const showPropsConfirm = (data) => {
    Swal.fire({
      title: "Initialise Password?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#52c41a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes! Initialise",
    }).then((result) => {
      if (result.isConfirmed) {
        initPwd(data);
        return;
      }
    });
  };

  async function initPwd(data) {
    dispatch({ initialising: true });

    let response = await apiClient({
      method: "POST",
      url: "/payment/initpassword",
      body: {
        AccountNum: data.accountNumber,
      },
    });

    dispatch({ initialising: false });

    if (response.data.status === "01") {
      Swal.fire({
        title: "Pin initialised Successfully",
        text: "Pin initialised Successfully to server.",
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
      render: (_, data) => {
        return data.statut === 1 ? (
          <Button
            type="outlined"
            onClick={() => showPropsConfirm(data)}
            className="!rounded"
          >
            <MdOutlineResetTv />
          </Button>
        ) : (
          <div style={{ color: "orange" }}>User not active</div>
        );
      },
    },
  ];

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

  return (
    <>
      <header className="flex space-x-4 mb-4 justify-between">
        <h2 className="text-lg font-bold font">Initialise Password </h2>
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
      {state.initialising && <LoaderContainer />}
    </>
  );
}
