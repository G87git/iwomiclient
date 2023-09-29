import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Button, Popconfirm, Form, Checkbox } from "antd";
import RTable from "@/components/RTable";
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editCellType,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(editCellType === "check" || false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  console.log(record)
  useEffect(() => {
    if (editing && editCellType !== "check") {
      inputRef.current.focus();
    } else {
      form.setFieldsValue({
        [dataIndex]: record?.[dataIndex],
      });
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(editCellType === "check" || !editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  const saveItem = (e) => {
    console.log(e);
  }
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        valuePropName="checked"

        // rules={[
        //   {
        //     required: true,
        //     message: `${title} is required.`,
        //   },
        // ]}
      >
          {
              editCellType === "check" ? <Checkbox  onClick={save}   /> :  <Input ref={inputRef} onPressEnter={save} onBlur={save} />
          }          

      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default function EditableTable() {
  const initState = {
    dataSource: [
      {
        key: "0",
        name: "This is a test",
        age: "32",
        address: "London, Park Lane no. 0",
      },
      {
        key: "1",
        name: true,
        age: "32",
        address: "London, Park Lane no. 1",
      },
    ],
    count: 2,
  };

  const [state, setState] = useState(initState);

  let columns = [
    {
      Header: "name",
      accessor: "name",
      type: "check"
    },
    {
      Header: "age",
      accessor: "age",
    },
    {
      Header: "address",
      accessor: "address",
    },
    {
      Header: "operation",
      accessor: "operation",
      render: (_, record) =>
        state.dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleDelete = (key) => {
    const dataSource = [...state.dataSource];
    setState({
      ...state,
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };

  const handleSave = (row) => {
    const newData = [...state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];

    newData.splice(index, 1, { ...item, ...row });
    
    setState({
      ...state,
      dataSource: newData,
    });
  };

  const { dataSource } = state;
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
   columns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        editCellType: col.editCellType,
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });
  return (
    <div>
      <RTable
        data={dataSource}
        columns={columns}
        editable
      />
    </div>
  );
}
