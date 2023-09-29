import React from "react";
import { useRouter } from "next/router";

import { Tabs } from "antd";
import Swal from "sweetalert2";
import PostData from "model/PostData";
import { Select, Button, Row, Modal, Space} from "antd";
import RTable from "@/components/RTable";

const { Option } = Select;
export default function Agence_client() {

  const reducer = (prevState, action) => ({ ...prevState, ...action });
  const [state, dispatch] = React.useReducer(reducer, {
    fetchingProfile: true,
    selectedAuth: [],
  });
  const [currentTab, setCurrentTab] = React.useState(0);

  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }

  const Demo = () => (
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="Agence" key="1">
        <Argence />
      </TabPane>
      <TabPane tab="Gestionnaire" key="2">
        <Client />
      </TabPane>
    </Tabs>
  );

  return (
    <>
      <Demo />
    </>
  );
}

function getRights(arr, key) {
  let res = {};
  const rights = ["canadd", "canconslt", "canedit", "candele", "canval"];
  for (let user of arr) {
    for (let right in user) {
      if (rights.includes(right) && user[right] === true) {
        if (res[user[key]]) {
          res = {
            ...res,
            [user[key]]: [...res[user[key]], right],
          };
        } else {
          res = { ...res, [user[key]]: [right] };
        }
      }
    }
  }
  return res;
}

const Argence = (props) => {
  const reducer = (prevState, action) => ({ ...prevState, ...action });
  const [state, setState] = React.useReducer(reducer, {
    profiles: props.profiles,
  });

  const headers = [
    {
      Header: "Code Agence",
      accessor: "code",
    },
    {
      Header: "Nom Agence",
      accessor: "name",
    },
    {
      Header: "Créer",
      accessor: "canadd",
      disableFilters: true,
      type: "check",
    },
    {
      Header: "Consulter",
      accessor: "canconslt",
      disableFilters: true,
      type: "check",
    },
    {
      Header: "Modifier",
      accessor: "canedit",
      disableFilters: true,
      type: "check",
    },
    {
      Header: "Effacer",
      accessor: "candele",
      disableFilters: true,
      type: "check",
    },
    {
      Header: "Valider",
      accessor: "canval",
      disableFilters: true,
      type: "check",
    },
  ];

  const usersHeader = [
    {
      Header: "Code Agence",
      accessor: "code",
    },
    {
      Header: "Nom Agence",
      accessor: "name",
    },
    {
      Header: "Créer",
      accessor: "canadd",
      disableFilters: true,
      type: "check",
      allowedObj: state.cAuth,
      key: "code",
    },
    {
      Header: "Consulte",
      accessor: "canconslt",
      disableFilters: true,
      type: "check",
      allowedObj: state.cAuth,
      key: "code",
    },
    {
      Header: "Modifier",
      accessor: "canedit",
      type: "check",
      allowedObj: state.cAuth,
      disableFilters: true,
      key: "code",
      allowedObj: state.cAuth,
      key: "code",
    },
    {
      Header: "Effacer",
      accessor: "candele",
      disableFilters: true,
      type: "check",
      allowedObj: state.cAuth,
      key: "code",
    },
    {
      Header: "Valider",
      accessor: "canval",
      disableFilters: true,
      type: "check",
      allowedObj: state.cAuth,
      key: "code",
    },
  ];

  React.useEffect(() => {
    PostData({ method: "get", url: "/getProfiles", body: {} }, (res) => {
      if (res !== "Error") {
        setState({ profiles: res.data, fetchingProfile: false });
      } else {
        Modal.error({
          title: "Error",
          content: <p>Error occured</p>,
          onOk: () => {
            setState({ fetchingProfile: false });
          },
        });
      }
    });
  }, []);

  function handleProfileSelect({ target: { value } }) {
    if (value !== "no") {
      setState({
        fetchingProfile: true,
        selectedProfile: value,
        profile: true,
      });
      const reqBody = {
        cetab: "001",
        //cetab: localStorage.getItem("cetab"),
        acscd: value,
      };

      PostData(
        { method: "post", url: "/getUsersByProfile", body: reqBody },
        (res) => {
          setState({ fetchingProfile: false });
          if (res !== "Error") {
            setState({ users: res.data });
          }
        }
      );

      PostData(
        {
          method: "get",
          url: "/getAgenceByProfile/" + value,
          body: {},
        },
        (res) => {
          if (res !== "Error") {
            let profileCaisse = res.data.map((c) => ({
              ...c,
              code: c.acscd,
            }));
            let cAuth = getRights(profileCaisse, "code");
            setState({ profileCaisse, cAuth, caisse: profileCaisse });
          } else {
            Modal.error({ title: "Error", content: <p>Error occured</p> });
          }
        }
      );
    } else {
      setState({ users: null, uname: null });
    }
  }

  function handleUserSelect({ target: { value } }) {
    if (value !== "no") {
      setState({ fetchingUser: true, profile: false, selectedUser: value });
      PostData(
        {
          method: "post",
          url: "/getAgenceByUser",
          body: { cetab: localStorage.getItem("cetab"), uname: value },
        },
        (res) => {
          setState({ fetchingUser: false });
          if (res !== "Error") {
            let caisse = JSON.parse(res.agence)?.map((c) => ({
              ...c,
              code: c.acscd,
            }));
            setState({ caisse: caisse || state.profileCaisse });
          } else {
            Modal.error({ title: "Error", content: <p>Error occured</p> });
          }
        }
      );
    } else {
      setState({ selectedUser: null });
      handleProfileSelect({ target: { value: state.selectedProfile } });
    }
  }

  function handleMetierSave() {
    const etab = localStorage.getItem("cetab");
    const user = localStorage.getItem("user");

    // const caisse = state.caisse.filter((c) => {
    //   let res = false;
    //   for (let i in c) {
    //     if (c[i] === true) {
    //       res = true;
    //       break;
    //     }
    //   }

    //   return res;
    // });

    if (!state.profile) {
      const body = {
        code: state.selectedUser,
        data: JSON.stringify(state.caisse),
        etab,
        user,
      };
      setState({ addbtnLoading: true });
      PostData({ method: "post", url: "/addAgenceUser", body }, (res) => {
        setState({ addbtnLoading: false });
        if (res !== "Error") {
          Modal.success({ title: "Success", content: <p>{res.message}</p> });
        } else {
          Modal.error({ title: "Error", content: <p>Error occured</p> });
        }
      });
    } else {
      // Save metier to profile
      // url: /addMetierToProfile
      const body = {
        code: state.selectedProfile,
        data: JSON.stringify(state.caisse),
        etab,
        user,
      };
      setState({ addbtnLoading: true });
      PostData({ method: "post", url: "/addAgenceToProfile", body }, (res) => {
        setState({ addbtnLoading: false });
        if (res !== "Error") {
          Modal.success({
            title: "Success",
            content: <p>Save successfully</p>,
          });
        } else {
          Modal.error({ title: "Error", content: <p>Error occured</p> });
        }
      });
    }
  }

  const updateMyData = (rowIndex, columnId, value) => {
    let caisse = state.caisse.map((row, index) => {
      if (index === rowIndex) {
        return {
          ...state.caisse[rowIndex],
          [columnId]: value,
        };
      }
      return row;
    });

    setState({ setSkipPageReset: true, caisse });
  };

  return (
    <>
      <div className="mx-0 px-0 pb-2">
        <Row className="px-0 mx-0 mb-4 bg-white row">
          <Space>
          <div className="col-lg-6 rounded">
            <label className="col-sm-4 col-form-label">Profils</label>
            <div className="col-sm-3 w-100">
              <div className="d-flex align-items-center">
                <Select
                  className="w-80"
                  placeholder="Select"
                  onChange={(value) => {
                    handleProfileSelect({ target: { value } });
                  }}
                  value={state.selectedProfile}
                >
                  <Option value="no">Choisir un profil</Option>
                  {state.profiles &&
                    state.profiles.map((profile, index) => (
                      <Option key={index} value={profile.acscd}>
                        {profile.name}
                      </Option>
                    ))}
                </Select>
                {state.fetchingProfile}
              </div>
            </div>
          </div>

          {state.users && (
            <div className="col-lg-6 rounded">
              <label className="col-sm-4 col-form-label">Utilisateurs</label>
              <div className="col-sm-6 w-100">
                <div className="d-flex align-items-center ">
                  <Select
                    className="w-80"
                    value={state.selectedUser}
                    placeholder="Select"
                    onChange={(value) => {
                      handleUserSelect({ target: { value } });
                    }}
                  >
                    <Option value="no">Choisir un Utilisateur</Option>
                    {state.users &&
                      state.users.map((user, index) => (
                        <Option key={index} value={user.uname}>
                          {user.name}
                        </Option>
                      ))}
                  </Select>
                  {
                    state.fetchingUser
                    //&& <Loader className="mx-2" />
                  }
                  {/* {profilesFetch && <Loader className="mx-2" />} */}
                </div>
              </div>
            </div>
          )}
          </Space>
        </Row>

        {state.caisse && (
          <div className="p-0 p-y-4 mx-auto">
            <RTable
              columns={state.profile ? headers : usersHeader}
              editable
              updateMyData={updateMyData}
              hideCheckbox
              data={state.caisse || []}
            />
          </div>
        )}
        {state.caisse && state.caisse.length > 0 && (
          <div className="d-flex align-items-center m-4">
            <Button
              type="primary"
              size="large"
              onClick={handleMetierSave}
              loading={state.addbtnLoading}
            >
              Enregistrer
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

const Client = (props) => {
  //const messages = message.fr;
  const reducer = (prevState, action) => ({ ...prevState, ...action });
  const [state, setState] = React.useReducer(reducer, {
    profiles: props.profiles,
  });

  const headers = [
    {
      Header: "#",
      accessor: "index",
    },
    {
      Header: "Nom de Client",
      accessor: "name",
    },
    {
      Header: "Member",
      accessor: "has",
      type: "check",
    },
  ];

  React.useEffect(() => {
    PostData({ method: "post", url: "/getAllUsers", body: {} }, (res) => {
      if (res !== "Error") {
        setState({ clients: res.data, fetchingProfile: false });
      } else {
        Modal.warning({
          title: "Internet Connection",
          content: <p>network problem</p>,
          // text: messages.NOT_CONNECT_INTERNET,
        }).then((e) => {
          setState({ fetchingProfile: false });
        });
      }
    });
  }, []);

  function handleProfileSelect(value) {
    setState({ selectedProfile: value, fetchingProfile: true });
    if (value !== "no") {
      const reqBody = {
        etab: localStorage.getItem("cetab"),
        uname: value,
      };

      PostData(
        { method: "post", url: "/getClientsByGestUname", body: reqBody },
        (res) => {
          setState({ fetchingProfile: false });
          if (res !== "Error") {
            console.log(res.data)
            const users = res.data?.filter(client => client.name !== null && client.cli !== null).map((c, index) => ({...c, index: index + 1 }))
            setState({ users: users || []});
            // console.log(res);
          }
        }
      );
    }
  }


  function handleMetierSave() {
    const etab = localStorage.getItem("cetab");
    const muser = localStorage.getItem("uname");

    const data = state.users.filter(c => c.has).map(user => user.cli);

      const body = {
        uname: state.selectedProfile,
        muser,
        data: JSON.stringify(data),
        etab,
      };
      setState({ addbtnLoading: true });
      PostData({ method: "post", url: "/addClientsToGest", body }, (res) => {
        setState({ addbtnLoading: false });
        if (res !== "Error") {
          Modal.success({ title: "Success", content: <p>{res.message}</p> });
        } else {
          Modal.error({ title: "Error", content: <p>Error occured</p> });
        }
      });
  }

  const updateMyData = (rowIndex, columnId, value) => {
    let users = state.users.map((row, index) => {
      if (index === rowIndex) {
        return {
          ...state.users[rowIndex],
          [columnId]: value,
        };
      }
      return row;
    });

    setState({ setSkipPageReset: true, users });
  };

  return (
    <>
      <div className="mx-0 px-0 pb-2">
        <div className="px-0 mx-0 bg-white row">
          <div className="col-lg-6  p-y-4 pt-3 rounded">
            <label className="col-sm-4 col-form-label">Gestionnaire</label>
            <div className="col-sm-3 w-100">
              <div className="d-flex align-items-center">
                <Select
                  className="w-80"
                  onChange={handleProfileSelect}
                  value={state.selectedProfile}
                  loading={state.fetchingProfile}
                  placeholder="Choose a Gestionnaire"
                >
                  <Option value="no">Choisir un profil</Option>
                  {state.clients
                    ?.filter((c) => c.uname !== null)
                    .map((client, index) => (
                      <Option key={index} value={client.uname}>
                        {client.fname} {client.lname}
                      </Option>
                    ))}
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="p-0 py-4 mx-auto">
          <RTable
            columns={headers}
            editable
            hideCheckbox
            updateMyData={updateMyData}
            data={state.users || []}
          />
        </div>

        <div className="d-flex align-items-center m-4">
          <Button
            type="primary"
            size="large"
            onClick={handleMetierSave}
            loading={state.addbtnLoading}
            disabled={!state.users || state.users.length === 0}
          >
            Enregistrer
          </Button>
        </div>
      </div>
    </>
  );
};

//   return (

// <div>Authorisation</div>
//   );
