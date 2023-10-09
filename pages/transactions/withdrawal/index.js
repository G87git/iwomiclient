import { useEffect, useReducer, useState } from "react";
import { Button } from "antd";
import Table from "@/components/Custom/Table";
import LoaderContainer from "@/components/loader-container";

export default function Index() {
  const reducer = (prevState, action) => ({ ...prevState, ...action });
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    uploading: false,
    data: [],
  });

  function validateWithdrawal(data) {}

  const columns = [
    {
      title: "Full Name",
      key: "firstname",
      dataIndex: "firstname",
      filter: true,
    },
    {
      title: "Transaction ID",
      key: "lastname",
      dataIndex: "lastname",
      filter: true,
    },
    {
      title: "Account Number",
      key: "accountNumber",
      dataIndex: "accountNumber",
      filter: true,
    },
    { title: "Email", key: "email", dataIndex: "email", filter: true },
    { title: "Phone", key: "phone", dataIndex: "phone", filter: true },
    {
      title: "Creation Date",
      key: "creationDate",
      dataIndex: "creationDate",
      filter: false,
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
            size="large"
            onClick={() => validateWithdrawal(data)}
          >
            Validate Withdrawal
          </Button>
        );
      },
    },
  ];

  function handleChange(e) {
    e.preventDefault();
  }

  useEffect(() => {}, []);

  return (
    <>
      <header className="flex space-x-4 mb-4 justify-between">
        <h2 className="text-lg font-bold">Initiated Withdrawals</h2>
      </header>

      <Table
        columns={columns}
        loading={state.loading ?? false}
        optional={false}
        showIndex={true}
        dataSource={state.data ?? []}
        showFilter={{ filter: false }}
      />
      {state.uploading && <LoaderContainer />}
    </>
  );
}
