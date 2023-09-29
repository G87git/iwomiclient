import React from "react";
import AntTable from "antd/lib/table";
import Loader from 'react-loader-advanced';
import { Spin } from 'antd';


export default function Table(prob) {
  let columns;
  let dataSource;
  if (prob.showIndex) {
    columns = [{ title: "#", dataIndex: "table_index" }, ...prob.columns];
    dataSource = prob.dataSource?.map((data, index) => ({
      ...data,
      table_index: index + 1,
    }));
  }
    const spinner = <span className="!items-center "> <Spin/></span>;

  return (
    <div className="space-y-2">
      {prob.showFilter?.filter && (prob.showFilter?.filterValue)}
      {prob.optional}
      <Loader show={prob.loader} message={spinner} contentBlur={0.1}>
        <AntTable
            columns={columns}
            dataSource={dataSource}
            size="middle"
            loading={false}
            style={{overflowX: 'auto'}}
        />
      </Loader>
    </div>
  );
}
