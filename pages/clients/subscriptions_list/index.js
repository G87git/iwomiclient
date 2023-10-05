import { useEffect, useReducer, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Button, Modal } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";
import Table from "@/components/Custom/Table";
import apiClient from "api";
import Swal from "sweetalert2";
import UploadFile from "./upload_files";
import Link from "next/link";

export default function Index() {
  const reducer = (prevState, action) => ({ ...prevState, ...action });
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    data: [],
  });

  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);

  const getStatus = (status) => {
    switch (status) {
      case "01":
        return { name: "Validated", color: "rgba(16, 185, 129, 1)" };
      case "02":
        return { name: "Pending", color: "RGB(203, 86, 35)" };
      case "03":
        return { name: "Rejected", color: "rgba(239, 68, 68, 1)" };
      default:
        return { name: "Pending", color: "orange" };
    }
  };

  function showDelModal() {
    setIsModalVisible(true);
  }

  function handleFileChange(e) {
    setFiles((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
  }

  const submitFiles = async (e) => {
    dispatch({ showUploadModal: false, isActivating: true });

    var formDatas = Object.entries(files).map((e) => {
      var file = e[1];
      const formData = new FormData();

      formData.append("file", file, file.name);
      formData.append("type", e[0]);
      formData.append("cli", rowData.codecli);
      formData.append("codewal", rowData.codewal);
      formData.append("uti", localStorage.getItem("uname"));
      formData.append("utimo", localStorage.getItem("uname"));

      return formData;
    });

    var numOfSucesses = 0;

    var promises = formDatas.map((e) =>
      PostData(
        { method: "POST", url: "/digitalbank/uploadGimacFile", body: e },
        (res) => {
          if (res !== "error" && res.success === "01") {
          } else {
            throw new Error("File couldn't be uploaded to server.");
          }
        }
      )
    );

    try {
      const result = await Promise.allSettled(promises);
      dispatch({ isActivating: false });

      result.forEach((e) => {
        if (e.status === "fulfilled") numOfSucesses = numOfSucesses + 1;
      });

      if (numOfSucesses == 3) {
        Swal.fire({
          title: "Files Uploaded Successfully",
          text: "Files Uploaded Successfully to server.",
          denyButtonText: "Retry",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire({
          title: "File couldn't be uploaded",
          text: "File couldn't be uploaded to server.",
          denyButtonText: "Retry",
          icon: "error",
        }).then(() => {});
      }
    } catch (error) {
      Swal.fire({
        title: "File couldn't be uploaded",
        text: "File couldn't be uploaded to server.",
        denyButtonText: "Retry",
        icon: "error",
      }).then(() => {});
    }
  };

  function deleteClient() {
    Swal.fire({
      title: "Suprimer le Client?",
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#52c41a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui! Suprimer",
cancelButtonText: "Annuler",
    }).then((result) => {});
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
      key: "id",
      dataIndex: "id",
      render: (_, { tag }) => {
        var statusObj = getStatus(tag);

        return <div style={{ color: statusObj.color }}>{statusObj.name}</div>;
      },
    },
    {
      title: "Attachement",
      key: "sortcode",
      dataIndex: "sortcode",
      filter: true,
      render: (_, { tags }) => {
        return (
          <Button
            onClick={() => {
              console.log("Clicked");
              setOpen(true);
            }}
            type="outlined"
          >
            Upload Documents
          </Button>
        );
      },
    },
 
    {
      title: "Actions",
      key: "id",
      dataIndex: "id",
      render: (_, { id }) => {
        return (
          <div className="flex space-x-4 w-full">
          

            <Button
            href={`/clients/subscriptions_list/action?edit=true&id=${id}`}
              icon={
                <AiOutlineEye
                  className="text-red-600 inline"
                  title="Consulter"
                />
              }
            />
          
            <Button
              icon={
                <FaEdit
                  color="gray"
                  className="text-green-600 inline"
                  title="Editer"
                />
              }
              href={`/clients/subscriptions_list/${id}`}
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
                deleteClient();
              }}
            />
          </div>
        );
      },
    },
  ];

  function showDelM(code) {
    setCode({ uname: code });
    showDelModal();
  }

  async function fetchData() {
    dispatch({ loading: true });

    let response = await apiClient({
      method: "get",
      url: "/auth/allUsers",
    });

    dispatch({ data: response.data.data || [], loading: false });
  }

  useEffect(() => {
    fetchData();
  }, []);

  console.log(state.data);

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
        actions={
          <Button href="/users/adduser" type="primary" size="large">
            Ajouter un utilisateur
          </Button>
        }
      />

      <Modal
        title="Client Attachements"
        centered
        visible={open}
        onOk={() => setOpen(false)}
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
    </>
  );
}
