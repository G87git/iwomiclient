import { useEffect, useReducer, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Button, Input, Modal } from "antd";
import { FaCheckCircle, FaEdit, FaTrash } from "react-icons/fa";
import Table from "@/components/Custom/Table";
import apiClient from "api";
import LoaderContainer from "@/components/loader-container";
import Swal from "sweetalert2";

export default function Index() {
  const reducer = (prevState, action) => ({ ...prevState, ...action });
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    uploading: false,
    topUpObj: {
      tellerId: "camROGVOIRYMMD4N2BL8KADVNLHU",
    },
    data: [],
  });

  const [open, setOpen] = useState(false);

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
    {
      title: "Creation Date",
      key: "creationDate",
      dataIndex: "creationDate",
      filter: false,
    },
    {
      title: "Residencial Address",
      key: "residentialAddresse",
      dataIndex: "residentialAddresse",
      filter: true,
    },
    {
      title: "Agence de Souscription",
      key: "agesou",
      dataIndex: "agesou",
      filter: true,
    },
    {
      title: "Action",
      key: "id",
      dataIndex: "id",
      filter: false,
      render: (_, data) => {
        return (
          <Button
            type="primary"
            onClick={() => {
              dispatch({
                topUpObj: {
                  ...state.topUpObj,
                  targetAccountNo: data.accountNumber,
                },
              });
              setOpen(true);
            }}
          >
            TopUp Account
          </Button>
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

    dispatch({ loading: false, data: response.data.data ?? [] });
  }

  function handleChange(e) {
    e.preventDefault();

    dispatch({
      topUpObj: { ...state.topUpObj, [e.target.name]: e.target.value },
    });
  }

  console.log(state.topUpObj);

  async function topUpAccount() {
    dispatch({ uploading: true });

    let response = await apiClient({
      method: "POST",
      url: "/payment/deposit",
      body: state.topUpObj,
    });

    dispatch({ uploading: false });

    if (response.data.status === "02") {
      Swal.fire({
        title: `Deposited Successfully`,
        text: `Successfully Deposited ${state.topUpObj.amount} XAF into the account ${state.topUpObj.targetAccountNo}`,
        icon: "success",
        confirmButtonColor: "green",
      });
    } else {
      Swal.fire({
        title: "Failed",
        text: "Please try again.",
        icon: "warning",
        confirmButtonColor: "gray",
      });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <header className="flex space-x-4 mb-4 justify-between">
        <h2 className="text-lg font-bold">Deposit</h2>
      </header>

      <Table
        columns={columns}
        loading={state.loading ?? false}
        optional={false}
        showIndex={true}
        dataSource={state.data ?? []}
        showFilter={{ filter: false }}
      />
      <Modal
        title="Deposit into Account"
        centered
        visible={open}
        onOk={() => {
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
        width={800}
        footer={[
          <Button
            key="back"
            size="large"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>,
          <Button
            onClick={() => {
              setOpen(false);
              topUpAccount();
            }}
            size="large"
            type="primary"
          >
            Deposit into Account
          </Button>,
        ]}
      >
        <div className="grid grid-cols-2 gap-x-4 gap-y-10">
          <div>
            <p>Account Number</p>
            <Input
              size="large"
              readOnly
              name="targetAccountNo"
              value={state.topUpObj.targetAccountNo ?? ""}
              placeholder="Account Number"
              onChange={handleChange}
            />
          </div>
          <div>
            <p>Amount</p>
            <Input
              name="amount"
              type="number"
              size="large"
              value={state.topUpObj.amount ?? 0}
              placeholder="Amount"
              onChange={handleChange}
            />
          </div>
          <div>
            <p>Account Name</p>
            <Input
              size="large"
              name="accountName"
              value={state.topUpObj.accountName ?? ""}
              placeholder="Account Name"
              onChange={handleChange}
            />
          </div>
          <div>
            <p>Depositor Full Names</p>
            <Input
              size="large"
              value={state.topUpObj.depositorName ?? ""}
              name="depositorName"
              placeholder="Depositor Full Names"
              onChange={handleChange}
            />
          </div>
          <div>
            <p>Depositor ID Number</p>
            <Input
              size="large"
              value={state.topUpObj.depositorIdNumber ?? ""}
              name="depositorIdNumber"
              placeholder="Depositor ID number"
              onChange={handleChange}
            />
          </div>
          <div>
            <p>Teller ID</p>
            <Input
              size="large"
              name="tellerId"
              readOnly
              value={state.topUpObj.tellerId ?? ""}
              placeholder="Teller ID"
              onChange={handleChange}
            />
          </div>
        </div>
      </Modal>
      {state.uploading && <LoaderContainer />}
    </>
  );
}
