import { useFormikContext } from "formik";
import { Select } from "antd";

import ErrorMessage from "./ErrorMessage";
import { borderColor } from "tailwindcss/defaultTheme";

function SelectFormField({ name, options, placeholder, label }) {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();
 
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const filterSort = (optionA, optionB) =>
    (optionA?.label ?? "")
      .toLowerCase()
      .localeCompare((optionB?.label ?? "").toLowerCase());

  const items = options.map((option) => ({
    label: option.label,
    value: option.label,
  }));

  return (
    <>
      <div className="mb-4">
        <Select
          showSearch
          placeholder={placeholder}
          optionFilterProp="children"
          onChange={(value) => setFieldValue(name, value)}
          onBlur={() => setFieldTouched(name)}
          onSearch={onSearch}
          filterOption={filterOption}
          filterSort={filterSort}
          // value={ values[name]}
          name={name}
          bordered={false}
          options={items}
          className="w-full pr-2 bg-gray-100 bg-opacity-50 rounded border !border-gray focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 !py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        {/* <select
          className="w-full pr-2 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder={placeholder}
          name={name}
          value={values[name]}
          onBlur={() => setFieldTouched(name)}
          onChange={(e) => setFieldValue(name, e.target.value)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select> */}
      </div>

      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default SelectFormField;
