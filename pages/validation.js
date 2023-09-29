
//import { FiUsers } from "react-icons/fi";
import PageLayout from "@/components/pageLayout";
import TableComponent from "@/components/Table";
//import { users } from "data/activity";
import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

import Button from "@/components/button";

export default function Validation() {

    const [usersData, setUsersData] = useState([]);

    const columns = [
    {Header:"#", accessor:"index"},
    { Header: "Référence du règlement", accessor: "num" },
    { Header: "Date règlement", accessor: "date" },
    {
      Header: "Montant règlement en devise",
      accessor: "mtDev",
      disableFilters: true,
    },
    { Header: "Devise", accessor: "dev" },
    { Header: "Taux", accessor: "tau", disableFilters: true },
    {
      Header: "Montant du règlement (XAF)",
      accessor: "amount",
      disableFilters: true,
    },
    { Header: "Nom du Bénéficiaire", accessor: "name" },
    { Header: "Pays du fournisseur", accessor: "pays" },
    { Header: "Action", accessor: "action", disableFilters: true },
    
    ]

    const users = [
      {
        num: "REG020555",
        date: "09/11/2021",
        mtDev: "450000000",
        dev: "xaf",
        tau: "0.15%",
        amount: "960000522",
        name: "Bile",
        pays: "Cameroun",
      },
      {
        num: "REG020555",
        date: "09/11/2021",
        mtDev: "450000000",
        dev: "xaf",
        tau: "0.15%",
        amount: "960000522",
        name: "Tsanga",
        pays: "Cameroun",
      },
      {
        num: "REG024522",
        date: "09/11/2021",
        mtDev: "933000000",
        dev: "xaf",
        tau: "0.15%",
        amount: "220000522",
        name: "Koko",
        pays: "Cameroun",
      },
      {
        num: "REG020555",
        date: "09/11/2021",
        mtDev: "89600000",
        dev: "xaf",
        tau: "0.15%",
        amount: "12000522",
        name: "Atangana",
        pays: "Cameroun",
      },
      {
        num: "REG02462",
        date: "09/11/2021",
        mtDev: "3200000",
        dev: "euro",
        tau: "0.15%",
        amount: "47000522",
        name: "Mbouwe",
        pays: "France",
      },
       
    ]

    useEffect(() => {
        const allUsers = users.map((user, i) => ({
            index:i+1,
          ...user,
          action: (
            <div className="flex space-x-4 w-full justify-center">
              <button>
                {" "}
                <FaEdit className="text-green-600" />{" "}
              </button>
              {/* <button>
                {" "}
                <FaTrash className="text-red-500" />{" "}
              </button> */}
            </div>
          ),
        }));
        setUsersData(allUsers);
      }, []);



      return (
        <>
         

         
            <header className="flex space-x-4 mb-4 justify-between">
           <h2 className="text-lg font-bold">Validations </h2>

           {/* <Button href="/users/listusers" className="btn">
           <FaPlus className="mr-2" />
           <span>Ajouter un utilisateur</span>
           </Button> */}
           </header>
      
            <TableComponent
              columns={columns}
              data={usersData}
              hideCheckbox
            
            />
         
    
        </>
      );
   



}

