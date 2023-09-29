import React, { useEffect, useState } from "react";
import { Button, Dropdown, Input, Menu, Select } from "antd";
import { useReducer } from "react";
import {
  DownloadOutlined,
  EyeOutlined,
  FileExcelFilled,
  FilePdfFilled,
  FilePptFilled,
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import tableExport from "antd-table-export";
import Table from "../../../components/Custom/Table/index";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Form from "../../../components/Form/Form";
import SelectFormField from "../../../components/Form/SelectField";
import FormField from "../../../components/Form/FormField";
import * as yup from "yup";
import FormButton from "../../../components/Form/FormButton";

const initialValues = {
  clientCode: "",
  phoneNumber: "",
  dateModified: "",
  subsBranch: "",
  clientName:""
};

const validator = yup.object({
  clientCode: yup.string(),
  phoneNumber: yup.string(),
  dateModified: yup.string(),
  subsBranch: yup.string(),
  clientName:yup.string(),
});

export default function Index() {
  const reducer = (prevState, action) => ({ ...prevState, ...action });
  const [state, dispatch] = useReducer(reducer, {});
  const [search, setSearch] = useState("")
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

 
  const columns = [
    {
      title: "Client Name",
      dataIndex: "tabcd",
      key: "configTabcd",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.tabcd - b.tabcd,
    },
    {
      title: " Client Code",
      dataIndex: "tbnam",
      key: "configBill",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.tbnam - b.tbnam,
    },
    {
      title: "Wallet Code",
      dataIndex: "tbnam",
      key: "configPaid",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.tbnam - b.tbnam,
    },
    {
      title: "Phone Number",
      dataIndex: "tbnam",
      key: "configAmountLeft",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.tbnam - b.tbnam,
    },
    {
      title: "Email",
      dataIndex: "tbnam",
      key: "configAmountLeftf",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.tbnam - b.tbnam,
    },
    {
      title: "Subscription Branch",
      dataIndex: "tbnam",
      key: "configAmountLeftf",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.tbnam - b.tbnam,
    },
    {
      title: "Date Modified",
      dataIndex: "tbnam",
      key: "configDate",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.tbnam - b.tbnam,
    },
   
    {
        title: "Status",
        dataIndex: "tbnam",
        key: "configAmountLeftf",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.tbnam - b.tbnam,
      },
   
  ];

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
         <FormField placeholder="Client  Name" name="clientName" />
         <FormField placeholder="Client Code" name="clientCode" />
         <FormField placeholder="Last Name" name="phoneNumber" />
         <FormField placeholder="Date Modified" name="dateModified" />
         <SelectFormField
            placeholder="Subscription Branch"
            name="subsBranch"
            options={[
              { value: 1, label: "Bamenda" },
              { value: 2, label: "Limbe" },
              { value: 3, label: "Buea" },
            ]}
          />
        
        
         </div>
         <div className="flex justify-end">

         <div className="w-40 ">
            <FormButton >
                Search
            </FormButton>
         </div>
         </div>
        </Form>
      </div>
    );
  }

  return (
    <>
      <header className="flex space-x-4 mb-4 justify-between">
        <h2 className="text-lg font-bold font">Account Attachement </h2>
      </header>
      <div className={"table-custom"} style={{ overflowX: "auto" }}>
        <Table
          columns={columns}
          dataSource={state.data}
          loading={true}
          showIndex={true}
          showFilter={{ filter: true, filterValue: filterParams() }}
          className={""}
          optional={true}
        />
      </div>
    </>
  );
}
