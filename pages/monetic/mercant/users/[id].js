import { useEffect, useReducer } from "react";
import apiClient from "api";
import { Modal } from "antd";
import TableInput from "@/components/TableInput";
import { useRouter } from "next/router";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { RiRestartLine } from "react-icons/ri";

export default function MechantUsers() {
  const router = useRouter();
  let alias = router.query.id;
  let cdmar = router.query.cdmar;
  const reducer = (prevState, newState) => ({ ...prevState, ...newState });
  const [state, dispatch] = useReducer(reducer, { data: [] });

  const columns = [
    {
      Header: "First Name",
      accessor: "mername",
    },
    {
      Header: "User Name",
      accessor: "tpename",
    },
    {
      Header: "ID Number",
      accessor: "imei",
    },
    {
      Header: "Phone Number",
      accessor: "internal_id",
    },
    {
      Header: "Profile",
      accessor: "external_id",
    },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row: { original = {} } }) => {
        let id = original.id;
        return (
          <div className="flex space-x-4 w-full">
            <IconButton
              href={`/monetic/mercant/consult/${alias}`}
              icon={<FaSearch className="text-gray-600" title="Consulter" />}
            />
            <IconButton
              href={`/monetic/mercant/edit/${alias}`}
              icon={<FaPen className="text-green-600" title="Editer" />}
            />
            <IconButton
              href={`/monetic/mercant/users/${alias}`}
              icon={
                <FaUsers
                  className="text-yellow-600"
                  title="Consult mechant users"
                />
              }
            />
            <IconButton
              onClick={() => {
                dispatch({ ...state, code: alias, showDelModal: true });
              }}
              icon={<FaTrash className="text-red-500" title="Supprimer" />}
            />
          </div>
        );
      },
    },
  ];

  async function fetchData() {
    dispatch({ loading: true });
    try {
      let body = { etab: "001", alias, cdmar };
      let response = await apiClient({
        method: "post",
        url: "/monet/getListUserPerMerchant",
        body,
      });
      dispatch({ data: response.data.data || [], loading: false });
    } catch (error) {
      Modal.error({ title: "An error occured!" });
    }
  }

  useEffect(() => {
    fetchData();
  }, [alias, cdmar]);

  const fields = [
    { name: "First Name", key: "nom", type: "text" },
    { name: "Last Name", key: "pnom", type: "text" },
    { name: "User Name", key: "uname", type: "text" },
    { name: "Branch", key: "brch", type: "text" },
    { name: "ID Number", key: "npid", type: "text" },
    { name: "Phone Number", key: "tel", type: "text" },
    { name: "Profile", key: "prof", type: "select", data: [{label: 'USER', value: '1'}, {label: 'ADMIN', value: '0'}] },
  ];

  async function onFinish(data = {}, isEdit) {
    let body = {
      ...data,
      cdmar,
      alias,
      uti: "s_leheche",
      utimo: "s_leheche",
    };

    dispatch({ adding: true });
    try {
      await apiClient({
        method: "post",
        body,
        url: isEdit
          ? "/monet/beginSubcribeCliEditUser/"
          : "/monet/beginSubcribeCliUser",
      });
      dispatch({ adding: false });
      fetchData();
    } catch (error) {
      dispatch({ adding: false });
      console.log(error);
      Modal.error({ title: "An error occured!" });
    }
  }
  async function handleDelete(data = {}) {
    let body = {
      uname: data.uname,
      cdmar,
      alias,
      utimo: "s_leheche",
      etab: "001",
    };

    dispatch({ loading: true });
    try {
      await apiClient({
        method: "post",
        body,
        url: "/monet/deleteUser/",
      });
      Modal.success({ title: "User deleted" });
      dispatch({ loading: false });
      fetchData();
    } catch (error) {
      dispatch({ loading: false });
      console.log(error);
      Modal.error({ title: "An error occured!" });
    }
  }
  async function handleActivate(data = {}) {
    let body = {
      username: data.uname,
      cdmar,
      alias,
      utimo: "s_leheche",
      etab: "001",
    };

    dispatch({ loading: true });
    try {
      let response = await apiClient({
        method: "post",
        body,
        url: "/monet/activerClientUnac",
      });
      if (response.data.status == "01") {
        Modal.success({ title: "Success" });
      } else {
        Modal.error({ title: "An error occured!" });
      }
      dispatch({ loading: false });
      fetchData();
    } catch (error) {
      dispatch({ loading: false });
      console.log(error);
      Modal.error({ title: "An error occured!" });
    }
  }
  async function resetUser(data = {}) {
    let body = {
      uname: data.uname,
      cdmar,
      alias,
      utimo: "s_leheche",
      etab: "001",
    };

    dispatch({ loading: true });
    try {
      await apiClient({
        method: "post",
        body,
        url: "/monet/intUserPass",
      });
      Modal.success({ title: "User password resetted" });
      dispatch({ loading: false });
      fetchData();
    } catch (error) {
      dispatch({ loading: false });
      console.log(error);
      Modal.error({ title: "An error occured!" });
    }
  }

  const ActivateIcon = (props) => {
    return (
      <button
        onClick={() => {
          Modal.confirm({
            title: `Are you sure you want to ${
              props.eta == "0" ? "disactivate" : "activate"
            } this client? `,
            onOk: () => handleActivate(props),
          });
        }}
      >
        {props.eta === "0" ? <FaLock /> : <FaLockOpen />}
      </button>
    );
  };
  const ResetButton = (props) => {
    return (
      <button
        onClick={() => {
          Modal.confirm({
            title: "Are you sure you want to reset this client? ",
            onOk: () => resetUser(props),
          });
        }}
        className="text-blue-500"
      >
        <RiRestartLine />
      </button>
    );
  };

  return (
    <>
      <header className="flex space-x-4 mb-4 justify-between">
        <h2 className="text-lg font-bold">Mechant Users </h2>
      </header>
      <TableInput
        fields={fields}
        value={state.data}
        onFinish={onFinish}
        loading={state.loading}
        adding={state.adding}
        title="User Informations"
        deleteItem={handleDelete}
        actions={[ActivateIcon, ResetButton]}
      />
    </>
  );
}
