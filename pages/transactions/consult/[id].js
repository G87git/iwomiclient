import React, { useEffect, useReducer, useState } from "react";
import { Spin, Tabs } from "antd";
import apiClient from "api";
import { useRouter } from "next/router";

export default function ConsultTransfer() {
  const [current, setCurrent] = useState("0");

  const reducer = (prevState, newState) => ({ ...prevState, ...newState });
  const [state, dispatch] = useReducer(reducer, { data: [] });

  const router = useRouter();
  let id = router.query.id;

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
    console.log(response);
    dispatch({ loading: false, data: response.data.data });
  }

  useEffect(() => {
    if (id) {
      searchData();
    }
  }, []);

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
        </Tabs>
      )}
    </div>
  );
}
