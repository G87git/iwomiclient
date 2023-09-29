import React from "react";
import { useFormikContext } from "formik";
import TextInput from "./TextInput";
import ErrorMessage from "./ErrorMessage";
import TextArea from "./TextArea";

function FormField({
  label,
  name,
  type = "text",
  placeholder,
  textarea = false,
}) {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();

  return (
    <>
      <div className="mb-4">
        {/* <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
        {label}
      </FormLabel> */}
        {textarea ? (
          <TextArea 
          onBlur={() => setFieldTouched(name)}
          onChange={(e) => setFieldValue(name, e.target.value)}
          name={name}
          placeholder={placeholder}
          />
        ) : (
          <TextInput
            onBlur={() => setFieldTouched(name)}
            onChange={(e) => setFieldValue(name, e.target.value)}
            // value={values[name]}
            placeholder={placeholder}
            type={type}
            name={name}
          />
        )}
        <ErrorMessage error={errors[name]} visible={touched[name]} />
      </div>
    </>
  );
}

export default FormField;
