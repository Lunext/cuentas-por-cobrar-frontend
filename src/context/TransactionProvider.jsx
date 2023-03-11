import { createContext, useState, useEffect } from "react";
import axiosClient from "../config/axios";
import config from "../config/header";
import Swal from "sweetalert2";
import { swalButton } from "../Components/DeletingFile";

const TransactionContext=createContext();
const TransactionProvider = ({children}) => {

    const[transactions, setTransactions]= useState([]);
    const[transaction, setTransaction]=useState({});

    useEffect(()=>{
       
        getTransactions();
    }, []);

    const getTransactions = async()=>{
        try{

            const {data}= await axiosClient('/transaction',config);

            setTransactions(data);
        }
        catch(error){
            console.log(error);
        }
    }

    const saveTransaction= async(transaction)=>{
     
        if(transaction.transactionId){
            try{
                const{data} = await axiosClient.put(`/transaction/${transaction.transactionId}`, transaction,config);
                const updatedTransaction = transactions.map(transactionState=>transaction.transactionId === data.transactionId? data:transactionState);
                setTransactions(updatedTransaction);
                getTransactions();
            }catch(error){
                console.log(error);
                return false;
            }
        } else {
            try {
                const { data } = await axiosClient.post('/transaction', transaction, config); 
                setTransactions([...transactions, data]); 
              //  console.log(data); 
                getTransactions();
            } catch (error) {
                console.log(error); 
                return false;
            }
        }
        return true;
    }

    const setEdit=(transaction)=>setTransaction(transaction);

    const deleteTransaction = async transactionId => {
        
        const result = await swalButton.fire({
            title: 'Está seguro?',
            text: 'No podra revertir los cambios!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí borralo!',
            cancelButtonText: 'No, cancela!',
            reverseButtons: true
             
        });
    
        if (result.isConfirmed) {
            try {
                await swalButton.fire(
                    'Borrado!',
                    'Se ha eliminado correctamente',
                    'success'
                )
                
                const { data } = await axiosClient.delete(`/transaction/${transactionId}`, config);
                const updatedTransaction = transactions.filter(transactionsState => transactionsState.transactionId !== transactionId);
                setTransactions(updatedTransaction);
            } catch (error) {
                console.log(error);
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            await swalButton.fire(
                'Cancelado',
                'Se ha salvado!',
                'error'
            )
       
        }
    }
    return(
        <TransactionContext.Provider
        value={{
            transactions,
            saveTransaction,
            setEdit,
            transaction,
            deleteTransaction
        }}>
            {children}
        </TransactionContext.Provider>
    )
}
export{
    TransactionProvider 
    
}

export default TransactionContext;