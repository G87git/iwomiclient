import { Input } from "antd";
import React from "react";

const TextInput = ({ name, type, placeholder, value, onChange, onBlur }) => {
  return type === "password" ? (
    <Input.Password
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      className="h-[42px] w-full !bg-gray-100 bg-opacity-50 !rounded !border !border-gray-300 focus:!border-indigo-500 focus:!bg-white focus:!ring-2 focus:!ring-indigo-200 !text-base !outline-none !text-gray-700 !py-1 !px-3 !leading-8 !transition-colors !duration-200 !ease-in-out"
    />
  ) : (
    <input
      type={type ? "text" : type}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
    />
  );
};

export default TextInput;
