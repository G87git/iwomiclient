import {
    Button,
    Form,
    Input,
    Select,
  } from "antd";
  
  import { FiFilter } from "react-icons/fi";
  import { PlusOutlined, CopyOutlined } from "@ant-design/icons";
  import RTable from "@/components/RTable";
  import { useState } from "react";
  import InputField from "@/components/input-field";
  
  const { Option } = Select;
  
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  
  const columns = [
    { Header: "Name", accessor: "name" },
    { Header: "Branch", accessor: "branch" },
    { Header: "Accounts", accessor: "account" },
    { Header: "Key", accessor: "key" },
    { Header: "Balance", accessor: "bal" },
    { Header: "DateCreated", accessor: "date" },
    { Header: "Action", accessor: "act" }
  ];
  
  
  export default function index() {
    const [state, dispatch] = useState([]);
    const [loading, setLoading] = useState(true);
  
    return (
      <>
        <div className="border">
          <div className="px-5 py-2 bg-primary flex text-white items-center ">
            <FiFilter />
            <span className="text-lg font-bold pl-1">Search</span>
          </div>
          <div className="px-10 py-4">
            <Form layout="vertical" name="complex-form" onFinish={onFinish}>
              <div className="grid grid-cols-4 gap-x-4">
                <Form.Item name="phone" label="Phone">
                  <Input />
                </Form.Item>
                <Form.Item label="Social Reason" name="reason">
                  <Input />
                </Form.Item>
                <Form.Item label="Client type" name="tax_payer">
                  <Input />
                </Form.Item>
                <Form.Item label="First Name">
                  <Input />
                </Form.Item>
              </div>
  
              <Form.Item latbel=" " colon={false}>
                <Button type="primary" htmlType="submit" color="#74397c">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
  
        <div className="border mt-10">
          <div className="px-5 py-2 bg-primary flex text-white items-center ">
            <CopyOutlined />
            <span className="text-lg font-bold pl-1">List of cash accounts</span>
          </div>
          <div className="mt-6">
            <RTable
              columns={columns}
              data={state.data || []}
              loading={loading}
              // actions={<><EyeOutlined /></>}
            />
          </div>
        </div>
      </>
    );
  }
  