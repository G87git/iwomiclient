import Loader from "./loader";
import Link from "next/link"


export default function ButtonComponent({
  children,
  onClick,
  href,
  outline,
  className,
  isloading = false,
}) {

  if (href) return (
    <Link href={href}>    
    <button
      disabled={isloading}
      onClick={onClick}
      className="flex justify-center h-8 text-white bg-site-theme-primary-color rounded items-center  px-3 border-site-theme-primary-color hover:bg-site-theme-primary-color"
    >
      {isloading ? <Loader /> : children}
    </button>
    </Link>
  );
  return (
    <button
      disabled={isloading}
      onClick={onClick}
      className="flex justify-center h-8 text-white bg-site-theme-primary-color rounded items-center  px-3 border-site-theme-primary-color hover:bg-site-theme-primary-color"
    >
      {isloading ? <Loader /> : children}
    </button>
  );
}
