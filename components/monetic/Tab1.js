import { DatePicker, Form } from "antd";
import React from "react";
import Button from "../button";
import Input from "../Input";
import Select from "../Select";

export default function Tab1({goto, merchantData = [], consult}) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-x-4 bg-gray-100 p-4 pb-1 rounded">
        <Form.Item  name="tel1" label="Phone">
          <Input disabled={consult} />
        </Form.Item>
        <Form.Item label="Social Reason" name="reason">
          <Input disabled={consult} />
        </Form.Item>
        <Form.Item label="Taxpayer Card Number" name="tax_payer">
          <Input disabled={consult} />
        </Form.Item>
        <Form.Item label="Trade Register">
          <Input disabled={consult} />
        </Form.Item>
        <Form.Item label="Company's Creation Date" name="date">
          <Input disabled={consult} type="date" size="large" className="w-full" />
        </Form.Item>
      </div>
      <div className="grid grid-cols-2 gap-x-4 bg-gray-100 p-4 pb-1 rounded">
        <Form.Item name="email" label="Email">
          <Input disabled={consult} />
        </Form.Item>
        <Form.Item name="mercatcd" label="Merchant Code category">
          <Select disabled={consult} options={merchantData} size="large" placeholder="Select" />
        </Form.Item>
        <Form.Item name="mercd" label="Merchant Code">
          <Input disabled={consult} />
        </Form.Item>
        <Form.Item name="tpebkcd" label="Tpe Bank Code">
          <Input disabled={consult} />
        </Form.Item>
      </div>

      <div className="flex gap-4">
        <Button danger>Cancel</Button>
        <Button onClick={() => {
            goto && goto('2')
        }}>Next</Button>
      </div>
    </div>
  );
}
