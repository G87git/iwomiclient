import { useField } from "formik";
import React from "react";

const TextArea = ({ name, onChange, onBlur, placeholder }) => {
  return (
    <>
      <textarea
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        placeholder={placeholder}
        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
      ></textarea>
    </>
  );
};

export default TextArea;
