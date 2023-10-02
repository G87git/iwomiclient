import { NumericFormat } from "react-number-format";
import apiClient from "api";
import React, { useEffect, useReducer, useState } from "react";
import IconButton from "@/components/IconButton";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import Table from "../../../components/Custom/Table/index";

export default function TransferHistory() {
  const reducer = (prevState, newState) => ({ ...prevState, ...newState });
  const [state, dispatch] = useReducer(reducer, { data: [] });

  const getStatus = (status) => {
    switch (status) {
      case "01":
        return { name: "Pending", color: "rgba(245, 158, 11, 1)" };
      case "02":
        return { name: "Validated", color: "rgba(16, 185, 129, 1)" };
      case "03":
        return { name: "Rejected", color: "rgba(239, 68, 68, 1)" };
      default:
        return { name: "Pending", color: "yellow" };
    }
  };

  async function fetchData() {
    dispatch({ loading: true });
    let response = await apiClient({
      method: "get",
      url: "/payment/listtrans",
    });
    dispatch({ data: response.data.data || [], loading: false });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "id",
      key: "id",
      filter: true,
      defaultSortOrder: "descend",
    },
    {
      title: "Sender Wallet",
      dataIndex: "sourceAccountId",
      key: "sourceAccountId",
      filter: true,
      defaultSortOrder: "descend",
    },
    {
      title: "Reciever Wallet",
      dataIndex: "targetAccountId",
      key: "targetAccountId",
      filter: true,
      defaultSortOrder: "descend",
    },
    {
      title: "Transaction Type",
      dataIndex: "transTyp",
      key: "transTyp",
      defaultSortOrder: "descend",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      defaultSortOrder: "descend",
    },
    {
      title: "Initiation Date",
      dataIndex: "dou",
      key: "dou",
    },
    {
      title: "Completion Date",
      dataIndex: "dmo",
      key: "dmo",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      Cell: ({ value }) => {
        console.log(value);
        return (
          <NumericFormat
            value={value?.data.amount}
            displayType="text"
            thousandSeparator=" "
            suffix="XAF"
          />
        );
      },
    },
    {
      title: "Action",
      dataIndex: "tabcd",
      sorter: (a, b) => a.tabcd - b.tabcd,
      key: "action",
      Cell: ({ row: { original = {} } }) => {
        let { idexten, id } = original;
        console.log(idexten);
        return (
          <div className="flex space-x-4 w-full">
            <Link
              href={`/transfers/history/${id}${
                idexten ? "?idexten=" + idexten : ""
              }`}
            >
              <IconButton
                icon={<FaSearch className="text-primary" title="Approve" />}
              />
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <header className="flex space-x-4 mb-4 justify-between">
        <h2 className="text-lg font-bold font">Transfer History </h2>
      </header>
      <div className={"table-custom"} style={{ overflowX: "auto" }}>
        <Table
          columns={columns}
          dataSource={state.data}
          loading={state.loading}
          showIndex={true}
          showFilter={{ filter: true }}
          className={""}
        />
      </div>
    </div>
  );
}
