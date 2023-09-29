import { FaSort } from "react-icons/fa";

export default function Select({ options = [], ...rest }) {
  return (
    <div className="inline-block relative w-full">
      <select
        {...rest}
        className="block appearance-none w-full bg-white border border-gray-300 hover:border-primaryColor px-4 py-2.5 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
      >
        <option></option>
        {options.map((option) => (
          <option key={option.value} value={option.key}>
            {option.label}
          </option>
        ))}
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <FaSort />
      </div>
    </div>
  );
}
