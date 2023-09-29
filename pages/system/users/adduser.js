import { FiUsers } from "react-icons/fi";
import { AiOutlineArrowLeft } from "react-icons/ai";
import PageLayout from "@/components/pageLayout";
import { Row, Col, Dropdown, Menu, Select, Button } from "antd";
import { useRouter } from "next/router";
//import { Row, Col } from "next/link";
import { ArrowLeftOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import Link from "next/link";
//import Button from "@/components/button";
import ButtonComponent from "@/components/buttonComponent";
import PostData from "model/PostData";
import useModal from "antd/lib/modal/useModal";
import Swal from "sweetalert2";
import React, { useEffect } from "react";
import { format } from "date-fns";

//import { Container, Row, Col } from "reactstrap";

export default function AddUser() {
  const getDate = (date) => {
    const [day, month, year] = date.split(" ")[0].split("/");
    return `${year}-${month.length === 1 ? `0${month}` : month}-${
      day.length === 1 ? `0${day}` : day
    }`;
  };

  const Modal = useModal();
  const push = useRouter();
  const router = useRouter();
  const { Option } = Select;

  const reducer = (prevState, action) => ({ ...prevState, ...action });
  const [state, dispatch] = React.useReducer(reducer, {
    body: {},
    country: { country: "CMR", ctry: "CMR" },
    // userModal: !id,
  });

  function handleChange({ target }) {
    console.log(target);
    dispatch({ body: { ...state.body, [target.name]: target.value } });
  }

  function handleSelectChange({ target: { name, value } }) {
    dispatch({ body: { ...state.body, [name]: value } });
  }

  function handleTypeChange(value) {
    console.log(`selected ${value}`);
  }

  useEffect(() => {
    PostData(
      { method: "get", url: `api/getNomenDataByTabcd/0033`, body: {} },
      (res) => {
        if (res !== "Error") {
          dispatch({ titles: res.data });
        }
      }
    );

    PostData({ method: "get", url: "/getProfiles", body: {} }, (res) => {
      if (res !== "Error") {
        dispatch({ profiles: res.data, fetchingProfile: false });
      } else {
        Swal.fire({
          title: "Internet Connection",
          icon: "question",
          text: "No Internet Connection",
        }).then((e) => {
          dispatch({ fetchingProfile: false });
        });
      }
    });
  }, []);

  function submitForm(e) {
    dispatch({ isSubmitting: true });
    const cuser = "12";
    const cetab = "001";
    // const yoh = format(new Date(state.body.yoh), "dd/MM/yyyy HH:MM:SS");
    // const yob = format(new Date(state.body.yob), "dd/MM/yyyy HH:MM:SS");
    var body = { ...state.body, cuser, cetab };

    console.log(body);

    PostData({ method: "post", url: "/addNewUser", body }, (res) => {
      if (res !== "Error") {
        if (res.status === "01") {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: res.message,
          }).then((e) => {
            router.push("/users");
          });
        } else {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: res.message,
          }).then((e) => {
            dispatch({ isSubmitting: false });
          });
        }
        dispatch({ isSubmitting: false });
      } else {
        Swal.fire({
          title: "Internet Connection",
          icon: "question",
          text: "Check Network Connection",
        }).then((e) => {
          dispatch({ isSubmitting: false });
        });
      }
    });
  }

  return (
    <div>
      {/* <PageLayout title="Gestions utilisateurs" Icon={FiUsers}> */}

      {/* <h2 className="text-lg font-bold my-2 mx-7">Ajouter un Utilisateur </h2> */}
      <h2
        className="text-lg font-bold"
        style={{ cursor: "pointer" }}
        onClick={() => router.back()}
      >
        <ArrowLeftOutlined /> &nbsp; Ajouter un Utilisateur{" "}
      </h2>

      <fieldset className="border border-gray-700 p-4 max-w-7xl rounded space-y-4">
        {/* <legend className="text-sm font-semibold px-2">
          Ajouter un utilisateur
        </legend> */}

        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col flex-1">
            <label>Titre</label>
            <div className="inline-block relative">
              <Select
                defaultValue="Choisir le Titre"
                //  onChange={handleTypeChange}
                required
                name="title"
                value={state.body.title}
                onChange={(value) => {
                  handleChange({ target: { name: "title", value } });
                }}
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              >
                {state.titles &&
                  state.titles.map(
                    (title, index) =>
                      title.acscd && (
                        <option key={index} value={title.acscd}>
                          {title.lib1}
                        </option>
                      )
                  )}
              </Select>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <label>Date de Recruitement</label>
            <div className="inline-block relative">
              <input
                type="date"
                max={format(new Date(), "yyyy-MM-dd")}
                name="yoh"
                value={state.body.yoh}
                onChange={handleChange}
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col flex-1">
            <label>Sexe</label>
            <div className="inline-block relative">
              <Select
                defaultValue=""
                //  onChange={handleTypeChange}
                required
                name="gender"
                value={state.body.gender}
                onChange={(value) => {
                  handleChange({ target: { name: "gender", value } });
                }}
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              >
                <Option value="homme">Homme</Option>
                <Option value="femme">Femme</Option>
              </Select>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <label>Profil</label>
            <div className="inline-block relative">
              <Select
                defaultValue="Choisir un profil"
                //  onChange={handleTypeChange}
                required
                name="profile_id"
                value={state.body.profile_id}
                //onChange={handleChange}
                onChange={(value) => {
                  handleChange({ target: { name: "profile_id", value } });
                }}
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              >
                {/* <option>Choisir un profil</option> */}
                {state.profiles &&
                  state.profiles.map((profile, i) => (
                    <option key={i} value={profile.acscd}>
                      {profile.name}
                    </option>
                  ))}
              </Select>
            </div>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col flex-1">
            <label>Nom</label>
            <div className="inline-block relative">
              <input
                type="text"
                name="lname"
                value={state.body.lname}
                onChange={handleChange}
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <label> Matricule</label>
            <div className="inline-block relative">
              <input
                type="text"
                name="matr"
                value={state.body.matr}
                onChange={handleChange}
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col flex-1">
            <label>Prénom</label>
            <div className="inline-block relative">
              <input
                // type="text"
                type="text"
                name="fname"
                value={state.body.fname}
                onChange={handleChange}
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <label> Addresse</label>
            <div className="inline-block relative">
              <input
                type="text"
                name="address"
                value={state.body.address}
                onChange={handleChange}
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col flex-1">
            <label>Email</label>
            <div className="inline-block relative">
              <input
                type="email"
                name="email"
                value={state.body.email}
                onChange={handleChange}
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <label>Téléphone</label>
            <div className="inline-block relative">
              <input
                type="text"
                name="phone"
                value={state.body.phone}
                onChange={handleChange}
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col flex-1">
            <label>Nom D'utilisateur</label>
            <div className="inline-block relative">
              <input
                type="text"
                name="uname"
                value={state.body.uname}
                onChange={handleChange}
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <label>Pays</label>
            <div className="inline-block relative">
              <input
                type="text"
                name="country"
                value={state.body.country}
                onChange={handleChange}
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col flex-1">
            <label>Date de Naissance</label>
            <div className="inline-block relative">
              <input
                type="date"
                max={format(new Date(), "yyyy-MM-dd")}
                name="yob"
                value={state.body.yob}
                onChange={handleChange}
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            {/* <label>Agence</label> */}
            {/* <div className="inline-block relative">
              <input
                type="text"
                name="agence"
                
                value={state.body.agence}
                onChange={handleChange}
                className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div> */}
          </div>
        </div>

        <Button type="primary" onClick={submitForm}>
          Sauvegarder
        </Button>
      </fieldset>
    </div>
    // </PageLayout>
  );
}

//export default AddUser;
