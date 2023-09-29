import TableInput from '@/components/TableInput'
import { Form } from 'antd'
import React from 'react'

export default function SeuilDeCollect() {

    const fields = [
        { name: "Bank Level", key: "bankl", type: "select", data: [] },
        { name: "Nature", key: "nature", type: "select", data: [] },
        { name: "Weekly Amount", key: "w_amount", type: "number" },
        { name: "Monthly Amount", key: "m_amount", type: "number" },
        { name: "Max Amount", key: "max_amount", type: "number" },
        { name: "Min Amount", key: "min_amount", type: "number" },
        { name: "Daily Amount", key: "d_amount", type: "number" },
        { name: "Anual Amount", key: "a_amount", type: "number" },
        { name: "Daily Transaction Number", key: "d_num", type: "number" },
      ];
  return (
    <div>
        <h6 className='uppercase text-lg font-bold'>
        seuil de collect
        </h6>
        <br />
        <Form>
            <Form.Item>
                <TableInput verticalLayout title="General Information" fields={fields} />
            </Form.Item>
        </Form>
    </div>
  )
}
