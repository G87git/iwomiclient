import React from "react";
import { Loader, Panel } from "rsuite";
import ButtonComponent from "@/components/buttonComponent";
import { Select, Row, Space, Card as AntCard } from "antd";
import RIGHTS from "model/rights.json";
// Remove the following import lines
// import apiClient from "api";
// import PostData from "model/PostData";
// import { getSelectData } from "../../../../utils";

const { Option } = Select;

function convertJson(json) {
  var auth = [];
  var selectedAuth = [];
  json.map((data) => {
    var name = data.action_name.split("_")[0];
    if (!auth.includes(name)) {
      auth.push(name);
    }
    if (data.has === "1") {
      selectedAuth.push(data.action_name);
    }
    return null;
  });

  return { auth, selectedAuth };
}

export default function Authorisation() {
  const reducer = (prevState, action) => ({ ...prevState, ...action });
  const [state, dispatch] = React.useReducer(reducer, {
    fetchingProfile: true,
    selectedAuth: [],
  });
  const [currentTab, setCurrentTab] = React.useState(0);

  // Remove the following async function and useEffect
  // async function getProfiles() {
  //   // ...
  // }

  // React.useEffect(() => {
  //   getProfiles();
  // }, []);

  const Tabs = [
    {
      component: Autorisation,
      name: "Habilitations",
    },
  ];
  const Tab = Tabs[currentTab].component;

  return (
    <>
      <div className="container-fluid">
        <ul className="nav nav-tabs bg-light " role="tablist">
          {Tabs.map((tab, key) => (
            <li
              className="nav-item"
              key={key}
              onClick={() => {
                setCurrentTab(key);
              }}
            >
              <span
                className={`nav-link ${currentTab === key && "active"}`}
                data-bs-toggle="tab"
                role="tab"
              >
                <span className="d-block d-sm-none">
                  <i className="fas fa-cog"></i>
                </span>
                <span className="d-none d-sm-block">{tab.name}</span>
              </span>
            </li>
          ))}
        </ul>

        <Tab {...state} dispatch={dispatch} />
      </div>
    </>
  );
}

export const Card = ({ name, data, handleDispatch, selectedAuth }) => {
  const rights = RIGHTS["fr"];
  return (
    <AntCard className="col-md-5 my-2 mx-2 ">
      <div className="bg-white rounded">
        <Panel header={rights[name]}>
          {data.map(
            (row, i) =>
              name === row.action_name.split("_")[0] && (
                <div className="flex items-center gap-2" key={i}>
                  <input
                    onChange={handleDispatch}
                    className="form-check-input"
                    checked={selectedAuth.includes(row.action_name)}
                    type="checkbox"
                    data-index={i}
                    name={row.action_name}
                    id={row.action_name}
                  />
                  <label className="form-check-label" htmlFor={row.action_name}>
                    {rights[row.action_name]}
                    {!rights[row.action_name] && row.action_name}
                  </label>
                </div>
              )
          )}
        </Panel>
      </div>
    </AntCard>
  );
};

const Autorisation = (props) => {
  const {
    selectedProfile,
    selectedUser,
    dispatch,
    currentProfile,
    uname,
    selectedAuth,
    profile,
    profile_acscd,
    currentAct,
    profiles,
    userAuthName,
    users,
    fetchUserData,
    userAuthData,
  } = props || {};

  // Remove the following async functions getUserProfile and getUserAuth

  function handleCheckbox({ target }) {
    const name = target.name;
    var newAuth = selectedAuth;

    if (newAuth.includes(name)) {
      newAuth = newAuth.filter((e) => e !== name);
    } else {
      newAuth.push(name);
    }
    dispatch({ selectedAuth: newAuth });
  }

  function handleSave() {
    dispatch({ saveLoader: true });
    // Add your save logic here if needed
  }

  return (
    <>
      <div className="mx-0 px-0 bg-white">
        <Row className="mb-4">
          <Space>
            <div className="col-lg-6 col-sm-4 bg-white rounded">
              <label className="col-sm-4 col-form-label">Profil</label>
              <div className="col-sm-3 w-100">
                <div className="d-flex align-items-center">
                  <Select
                    className="w-80"
                    placeholder="Select"
                    onChange={(e) => {
                      // Call your function here if needed
                    }}
                    value={selectedProfile}
                  >
                    <Option value="no">Choisir un profil</Option>
                    {profiles &&
                      profiles.map((profile, index) => (
                        <Option
                          key={index}
                          value={JSON.stringify({
                            id: profile.value,
                            name: profile.label,
                          })}
                        >
                          {profile.label}
                        </Option>
                      ))}
                  </Select>
                </div>
              </div>
            </div>
            {users && (
              <div className="col-sm-4 rounded col-lg-6">
                <label className="col-sm-4 col-form-label">Users</label>
                <div className="col-sm-6 w-100">
                  <div className="d-flex align-items-center ">
                    <Select
                      className="w-80"
                      placeholder="Select"
                      value={selectedUser}
                      onChange={(e) => {
                        // Call your function here if needed
                      }}
                    >
                      <Option value="no">Choisir un utilisateur</Option>
                      {users &&
                        users.map((user, index) => (
                          <Option
                            key={index}
                            value={JSON.stringify({
                              id: user.uname || "",
                              name: user.name || "",
                            })}
                          >
                            {user.name}
                          </Option>
                        ))}
                    </Select>
                    {fetchUserData && <Loader className="mx-2" />}
                  </div>
                </div>
              </div>
            )}
          </Space>
        </Row>
        <div className="flex flex-wrap gap-4">
          {userAuthName &&
            userAuthName.map((name, index) => {
              return (
                <Card
                  name={name}
                  data={userAuthData}
                  handleDispatch={handleCheckbox}
                  key={index}
                  selectedAuth={selectedAuth}
                />
              );
            })}
        </div>
        {users && (
          <div className="d-flex align-items-center">
            {selectedUser ? (
              JSON.parse(selectedUser).id !== localStorage.getItem("uname") && (
                <ButtonComponent
                  className="btn btn-primary my-4 mx-3"
                  onClick={handleSave}
                >
                  Sauvegarder
                </ButtonComponent>
              )
            ) : (
              <ButtonComponent
                className="btn btn-primary my-4 mx-3"
                onClick={handleSave}
              >
                Sauvegarder
              </ButtonComponent>
            )}
          </div>
        )}
      </div>
    </>
  );
};
