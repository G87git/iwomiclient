import React from "react";

function ErrorMessage({ error, visible }) {
  if (!visible || !error) return null;

  return <p className="text-sm text-red-600 mt-2 ml-1"> {error}</p>;
}

export default ErrorMessage;
