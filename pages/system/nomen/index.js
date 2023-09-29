import {  useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { Modal } from "antd";
import Button from "@/components/button";
import PostData from "model/PostData";
import RTable from "@/components/RTable";
import { getAllNomenclature } from "utils/nomenclature";
import IconButton from "@/components/IconButton";

export default function ListNomen({ data }) {
  const [state, dispatch] = useState({});

  const columns = [
    {
      Header: "#",
      accessor: "index",
    },
    {
      Header: "Code de la Table",
      accessor: "tabcd",
    },
    {
      Header: "Nom de la Table",
      accessor: "tbnam",
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({row: {original = {}}}) => {
        let tabcd = original.tabcd;
        return (
          <div className="flex space-x-4 w-full">
            <IconButton
              href={`/nomen/review/${tabcd}`}
              icon={
                <AiOutlineEye
                  className="text-red-600"
                  title="Consulter"
                />
              }
            />
            <IconButton
              href={`/nomen/edit/${tabcd}`}
              icon={<FaEdit className="text-green-600" title="Editer" />}
            />
            <IconButton
              onClick={() => {
                dispatch({ ...state, code: tabcd, showDelModal: true });
              }}
              icon={
                <FaTrash className="text-red-500" title="Supprimer" />
              }
            />
          </div>
        );
      },
    },
  ];

  function handleDelete() {
    const body = { tabcd: state.code, user: "1" };
    PostData({ method: "post", url: "/api/deleteNomen", body }, (res) => {
      dispatch({ ...state, showDelModal: false, isDeleting: false });
      if (res !== "Error") {
        if (res.status === "01") {
          Modal.info({
            title: "Success",
            content: <p>Data successfully deleted</p>,
            onOk: () => {
              dispatch({ refresh: !state.refresh });
            },
          });
        } else {
          Modal.error({ title: "Error", content: <p>{res.message}</p> });
        }
      } else {
        Modal.error({ title: "Error", content: <p></p> });
      }
    });
  }

  return (
    <>
      <header className="flex space-x-4 mb-4 justify-between">
        <h2 className="text-lg font-bold">Nomenclature </h2>

        <Button size="large" type="primary" href="/nomen/add">
          Ajouter un Nomenclature
        </Button>
      </header>

      <RTable columns={columns} data={data || []} hideCheckbox />
      <Modal
        title="Delete"
        visible={state.showDelModal}
        onOk={handleDelete}
        confirmLoading={state.isDeleting}
        onCancel={() => {
          dispatch({ showDelModal: false, code: null });
        }}
      >
        <p>
          Deleted data can not be recovered. Are you sure you want to continue?
        </p>
      </Modal>
    </>
  );
}

export async function getServerSideProps(_) {
  let response = await getAllNomenclature();
  return {
    props: { data: response.data },
  };
}
