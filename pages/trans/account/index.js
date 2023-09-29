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
    { Name: "Members name", accessor: "member" },
    { Branch: "Number", accessor: "phone" },
    { Accounts: "Branch", accessor: "branch" },
    { Key: "Date Registered", accessor: "dateR" },
    { Currency: "Currency", accessor: "currency" },
    { Balance: "Balance", accessor: "balance" },
    { DateCreated: "Date", accessor: "date" },
    { Actions: "Action", accessor: "act" }
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
          <span className="text-lg font-bold pl-1">Client list</span>
        </div>
        <div className="mt-6">
          <RTable
            columns={columns}
            data={state.data || []}
            loading={loading}
            hideCheckbox
            // actions={<><EyeOutlined /></>}
          />
        </div>
      </div>
      </>
    );
  }
  