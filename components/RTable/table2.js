
import React, { useMemo, useReducer, useRef, useEffect } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
  useRowSelect,
} from "react-table";
import { CheckPicker, InputNumber, Loader } from "rsuite";

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
    <div className="search-box me-2 mb-2 d-inline-block">
      <div className="position-relative">
        <input
          type="text"
          className="form-control"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Rechercher..."
        />
        <i className="bx bx-search-alt search-icon"></i>
      </div>
    </div>
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
      <div className="editable-select-container">
        <select
          onChange={handleSelect}
          value={value}
          className="form-select editable-select"
        >
          <option value="null">Choisir...</option>
          {datalist &&
            datalist.map((elm, index) => (
              <option key={index} value={elm.value}>
                {elm.label}
              </option>
            ))}
        </select>
      </div>
    );
  } else if (type === "check") {
    let editable = true;

    if (key && allowedObj && allowedObj[values[key]]) {
      editable = allowedObj[values[key]].includes(id);
    }
    return (
      <div className="form-check">
        <input
          disabled={!editable}
          className="form-check-input"
          type="checkbox"
          checked={value}
          onChange={handleCheck}
        />
      </div>
    );
  } else if (type === "text") {
    return (
      <div className="editable-select-container">
        <input
          value={value}
          className="form-control editableCell"
          type="text"
          onChange={onChange}
          onBlur={onBlur}
          placeholder="..."
        />
      </div>
    );
  } else if (type === "number") {
    return (
      <div className="editable-select-container">
        <InputNumber
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
        <CheckPicker
          data={value ? value.data || [] : []}
          value={value ? value.value || [] : []}
          onChange={handleExclude}
          style={{ width: 224 }}
        />
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

  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        ref={resolvedRef}
        {...rest}
      />
    </div>
  );
});

export default function RTable({
  defaultPageSize = 10,
  getSelectedFlatRows,
  isLoading,
  columns,
  data,
  hideAdvancedSearch,
  hideRowCount,
  hidePagination,
  TableActions,
  getSelectedRows,
  hideFilter,
  hideCheckbox,
  updateMyData,
  skipPageReset,
  editable,
  colorRows = [],
}) {
  columns = useMemo(() => columns, [columns]);
  data = useMemo(() => data, [data]);
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
    <div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row mb-2">
                {!hideFilter && (
                  <div className="col-lg-6 d-flex justify-content-start">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <GolbalFilterComponent
                        setGlobalFilter={setGlobalFilter}
                        globalFilter={globalFilter}
                      />

                      <div
                        className="dataTables_length"
                        style={{ width: "200px" }}
                      >
                        <label
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <span>show</span>{" "}
                          <select
                            value={pageSize}
                            onChange={(e) => {
                              setPageSize(e.target.value);
                            }}
                            className="custom-select custom-select-md form-control mx-2 form-control-md form-select form-select-md"
                          >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value={data.length}>All</option>
                          </select>
                          <span className="ml-0"> entries</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
                <div className="col-lg-6 d-flex justify-content-end flex-row  align-items-center">
                  {TableActions && <TableActions />}
                </div>
              </div>

              <div className="table-responsive">
                <table className="table-fixed">
                  <thead className="table-light">
                    {headerGroups.map((headerGroup, i) => (
                      <tr {...headerGroup.getHeaderGroupProps} key={i}>
                        {headerGroup.headers.map((column, index) => (
                          <th
                            {...column.getHeaderProps(
                              column.getSortByToggleProps()
                            )}
                            className="align-middle"
                            key={index}
                          >
                            {column.render("Header")}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>

                  <tbody {...getTableBodyProps()} className="table-body">
                    {page.map((row, i) => {
                      prepareRow(row);
                      let index = colorRows.map((row) => row.index);
                      let currentColor =
                        colorRows.filter(
                          (color) => row.original.id === color.index
                        )[0] || {};
                      return (
                        <tr
                          {...row.getRowProps}
                          key={i}
                          style={{
                            backgroundColor: `${
                              index.includes(row.original.id)
                                ? currentColor.color
                                  ? currentColor.color
                                  : " "
                                : ""
                            }`,
                            color: `${currentColor.color ? "white" : "black"}`,
                          }}
                        >
                          {row.cells.map((cell, index) => {
                            return (
                              <td
                                {...cell.getCellProps}
                                key={index}
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
                <div className="d-flex justify-content-center align-items-center py-5">
                  <Loader />
                </div>
              )}
              {/* Table Pagination */}
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
              {!hideRowCount && (
                <div className="row">
                  <div className="col-sm-4 p-0 m-0">
                    <h6 className="d-flex">
                      Total:{" "}
                      <p className="mx-2 " style={{ fontWeight: "normal" }}>
                        {rows.length} rows
                      </p>
                    </h6>
                  </div>
                </div>
              )}
            </div>
          </div>
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
    let maxLength = 5;
    let length = 3;
    let pages = getPageCountArray(pageCount);
    let pagesLength = pages.length;
    let start = activePage;
    let end = activePage + length - 1;
    let res = pagesLength > maxLength ? [] : pages;
    if (pagesLength > maxLength) {
      if (activePage === 1) {
        start = 1;
        end = length + 1;
      } else if (activePage === pagesLength) {
        start = pagesLength - length;
        end = pagesLength;
      } else if (
        activePage - length > 0 &&
        pagesLength - activePage > length - 1
      ) {
        start = activePage;
        end = activePage + length - 1;
      } else if (pagesLength - activePage < length - 1) {
        start = pagesLength - length;
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
    <ul className="pagination pagination-rounded justify-content-end mb-2">
      <li
        className={`page-item ${!canPreviousPage && "disabled"}`}
        onClick={previousPage}
      >
        <span className="page-link" aria-label="Previous">
          <i className="mdi mdi-chevron-left"></i>
        </span>
      </li>

      {getPagination().map((page, key) => {
        return (
          <li
            className={`page-item ${page === activePage && "active"}`}
            key={key}
            onClick={() => {
              gotoPage(page - 1);
            }}
          >
            <span className={`page-link ${page === activePage && "bg-dark"}`}>
              {page}
            </span>
          </li>
        );
      })}
      <li
        className={`page-item ${!canNextPage && "disabled"}`}
        onClick={nextPage}
      >
        <span className="page-link">
          <i className="mdi mdi-chevron-right"></i>
        </span>
      </li>
    </ul>
  );
};
