import React, { useState, useEffect } from "react";
import AntTable from "antd/lib/table";
import Loader from "react-loader-advanced";
import { Spin } from "antd";
import tableExport from "antd-table-export";

import { Button, Dropdown, Input, Menu, Select } from "antd";
import {
  DownloadOutlined,
  EyeOutlined,
  FileExcelFilled,
  FilePdfFilled,
  FilePptFilled,
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons";

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

  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(dataSource);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(filterData(data, searchText));
  }, [data, searchText]);

  const filterData = (data, query) => {
    if (!query) return data;

    return data.filter((item) =>
      Object.values(item).some((value) =>
        value == null
          ? ""
          : value.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
  };
  const handleSearch = (value) => {
    setSearchText(value);
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={exportExcel} icon={<FileExcelFilled />}>
        Excel
      </Menu.Item>
      {/* <Menu.Item icon={<FilePdfFilled />}>PDF</Menu.Item>
      <Menu.Item icon={<FilePptFilled />}>CSV</Menu.Item> */}
    </Menu>
  );

  function exportExcel() {
    const exportInstance = new tableExport(prob.dataSource, columns);
    exportInstance.download("Paiement Facture", "xlsx");
  }

  function optionalParam() {
    return (
      <>
        <div className="flex justify-between flex-wrap">
          <div>
            <Input
              placeholder="Filter..."
              onSearch={handleSearch}
              onChange={(e) => handleSearch(e.target.value)}
              value={searchText}
              className="!rounded h-[42px]"
              prefix={<FilterOutlined />}
            />
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            {prob.actions}
            <Dropdown overlay={menu} trigger={["click"]}>
              <Button
                icon={<DownloadOutlined />}
                type="primary"
                className="!bg-primary !border-primary !h-[42px] !rounded"
              >
                Export
              </Button>
            </Dropdown>
          </div>
        </div>
      </>
    );
  }

  const spinner = (
    <span className="!items-center ">
      {" "}
      <Spin />
    </span>
  );

  return (
    <div className="space-y-2">
      {prob.showFilter?.filter && prob.showFilter?.filterValue}
      {prob.optional ? optionalParam() : []}
      <Loader show={prob.loader} message={spinner} contentBlur={0.1}>
        <AntTable
<<<<<<< Updated upstream
            columns={columns}
            // dataSource={dataSource}
            dataSource={filteredData?.map((item, index) => ({ ...item, index: index + 1 }))}

            size="middle"
            loading={false}
            style={{overflowX: 'auto'}}
            showSorterTooltip={false}
=======
          columns={columns}
          // dataSource={dataSource}
          dataSource={filteredData?.map((item, index) => ({
            ...item,
            index: index + 1,
          }))}
          size="middle"
          loading={false}
          style={{ overflowX: "auto" }}
          showSorterTooltip={false}
>>>>>>> Stashed changes
        />
      </Loader>
    </div>
  );
}
