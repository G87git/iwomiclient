import { Spin } from "antd";
import React from "react";
import { Loader } from "rsuite";

export default function LoaderContainer({ className }) {
  return (
    <div className="fixed min-h-full w-full  top-0 left-0 z-40 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
      <Spin size="large" />
    </div>
  );
}
