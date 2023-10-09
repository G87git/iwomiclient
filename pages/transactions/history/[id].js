import React, { useEffect, useReducer, useState } from "react";
import { Spin, Tabs } from "antd";
import apiClient from "api";
import { useRouter } from "next/router";
import { NumericFormat } from "react-number-format";
import RTable from "@/components/RTable";

export default function ConsultTransfer() {
  const [current, setCurrent] = useState("0");

  const reducer = (prevState, newState) => ({ ...prevState, ...newState });
  const [state, dispatch] = useReducer(reducer, { data: [] });

  const router = useRouter();
  let id = router.query.id;
  let idexten = router.query.idexten;

  async function searchData() {
    dispatch({ loading: true });
    let response = await apiClient({
      method: "post",
      url: "/api/v2/workflow/consultAFlowHistory",
      body: {
        stateId: id,
        userProfile: "string",
        username: "237683501637",
      },
    });
    if (idexten) {
      let infoData = await getTransferInfo();
      dispatch({ loading: false, data: response.data.data, infoData });
    } else {
      dispatch({ loading: false, data: response.data.data });
    }
  }

  async function getTransferInfo() {
    return new Promise(async (resolve, _) => {
      let response = await apiClient({
        method: "get",
        url: `/api/v1/transfer/piece?piece=${idexten}`,
      });

      if (response.data.status === "01") {
        resolve(response.data.data);
      } else {
        resolve([]);
      }
    });
  }

  useEffect(() => {
    if (id) {
      searchData();
    }
  }, []);

  const columns = [
    {
      Header: "piece",
      accessor: "piece",
    },
    {
      Header: "type",
      accessor: "type",
    },
    {
      Header: "nature",
      accessor: "nature",
    },
    {
      Header: "compte",
      accessor: "compte",
    },
    {
      Header: "agence",
      accessor: "agence",
    },
    {
      Header: "sens",
      accessor: "sens",
      Cell: ({ value }) => (value === "D" ? "Debit" : "Credit"),
    },

    {
      Header: "Amount",
      accessor: "amount",
      Cell: ({ value }) => {
        return (
          <NumericFormat
            value={value}
            displayType="text"
            thousandSeparator=" "
            suffix="XAF"
          />
        );
      },
    },
    {
      Header: "Date",
      accessor: "dateOperation",
    },
  ];

  return (
    <div>
      <h6 className="text-lg">Transfer consultation</h6>
      {state.loading ? (
        <div className="w-full h-80 flex justify-center items-center">
          <Spin />
        </div>
      ) : (
        <Tabs activeKey={current} onChange={setCurrent}>
          {state.data?.map((d, i) => {
            return (
              <Tabs.TabPane key={i} tab={d?.state?.name}>
                <div className="grid grid-cols-3 p-4 bg-gray-100 gap-4">
                  {Object.keys(d.heading).map((head) => {
                    return (
                      <div className="flex flex-col ">
                        {" "}
                        <span className="uppercase">
                          {d.heading[head]}:{" "}
                        </span>{" "}
                        <span className="text-primary text-lg">
                          {d.data[head]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </Tabs.TabPane>
            );
          })}

          { idexten && <Tabs.TabPane key="3" tab="Transaction Details">
            <RTable hideCheckbox hidePagination hideFilter columns={columns} data={state.infoData || []} />
          </Tabs.TabPane>}
        </Tabs>
      )}
    </div>
  );
}
