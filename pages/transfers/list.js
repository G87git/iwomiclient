import Button from "@/components/button";
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
import { getStatus } from "utils";

export default function Transfer() {
  const router = useRouter();
  const reducer = (prevState, newState) => ({ ...prevState, ...newState });
  const [state, dispatch] = useReducer(reducer, { data: [] });
  const { onClose, onOpen, open } = useDisclosure();
  const [form] = Form.useForm();



  const columns = [
    {
      Header: "Label",
      accessor: "lebelleEtap",
    },
    {
      Header: "Transaction Initiator",
      accessor: "createUser",
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
        let { statusEvolution: status, id } = original;
        return (
          <div className="flex space-x-4 w-full">
            <Link href={`/transfers/consult/${id}`}>
              <IconButton
                icon={<FaSearch className="text-primary" title="Approve" />}
              />
            </Link>

            {status === "01" && (
              <>
                <IconButton
                  onClick={() => {
                    onOpen();
                    dispatch({ currentId: id });
                    fetchFields(id);
                  }}
                  icon={<FaCheck className="text-green-600" title="Approve" />}
                />
                <IconButton
                  onClick={() => {
                    onOpen();
                    dispatch({ currentId: id, isReject: true });
                    fetchFields(id);
                  }}
                  icon={<FaTimes className="text-red-600" title="Reject" />}
                />
              </>
            )}
          </div>
        );
      },
    },
  ];

  async function fetchFields(id) {
    dispatch({ loadingFields: true });
    let response = await apiClient({
      method: "post",
      url: "/api/v2/workflow/consultCurrentField",
      body: {
        flowConfCode: "tebit_flow",
        idstate: id,
        userProfile: "string",
        username: "237683501637",
      },
    });

    let headers = response.data.data?.heading || {};
    let fields = response.data.data.key?.map((key) => {
      return { key, name: headers[key] };
    });
    dispatch({ loadingFields: false, fields });
  }
  async function fetchData() {
    dispatch({ loading: true });
    let response = await apiClient({
      method: "post",
      url: "/api/v2/workflow/consultAllState",
      body: {
        configCode: "tebit_flow",
        userProfile: "string",
        username: "237683501637",
        branch: "akwa",
      },
    });
    dispatch({ data: response.data.data || [], loading: false });
  }

  async function validateData(data = {}) {
    dispatch({ validating: true });
    let response = await apiClient({
      method: "put",
      url: "/api/v1/transfer/validte",
      body: {
        closeFlow: state.isReject ?? false,
        data,
        profile: "string",
        stateId: state.currentId,
        user: "237683501637",
      },
    });

    if (response.data.status === "01") {
      Modal.success({ title: "Operation successful", onOk: onClose });
    } else {
      Modal.error({ title: "An error occured", onOk: onClose });
    }
    dispatch({ validating: false, isReject: null, currentId: null });
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
        // actions={
        //   <>
        //     <Button onClick={onOpen}>New Transfer</Button>
        //   </>
        // }
        loading={state.loading}
      />

      <Modal
        title={state.isReject ? "Reject" : "Validate"}
        visible={open}
        onOk={form.submit}
        onCancel={onClose}
        okText={state.isReject ? "Reject" : "Validate"}
        okButtonProps={{
          disabled: state.loadingFields,
          loading: state.validating,
          danger: state.isReject,
        }}
      >
        {state.loadingFields && (
          <div className="flex justify-center items-center">
            <Spin />
          </div>
        )}
        {!state.loadingFields && state.fields?.length > 0 && (
          <Form layout="vertical" form={form} onFinish={validateData}>
            <div className="space-y-4">
              {state.fields?.map((field) => {
                return (
                  <Form.Item
                    label={field.name}
                    name={field.key}
                    className="m-0 p-0 !mb-0"
                  >
                    <Input />
                  </Form.Item>
                );
              })}
            </div>
          </Form>
        )}
      </Modal>
    </div>
  );
}
