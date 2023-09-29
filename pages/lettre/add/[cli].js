import { Upload, Table, Button, Modal, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaEdit, FaTrash } from "react-icons/fa";
import { InboxOutlined } from "@ant-design/icons";
import { AiOutlineEye } from "react-icons/ai";
import PostData from "model/PostData";
import { ArrowLeftOutlined } from "@ant-design/icons";
import config from "../../../model/config";
import RTable from "@/components/RTable";


export default function Lettres() {
  const router = useRouter();
  //const { Option } = Select;
  const { cli } = router.query;

  const { Dragger } = Upload;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [extra, setExtra] = useState({});
  const [form] = Form.useForm();
  const [state, dispatch] = useState([]);
  const [code, setCode] = useState();
  const [showDelModal, setShowDelModal] = useState();
  const [isDeletingLetter, setIsDeletingLetter] = useState();
  const [fileList, setFileList] = useState([]);
  const [ isAdding, setIsAdding ] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    //showCommentModal(true);
  };

  const columns = [
    { Header: "#", accessor: "index", disableFilters: true },

    { Header: "Title", accessor: "chl1" },
    { Header: "Description", accessor: "libl",
     Cell: ({ value }) => <p className="truncate w-80">{value}</p>,
  },
    { Header: "Fichier", accessor: "file" },

    { Header: "Date", accessor: "datei", disableFilters: true },

    { Header: "Action", accessor: "action", disableFilters: true },
  ];

  function handleUpload() {
    if(!fileList[0].response.data) {
      Modal.warning({
        title: "File is require",
       content: <p>File has not been uploaded</p>
      })
    }
    const body = {
      ...extra,
      cli,
      file: fileList[0].response.data
    };
    setIsAdding(true);
    PostData({ method: "post", url: "/opiback/addLetter", body }, (res) => {
      setIsAdding(false);
      if (res !== "Error") {
        if (res.status === "01") {
          Modal.info({
            title: "Success",
            content: <p>File Uploaded Successfully</p>,
            onOk: () => {
              setIsModalVisible(false);
              getData();
            }
          });
        } else {
          Modal.error({
            title: "Error",
            content: <p>An error occured</p>,
          });
        }
      } else {
        Modal.error({
          title: "Error",
          content: <p>An error occured</p>,
        });
      }
    });
  }

  function getData() {
    const body = {
      cli,
    };

    PostData(
      { method: "post", url: "/opiback/getLettersByCli", body },
      (res) => {
        if (res !== "Error") {
          setLoading(false);
          const data = res.data.map((elm, i) => {
            const { hashname, realname } = JSON.parse(elm.file);
            return {
              index: i + 1,
              ...elm,
              file: (
                <a
                  download
                  href={config.baseUrl + "/opiback/download/" + hashname}
                >
                  {" "}
                  {realname}{" "}
                </a>
              ),
              action: (
                <div className="flex space-x-4 w-full justify-center">
                  <button>
                    <FaEdit className="text-green-600" />{" "}
                  </button>

                  <button href={`/lettre/consult/${elm.codefich}`}>
                    {" "}
                    <AiOutlineEye
                      className="text-red-500"
                      title="Consulter"
                    />{" "}
                  </button>
                  <button onClick={() => {
                    setShowDelModal(true);
                    setCode(elm.id)
                  }}>
                    {" "}
                    <FaTrash
                      className="text-red-500"
                      title="Delete"
                    />{" "}
                  </button>
                </div>
              ),
            };
          });
          dispatch({ data });
        }
      }
    );
  }

  useEffect(() => {
    if (!cli) return;

    const userId = localStorage.getItem("uname");
    dispatch({ userId });

    getData();
    const etab = localStorage.getItem("cetab");
    const cuser = localStorage.getItem("uname");
    setExtra({ ...extra, etab, cuser });
  }, [cli]);

  const props = {
    name: "file",
    multiple: true,
    action: config.baseUrl + "/opiback/uploadfile",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (status === "done") {
        getData();
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      // console.log("Dropped files", e.dataTransfer.files);
    },
  };

  function deleteLetter(e) {
    if (!code) return;
    setIsDeletingLetter(true);
    PostData(
      { method: "post", url: config.baseUrl + `/opiback/deleLetterAdminById`, body: {id: code}},
      (res) => {
        if (res !== "Error") {
          getData();
          setShowDelModal(false);
          setIsDeletingLetter(false);
        } else {
          Modal.error({
            title: "Error",
            content: <p>An error occured</p>,
            onCancel: () => {setShowDelModal(false)}
          });
        }
        }
      );
    
  }

  function deleteFile(e) {
    const { hashname } = JSON.parse(e.response?.data);
    if (hashname) {
      PostData(
        { method: "get", url: config.baseUrl + `/opiback/delete/${hashname}` },
        (res) => {
          console.log(res);
        }
      );
    }
  }

  function onChange({ fileList }) {
    if (fileList && fileList.length > 0) {
      setFileList([fileList[fileList.length-1]]);
    } else {
      setFileList(fileList);

    }
  }
  return (
    <>
      <header className="flex space-x-4 mb-4 justify-between">
        <h2
          className="text-lg font-bold"
          style={{ cursor: "pointer" }}
          onClick={() => router.back()}
        >
          <ArrowLeftOutlined /> &nbsp; Lettres{" "}
        </h2>

        <Button onClick={showModal} type="primary" size="large">
          Ajouter une Lettre
        </Button>
      </header>

      <RTable
        columns={columns}
        data={state.data || []}
        loading={loading}
        hideCheckbox
      />

      <Modal
        title=""
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            size="large"
            onClick={() => {
              handleUpload();
            }}
            loading={isAdding}
          >
            Confirmer
          </Button>,
        ]}
      >
        <div>
          <h5>Letter desctiption</h5>
          <Form layout="vertical" form={form}>
            <Form.Item label="Title" name="title">
              <Input
                onChange={(e) => setExtra({ ...extra, title: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Description" name="desc">
              <Input.TextArea
                onChange={(e) => setExtra({ ...extra, desc: e.target.value })}
              />
            </Form.Item>
          </Form>
          <Dragger
            multiple={false}
            {...props}
            onRemove={deleteFile}
            fileList={fileList}
            onChange={onChange}
            beforeUpload={fileList.length > 0 ? () => {} : false}
          >
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
        </div>
      </Modal>

      <Modal
        title="Delete"
        visible={showDelModal}
        onOk={deleteLetter}
        confirmLoading={state.isDeletingLetter}
        onCancel={() => {setShowDelModal(false)}}
      >
        <p>Deleted data can not be recovered. Are you sure you want to continue?</p>
      </Modal>

    </>
  );
}
