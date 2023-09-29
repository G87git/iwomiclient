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
      // {
      //   title: "Nomenclature",
      //   path: "/system/nomen",
      //   icon: <DatabaseOutlined />,
      // },
      // {
      //   title: "User",
      //   path: "/system/users",
      //   icon: <UserOutlined />,
      // },
      {
        title: "Habilitations",
        path: "/system/userauthorisation/authorisation",
        icon: <SafetyCertificateOutlined />,
      },
      // {
      //   title: "Anormalie Configuration",
      //   path: "/system/anomalie",
      //   icon: <FaToolbox  />,
      // },
      // { title: "Agent Management", icon: <UserGroupIcon className="w-5" />, path: "/system/agents/create" },
      // { title: "Agent Validation", icon: <UserGroupIcon className="w-5" />, path: "/system/agents/validate" },
      // { title: "Loading Clients", icon: <UserAddIcon className="w-5" />, path: "/system/load-users" },
      // { title: "Activate Clients", icon: <UserAddIcon className="w-5" />, path: "/system/clients/activate" },
      // { title: "Seuil De Collect", icon: <BsBank className="w-5" />, path: "/system/seuildecollect" },
    ],
  },
  // {
  //   title: "Monetic",
  //   icon: <UserOutlined />,
  //   subMenu: [
  //     {
  //       title: "Merchant Subscription",
  //       path: "/monetic/mercant/subscribe",
  //       icon: <UserOutlined />,
  //     },
  //     {
  //       title: "Merchant Validation",
  //       path: "/monetic/mercant/validation",
  //       icon: <UserOutlined />,
  //     },
  //     {
  //       title: "Transactions",
  //       path: "/monetic/transactions",
  //       icon: <BsClock />,
  //     },
  //     {
  //       title: "Payouts",
  //       path: "/monetic/payout",
  //       icon: <MdPayments />,
  //     },
  //     {
  //       title: "Compensation",
  //       path: "/monetic/compensation",
  //       icon: <BiDollar />,
  //     },
  //     {
  //       title: "Fees File History",
  //       path: "/monetic/fees",
  //       icon: <FaMoneyBill />,
  //     },
  //   ],
  // },
  {
    title: "Client Management",
    icon: <UserOutlined />,
    subMenu: [
      {
        title: "Pending Subscription",
        path: "/clients/pending_subscriptions",
      },
      {
        title: "Subscription List",
        path: "/clients/subscriptions_list",
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
    // subMenu: [
    //   {
    //     title: "Customer Management",
    //     icon: <UploadOutlined />,
    //     subMenu: [
    //       {
    //         title: "Consult client",
    //         path: "/donne/consult-client",
    //         icon: <TeamOutlined />
    //       },
    //       {
    //         title: "Subscription",
    //         path: "/donne/subscription",
    //         icon: <LikeOutlined />,
    //       },
    //     ],
    //   },
    //   {
    //     title: "Customer Management",
    //     path: "/donnee/chargemt",
    //     icon: <UploadOutlined />,
    //   },
    //   {
    //     title: "Consult client",
    //     path: "/clients/fiabilise",
    //     icon: <TeamOutlined />,
    //   },
    //   {
    //     title: "Subscription",
    //     path: "/business/subs",
    //     icon: <LikeOutlined />,
    //   },
    //   {
    //     title: "Account Management",
    //     path: "/trans/account",
    //     icon: <GroupOutlined />,
    //   },
    //   {
    //     title: "Balance",
    //     path: "/trans/balance",
    //     icon: <GroupOutlined />,
    //   },
    //   {
    //     title: "NC-FINANCE accounts",
    //     path: "/business/business_account",
    //     icon: <FaUser />,
    //   },
    //   {
    //     title: "Cash accounts",
    //     path: "/business/business_caisse",
    //     icon: <FaUser />,
    //   },
    //   {
    //     title: "Scoring Management",
    //     path: "/donnee/hist",
    //     icon: <FaUser />,
    //   },
    //   {
    //     title: "Group L Management",
    //     path: "/donnee/hist",
    //     icon: <MdGroup />,
    //   },
    //   {
    //     title: "Loan Reinbursement",
    //     path: "/donnee/hist",
    //     icon: <MdMoney />,
    //   },
    //   {
    //     title: "Transaction",
    //     path: "/bank/transactions",
    //     icon: <BsClock />,
    //   },
    //   {
    //     title: "History",
    //     path: "/bank/history",
    //     icon: <BsClock />,
    //   },
    //   {
    //     title: "Inventory",
    //     path: "/bank/inventory",
    //     icon: <FaUser />,
    //   },
    //   {
    //     title: "Statistic Report",
    //     path: "/donnee/hist",
    //     icon: <BiStats />,
    //   },
    // ],
  },
  {
    title: "Transfer",
    icon: <BiMoney />,
    subMenu: [
      // {
      //   title: "Transfer Fund",
      //   path: "/transfers/list",
      //   icon: <BiTransferAlt />,
      // },
      {
        title: "Transfer History",
        path: "/transfers/history",
        icon: <FaMoneyBill />,
      },
    ],
  },
];

export default routes;
