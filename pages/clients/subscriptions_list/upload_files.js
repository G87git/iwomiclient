import { Button } from "antd";
import { useRef } from "react";
import { FaTrash } from "react-icons/fa";

export default function UploadFile({
  name,
  accessor,
  handleFileChange,
  files,
  setFiles,
}) {
  const ref = useRef(null);

  return (
    <div className="flex items-center justify-center flex-col">
      <h6 className="mb-2">{`Upload ${name}`}</h6>
      <input
        type="file"
        id="file"
        name={accessor}
        ref={ref}
        className="mt-4"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Button
        size="large"
        type="outlined"
        onClick={() => {
          ref.current.click();
        }}
      >
        Upload
      </Button>
      <div
        style={{ fontSize: "12.5px" }}
        className="mt-2 d-flex align-items-center justify-content-center"
      >
        <div style={{ marginRight: "8px" }}>
          {files ? files[accessor]?.name ?? "" : ""}
        </div>
        {files && files[accessor] && (
          <FaTrash
            style={{ cursor: "pointer" }}
            onClick={() => {
              setFiles((prev) => ({ ...prev, [accessor]: null }));
            }}
            color="red"
            className="ml-2 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}
