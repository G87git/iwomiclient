import Link from "next/link";
import React from "react";

export default function IconButton({ icon, href, onClick}) {
  const Icon = () => icon;

  if (href) {
    return (
      <Link href={href}>
        <button>{icon && <Icon />}</button>
      </Link>
    );
  }
  return <button onClick={onClick}>{icon && <Icon />}</button>;
}
