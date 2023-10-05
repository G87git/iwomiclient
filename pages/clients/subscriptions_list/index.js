import { useEffect, useReducer, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Button, Modal } from "antd";
import { FaCheckCircle, FaEdit, FaTrash } from "react-icons/fa";
import Table from "@/components/Custom/Table";
import apiClient from "api";
import Swal from "sweetalert2";
import UploadFile from "./upload_files";
import LoaderContainer from "@/components/loader-container";

export default function Index() {
  const reducer = (prevState, action) => ({ ...prevState, ...action });
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    uploading: false,
    data: [],
  });

  const [files, setFiles] = useState([]);
  const [pickedUser, setPickedUser] = useState({});
  const [open, setOpen] = useState(false);

  const getStatus = (status) => {
    switch (status) {
      case 0:
        return { name: "Pending", color: "orange" };
      case 1:
        return { name: "Validated", color: "rgba(16, 185, 129, 1)" };
      case 2:
        return { name: "Rejected", color: "rgba(239, 68, 68, 1)" };
      default:
        return { name: "Pending", color: "orange" };
    }
  };

  function handleFileChange(e) {
    setFiles((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
  }

  const submitFiles = async () => {
    dispatch({ uploading: true });

    var formDatas = Object.entries(files).map((file) => {
      var file = file[1];
      const formData = new FormData();

      formData.append("file", file, file.name);
      formData.append("type", file[0]);
      formData.append("cli", pickedUser.id);
      formData.append("codewal", pickedUser.accountNumber);
      formData.append("utimo", localStorage.getItem("uname") ?? "");

      return formData;
    });

    var numOfSucesses = 0;

    var promises = formDatas.map((e) =>
      apiClient({ method: "POST", url: "/payment/fileUpload", body: e }).then(
        (res) => {
          if (res.data.success !== "01") {
            throw new Error("File couldn't be uploaded to server.");
          }
        }
      )
    );

    try {
      const result = await Promise.allSettled(promises);
      setFiles([]);
      setPickedUser({});

      dispatch({ uploading: false });

      result.forEach((e) => {
        if (e.status === "fulfilled") numOfSucesses = numOfSucesses + 1;
      });

      if (numOfSucesses == 3) {
        Swal.fire({
          title: "Files Uploaded Successfully",
          text: "Files Uploaded Successfully to server.",
          denyButtonText: "Retry",
          icon: "success",
          confirmButtonColor: "gray",
        }).then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire({
          title: "File couldn't be uploaded",
          text: "File couldn't be uploaded to server.",
          denyButtonText: "Retry",
          icon: "error",
          confirmButtonColor: "gray",
        }).then(() => {});
      }
    } catch (error) {
      Swal.fire({
        title: "File couldn't be uploaded",
        text: "File couldn't be uploaded to server.",
        denyButtonText: "Retry",
        confirmButtonColor: "gray",
        icon: "error",
      }).then(() => {});
    }
  };

  function showDeleteClientModal(row) {
    Swal.fire({
      title: "Suprimer le Client?",
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#52c41a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui! Suprimer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(row);
      }
    });
  }

  function showActivateClientModal(row) {
    Swal.fire({
      title: "Activer le Client?",
      text: "Voullez vous activer cette utilisatuer??",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#52c41a",
      cancelButtonColor: "gray",
      confirmButtonText: "Oui! Activer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        activateUser(row);
      }
    });
  }

  async function activateUser(row) {
    dispatch({ uploading: true });

    let response = await apiClient({
      method: "POST",
      url: "/user/activateUser",
      body: {
        accountNumber: row.accountNumber,
      },
    });

    dispatch({ uploading: false });

    if (response.data.statut === "01") {
      Swal.fire({
        title: "Client activated Successfully",
        text: "Client activated Successfully to server.",
        denyButtonText: "Retry",
        icon: "success",
        confirmButtonColor: "gray",
      }).then(() => {
        window.location.reload();
      });
      return;
    } else {
      Swal.fire({
        title: "Failed",
        text: "Please upload user documents first",
        icon: "warning",
        confirmButtonColor: "gray",
      });
    }
  }

  async function deleteUser(row) {
    dispatch({ uploading: true });

    let response = await apiClient({
      method: "POST",
      url: "/auth/deleteUser",
      body: {
        accountNumber: row.accountNumber,
      },
    });

    dispatch({ uploading: false });

    if (response.data.statut === "01") {
      Swal.fire({
        title: "Client activated Successfully",
        text: "Client activated Successfully to server.",
        denyButtonText: "Retry",
        icon: "success",
        confirmButtonColor: "gray",
      }).then(() => {
        window.location.reload();
      });
      return;
    } else {
      Swal.fire({
        title: "Failed",
        text: "Please upload user documents first",
        icon: "warning",
        confirmButtonColor: "gray",
      });
    }
  }

  const columns = [
    {
      title: "First Name",
      key: "firstname",
      dataIndex: "firstname",
      filter: true,
    },
    {
      title: "Last Name",
      key: "lastname",
      dataIndex: "lastname",
      filter: true,
    },
    {
      title: "Account Numer",
      key: "accountNumber",
      dataIndex: "accountNumber",
      filter: true,
    },
    { title: "Email", key: "email", dataIndex: "email", filter: true },
    { title: "Phone", key: "phone", dataIndex: "phone", filter: true },
    {
      title: "Profession",
      key: "proffession",
      dataIndex: "proffession",
      filter: true,
    },
    { title: "Creation Date", key: "creationDate", dataIndex: "creationDate" },
    {
      title: "Residencial Address",
      key: "residentialAddresse",
      dataIndex: "residentialAddresse",
      filter: true,
    },
    {
      title: "Agence de Souscription",
      key: "agesou",
      dataIndex: "agesou",
      filter: true,
    },
{
      title: "Status",
      key: "statut",
      dataIndex: "statut",
      render: (_, row) => {
        console.log(row.statut);
        var statusObj = getStatus(row.statut);

        return <div style={{ color: statusObj.color }}>{statusObj.name}</div>;
      },
    },
    {
      title: "Attachement",
      key: "sortcode",
      dataIndex: "sortcode",
      filter: true,
      render: (_, data) => {
        if (!data.stap) {
          return (
            <Button
              onClick={() => {
                setPickedUser(data);
                setOpen(true);
              }}
              type="outlined"
            >
              Upload Documents
            </Button>
          );
        } else {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "green",
              }}
            >
              <p>Files attached</p>
            </div>
          );
        }
      },
    },
 
    {
      title: "Actions",
      key: "role",
      dataIndex: "role",
      render: (_, row) => {
        return (
          <div className="flex space-x-2 w-full">
            {row.stap && row.statut === 0 && (
              <Button
                icon={
                  <FaCheckCircle
                    color="green"
                    className="text-red-500 inline"
                    title="Activer"
                  />
                }
                onClick={() => {
                  showActivateClientModal(row);
                }}
              ></Button>
            )}
            <Button
            href={`/clients/subscriptions_list/${row.id}?edit=false`}
              icon={
                <AiOutlineEye
                  className="text-red-600 inline"
                  title="Consulter"
                />
              }
              // href={`/users/consult/`}
            />
          
            <Button
              icon={
                <FaEdit
                  color="gray"
                  className="text-green-600 inline"
                  title="Editer"
                />
              }
              href={`/clients/subscriptions_list/${row.id}?edit=true`}
              />
            <Button
              icon={
                <FaTrash
                  color="red"
                  className="text-red-500 inline"
                  title="Supprimer"
                />
              }
              onClick={() => {
                showDeleteClientModal(row);
              }}
            />
          </div>
        );
      },
    },
  ];

  async function fetchData() {
    dispatch({ loading: true });

    let response = await apiClient({
      method: "get",
      url: "/auth/allUsers",
    });

    dispatch({ loading: false, data: response.data.data ?? [] });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <header className="flex space-x-4 mb-4 justify-between">
        <h2 className="text-lg font-bold">Utilisateurs </h2>
      </header>

      <Table
        columns={columns}
        loading={state.loading ?? false}
        optional={true}
        showIndex={true}
        dataSource={state.data ?? []}
        showFilter={{ filter: true }}
      />

      <Modal
        title="Client Attachements"
        centered
        visible={open}
        onOk={() => {
          setOpen(false);
          submitFiles();
        }}
        onCancel={() => setOpen(false)}
        width={800}
      >
        <div className="flex items-center justify-center gap-5 flex-row">
        <UploadFile
            name="Image"
            files={files}
            accessor="image"
            setFiles={setFiles}
            handleFileChange={handleFileChange}
          />
        <UploadFile
            name="CNI"
            accessor="cni"
            files={files}
            setFiles={setFiles}
            handleFileChange={handleFileChange}
          />
          <UploadFile
            name="Attachment"
            accessor="file"
            files={files}
            setFiles={setFiles}
            handleFileChange={handleFileChange}
          />
        </div>
      </Modal>
      {state.uploading && <LoaderContainer />}
    </>
  );
}
