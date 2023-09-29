import React, { useMemo, useReducer, useRef, useEffect } from "react";
import InputField from "./../input-field";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
  useRowSelect,
} from "react-table";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/solid";
import {
  FaSort,
  FaSortUp,
  FaSortDown,
  FaSearch,
  FaFilePdf,
  FaFileCsv,
  FaFileExcel,
  FaEnvelope,
} from "react-icons/fa";
import { BsCalendar } from "react-icons/bs";
import { BiChevronRightCircle } from "react-icons/bi";
// import Loader from "../loader";
export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter, Header } = column;
  return (
    <>
      <InputField
        type="search"
        label={Header || "Name"}
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </>
  );
};
// Global Filter component
export const GolbalFilterComponent = ({ globalFilter, setGlobalFilter }) => {
  return (
    <div className="inline-block relative w-64">
      <input
        type="search"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Enter Keyword"
        className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
      />
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <FaSearch className="text-primaryColor" />
      </div>
    </div>
  );
};
const EditableCell = ({
  value: initialValue,
  row: { index, values },
  column: { id, type, data, defaultData },
  updateMyData,
}) => {
  const [value, setValue] = React.useState(initialValue);

  const datalist = defaultData ? values[defaultData] || [] : data;

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = (e) => {
    updateMyData(index, id, e.target.value);
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
    return <div className="editable-select-container">
      <select onChange={handleSelect} value={value} className="form-select editable-select">
        <option value={null}>Choisir...</option>
    {datalist && datalist.map((elm, index)=> <option key={index} value={elm.value} >{elm.label}</option>)}
    </select>
    </div>
  } else if (type === "check") {
    return <div className="form-check">
             <input className="form-check-input" type="checkbox" checked={value} onChange={handleCheck} />
           </div>
  } else if (type === "text") {
    return <div className="editable-select-container"><input value={value} className="form-control editableCell" type="text" onChange={onChange} onBlur={onBlur} placeholder="..." /></div>
  } else if (type === "number") {
    // return <div className="editable-select-container"><InputNumber min="0" value={value} className="editableCell" onChange={(e)=>{handleSelect({target: {value: e}})}} /></div>
  } else if (type === "file") {
    return <div className="editable-select-container"><input  className="form-control" type="file" onChange={handleSelectFiles} placeholder="..." /></div>
  } else if (type === "exclude") {
    // return <div className="editable-select-container"><CheckPicker data={value ? value.data || [] : []} value={value ? value.value || [] : []} onChange={handleExclude} style={{ width: 224 }} /></div>
  }
  return value || "";
};
const Checkbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <div className="w-max">
      <input
        className="dark:bg-dark-container"
        type="checkbox"
        ref={resolvedRef}
        {...rest}
      />
    </div>
  );
});

export default function TableComponent({
  defaultPageSize = 10,
  getSelectedFlatRows,
  isLoading,
  columns,
  data,
  hideAdvancedSearch,
  hideRowCount,
  hidePagination,
  hideSearch,
  TableActions,
  getSelectedRows,
  hideFilter,
  hideCheckbox,
  updateMyData,
  skipPageReset,
  editable,
}) {
  columns = useMemo(() => columns, [columns]);
  data = useMemo(() => (isLoading ? [] : data), [data]);
  const defaultColumn = editable
    ? { Filter: ColumnFilter, Cell: EditableCell }
    : { Filter: ColumnFilter };
  var filter = useRef(null);
  var icon = useRef(null);
  const {
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageCount,
    gotoPage,
    setGlobalFilter,
    rows,
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
          // Let's make a column for selection
          {
            id: "selection",
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              <Checkbox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
        ]);
    }
  );

  const { pageIndex, pageSize, globalFilter, selectedRowIds } = state;
  const reducer = (prevState, action) => ({ ...prevState, ...action });
  const [tableState, dispatch] = useReducer(reducer, {});

  const AnimateFilter = () => {
    if (!tableState.showFilter) {
      tableState.iconRef.classList.add("rotate");
      tableState.iconRef.classList.remove("rotate-rev");
      tableState.filterRef.classList.add("fade-up");
      tableState.filterRef.classList.remove("fade-down");
    } else {
      tableState.iconRef.classList.add("rotate-rev");
      tableState.iconRef.classList.remove("rotate");
      tableState.filterRef.classList.add("fade-down");
      tableState.filterRef.classList.remove("fade-up");
    }
    dispatch({ showFilter: !tableState.showFilter });
  };

  useEffect(() => {
    dispatch({ filterRef: filter.current, iconRef: icon.current });
  }, [icon]);

  getSelectedRows && getSelectedRows(selectedRowIds);
  getSelectedFlatRows && getSelectedFlatRows(selectedFlatRows);
  return (
    <div className="dark:bg-dark-container max-w-full overflow-hidden rounded">
      {!hideAdvancedSearch && (
        <div className="mb-2">
          <div className="bg-white border border-gray-800 p-2 mt-2 py-6 pb-8 rounded-lg">
            {headerGroups.map((headerGroup, i) => (
              <div
                className="grid grid-cols-3 gap-4"
                {...headerGroup.getHeaderGroupProps}
                key={i}
              >
                {headerGroup.headers.map(
                  (column) =>
                    column.canFilter &&
                    column.id !== "selection" &&
                    column.render("Filter")
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex justify-between w-full items-center">
        {!hideFilter && (
          <div className="flex flex-1">
            <div className="flex space-x-4 items-center">
              <div className="inline-block relative w-64">
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(e.target.value);
                  }}
                  className="block appearance-none rounded w-full bg-white border border-gray-700 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="10">Show 10 entries</option>
                  <option value="25">Show 25 entries</option>
                  <option value="50">Show 50 entries</option>
                  <option value="100">Show 100 entries</option>
                  <option value={data.length}>Show all entries</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FaSort className="text-primaryColor" />
                </div>
              </div>
              {/* <div className="flex items-center space-x-4">
                <div className="inline-block relative w-64">
                  <input
                    type="date"
                    className="block h-9 appearance-none w-full bg-white border border-gray-700 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <BsCalendar className="text-primaryColor" />
                  </div>
                </div>
                <h6>to</h6>
                <div className="inline-block relative w-64">
                  <input
                    type="date"
                    className="block h-9 appearance-none w-full bg-white border border-gray-700 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <BsCalendar className="text-primaryColor" />
                  </div>
                </div>
              </div> */}
              {/* <button className="font-semibold text-white border border-primaryColor p-1 px-2 bg-primaryColor flex items-center space-x-2 text-sm rounded">
                <h6>Show</h6>
                <BiChevronRightCircle className="text-xl" />
              </button> */}
            </div>
          </div>
        )}
        {/* <button className="text-sm dark:bg-dark-container dark:border-gray-600 bg-white border border-gray-300 rounded flex justify-center align-center px-4 py-2 text-primary">
          <FilterIcon className="w-5 h-5 mr-2" />
          Filter
        </button> */}
        {/* <div className="">{TableActions && <TableActions />}</div> */}
        {!hideSearch && (
          <GolbalFilterComponent
            setGlobalFilter={setGlobalFilter}
            globalFilter={globalFilter}
          />
        )}
      </div>

      <div className="dark:bg-dark-container rounded-md w-full mt-5">
        <div className="overflow-auto border border-gray-700 dark:border-dark-container sm:rounded">
          <table className="min-w-full dark:divide-dark-container">
            <thead className="dark:bg-dark-container py-4 h-12 border-b border-gray-700">
              {headerGroups.map((headerGroup, i) => (
                <tr
                  {...headerGroup.getHeaderGroupProps}
                  key={i}
                  className="divide-x divide-gray-700"
                >
                  {headerGroup.headers.map((column, index) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="px-3 text-left font-semibold text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider rounded"
                      key={index}
                    >
                      <div className="flex justify-between">
                        {column.render("Header")}
                        <div>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <FaSortDown className="text-base text-primaryColor" />
                            ) : (
                              <FaSortUp className="text-base text-primaryColor" />
                            )
                          ) : (
                            <FaSort className="text-base text-primaryColor" />
                          )}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody
              {...getTableBodyProps()}
              className="dark:divide-dark-container dark:bg-dark-input"
            >
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps}
                    key={i}
                    className="table-row divide-x divide-gray-700"
                  >
                    {row.cells.map((cell, index) => {
                      return (
                        <td
                          {...cell.getCellProps}
                          key={index}
                          title={cell.render("Cell")}
                          className="whitespace-nowrap dark:text-gray-200 py-3 px-2"
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
        </div>
        {isLoading && (
          <div className="flex items-center justify-center pb-2 pt-10">
            {/* <Loader /> */}
          </div>
        )}
        {!isLoading && data.length === 0 && (
          <div className="flex items-center justify-center pb-2 pt-10">
            <p className="text-lg text-gray-500">No data to display</p>
          </div>
        )}
        {/* Table Pagination */}
        <div
          className={`p-2 py-0 flex justify-between items-center ${
            !hideRowCount && !hidePagination ? "border" : ""
          } border-gray-700 rounded mt-2`}
        >
          {!hideRowCount && (
            <div className="flex items-center space-x-10">
              <h6 className="font-bold">Exporter</h6>

              <div className="flex space-x-6 items-center">
                <button className="flex items-center space-x-1 font-semibold">
                  <FaFilePdf /> <h6>PDF</h6>
                </button>
                <button className="flex items-center space-x-1 font-semibold">
                  <FaFileExcel /> <h6>EXCEL</h6>
                </button>
                <button className="flex items-center space-x-1 font-semibold">
                  <FaFileCsv /> <h6>CSV</h6>
                </button>
                <button className="flex items-center space-x-1 font-semibold">
                  <FaEnvelope /> <h6>EMAIL</h6>
                </button>
              </div>
            </div>
          )}
          {!hidePagination && (
            <Pagination
              canNextPage={canNextPage}
              canPreviousPage={canPreviousPage}
              activePage={pageIndex + 1}
              nextPage={nextPage}
              previousPage={previousPage}
              pageCount={pageCount}
              gotoPage={gotoPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}

const Pagination = ({
  activePage,
  pageCount,
  canNextPage,
  canPreviousPage,
  nextPage,
  previousPage,
  gotoPage,
}) => {
  const getPageCountArray = (pagec) => {
    const res = [];
    for (let i = 1; i <= pagec; i++) {
      res.push(i);
    }
    return res;
  };

  const getPagination = () => {
    let pages = getPageCountArray(pageCount);
    let pagesLength = pages.length;
    let start = activePage;
    let end = activePage + 7;
    let res = pagesLength > 10 ? [] : pages;
    if (pagesLength > 10) {
      if (activePage === 1) {
        start = 1;
        end = 9;
      } else if (activePage === pagesLength) {
        start = pagesLength - 8;
        end = pagesLength;
      } else if (activePage - 8 > 0 && pagesLength - activePage > 7) {
        start = activePage;
        end = activePage + 7;
      } else if (pagesLength - activePage < 7) {
        start = pagesLength - 8;
        end = pagesLength;
      }

      for (let i = start; i <= end; i++) {
        if (i < pagesLength + 1) {
          res.push(i);
        }
      }

      if (!res.includes(1) && !res.includes(pagesLength)) {
        res = [1, ...res, pagesLength];
      } else if (!res.includes(1) && res.includes(pagesLength)) {
        res = [1, ...res];
      } else if (res.includes(1) && !res.includes(pagesLength)) {
        res = [...res, pagesLength];
      }
    }
    return res;
  };

  return (
    <div className="p-2 flex space-x-1">
      <button
        className={`w-8 h-8 flex justify-center items-center`}
        onClick={previousPage}
        disabled={!canPreviousPage}
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>

      {getPagination().map((page, key) => {
        return (
          <button
            className={`w-8 h-8 flex rounded justify-center items-center dark:text-gray-300  bg-gray-200 ${
              page === activePage
                ? "bg-gray-900 dark:bg-primary  text-white"
                : " dark:bg-dark-input "
            }`}
            key={key}
            onClick={() => {
              gotoPage(page - 1);
            }}
          >
            <span className={`page-link ${page === activePage && "bg-dark"}`}>
              {page}
            </span>
          </button>
        );
      })}
      <button
        className={`w-8 h-8 flex justify-center items-center`}
        onClick={nextPage}
      >
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
};
