import {
  UserOutlined,
  UploadOutlined,
  SettingOutlined,
  UserGroupIcon,
  SafetyCertificateOutlined,
  GroupOutlined,
  LikeOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { HomeIcon } from "@heroicons/react/solid";
import { BiDollar, BiMoney, BiStats, BiTransferAlt } from "react-icons/bi";
import { BsBank, BsClock } from "react-icons/bs";
import { FaMoneyBill, FaToolbox, FaUser } from "react-icons/fa";
import { MdGroup, MdMoney, MdPayments } from "react-icons/md";

const routes = [
  { title: "Home", icon: <HomeIcon className="w-5" />, path: "/dashboard" },
  {
    title: "System",
    icon: <SettingOutlined />,
    subMenu: [
      {
        title: "Habilitations",
        path: "/system/userauthorisation/authorisation",
        icon: <SafetyCertificateOutlined />,
      },
    ],
  },

  {
    title: "Client Management",
    icon: <UserOutlined />,
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
        title: "Initialise password",
        path: "/clients/initialise_password",
      },
      {
        title: "Account Attachement",
        path: "/clients/account_attachement",
      },
      {
        title: "Pending Attachement",
        path: "/clients/pending_attachements",
      },
      {
        title: "Rejected Clients",
        path: "/clients/rejected_clients",
      },
      {
        title: "Deleted Clients",
        path: "/clients/deleted_clients",
      },
    ],
  },
  {
    title: "Transfer",
    icon: <BiMoney />,
    subMenu: [
      {
        title: "Transfer History",
        path: "/transfers/history",
        icon: <FaMoneyBill />,
      },
    ],
  },
];

export default routes;
