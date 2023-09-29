import { Button as AntButton } from "antd";
import Link from "next/link";

export default function GreenButton(props) {
  const greenButtonStyle = {
    backgroundColor: "green", // Set the background color to green
    borderColor: "green", // Set the border color to green (optional)
    color: "white", // Set the text color to white (optional)
  };

  return (
    <AntButton
      type="primary"
      size="large"
      style={greenButtonStyle} // Apply the custom style
      {...props}
    />
  );
}
