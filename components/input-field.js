import Description from "./description";
import { AiOutlineExclamationCircle } from "react-icons/ai";
export default function InputField({
  label,
  message,
  error,
  LeftIcon,
  RightIcon,
  name = "",
  onClickLeftIcon = () => {},
  onClickRightIcon = () => {},
  onChange,
  onBlur,
  value = "",
  type = "text",
  required,
  inputclass,
  containerClass,
  placeholder,
  requiredLabel,
}) {
  return (
    <div className={`${containerClass}`}>
      {label && (
        <label
          className={`text-base ${
            error ? "text-red-500" : "text-secondary"
          }  dark:text-white mb-1`}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div className="flex items-center justify-center h-10 rounded relative">
        {LeftIcon && (
          <LeftIcon
            onClick={onClickLeftIcon}
            className={`${
              error ? "text-red-500" : "text-primary"
            }  w-4 h-4 absolute left-1 top-1/2 transform -translate-y-1/2`}
          />
        )}
        <input
          value={value}
          id={name}
          className={`flex-1 dark:bg-dark-container dark:text-white dark:border-gray-700 pl-4 ${
            error
              ? "border-red-500 text-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 text-black focus:ring-primary focus:border-primary"
          }  pr-2 h-full focus:ring  focus:ring-opacity-25 rounded border ${
            RightIcon ? "pr-10" : ""
          } ${LeftIcon ? "pl-10" : ""} ${inputclass}`}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          type={type}
          required={required}
        />
        <div className="absolute top-0 -mt-6 right-1">
          <Description>{requiredLabel}</Description>
        </div>
        {RightIcon && (
          <RightIcon
            className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            onClick={onClickRightIcon}
          />
        )}
        {error && (
          <AiOutlineExclamationCircle className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500" />
        )}
      </div>
      <Description error={error}>{error ? error : message}</Description>
    </div>
  );
}
