import React from "react";
import { Card, Typography, Space } from "antd";
import {
  DollarCircleFilled,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;

const CardTwo = () => {
  return (
    <Card
      className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
      bodyStyle={{ padding: "24px" }}
    >
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        <DollarCircleFilled style={{ fontSize: "20px", color: "#1890ff" }} />
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <Title
            level={4}
            className="text-title-md font-bold text-black dark:text-white"
          >
            $45.2K
          </Title>
          <Text className="text-sm font-medium">Total Profit</Text>
        </div>

        <Space className="text-sm font-medium text-meta-3">
          <span>
            4.35%
            <ArrowUpOutlined style={{ color: "#52c41a" }} />
          </span>
          <span>
            <ArrowDownOutlined style={{ color: "#f5222d" }} />
          </span>
        </Space>
      </div>
    </Card>
  );
};

export default CardTwo;
