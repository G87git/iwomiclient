import { Tabs } from "antd";
import React from "react";

const { TabPane } = Tabs;

const Index = () => {
  const onChange = (key) => {
    console.log(key);
  };

  return (
    <div>
      <header className="flex space-x-4 mb-4 justify-between">
        <h2 className="text-lg font-bold">User Details </h2>
      </header>
      <Tabs className="bg-white !px-7  !py-5">
        <TabPane tab="Information Client" key="1">
          <div></div>
          <div></div>
        </TabPane>
        <TabPane tab="Informations d'identificatio" key="2">
          2nd TAB PANE Content
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Index;
