import { Form, Modal, Select as AntdSelect } from "antd";
import React, { useState } from "react";
import { FaCopy, FaPen, FaTrash } from "react-icons/fa";
import Button from "../button";
import Input from "../Input";
import RTable from "../RTable";
import Select from "../Select";

export default function TableInput({
  name,
  onChange = () => {},
  title,
  fields = [],
  value = [],
  consult,
  onFinish,
  loading,
  adding,
  deleteItem,
  verticalLayout,
  actions = [],
}) {
  const [editIndex, setEditIndex] = useState(null);
  let columns = fields.map((f) => ({ Header: f.name, accessor: f.key }));
  const [form] = Form.useForm();
  function onSubmit(e) {
    if (editIndex) {
      let d = value.map((d, i) => {
        if (editIndex === i.toString()) {
          return e;
        }
        return d;
      });
      onChange({ target: { name, value: d } });
    } else {
      let d = [...value, e];
      onChange({ target: { name, value: d } });
    }
    setEditIndex(null);
    form.resetFields();
  }

  function deleteRow(index) {
    let d = value.filter((_, i) => i.toString() !== index);
    onChange({ target: { name, value: d } });
  }

  const actionHeader = {
    Header: "Action",
    accessor: "action",
    Cell: ({ row }) => {
      return (
        <div className="flex gap-4">
          <a
            onClick={() => {
              form.setFieldsValue(row.original);
              setEditIndex(row.id);
            }}
            className="text-gray-500"
          >
            <FaPen />
          </a>
          <a
            onClick={() => {
              form.setFieldsValue(row.original);
            }}
            className="text-yellow-500"
          >
            <FaCopy />
          </a>
          {actions.map((action) => {
            let Action = action;
            return <Action {...row.original} />;
          })}
          <a
            className="text-red-500"
            onClick={() => {
              Modal.confirm({
                title: "Are you sure you want to remove this line?",
                onOk: () => {
                  deleteItem ? deleteItem(row) : deleteRow(row.id);
                },
              });
            }}
          >
            <FaTrash />
          </a>
        </div>
      );
    },
  };

  if (!consult) {
    columns.push(actionHeader);
  }

  function handleOnFinish(e) {
    onFinish(e, editIndex !== null);
    setEditIndex(null);
    form.resetFields();
  }
  return (
    <div className="space-y-4">
      {!consult && (
        <div className="p-4 pt-2 bg-gray-100">
          {fields.length > 0 && (
            <Form
              labelCol={verticalLayout ? {} : { span: "8" }}
              labelAlign="left"
              layout={verticalLayout ? "vertical" : "horizontal"}
              form={form}
              onFinish={onFinish ? handleOnFinish : onSubmit}
            >
              <h6 className="text-xl">{title}</h6>
              <div className="grid grid-cols-3 gap-8 gap-x-8">
                {fields.map((field) => {
                  if (field.type === "select") {
                    return (
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: `${field.name} is required`,
                          },
                        ]}
                        label={field.name}
                        name={field.key}
                      >
                        {field.mode === "multiple" ? (
                          <AntdSelect
                            mode="multiple"
                            placeholder={`Select ${field.name}`}
                            size="large"
                            options={field.data || []}
                          />
                        ) : (
                          <Select
                            placeholder={`Select ${field.name}`}
                            size="large"
                            options={field.data || []}
                          />
                        )}
                      </Form.Item>
                    );
                  }
                  return (
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: `${field.name} is required`,
                        },
                      ]}
                      label={field.name}
                      name={field.key}
                    >
                      <Input />
                    </Form.Item>
                  );
                })}
              </div>
             {verticalLayout && <>
                <br />
                <br />
              </>}
              <Button loading={adding} onClick={form.submit}>
                Add
              </Button>
            </Form>
          )}
        </div>
      )}
      <div className="w-full bg-white">
        {columns.length > 0 && (
          <RTable
            loading={loading}
            hideCheckbox
            columns={columns}
            data={value}
          />
        )}
      </div>
    </div>
  );
}
