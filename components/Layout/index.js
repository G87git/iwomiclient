import { useState, createElement, useEffect } from "react";
import { Button, Dropdown, Layout as AntLayout, Menu } from "antd";
//import { ChevronDownIcon, MenuIcon, SunIcon } from "@heroicons/react/solid";
import Link from "next/link";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { BellIcon } from "@heroicons/react/solid";
//import Link from "./Link";
import Head from "next/head";
import SubMenu from "antd/lib/menu/SubMenu";
import { useRouter } from "next/router";
import PostData from "../../model/PostData";
import routes from "sidebar-links";
const { Header, Sider, Content } = AntLayout;

export default function Layout({ children }) {
  const [state, setState] = useState({
    collapsed: false,
  });

  function getNotifications(interval) {
    PostData(
      {
        method: "post",
        url: "opiback/getUnSeenNotifcationByUser",
        body: { uname: localStorage.getItem("uname") },
      },
      (res) => {
        if (res !== "Error") {
          console.log(res.data);
          const notifications = res.data.map((notification) => ({
            ...notification,
            sbjet: notification[`sbjet_fr`],
            msg: notification[`msg_fr`],
          }));
          setState({ notifications });
        }
      }
    );

    if (!localStorage.getItem("uname")) {
      return clearInterval(interval);
    }
  }

  let t = null;
  useEffect(() => {
    const adminName = localStorage.getItem("name");
    setState({ name: adminName });
    // t = setInterval(() => getNotifications(t), 20000);
  }, []);

  const router = useRouter();
  let pathName = router.pathname;
  let openKey = "";

  for (let i in routes) {
    if (routes[i].subMenu) {
    }
    const currentRoute = routes[i].subMenu?.find(
      (r) => router.pathname.indexOf(r.path) > -1
    );
    if (currentRoute) {
      openKey = `${i}.${currentRoute.path}`;
      break;
    } else if (pathName.indexOf(routes[i].path) > -1) {
      openKey = routes[i].path;
      break;
    }
  }

  const openNotification = () => {
    notification.open({
      message: <h5>Fichiers En Attente</h5>,
      description: "3 Fichiers en attende de Validation.",
      top: 15,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };

  const button = (
    <Button type="primary" onClick={openNotification}>
      Open the notification box
    </Button>
  );

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        Account Settings
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<LogoutOutlined color="" />}
        className="text-red-500"
      >
        <Link href="/auth/login">
          <span className="text-red-500">Logout</span>
        </Link>
      </Menu.Item>
    </Menu>
  );

  const notification = (
    <div className="max-w-sm shadow max-h-sm border w-80 bg-white p-2">
      <div style={{ maxHeight: "300px", overflowY: "auto" }}>
        {state.notifications?.map((notification, i) => {
          return <NotificationItem {...notification} key={i} />;
        })}
        {state.notifications?.length === 0 && (
          <div className="no-unread">
            <p>No unread notifications</p>
          </div>
        )}
      </div>
    </div>
  );

  // const depthLevel = 0;

  return (
    <AntLayout>
      <Head>
        <title>MOSA</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sider
        className="min-h-screen"
        trigger={null}
        width={300}
        collapsible
        collapsed={state.collapsed}
      >
        <div className="p-2 pt-4 px-6 mb-8 ">
          <img className="w-40" src="/assets/images/iwomi.png" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[openKey]}
          defaultOpenKeys={[openKey[0]]}
          // defaultSelectedKeys={["1"]}
        >
          {routes.map((route, routeKey) => {
            const depthLevel = 0;
            if (route.subMenu) {
              return (
                <SubMenu
                  key={routeKey}
                  title={route.title}
                  icon={route.icon}
                  depthLevel={depthLevel}
                >
                  {route.subMenu.map((submenu) => (
                    <Menu.Item
                      key={`${routeKey}.${submenu.path}`}
                      icon={submenu.icon}
                    >
                      <Link href={submenu.path}>
                        <a>{submenu.title}</a>
                      </Link>
                    </Menu.Item>
                  ))}
                </SubMenu>
              );
            } else {
              return (
                <Menu.Item key={`${route.path}`} icon={route.icon}>
                  <Link href={route.path}>
                    <a>{route.title}</a>
                  </Link>
                </Menu.Item>
              );
            }
          })}
        </Menu>
      </Sider>
      <AntLayout className="site-layout">
        <Header className="site-layout-background p-0 flex justify-between items-center bg-red-400 border">
          {createElement(
            state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
          <div className="w-max flex items-center gap-4">
            <Dropdown
              overlay={notification}
              placement="bottomLeft"
              trigger={["click"]}
            >
              <Button type="text" className="text-lg">
                <BellIcon />
              </Button>
            </Dropdown>

            <Dropdown overlay={menu} trigger={["click"]}>
              <button className="flex space-x-2 items-center">
                <div className="w-8 h-8 rounded-full flex justify-center items-center bg-black">
                  <UserOutlined
                    className="text-base"
                    style={{ color: "#fff" }}
                  />
                </div>
                <span className="text-lg font-semibold">{state.name}</span>
              </button>
            </Dropdown>
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  );
}

const NotificationItem = ({
  sbjet,
  msg = "",
  cdate = "",
  redirect = "",
  anocode = "",
  ...rest
}) => {
  if (redirect === "1") {
    var route = "";

    switch (rest.type) {
      case "01":
        route = "";
        break;
      case "02":
        route = `/dashboard/pending?anom=${anocode}`;
        break;
      case "03":
        route = `/dashboard/nomenclaturev2/consult/${anocode}/bdc`;
        break;
      case "04":
        route = `/dashboard/nomenclaturev2/consult/${anocode}/dat`;
        break;
      case "05":
        route = `/dashboard/nomenclaturev2/consult/${anocode}/dat`;
        break;
      case "06":
        route = `/dashboard/nomenclaturev2/caisse/consult/${anocode}`;
        break;

      default:
        break;
    }
    return (
      <Link to={route} className="text-reset notification-item">
        <div className="media">
          <div className="avatar-xs me-3">
            <span className="avatar-title bg-success rounded-circle font-size-16">
              <i className="bx bx-badge-check"></i>
            </span>
          </div>
          <div className="media-body">
            <h6 className="mt-0 mb-1">{sbjet}</h6>
            <div className="font-size-12 text-muted">
              <p className="mb-1">
                <div dangerouslySetInnerHTML={{ __html: msg }} />
              </p>
              <p className="mb-0">
                <i className="mdi mdi-clock-outline"></i>{" "}
                <span key="t-hours-ago">{cdate}</span>
              </p>
            </div>
          </div>
        </div>
      </Link>
    );
  }
  return (
    <a className="notification-item">
      <span className="notification_header">{sbjet}</span>
      <div className="notification_msg">
        <span>{msg}</span>
        <span key="t-hours-ago">{cdate}</span>
      </div>
    </a>
  );
};
