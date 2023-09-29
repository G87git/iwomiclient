import { UserOutlined, EyeOutlined } from "@ant-design/icons";
import RTable from "@/components/RTable";
import { useState } from 'react';
import {Form} from "antd";
import Input from "@/components/Input";

const columns = [
  { Header: "Name", accessor: "name" },
  { Header: "Orange Money Balance", accessor: "om"},
  { Header: "MTN Mobile Money Balance Account", accessor: "momo"},
  { Header: "Action", accessor: "action"}

];




export default function index() {
  const [state, dispatch] = useState([]);
  const [loading, setLoading] = useState(true);


  return (
    <>
      <div className="border">
        <div className="px-5 py-2 bg-primary flex text-white items-center ">
            <UserOutlined />
        </div>

        <div className="mt-10">
        <RTable
          columns={columns}
          data={state.data || []}
          loading={loading}
          hideCheckbox
      />
        </div>
      </div>
    </>
  );
}
