import React from "react";
import { Row, Col } from "antd";
import CardOne from "@/components/Dashboard/CardOne";
import CardTwo from "@/components/Dashboard/CardTwo";
import CardThree from "@/components/Dashboard/CardThree";
import CardFour from "@/components/Dashboard/CardFour";

const dashboard = () => {
  return (
    <>
      <Row gutter={[16, 16]} className="mb-4">
        <Col xs={24} sm={12} md={6} xl={6}>
          <CardOne />
        </Col>
        <Col xs={24} sm={12} md={6} xl={6}>
          <CardTwo />
        </Col>
        <Col xs={24} sm={12} md={6} xl={6}>
          <CardThree />
        </Col>
        <Col xs={24} sm={12} md={6} xl={6}>
          <CardFour />
        </Col>
      </Row>
    </>
  );
};

export default dashboard;
