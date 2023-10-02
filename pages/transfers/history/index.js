// import React, { useEffect, useState } from "react";
// import Input from "@/components/Input";
import { NumericFormat } from "react-number-format";
import { Button, Dropdown, Input, Menu, Select } from "antd";
// import { Form, Spin } from "antd";
import { Modal } from "antd";
import apiClient from "api";
import { useDisclosure } from "hooks";
import tableExport from "antd-table-export";
import React, { useEffect, useReducer, useState } from "react";
import IconButton from "@/components/IconButton";
import { FaCheck, FaSearch, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import Table from "../../../components/Custom/Table/index";
import Form from "../../../components/Form/Form";
import SelectFormField from "../../../components/Form/SelectField";
import FormField from "../../../components/Form/FormField";
import * as yup from "yup";
import FormButton from "../../../components/Form/FormButton";

import {
  DownloadOutlined,
  EyeOutlined,
  FileExcelFilled,
  FilePdfFilled,
  FilePptFilled,
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
// import * as yup from "yup";
// import tableExport from "antd-table-export";

const initialValues = {
  firstName: "",
  surnName: "",
  dateModified: "",
  subsAgency: "",
  account: "",
};

const validator = yup.object({
  firstName: yup.string(),
  surnName: yup.string(),
  dateModified: yup.string(),
  subsAgency: yup.string(),
  acccount: yup.string(),
});

export default function TransferHistory() {
  // const router = useRouter();
  const reducer = (prevState, newState) => ({ ...prevState, ...newState });
  const [state, dispatch] = useReducer(reducer, { data: [] });
  // const { onClose, onOpen, open } = useDisclosure();

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

  // const columns = [
  //   {
  //     Header: "Sender",
  //     accessor: "createUser",
  //   },
  //   {
  //     Header: "Reciever",
  //     accessor: "reciever",
  //     Cell: ({ row: { original = {} } }) => {
  //       return original.initiator?.data.champ5;
  //     },
  //   },
  //   {
  //     Header: "Reciever Type",
  //     accessor: "recieverType",
  //     Cell: ({ row: { original = {} } }) => {
  //       let data = original.initiator?.data.champ6;
  //       return data === "A" ? "Agence" : data === "C" ? "Teller" : data;
  //     },
  //   },
  //   {
  //     Header: "Status",
  //     accessor: "statusEvolution",
  //     Cell: ({ value }) => {
  //       const { name, color } = getStatus(value);
  //       return (
  //         <div
  //           style={{ background: color }}
  //           className="bg-yellow-500 w-max py-1 px-3 text-white rounded-3xl"
  //         >
  //           {name}
  //         </div>
  //       );
  //     },
  //   },

  //   {
  //     Header: "Amount",
  //     accessor: "initiator",
  //     Cell: ({ value }) => {
  //       return (
  //         <NumericFormat
  //           value={value?.data.mnt1}
  //           displayType="text"
  //           thousandSeparator=" "
  //           suffix="XAF"
  //         />
  //       );
  //     },
  //   },
  //   {
  //     Header: "Date",
  //     accessor: "createdDate",
  //   },
  //   {
  //     Header: "Action",
  //     accessor: "action",
  //     Cell: ({ row: { original = {} } }) => {
  //       let { idexten, id } = original;
  //       console.log(idexten);
  //       return (
  //         <div className="flex space-x-4 w-full">
  //           <Link
  //             href={`/transfers/history/${id}${
  //               idexten ? "?idexten=" + idexten : ""
  //             }`}
  //           >
  //             <IconButton
  //               icon={<FaSearch className="text-primary" title="Approve" />}
  //             />
  //           </Link>
  //         </div>
  //       );
  //     },
  //   },
  // ];

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

  console.log("Data loaded", state);

  // const reducer = (prevState, action) => ({ ...prevState, ...action });
  // const [state, dispatch] = useReducer(reducer, {});
  const [search, setSearch] = useState("");
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "id",
      key: "id",
      filter: true,
      defaultSortOrder: "descend",
      sorter: (a, b) => a.id - b.id,
    },
    // {
    //   title: "Client Code",
    //   dataIndex: "sourceAccountId",
    //   key: "sourceAccountId",
    //   filter: true,
    //   defaultSortOrder: "descend",
    //   sorter: (a, b) => a.sourceAccountId - b.sourceAccountId,
    // },
    {
      title: "Sender Wallet",
      dataIndex: "sourceAccountId",
      key: "sourceAccountId",
      filter: true,
      defaultSortOrder: "descend",
      sorter: (a, b) => a.sourceAccountId - b.sourceAccountId,
    },
    {
      title: "Reciever Wallet",
      dataIndex: "targetAccountId",
      key: "targetAccountId",
      filter: true,
      defaultSortOrder: "descend",
      sorter: (a, b) => a.targetAccountId - b.targetAccountId,
    },
    // {
    //   title: "Reciever Name",
    //   dataIndex: "targetOwnerName",
    //   key: "targetOwnerName",
    //   filter: true,
    //   defaultSortOrder: "descend",
    //   sorter: (a, b) => a.targetOwnerName.localeCompare(b.targetOwnerName),
    // },
    {
      title: "Transaction Type",
      dataIndex: "transTyp",
      key: "transTyp",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.transTyp.localeCompare(b.transTyp),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.status.localeCompare(b.status),
    },

    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
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
      title: "Initiation Date",
      dataIndex: "dou",
      key: "dou",
      sorter: (a, b) => a.dou - b.dou,
    },
    {
      title: "Completion Date",
      dataIndex: "dmo",
      key: "dmo",
      sorter: (a, b) => a.dmo - b.dmo,
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

  console.log("Data", state.data);

  const menu = (
    <Menu>
      <Menu.Item onClick={exportExcel} icon={<FileExcelFilled />}>
        Excel
      </Menu.Item>
      <Menu.Item icon={<FilePdfFilled />}>PDF</Menu.Item>
      <Menu.Item icon={<FilePptFilled />}>CSV</Menu.Item>
    </Menu>
  );

  function handleFilter(e) {
    const { value } = e.target;
    setSearch(value);
  }

  function exportExcel() {
    const exportInstance = new tableExport(state.data, columns);
    exportInstance.download("Paiement Facture", "xlsx");
  }

  function optionalParam() {
    return (
      <>
        <div className="flex justify-between flex-wrap">
          <div>
            <Input
              placeholder="Filter..."
              onChange={handleFilter}
              value={search}
              prefix={<FilterOutlined />}
            />
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <Dropdown overlay={menu} trigger={["click"]}>
              <Button
                icon={<DownloadOutlined />}
                type="primary"
                className="!bg-primary !border-primary"
              >
                Export
              </Button>
            </Dropdown>
          </div>
        </div>
      </>
    );
  }

  function filterParams() {
    const handleSubmit = (values) => {
      console.log("SEARCH", values);
    };
    return (
      <div className="!bg-white !p-5 !mb-10 rounded-lg">
        <Form
          initialValues={initialValues}
          validationSchema={validator}
          onSubmit={handleSubmit}
        >
          <div className="grid md:grid-cols-4 content-center md:gap-x-2">
            <FormField placeholder="Sender" name="serder" />
            <FormField placeholder="Receiver" name="receiver" />
            <FormField placeholder="Date Modified" name="dateModified" />

            <SelectFormField
              placeholder="Receiver Type"
              name="subsBranch"
              options={[
                { value: "A", label: "Agence" },
                { value: "B", label: "Teller" },
              ]}
            />
            <FormField placeholder="Amount" name="amount" />
            <FormField placeholder="Status" name="status" />
          </div>
          <div className="flex justify-end">
            <div className="w-40 ">
              <FormButton>Search</FormButton>
            </div>
          </div>
        </Form>
      </div>
    );
  }

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
          showFilter={{ filter: true, filterValue: filterParams() }}
          className={""}
          optional={optionalParam()}
        />
      </div>
    </div>
  );
}
