
//import { FiUsers } from "react-icons/fi";
import PageLayout from "@/components/pageLayout";
import TableComponent from "@/components/Table";
//import { users } from "data/activity";
import { useEffect, useState } from "react";
import {AiOutlineEye} from "react-icons/ai";
import {Table, Modal, Form} from "antd";
import PostData from "model/PostData";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import Search from "@/components/Search";

import Button from "@/components/button";
import RTable from "@/components/RTable";

export default function Client_pending() {

  //const userId = localStorage.getItem("uname");

   // const [usersData, setUsersData] = useState([]);
    const [state, dispatch] = useState([]);
    const [loading, setLoading] = useState(true);
    const [code, setCode] = useState(null);
    const [tel, setTel] = useState(null);


    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isValVisible, setIsValVisible] = useState(false);
  //  const [isCmtModalVisible, setIsCmtModalVisible] = useState(false);


  function showDelModal() {
    setIsModalVisible(true);
    
  }

    function showValModal(){
      setIsValVisible(true);
      
      };

      function handleOk(){
        setIsModalVisible(false);

       
      };
      function handleCancel(){
        setIsModalVisible(false);
        
      };

      function refreshPage() {
        window.location.reload(false);
      }

      
  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();

  const getFields = () => {
    const count = expand ? 10 : 6;
    const children = [];

    for (let i = 0; i < count; i++) {
      children.push(
        <Col span={8} key={i}>
          <Form.Item
            name={`field-${i}`}
            label={`Field ${i}`}
            rules={[
              {
                required: true,
                message: "Input something!",
              },
            ]}
          >
            <Input placeholder="placeholder" />
          </Form.Item>
        </Col>
      );
    }

    return children;
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

 

    const columns = [
    { Header: "#", accessor: "index", disableFilters: true },
        { Header: "Nom/Raison Sociale", accessor: "nom" },
        { Header: "Type", accessor: "tprod", disableFilters: true  },
        { Header: "Email", accessor: "ema", disableFilters: true },
        { Header: "Téléphone", accessor: "tel" },
        { Header: "NUI", accessor: "ncc" },
     //   { title: "Num de Compte", dataIndex: "compte", disableFilters: true },
        { Header: "Date", accessor: "dou", disableFilters: true },
        
        { Header: "Action", accessor: "action", disableFilters: true},
    ]
    
    const searchFields = columns
    .filter((column) => !column.disableFilters)
    .map((col) => {
      return {
        label: col.Header,
        name: col.accessor,
      };
    });
  
    function handleSearch () {
  
    }
   

    
    
  function validateClient(valstatus){
   // dispatch({ isSearching:true});
    

    const body = {
     // internal_id:trans,
     "etab":"001", 
     "user":"000192",
      "validation":[{"tel":code.tel}],
       "val": valstatus
    
     // user:userId
    }
    PostData({method: "post", url: "/opiback/valClientsOpi", body}, res => {
      if(res !== 'Error'){

        if(res.status === "2"){
         // Swal.fire({text:res.message, icon:"warning"});
          Modal.warning({content:<p>{res.message}</p>});
        //  dispatch({ isSearching:false});
          return
        }
     
      else if(res.status === "01"){
        Modal.success({title:"Success", content:<p>{res.message}</p>})
      
    .then(() => {
      //  dispatch({ refresh: parseInt(state.refresh) + 1 });
       refreshPage();
      });
      
        return
      }
      
    }
  

    });

  }

    

     function deleteClient(){


    const body = {
      // internal_id:trans,
      "etab":"001", 
      "user":"000192",
       "delete":[{"tel":tel.tel}]
        
     }
     PostData({method: "post", url: "/opiback/deleClientsOpi", body}, res => {
       if(res !== 'Error'){
 
         if(res.status === "2"){
           
           Modal.warning({title:"warning", content:<p>{res.message}</p>})
         //  dispatch({ isSearching:false});
           return
         }
      
       else if(res.status === "01"){
         
         Modal.success({title:"Success", content:<p>{res.message}</p>})
         
        // dispatch({ isSearching:false});
         return
       }
       else if(res.status == "100"){
         Swal.fire({text:"Operation is already Successful!", icon:"success"});
       //  dispatch({ isSearching:false});
         return
       }
     }
   
 
     });

     }


     function getValModal(tel){
      showValModal();
      setCode({tel});

     }

     function getDeleteModal(tel){
    //  dispatch({ deleteModal:true});
    showDelModal();
      setTel({tel});
  
    }
    

    useEffect(() => {
      const userId = localStorage.getItem("uname");
      dispatch({userId});

      const body = {
       etab:"001",
       uname:userId
      }
      PostData({method: "post", url: "/opiback/getListClientPendingOpi", body}, res => {
      
        if (res !== "Error") {
          setLoading(false);
          var data = res.data.map((elm, i) => ({
            index:i+1,
            ...elm,
            action: (
              <div className="flex space-x-4 w-full justify-center">
               <Button href={`/clients/pending/consult/${elm.tel}`}>
                  {" "}
                  <AiOutlineEye
                    className="text-red-600 inline"
                    title="Consulter"
                  />{" "}
                </Button>
              <button    
              onClick={()=>{
               // dispatch({tel:elm.tel});
                getValModal(elm.tel);
              }}
              >
                {" "}
                <FaEdit className="text-green-600" title="Valider" />{" "}
              </button>

              <button       
               onClick={()=>{
              //  dispatch({tel:elm.tel});
                getDeleteModal(elm.tel);
              }}
              >
                {" "}
                <FaTrash className="text-red-500" title="Supprimer" />{" "}
              </button>
            </div>
            ),
          }));
          dispatch({data});

        }

      });
        
       // setUsersData(allUsers);
        // dispatch({data:allUsers});
        //console.log("dataSource",state.data);
      }, []);



      return (
        <>
          {/* <Helmet>
            <meta charSet="utf-8" />
            <title>IWP | Ptrs in val</title>
          </Helmet> */}

          {/* <div className="container-fluid "> */}
            {/* <PageHeader title="Partners in Validation" breadcrumb={[]} /> */}
            {/* Table Position */}
            <header className="flex space-x-4 mb-4 justify-between">
           <h2 className="text-lg font-bold">Souscriptions En Attente </h2>

          
           </header>
      
            {/* <TableComponent
              columns={columns}
             
              data={usersData}
              hideCheckbox
            
            /> */}
             <Search  fields={searchFields} onSearch={handleSearch} />
         <RTable   data={state.data || []}  columns={columns} loading={loading} hideCheckbox />

         <Modal 
         title="Validation"
          visible={isValVisible} 
          onOk={handleOk} 
          onCancel={() => {    setIsValVisible(false);}}
        //  onCancel={handleCancel} 

        
        
          footer={[
             <Button key="back" type="secondary" onClick={()=>{
              // handleCancel();
              setIsValVisible(false);
               validateClient("2");
             //  dispatch({val:"2"});
            }
           } >
             Rejeter
          </Button>,
         <Button key="submit" type="primary"  onClick={()=>{
         // handleCancel();
         setIsValVisible(false);
          validateClient("1");
         // dispatch({val:"1"});
       }
      } >
             Accepter
        </Button>,
   
  ]}  

>
    <h3>Souhaitez-vous Accepter ou Rejeter ce Souscription ?</h3>

</Modal>

     <Modal 
      title="Supprimer"
     // visible={state.deleteModal} 
        visible={isModalVisible}
      onOk={deleteClient} 
      
      onCancel={() => {    setIsModalVisible(false);}}

        
        
           footer={[
            <Button key="back" type="secondary" onClick={()=>{
              setIsModalVisible(false);
             // dispatch({deleteModal:false});
          //  dispatch({val:"2"});
           }
          } >
         Non
       </Button>,
      <Button key="submit" type="primary"  onClick={()=>{
        
        deleteClient();
        setIsModalVisible(false);
       // dispatch({deleteModal:false});
         // dispatch({val:"1"});
        }
         } >
       Oui
      </Button>,

        ]}  

      >
           <h3>Les lignes supprimées ne peuvent pas être récupérées. Êtes-vous sûr de vouloir supprimer
            ceci/ces ligne(s) ?</h3>

        </Modal>
    
        </>
      );
   



}

