import {Table} from "antd"
export default function TableComponent({columns = [], data}) {
  const col = columns.map(c => {
    return     {
      title: c.Header,
      key: c.Header,
      dataIndex: c.accessor,
      
    }
  })
  return (
    <Table dataSource={data} columns={col} />
  )
}
