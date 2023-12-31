import {
  UserOutlined,
  SettingOutlined,
  SafetyCertificateOutlined,
  DashboardOutlined,
  TransactionOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";


const routes = [
  {
    title: "Dashboard",
    icon: <DashboardOutlined className="!text-primary" />,
    path: "/dashboard",
  },
  {
    title: "System",
    icon: <SettingOutlined className="!text-primary" />,
    subMenu: [
      // {
      //   title: "Nomenclature",
      //   path: "/system/nomen",
      //   icon: <DatabaseOutlined />,
      // },
      {
        title: "Users",
        path: "/system/users",
        icon: <UserOutlined className="!text-primary" />,
      },
      {
        title: "Habilitations",
        path: "/system/userauthorisation/authorisation",
        icon: <SafetyCertificateOutlined className="!text-primary" />,
      },
    ],
  },

  {
    title: "Client Management",
    icon: <UserOutlined className="!text-primary" />,
    subMenu: [
      {
        title: "Subscription List",
        path: "/clients/subscriptions_list",
      },
      {
        title: "Pending Subscription",
        path: "/clients/pending_subscriptions",
      },
      {
        title: "Initialise Password",
        path: "/clients/initialise_password",
      },
      {
        title: "Initialise Pin",
        path: "/clients/initialise_pin",
      },
      // {
      //   title: "Account Attachement",
      //   path: "/clients/account_attachement",
      // },
      // {
      //   title: "Pending Attachement",
      //   path: "/clients/pending_attachements",
      // },
      // {
      //   title: "Rejected Clients",
      //   path: "/clients/rejected_clients",
      // },
      {
        title: "Deleted Clients",
        path: "/clients/deleted_clients",
      },
    ],
  },
  {
    title: "Transactions",
    icon: <TransactionOutlined className="!text-primary" />,
    subMenu: [
      {
        title: "Transaction History",
        path: "/transactions/history",
        icon: <MoneyCollectOutlined />,
      },
      {
        title: "Deposit",
        path: "/transactions/deposit",
        icon: <MoneyCollectOutlined />,
      },
      {
        title: "Withdrawal",
        path: "/transactions/withdrawal",
        icon: <MoneyCollectOutlined />,
      },
    ],
  },
];

export default routes;
