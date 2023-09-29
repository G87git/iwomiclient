import { useFormikContext } from "formik";

const FormButton = ({children}) => {
    const { handleSubmit } = useFormikContext();

return (
  <button
    onClick={handleSubmit}
    type='submit'
    className="inline-flex items-center w-full justify-center px-6 font-medium py-2 tracking-wide text-white transition duration-200 rounded shadow-md !bg-primary hover:bg-purple-700 focus:outline-none"
  >
    {children}
  </button>
)
}

export default FormButton;