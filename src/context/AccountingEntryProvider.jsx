
import { createContext, useState, useEffect } from "react";
import { axiosClient } from "../config/axios";
import config from "../config/header";

import { swalButton } from "../Components/DeletingFile";
import Swal from "sweetalert2";
const AccountingEntryContext=createContext();
const AccountingEntryProvider=({children}) =>{
    const [accountingEntries, setAccountingEntries]=useState([]);
    const [accountingEntry, setAccountingEntry] = useState({});

    useEffect(() =>{
       
        getAccountingEntries();
    }, []);


    const getAccountingEntries=async()=>{
        try{
            
            const {data}= await axiosClient('/accountingEntries',config);
            setAccountingEntries(data);

            console.log(data);
           
        } catch(error){
            console.log(error);
        }
    }

   

   

    return(
        <AccountingEntryContext.Provider
        value={{
            accountingEntries,
    
            accountingEntry
            }}>
            {children}
        </AccountingEntryContext.Provider>
    )

  
}



export{
    AccountingEntryProvider
}

export default AccountingEntryContext;