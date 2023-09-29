import { Form } from "antd";
import React from "react";
import Button from "../button";
import TableInput from "../TableInput";

export default function Tab2({ goto, countryData = [], consult}) {
  const owner = [
    {label: "IWOMI", value: "IWOMI"},
    {label: "BICEC", value: "BICEC"},
  ]
  const service = [
    {label: "ORANGE MONEY", value: "ORANGE"},
    {label: "MOBILE MONEY", value: "MTN"},
    {label: "CARTE", value: "CARD"},
    {label: "GIMAC", value: "GIMAC"},
  ]
  const fields = [
    { name: "Terminal Name", key: "tpename", type: "text" },
    { name: "Terminal ID", key: "tpecd", type: "text" },
    { name: "Imei Number", key: "imei", type: "text" },
    { name: "Wallet Number", key: "wllet", type: "text" },
    { name: "Country", key: "tepectry", type: "select", data: countryData},
    { name: "Town", key: "tpecity", type: "text" },
    { name: "Owner", key: "isiwomi", type: "select", data: owner},
    { name: "Services", key: "services", type: "select", mode: 'multiple', data: service },
  ];

  return (
    <div>
      <Form.Item name="cred2">
        <TableInput consult={consult} fields={fields} />
      </Form.Item>
      <div className="flex gap-4">
        <Button
          type="default"
          onClick={() => {
            goto && goto("1");
          }}
        >
          Previous
        </Button>
        <Button
          onClick={() => {
            goto && goto("3");
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
