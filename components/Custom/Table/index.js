import React, { useState, useReducer, useEffect } from "react";
import AntTable from "antd/lib/table";
import Loader from "react-loader-advanced";
import { Spin } from "antd";
import tableExport from "antd-table-export";

import { Button, Dropdown, Input, Menu } from "antd";
import {
  DownloadOutlined,
  FileExcelFilled,
  FilePptFilled,
  FilterOutlined,
} from "@ant-design/icons";
import { DateRangePicker } from "rsuite";

export default function Table(props) {
  const reducer = (prevState, action) => ({ ...prevState, ...action });
  const [state, dispatch] = useReducer(reducer, {
    filterObj: {},
  });

  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  let columns = props.columns;
  let dataSource = [];

  if (props.showIndex) {
    columns = [{ title: "#", dataIndex: "table_index" }, ...props.columns];
    dataSource = props.dataSource?.map((data, index) => ({
      ...data,
      table_index: index + 1,
    }));
  }

  useEffect(() => {
    setFilteredData(filterData(props.dataSource, searchText));
  }, [props.dataSource, searchText]);

  function handlefilterChange({ target: { name, value } }) {
    dispatch({ filterObj: { ...state.filterObj, [name]: value } });
  }

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
      <Menu.Item icon={<FilePptFilled />}>CSV</Menu.Item>
    </Menu>
  );

  function exportExcel() {
    const exportInstance = new tableExport(props.dataSource, columns);
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
            {props.actions}
            <Dropdown overlay={menu} trigger={["click"]}>
              <Button
                icon={<DownloadOutlined />}
                type="outlined"
                size="large"
                className="flex items-center justify-center"
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
      <Spin />
    </span>
  );

  return (
    <div className="space-y-2">
      <div className="py-6 px-8 pb-3 bg-white rounded mb-8">
        <div className="row grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4">
          {props.columns
            .filter((e) => e.filter === true)
            .map((column, i) => {
              if (column.disableFilters) {
                return;
              }

              if (column.type === "date-range") {
                const styles = {
                  width: 260,
                  display: "block",
                  marginBottom: 10,
                };

                return (
                  <div className="col-sm-3 mt-4" key={i}>
                    <h6 className="">{column.title}</h6>
                    <DateRangePicker
                      size="lg"
                      placeholder={column.title}
                      style={styles}
                      onChange={handleRangeChange}
                      o
                    />
                  </div>
                );
              }

              if (column.type === "select") {
                return (
                  <div className="col-sm-3 mt-4" key={i}>
                    <h6 className="">{column.title}</h6>
                    <select
                      type="search"
                      className="form-select"
                      value={state.filterObj[column.key]}
                      onChange={handleSelect}
                      name={column.key}
                      disabled={state.isSearching}
                    >
                      <option value="">Select {column.title}</option>
                      {column.data &&
                        column.data.map((d, i) => (
                          <option value={d.value} key={i}>
                            {" "}
                            {d.label}{" "}
                          </option>
                        ))}
                    </select>
                  </div>
                );
              }

              if (column.type === "multi-select") {
                return (
                  <div className="col-sm-3 mt-4" key={i}>
                    <h6 className="">{column.title}</h6>
                  </div>
                );
              }

              return (
                <div className="col-sm-3 mt-4" key={i}>
                  <h6 className="">{column.title}</h6>
                  <Input
                    type="search"
                    className="form-control"
                    value={state.filterObj[column.key]}
                    onChange={handlefilterChange}
                    name={column.key}
                    size="large"
                    disabled={state.isSearching}
                  />
                </div>
              );
            })}
        </div>

        <div className="flex items-center justify-end gap-x-2 mt-8">
          <Button
            size="large"
            onClick={() => {
              dispatch({ refresh: !state.refresh });
              console.log(state.filterObj);
            }}
          >
            Cancel
          </Button>
          <Button
            size="large"
            onClick={handleSearch}
            type="primary"
            disabled={state.isSearching}
          >
            Search
          </Button>
          {state.isSearching && <Loader className="mx-2" />}
        </div>
      </div>
      {/* {props.showFilter?.filter && props.showFilter?.filterValue} */}
      {props.optional ? optionalParam() : []}
      <Loader show={props.loader} message={spinner} contentBlur={0.1}>
        <AntTable
          columns={columns}
          // dataSource={props.dataSource}
          dataSource={filteredData?.map((item, index) => ({ ...item, index: index + 1 }))}
          size="middle"
          loading={props.loading}
          style={{ overflowX: "auto" }}
          showSorterTooltip={false}
        />
      </Loader>
    </div>
  );
}
