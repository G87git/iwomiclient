import { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import Head from "next/head";
import { useRouter } from "next/router";
import ProgressBar from "./progressbar";
import Button from "./button";
import { Dialog } from "@headlessui/react";
import { RiCloseFill } from "react-icons/ri";
const PageLayout = ({ children, title = "", actions, Icon }) => {
  const routes = [
    { name: "Opérations", path: "/operations" },
    { name: "Règlements en attente", path: "/reglement" },
    { name: "Lettres en demeure", path: "/lettre" },
    { name: "Utilisateurs", path: "/users" },
    { name: "Contact manager", path: "/contact" },
  ];
  const router = useRouter();
  const [progressBarActive, setProgressBarActive] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const onRouteChangeStart = () => setProgressBarActive(true);
    const onRouteChangeEnd = () => setProgressBarActive(false);

    router.events.on("routeChangeStart", onRouteChangeStart);
    router.events.on("routeChangeComplete", onRouteChangeEnd);
    router.events.on("routeChangeError", onRouteChangeEnd);

    return () => {
      router.events.off("routeChangeStart", onRouteChangeStart);
      router.events.off("routeChangeComplete", onRouteChangeEnd);
      router.events.off("routeChangeError", onRouteChangeEnd);
    };
  }, [router, setProgressBarActive]);

  function toggleModal () {
    setIsOpen(!isOpen);
  }
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={toggleModal}
        className="w-screen h-screen inset-0 fixed z-10"
      >
        <Dialog.Overlay className="w-full h-full fixed inset-0 bg-black/25" />

        <div className="relative space-y-6 w-full max-w-xl rounded p-4 border border-gray-700 bg-white mx-auto mt-24">
          <Dialog.Title className="flex items-center justify-between">
            <h1>Nouvelles lettres</h1>
            <button onClick={toggleModal}> <RiCloseFill /> </button>
          </Dialog.Title>
          <section className="space-y-3">
            <Letter />
            <Letter />
            <Letter />
          </section>

          <div className="flex justify-end items-center">
            <Button onClick={toggleModal}>Voir</Button>
          </div>
        </div>
      </Dialog>

      <ProgressBar active={progressBarActive} />
      <Head>
        <title>OPI | {title}</title>
      </Head>
      <div className="bg-gray-50 min-h-screen">
        <header className="w-full px-20 flex items-center justify-between h-20 bg-site-theme-primary-color">
          <div className="flex items-center space-x-4">
            {Icon && <Icon className="text-4xl text-white" />}
            <h1 className="text-2xl font-semibold text-white">{title}</h1>
          </div>
          {actions}
        </header>
        <main className="px-20 flex justify-start items-start space-x-8">
          <aside className="w-80 py-4 space-y-8">
            {/* <div>
              <h6 className="border-b-2 border-site-theme-primary-color pb-2 mb-4 text-lg font-bold">
                Favorites
              </h6>
              <ul className="font-semibold space-y-4">
                {routes.map((route, i) => (
                  <div key={i}>
                    <a to={route.path}>
                      <li
                        className={`hover:text-site-theme-primary-hover ${
                          route.path
                            ? "text-black translate-x-2 cursor-pointer"
                            : ""
                        } flex space-x-2 items-center transform transition-all hover:translate-x-2`}
                      >
                        <FaChevronRight />
                        <span>{route.name}</span>
                      </li>
                    </a>
                  </div>
                ))}
              </ul>
            </div> */}

            {/* <div className="bg-red-200 p-4 rounded-lg">
              <h6 className="pb-2 font-bold text-lg mb-2">Besoin d'aide?</h6>
              <div className="space-y-2">
                <h5 className="text-site-theme-primary-color">
                  Contact Manager
                </h5>
                <div>
                  <h6 className="text-base font-semibold">Contact Us</h6>
                  <h5 className="text-xl text-site-theme-primary-color">
                    237 677 859 147
                  </h5>
                </div>
                <div>
                  <h6 className="text-base font-semibold">Email Us</h6>
                  <h5 className="text-xl text-site-theme-primary-color">
                    help@socgen.com
                  </h5>
                </div>
              </div>
            </div> */}
          </aside>
          <aside className="py-2 flex-1 overflow-auto">{children}</aside>
        </main>
      </div>
    </div>
  );
};

export default PageLayout;

const Letter = () => {
  return (
    <div className="border p-2 border-gray-700">
      <h6 className="font-semibold text-sm">Test Letter</h6>
      <p className="text-xs">This is a test lettre coming from the best CO </p>
    </div>
  );
};
