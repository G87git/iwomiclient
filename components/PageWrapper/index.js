import React from "react";

export default function PageWrapper({ title }) {
  return (
    <header className="flex space-x-4 mb-4 justify-between">
      <h2 className="text-lg font-bold">{title}</h2>
    </header>
  );
}
