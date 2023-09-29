
//import { FiUsers } from "react-icons/fi";
import TableComponent from "@/components/Table";
//import { users } from "data/activity";
import { useEffect, useState, useReducer } from "react";
import { Modal, Button, Table, Form} from "antd";
//import button from "@/components/button";
import PostData from "model/PostData";
import {  FaPlus, FaTrash } from "react-icons/fa";
import {AiOutlineEye} from "react-icons/ai";
import Search from "@/components/Search";
import Swal from "sweetalert2";
import RTable from "@/components/RTable";



export default function Lettre() {

  

  const reducer = (prevState, action) => ({ ...prevState, ...action });
  const [state, dispatch] = useReducer(reducer, {body:{}});

  //const [state, dispatch] = useState([]);
  const [loading, setLoading] = useState(true);

    const [usersData, setUsersData] = useState([]);

    const [isModalVisible, setIsModalVisible] = useState(false);



    function showModal(){
        setIsModalVisible(true);
      };

    //   const showCommentModal = () => {
    //     setIsCmtModalVisible(true);
    //   };
    
      const handleOk = () => {
        setIsModalVisible(false);
        //setIsCmtModalVisible(false);
      };
    
      function handleCancel(){
        setIsModalVisible(false);
       // showCommentModal(true);
      };

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

   
  function handleChange({ target }) {
    dispatch({ body: { ...state.body, [target.name]: target.value } });
  }

    function addClientUser(){

      const body = {
        "npid":state.npid,
        cli:state.cli,
        uti:"000192",
        ...state.body
      }

        PostData({method: "post", url: "/opiback/clientsSaveUser", body}, res => {
      
          if(res !== 'Error'){

            if(res.status === "2"){
              Swal.fire({text:res.message, icon:"warning"});
            //  dispatch({ isSearching:false});
              return
            }
         
          else if(res.status === "01"){
            Swal.fire({text:res.message, icon:"success"});
           // dispatch({ isSearching:false});
            return
          }
          else if(res.status == "100"){
            Swal.fire({text:"Operation is already Successful!", icon:"success"});
          //  dispatch({ isSearching:false});
            return
          }
          else {
            Swal.fire({text:"Unknown Error occred!", icon:"error"});
          //  dispatch({ isSearching:false});
            return
          }
        }

      });

    }

    useEffect(() => {
      const userId = localStorage.getItem("uname");

      const body = {
       etab:"001",
       uname:userId
      }


      PostData({method: "post", url: "/opiback/getListClientValOpi", body}, res => {
      
        if (res !== "Error") {
          setLoading(false);
          const data = res.data.map((elm, i) => ({
            index:i+1,
            ...elm,
            action: (
              <div className="flex space-x-4 w-full justify-center">
              
                 <Button href={`/lettre/add/${elm.cli}`} icon={<AiOutlineEye className="text-red-600 inline"  title="Lettres" />}/>
                
                 
                 {/* <AiOutlineEye className="text-red-600" title="Lettres" />
               </Button> */}
              
            
           </div>
            ),
          }));
          dispatch({data});
          console.log(state.data);

        }

      });



     
   //     setUsersData(allUsers);
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
           <h2 className="text-lg font-bold">Lettres par Clients </h2>

           {/* <Button href="/clients/addClient" type="primary" size="large">
           Ajouter un Client
           </Button> */}

          
           </header>
           <Search  fields={searchFields} onSearch={handleSearch} />
            <RTable
              columns={columns}
              
              data={state.data || []}
              loading={loading}
              hideCheckbox
           
            />

              <Modal title="Ajouter un Utilisateur" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} 

        
        
                  footer={[
                 
                 <Button key="submit" type="primary"  size="large" onClick={()=>{
                   addClientUser();
                   handleCancel();
                 }}>
                  Sauvegarder
               </Button>,
   
  ]}  

>
    
    

    
       

       <div className="grid grid-cols-2 gap-2">     
        <div >
            <label>Nom d’utilisateur </label>
            <input 
            type="text" 
            class="border p-2 border-gray-700"
            value={state.body.nom}
            name="nom"
            onChange={handleChange}
            
            />
        </div>
        <div >
            <label>Email de l’utilisateur </label>
            <input 
            type="email" 
            class="border p-2 border-gray-700"
            value={state.body.email}
            name="email"
            onChange={handleChange}
            
            />
        </div>
        <div >
            <label>Téléphone portable </label>
            <input 
            type="text" 
            class="border p-2 border-gray-700"
            value={state.body.tel}
            name="tel"
            onChange={handleChange}
            
            />
        </div>
        {/* <div >
            <label>Mot de Passe </label>
            <input type="password" class="border p-2 border-gray-700" />
        </div> */}
        </div>

        
      



</Modal>
          {/* </div> */}
    
        </>
      );
   

//  return (
//     <PageLayout title="Gestions utilisateurs" 
    
//     >
        
//       <header className="flex space-x-4 mb-4 justify-between">
//         <h2 className="text-lg font-bold">Utilisateurs </h2>

//         <Button href="/users/add">
//           <FaPlus className="mr-2" />
//           <span>Ajouter un utilisateur</span>
//         </Button>
//       </header>
//       <TableComponent data={usersData} columns={columns} hideCheckbox />
//     </PageLayout>
//   );

}

