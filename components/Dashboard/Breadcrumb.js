import React from "react";
import { Breadcrumb as AntBreadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Breadcrumb = ({ pageName }) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <nav>
        <AntBreadcrumb>
          <AntBreadcrumb.Item>
            <Link to="/">
              <HomeOutlined />
            </Link>
          </AntBreadcrumb.Item>
          <AntBreadcrumb.Item className="text-primary">
            {pageName}
          </AntBreadcrumb.Item>
        </AntBreadcrumb>
      </nav>
    </div>
  );
};

export default Breadcrumb;
