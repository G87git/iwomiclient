import routes from "../routes/routes";
import { FaRegEnvelope, FaUserCircle } from "react-icons/fa";
import { BellIcon, ChevronDownIcon, MenuIcon, SunIcon } from "@heroicons/react/solid";
import Link from "./Link";

export default function Header() {

  function toogleNightMode() {
    parent.classList.toggle("dark");
  }
  return (
    <header className="sticky top-0 left-0 z-50">
      <div className="h-20 bg-white flex items-center justify-between px-20 z-50">
        <div className="flex items-center space-x-2">
          <img src="/images/logo.jpg" alt="Logo" className="w-10" />
          <h5 className="font-bold text-sm text-primaryColor">
            SOCIETE GENERALE
            <br /> CAMEROUN
          </h5>
        </div>
        <div className="px-40">
          <ul className="font-semibold flex h-full items-center">
            {routes.header.map((head) => (
              <Link
                href={head.path}
                activeClassName="border-t-4 bg-red-500"
                className="
                    border-transparent
                    flex
                    items-center
                    h-full
                    pb-4
                    pt-2
                    text-sm
                    px-4
                    border-red-500
                    bg-opacity-10"
              >
                {" "}
                <li> {head.name} </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="flex items-center space-x-10">
          <section className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-white bg-site-theme-primary-color px-1 rounded">
              {" "}
              <FaRegEnvelope className="text-xl" />{" "}
              <h5 className="text-lg">5</h5>{" "}
            </button>
          </section>
          <a href="/">
            <button className="flex items-center space-x-2 font-semibold text-4xl">
              {" "}
              <FaUserCircle />
            </button>
          </a>
        </div>
      </div>
    </header>
  );
}
