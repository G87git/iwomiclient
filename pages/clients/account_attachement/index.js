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
import { FiFolderPlus } from "react-icons/fi";
// import { BsPersonFillAdd } from "react-icons/bs";

const initialValues = {
  clientCode: "",
  phoneNumber: "",
  dateModified: "",
  subsBranch: "",
  status:""
};

const validator = yup.object({
  clientCode: yup.string(),
  phoneNumber: yup.string(),
  dateModified: yup.string(),
  subsBranch: yup.string(),
  status:yup.string(),
});

export default function Index() {
  const reducer = (prevState, action) => ({ ...prevState, ...action });
  const [state, dispatch] = useReducer(reducer, {});
  const [search, setSearch] = useState("")
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const data = [
    {
      clientName: "John Smith",
      clientCode: "1234",
      productCode: "5678",
      phoneNumber: 1234567890,
      Email: "johnsmith@example.com",
      subsBranch: "New Yorkx",
      dateModified: "2020-12-15",
      status: "active",
    },
    {
      clientName: "Jane Doe",
      clientCode: "5678",
      productCode: "9012",
      phoneNumber: 9876543210,
      Email: "janedoe@example.com",
      subsBranch: "Los Angeles",
      dateModified: "2020-11-20",
      status: "inactive",
    },
    {
      clientName: "Mike Johnson",
      clientCode: "9012",
      productCode: "3456",
      phoneNumber: 2345678901,
      Email: "mikejohnson@example.com",
      subsBranch: "Chicago",
      dateModified: "2020-10-25",
      status: "active",
    },
    {
      clientName: "Sarah Wilson",
      clientCode: "3456",
      productCode: "7890",
      phoneNumber: 8765432109,
      Email: "sarahwilson@example.com",
      subsBranch: "Houston",
      dateModified: "2020-09-30",
      status: "inactive",
    },
    {
      clientName: "David Brown",
      clientCode: "7890",
      productCode: "1234",
      phoneNumber: 7654321098,
      Email: "davidbrown@example.com",
      subsBranch: "Philadelphia",
      dateModified: "2020-08-05",
      status: "active",
    },
    {
      clientName: "Emily Davis",
      clientCode: "2345",
      productCode: "6789",
      phoneNumber: 6543210987,
      Email: "emilydavis@example.com",
      subsBranch: "Phoenix",
      dateModified: "2020-07-10",
      status: "inactive",
    },
    {
      clientName: "Michael Wilson",
      clientCode: "6789",
      productCode: "0123",
      phoneNumber: 5432109876,
      Email: "michaelwilson@example.com",
      subsBranch: "San Antonio",
      dateModified: "2020-06-15",
      status: "active",
    },
    {
      clientName: "Jessica Taylor",
      clientCode: "0123",
      productCode: "4567",
      phoneNumber: 4321098765,
      email: "jessicataylor@example.com",
      subsBranch: "San Diego",
      dateModified: "2020-05-20",
      status: "inactive",
    },
    {
      clientName: "Brian Anderson",
      clientCode: "4567",
      productCode: "8901",
      phoneNumber: 3210987654,
      email: "briananderson@example.com",
      subsBranch: "Dallas",
      dateModified: "2020-04-25",
      status: "active",
    },
    {
      clientName: "Amy Martinez",
      clientCode: "8901",
      productCode: "2345",
      phoneNumber: 2109876543,
      email: "amymartinez@example.com",
      subsBranch: "San Jose",
      dateModified: "2020-03-30",
      status: "inactive",
    },
    {
      clientName: "Christopher Lee",
      clientCode: "3456",
      productCode: "6789",
      phoneNumber: 1098765432,
      email: "christopherlee@example.com",
      subsBranch: "Austin",
      dateModified: "2020-02-05",
      status: "active",
    },
    {
      clientName: "Daniel Rodriguez",
      clientCode: "0123",
      productCode: "4567",
      phoneNumber: 987654321,
      email: "danielrodriguez@example.com",
      subsBranch: "San Francisco",
      dateModified: "2019-12-15",
      status: "active",
    },
    {
      clientName: "Michelle Walker",
      clientCode: "4567",
      productCode: "8901",
      phoneNumber: 876543210,
      email: "michellewalker@example.com",
      subsBranch: "Indianapolis",
      dateModified: "2019-11-20",
      status: "inactive",
    },
    {
      clientName: "Andrew Wilson",
      clientCode: "8901",
      productCode: "2345",
      phoneNumber: 765432109,
      email: "andrewwilson@example.com",
      subsBranch: "Seattle",
      dateModified: "2019-10-25",
      status: "active",
    },
  ];

 
  const columns = [
    {
      title: "Client Name",
      dataIndex: "clientName",
      key: "clientName",
      
      sorter: (a, b) => a.clientName - b.clientName,
    },
    {
      title: " Client Code",
      dataIndex: "clientCode",
      key: "clientCode",
      
      sorter: (a, b) => a.clientCode - b.clientCode,
    },
    {
      title: "Wallet Code",
      dataIndex: "walletCode",
      key: "walletCode",
      
      sorter: (a, b) => a.walletCode - b.walletCode,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      
      sorter: (a, b) => a.phoneNumber - b.phoneNumber,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      
      sorter: (a, b) => a.email - b.email,
    },
    {
      title: "Subscription Branch",
      dataIndex: "subsBranch",
      key: "subsBranch",
      
      sorter: (a, b) => a.subsBranch - b.subsBranch,
    },
    {
      title: "Date Modified",
      dataIndex: "dateModified",
      key: "dateModified",
      
      sorter: (a, b) => a.dateModified - b.dateModified,
    },
   
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        
        sorter: (a, b) => a.status - b.status,
      },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <td className="flex-start">
          <i
            style={{ position: "relative", top: 3, cursor: "pointer" }}
            onClick={() => {
              // setSelectedModal("Slide")
              // setSelectedSlide(record.name);
              toggleAddModal();
            }}
          >
            {/* <BsPersonFillAdd
              style={{
                backgroundColor: "#07575b",
                padding: 5,
                borderRadius: 5,
                color: "white",
                marginRight: 15,
              }}
              size={30}
            /> */}
          </i>
  
          <i
            style={{ position: "relative", top: 3, cursor: "pointer" }}
            onClick={() => {
              // setSelectedModal("Case")
              // setSelectedSlide(record.name);
              toggleAddModal();
            }}
          >
            <FiFolderPlus
              style={{
                backgroundColor: "#07575b",
                padding: 5,
                borderRadius: 5,
                color: "white",
              }}
              size={30}
            />
          </i>
        </td>
      ),
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
         <FormField placeholder="First Name" name="clientCode" />
         <FormField placeholder="Date Modified" name="dateModified" />
         <FormField placeholder="Last Name" name="phoneNumber" />

        
        
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
          dataSource={data}
          loading={false}
          showIndex={true}
          showFilter={{ filter: true, filterValue: filterParams() }}
          className={""}
          optional={true}
        />
      </div>
    </>
  );
}
