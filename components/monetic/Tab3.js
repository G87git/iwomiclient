import { Form } from 'antd'
import React from 'react'
import Button from '../button'
import TableInput from '../TableInput'

export default function Tab3({goto, loading, consult}) {
    const fields = [
        { name: "Bank Code", key: "bkc", type: "text" },
        { name: "Branch", key: "age", type: "text" },
        { name: "Account", key: "cpt", type: "text" },
        { name: "Key", key: "cle", type: "text" },
        { name: "Currency", key: "dev", type: "text" },
        { name: "Card Currency", key: "dev2", type: "text" },
        { name: "Account Label", key: "libelle", type: "text" },
      ];

  return (
    <div>
        <Form.Item name="cred">
        <TableInput consult={consult} fields={fields} />
        </Form.Item>

        <div className="flex gap-4">
        <Button type="default" onClick={() => {
            goto && goto('2')
        }}>Previous</Button>
        {!consult && <Button  htmlType="submit">Subscribe</Button>}
      </div>
    </div>
  )
}
