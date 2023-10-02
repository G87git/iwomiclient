import React, { useEffect, useState } from "react";
import { useReducer } from "react";

import tableExport from "antd-table-export";
import Table from "../../../components/Custom/Table/index";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Form from "../../../components/Form/Form";
import SelectFormField from "../../../components/Form/SelectField";
import FormField from "../../../components/Form/FormField";
import * as yup from "yup";
import FormButton from "../../../components/Form/FormButton";
import RTable from "@/components/RTable";

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

 
  const columns = [
    {
      title: "Client Name",
      dataIndex: "clientName",
      key: "clientName",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.clientName.localeCompare(b.clientName),
    },
    {
      title: " Client Code",
      dataIndex: "clientCode",
      key: "clientCode",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.clientCode - b.clientCode,
    },
    {
      title: "Product Code",
      dataIndex: "productCode",
      key: "productCode",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.productCode - b.productCode,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.phoneNumber - b.phoneNumber,
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.Email.localeCompare(b.Email),
    },
    {
      title: "Subscription Branch",
      dataIndex: "subsBranch",
      key: "subsBranch",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.subsBranch.localeCompare(b.subsBranch),
    },
    {
      title: "Date Modified",
      dataIndex: "dateModified",
      key: "dateModified",
      defaultSortOrder: "descend",
      sorter: (a, b) => {
        const dateA = new Date(a.dateModified);
        const dateB = new Date(b.dateModified);
        return dateA.getTime() - dateB.getTime();
      },    },
    {
      title: " Status",
      dataIndex: "status",
      key: "status",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
   
   
  ];

  const data = 
    [
        {
          clientName: "John Smith",
          "clientCode": "1234",
          "productCode": "5678",
          "phoneNumber": 1234567890,
          "Email": "johnsmith@example.com",
          "subsBranch": "New Yorkx",
          "dateModified": "2020-12-15",
          "status": "active"
        },
        {
          "clientName": "Jane Doe",
          "clientCode": "5678",
          "productCode": "9012",
          "phoneNumber": 9876543210,
          "Email": "janedoe@example.com",
          "subsBranch": "Los Angeles",
          "dateModified": "2020-11-20",
          "status": "inactive"
        },
        {
          "clientName": "Mike Johnson",
          "clientCode": "9012",
          "productCode": "3456",
          "phoneNumber": 2345678901,
          "Email": "mikejohnson@example.com",
          "subsBranch": "Chicago",
          "dateModified": "2020-10-25",
          "status": "active"
        },
        {
          "clientName": "Sarah Wilson",
          "clientCode": "3456",
          "productCode": "7890",
          "phoneNumber": 8765432109,
          "Email": "sarahwilson@example.com",
          "subsBranch": "Houston",
          "dateModified": "2020-09-30",
          "status": "inactive"
        },
        {
          "clientName": "David Brown",
          "clientCode": "7890",
          "productCode": "1234",
          "phoneNumber": 7654321098,
          "Email": "davidbrown@example.com",
          "subsBranch": "Philadelphia",
          "dateModified": "2020-08-05",
          "status": "active"
        },
        {
          "clientName": "Emily Davis",
          "clientCode": "2345",
          "productCode": "6789",
          "phoneNumber": 6543210987,
          "Email": "emilydavis@example.com",
          "subsBranch": "Phoenix",
          "dateModified": "2020-07-10",
          "status": "inactive"
        },
        {
          "clientName": "Michael Wilson",
          "clientCode": "6789",
          "productCode": "0123",
          "phoneNumber": 5432109876,
          "Email": "michaelwilson@example.com",
          "subsBranch": "San Antonio",
          "dateModified": "2020-06-15",
          "status": "active"
        },
        {
          "clientName": "Jessica Taylor",
          "clientCode": "0123",
          "productCode": "4567",
          "phoneNumber": 4321098765,
          "Email": "jessicataylor@example.com",
          "subsBranch": "San Diego",
          "dateModified": "2020-05-20",
          "status": "inactive"
        },
        {
          "clientName": "Brian Anderson",
          "clientCode": "4567",
          "productCode": "8901",
          "phoneNumber": 3210987654,
          "Email": "briananderson@example.com",
          "subsBranch": "Dallas",
          "dateModified": "2020-04-25",
          "status": "active"
        },
        {
          "clientName": "Amy Martinez",
          "clientCode": "8901",
          "productCode": "2345",
          "phoneNumber": 2109876543,
          "Email": "amymartinez@example.com",
          "subsBranch": "San Jose",
          "dateModified": "2020-03-30",
          "status": "inactive"
        },
        {
          "clientName": "Christopher Lee",
          "clientCode": "3456",
          "productCode": "6789",
          "phoneNumber": 1098765432,
          "Email": "christopherlee@example.com",
          "subsBranch": "Austin",
          "dateModified": "2020-02-05",
          "status": "active"
        },
        {
          "clientName": "Daniel Rodriguez",
          "clientCode": "0123",
          "productCode": "4567",
          "phoneNumber": 987654321,
          "Email": "danielrodriguez@example.com",
          "subsBranch": "San Francisco",
          "dateModified": "2019-12-15",
          "status": "active"
        },
        {
          "clientName": "Michelle Walker",
          "clientCode": "4567",
          "productCode": "8901",
          "phoneNumber": 876543210,
          "Email": "michellewalker@example.com",
          "subsBranch": "Indianapolis",
          "dateModified": "2019-11-20",
          "status": "inactive"
        },
        {
          "clientName": "Andrew Wilson",
          "clientCode": "8901",
          "productCode": "2345",
          "phoneNumber": 765432109,
          "Email": "andrewwilson@example.com",
          "subsBranch": "Seattle",
          "dateModified": "2019-10-25",
          "status": "active"
        }
      
  ]

 

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
         <SelectFormField
            placeholder="Select Processing Status"
            name="status"
            options={[
              { value: 1, label: "Success" },
              { value: 2, label: "Pending" },
              { value: 3, label: "Failed" },
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
        <h2 className="text-lg font-bold font">Initialise Password </h2>
      </header>
      <div className={"table-custom"} style={{ overflowX: "auto" }}>
        <Table
          columns={columns}
          dataSource={data}
          loading={true}
          showIndex={true}
          showFilter={{ filter: true, filterValue: filterParams() }}
          className={""}
          optional={true}
        />
        {/* <RTable
            loading={false}
            hideCheckbox
            columns={columns}
            data={data}
          /> */}
      </div>
    </>
  );
}
