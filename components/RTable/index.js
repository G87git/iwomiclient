import React from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
  useRowSelect,
} from "react-table";
import {
  Checkbox as AntCheckBox,
  Select as AntSelect,
  Input as AntInput,
  InputNumber as AntInputNumber,
  Input,
  Menu,
  Dropdown,
  Spin,
  Pagination,
} from "antd";
import { FaSearch } from "react-icons/fa";
import tableExport from "antd-table-export";
import CsvDownloader from "react-csv-downloader";

// Column Filter Component
export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter, Header } = column;
  return (
    <div className="col-sm-3 mt-4">
      <h6 className="">{Header || "Name"}</h6>
      <input
        type="search"
        className="form-control"
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};
// Global Filter component
export const GolbalFilterComponent = ({ globalFilter, setGlobalFilter }) => {
  return (
    <Input
      type="text"
      className="max-w-xs"
      value={globalFilter}
      onChange={(e) => setGlobalFilter(e.target.value)}
      placeholder="Rechercher..."
      suffix={<FaSearch />}
    />
  );
};
const EditableCell = ({
  value: initialValue,
  row: { index, values },
  column: { id, type, data, defaultData, allowedObj, key },
  updateMyData,
}) => {
  const [value, setValue] = React.useState(initialValue);

  const datalist = defaultData ? values[defaultData] || [] : data;

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = (e) => {
    updateMyData(
      index,
      id,
      e.target.value === "null" ? undefined : e.target.value
    );
  };
  const handleCheck = (e) => {
    updateMyData(index, id, e.target.checked);
  };

  const onBlur = () => {
    updateMyData(index, id, value);
  };

  const handleSelectFiles = ({ target }) => {
    updateMyData(index, id, target.files);
  };

  const handleExclude = (e) => {
    updateMyData(index, id, e);
  };

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  if (type === "select") {
    return (
      <AntSelect onChange={handleSelect} value={value}>
        <AntSelect.Option value="null">Choisir...</AntSelect.Option>
        {datalist?.map((elm, index) => (
          <AntSelect.Option key={index} value={elm.value}>
            {elm.label}
          </AntSelect.Option>
        ))}
      </AntSelect>
    );
  } else if (type === "check") {
    let editable = true;

    if (key && allowedObj && allowedObj[values[key]]) {
      editable = allowedObj[values[key]].includes(id);
    }
    return (
      <div className="editable-select-container">
        <AntCheckBox
          disabled={!editable}
          checked={value}
          onChange={handleCheck}
        />
      </div>
    );
  } else if (type === "text") {
    return (
      <div className="editable-select-container">
        <AntInput
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="..."
        />
      </div>
    );
  } else if (type === "number") {
    return (
      <div className="editable-select-container">
        <AntInputNumber
          min="0"
          value={value}
          className="editableCell"
          onChange={(e) => {
            handleSelect({ target: { value: e } });
          }}
        />
      </div>
    );
  } else if (type === "file") {
    return (
      <div className="editable-select-container">
        <input
          className="form-control"
          type="file"
          onChange={handleSelectFiles}
          placeholder="..."
        />
      </div>
    );
  } else if (type === "exclude") {
    return (
      <div className="editable-select-container">
        {/* <CheckPicker
          data={value ? value.data || [] : []}
          value={value ? value.value || [] : []}
          onChange={handleExclude}
          style={{ width: 224 }}
        /> */}
      </div>
    );
  }
  return value || "";
};
const Checkbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return <AntCheckBox ref={resolvedRef} {...rest} />;
});

export default function RTable({
  defaultPageSize = 10,
  getSelectedFlatRows,
  columns,
  data,
  hidePagination,
  getSelectedRows,
  hideFilter,
  hideCheckbox,
  updateMyData,
  skipPageReset,
  editable,
  loading,
  actions,
}) {
  // columns = useMemo(() => columns, [columns]);
  // data = useMemo(() => data, [data]);
  let totalCount = data?.length;
  const exportCol = columns
    .map((h) => ({
      title: h.Header,
      dataIndex: h.accessor,
      key: h.accessor,
    }))
    .filter((e) => e.dataIndex !== "action");

  const exportInstance = new tableExport(data, exportCol);
  const defaultColumn = editable
    ? { Filter: ColumnFilter, Cell: EditableCell }
    : { Filter: ColumnFilter };

  const {
    headerGroups,
    page,
    prepareRow,
    state,
    gotoPage,
    setGlobalFilter,
    setPageSize,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetPage: !skipPageReset,
      updateMyData,
      initialState: {
        pageSize: defaultPageSize,
        hiddenColumns: columns
          .filter((col) => col.show === false)
          .map((col) => col.accessor),
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      !hideCheckbox &&
        hooks.visibleColumns.push((columns) => [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <Checkbox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
        ]);
    }
  );

  const { pageIndex, pageSize, globalFilter, selectedRowIds } = state;
  const Action = () => actions;
  const menu = (
    <Menu>
      <CsvDownloader
        datas={data}
        filename="export.csv"
        columns={columns
          .filter((c) => c.accessor !== "action")
          .map((column) => ({
            displayName: column.Header,
            id: column.accessor,
          }))}
      >
        <Menu.Item key="1">Export CSV</Menu.Item>
      </CsvDownloader>
      <Menu.Item
        key="2"
        onClick={() => {
          exportInstance.download("export", "xlsl");
        }}
      >
        Export Excel
      </Menu.Item>
    </Menu>
  );

  getSelectedRows && getSelectedRows(selectedRowIds);
  getSelectedFlatRows && getSelectedFlatRows(selectedFlatRows);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center">
        <div>
          {!hideFilter && (
            <div className="flex gap-4">
              <GolbalFilterComponent
                setGlobalFilter={setGlobalFilter}
                globalFilter={globalFilter}
              />
              <Dropdown.Button size="large" overlay={menu}>
                Export
              </Dropdown.Button>
            </div>
          )}
        </div>
        <div>{actions && <Action />}</div>
      </div>
      <div className="border  border-b border-gray-200 w-full overflow-x-auto min-w-full">
        <table className="w-full ">
          <thead className="bg-primary">
            {headerGroups.map((headerGroup, i) => (
              <tr {...headerGroup.getHeaderGroupProps}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-6 py-4 text-left h-10 text-xs font-medium text-white uppercase"
                    key={index}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps} key={i} className="hover:bg-gray-100">
                  {row.cells.map((cell, index) => {
                    return (
                      <td
                        {...cell.getCellProps}
                        key={index}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        {loading && (
          <div className="w-full h-80 mx-auto flex justify-center items-center bg-wite">
            <Spin />
          </div>
        )}
      </div>

      {!hidePagination && (
        <div className="flex justify-end">
          <Pagination
            defaultCurrent={1}
            current={pageIndex + 1}
            onShowSizeChange={(_, pSize) => setPageSize(pSize)}
            onChange={(p) => gotoPage(p - 1)}
            total={totalCount}
            showTotal={(total) => `Total ${total} items`}
            showSizeChanger
            pageSize={pageSize}
            showQuickJumper
          />
        </div>
      )}
    </div>
  );
}
