import PageWrapper from "@/components/PageWrapper";
import RTable from "@/components/RTable";
import Input from "@/components/Input";
import { NumericFormat } from "react-number-format";
import { Form, Spin } from "antd";
import { Modal } from "antd";
import apiClient from "api";
import { useDisclosure } from "hooks";
import React, { useEffect, useReducer } from "react";
import IconButton from "@/components/IconButton";
import { FaCheck, FaSearch, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";

export default function TransferHistory() {
  const router = useRouter();
  const reducer = (prevState, newState) => ({ ...prevState, ...newState });
  const [state, dispatch] = useReducer(reducer, { data: [] });
  const { onClose, onOpen, open } = useDisclosure();

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

  const columns = [
    {
      Header: "Sender",
      accessor: "createUser",
    },
    {
      Header: "Reciever",
      accessor: "reciever",
      Cell: ({ row: { original = {} } }) => {
        return original.initiator?.data.champ5;
      },
    },
    {
      Header: "Reciever Type",
      accessor: "recieverType",
      Cell: ({ row: { original = {} } }) => {
        let data = original.initiator?.data.champ6;
        return data === "A" ? "Agence" : data === "C" ? "Teller" : data;
      },
    },
    {
      Header: "Status",
      accessor: "statusEvolution",
      Cell: ({ value }) => {
        const { name, color } = getStatus(value);
        return (
          <div
            style={{ background: color }}
            className="bg-yellow-500 w-max py-1 px-3 text-white rounded-3xl"
          >
            {name}
          </div>
        );
      },
    },

    {
      Header: "Amount",
      accessor: "initiator",
      Cell: ({ value }) => {
        return (
          <NumericFormat
            value={value?.data.mnt1}
            displayType="text"
            thousandSeparator=" "
            suffix="XAF"
          />
        );
      },
    },
    {
      Header: "Date",
      accessor: "createdDate",
    },
    {
      Header: "Action",
      accessor: "action",
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

  async function fetchData() {
    dispatch({ loading: true });
    let response = await apiClient({
      method: "post",
      url: "/api/v2/workflow/consultAllState",
      body: {
        configCode: "tebit_flow",
        userProfile: "string",
        username: "237683501637",
      },
    });
    dispatch({ data: response.data.data || [], loading: false });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <PageWrapper title="Transfers" />
      <RTable
        columns={columns}
        data={state.data || []}
        loading={state.loading}
      />
    </div>
  );
}
