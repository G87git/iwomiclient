import React, { useEffect, useReducer, useState } from "react";
import { Form, Modal, Tabs } from "antd";
import Tab1 from "@/components/monetic/Tab1";
import Tab2 from "@/components/monetic/Tab2";
import Tab3 from "@/components/monetic/Tab3";
import apiClient from "api";
import { getSelectData } from "utils";
import { useRouter } from "next/router";

export default function AnormalyComponent({consult}) {
  const [current, setCurrent] = useState("1");
  const [form] = Form.useForm()

  const reducer = (prevState, newState) => ({ ...prevState, ...newState });
  const [state, dispatch] = useReducer(reducer, { data: [] });

  const router = useRouter();
  let alias = router.query.alias;


  async function fetchCountries() {
    dispatch({ fetchingCountry: true });
    let response = await apiClient({
      method: "post",
      url: "/monet/getAccsInfoByCpt/",
      body: { etab: "001" },
    });
    let countries = response.data.ctry2 || [];
    let merchant = response.data.mcc || [];

    let countryData = getSelectData(countries, "nicename", "iso");
    let merchantData = getSelectData(merchant, null, null, true);
    dispatch({ countryData, merchantData, fetchingCountry: false });
  }

  const submit = async (values = {}) => {
    let cdata = {
      alias: "",
      nom: "tes33",
      prenom: "test 45",
      lnai: "Dla",
      dnai: "2023-02-06",
      tpid: "01",
      ddel: "2023-02-06",
      npid: "120213155",
      ldel: "del",
      rccm: "0125462",
      ncc: "152",
      etab: "001",
      dou: "2023-02-06 11:28:10",
      dmo: "2023-02-06 11:28:10",
      sta: "0",
      eta: "2",
      niv: "1",
      uti: "000192",
      utimo: "000192",
      brch: "LIBELLE",
      code_service: "",
      orig: "",
      libelle: "",
    };

    let body = { ...cdata, ...values };
    dispatch({ loading: true });
    let response = await apiClient({
      method: "post",
      url: "/monet/beginSubcribeCli/",
      body,
    });

    if (response.data.status === "01") {
      Modal.success({ title: "Merchant Created" });
    } else {
      Modal.error({ title: "An error occured" });
    }
    dispatch({ loading: false });
  };

  async function searchData() {
    dispatch({ loading: true });
    let response = await apiClient({
      method: "post",
      url: "/monet/getAccsInfoByCptD",
      body: { etab: "001", alias },
    });

    let data = response.data.info;
    form.setFieldsValue(data);
    dispatch({ loading: false });
  }

  useEffect(() => {
    fetchCountries();

    if (alias) {
      searchData();
    }
  }, []);

  return (
    <div >
      <Form  labelCol={{span: 8}} labelAlign="left"  onFinish={submit} form={form}> 
        <Tabs activeKey={current} onChange={setCurrent}>
          <Tabs.TabPane key="1" tab="Banking Informations">
            <Tab1 goto={setCurrent} consult={consult} merchantData={state.merchantData} />
          </Tabs.TabPane>
          <Tabs.TabPane key="2" tab="TPE Configuration">
            <Tab2 goto={setCurrent} consult={consult} countryData={state.countryData} />
          </Tabs.TabPane>
          <Tabs.TabPane key="3" tab="Account Configuration" >
            <Tab3 goto={setCurrent} consult={consult} loading={state.loading} />
          </Tabs.TabPane>
        </Tabs>
      </Form>
    </div>
  );
}


