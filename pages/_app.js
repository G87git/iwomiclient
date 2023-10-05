import "../index.css";
import "../styles/nprogress.css";
import Layout from "@/components/Layout";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import { Button, ConfigProvider, Space } from "antd";

//import 'rsuite/dist/rsuite.min.css';
//import '../styles/globals.css';

require("../styles/variables.less");

Router.onRouteChangeStart = (url) => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => NProgress.done();

Router.onRouteChangeError = () => NProgress.done();

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  if (router.pathname === "/auth/login") {
    return <Component {...pageProps} />;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
