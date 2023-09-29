import { useEffect, useState } from "react";
import { Upload, Button, Modal, Table, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { AiOutlineEye } from "react-icons/ai";
import PostData from "model/PostData";
import config from "model/config";
import { saveAs } from "file-saver";
import RTable from "@/components/RTable";

export default function Chargement() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Dragger } = Upload;
  const [state, dispatch] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [extra, setExtra] = useState({});

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
    getData();
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    //showCommentModal(true);
  };

  const columns = [
    { header: "#", accessor: "index", disableFilters: true },
    { Header: "Code", accessor: "codefich" },
    { Header: "Nom Lot", accessor: "nomfich" },
    { Header: "Type", accessor: "typfich" },

    { Header: "Date", accessor: "dou", disableFilters: true },

    { Header: "Action", accessor: "action", disableFilters: true },
  ];

  const saveFile = () => {
    saveAs(
      "/assets/fileserver/samplereg.csv",
      "samplereglement.csv"

    );
  };


  function getData() {
    const body = {
      etab: "001",
    };

    PostData({ method: "post", url: "/opiback/getLotOpiFich", body }, (res) => {
      if (res !== "Error") {
        setLoading(false);
        const data = res.data.map((elm, i) => ({
          index: i + 1,
          ...elm,
          action: (
            <div className="flex space-x-4 w-full justify-center">
              {/* <Button href={`/nomen/review/${elm.tabcd}`} icon={<AiOutlineEye className="text-red-600 inline" title="Consulter" />} /> */}
              <Button
                href={`/donnee/chargemt/detailfich/${elm.codefich}`}
                icon={
                  <AiOutlineEye
                    className="text-green-600 inline"
                    title="Consulter"
                  />
                }
              />
            </div>
          ),
        }));
        dispatch({ data });
      }
    });
  }

  useEffect(() => {
    getData();
     const etab = localStorage.getItem("cetab");
     const user = localStorage.getItem("uname");
     setExtra({etab, user})
  }, [JSON.stringify(extra)]);
  
  const props = {
    name: "file",
    multiple: true,
    action: config.baseUrl + "/opiback/uploadReglements",
    data: extra,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      // console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <>
      <header className="flex space-x-4 mb-4 justify-between">
        <h2 className="text-lg font-bold">Historique de Chargement </h2>

        <div>
      <Button  type="primary"  onClick={saveFile}>download Sample File</Button> 
      {/* <a href="/donnee/fileserver/pdfcoffee.pdf" className="btn primary-btn">Download</a> */}
    </div>

        <Button onClick={showModal} type="primary" >
          Ajouter un Document
        </Button>
      </header>

      <RTable columns={columns} data={state.data || []} loading={loading} hideCheckbox />
      <Modal
        title=""
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          

          <Button key="submit" type="primary" size="large" onClick={handleOk}>
            Confirmer
          </Button>,
        ]}
      >
        <h2 className="text-lg font-bold mb-2">Téléchargement des document</h2>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p>
        </Dragger>
      </Modal>
    </>
  );
}
