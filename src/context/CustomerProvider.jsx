import { createContext, useState, useEffect } from "react";
import { axiosClient } from "../config/axios";
import config from "../config/header";

const CustomerContext = createContext();
import { swalButton } from "../Components/DeletingFile";
import Swal from "sweetalert2";
const CustomerProvider = ({children}) => {

    const[customers, setCustomers]=useState([]);
    const[customer, setCustomer] = useState({});

    useEffect(()=>{

        getCustomers();
    }, []);

    const getCustomers= async()=>{
        try{

            const{data}=await axiosClient('/customers', config);
            setCustomers(data);
        } catch(error){
            console.log(error);
        }
    }

    const saveCustomer= async(customer)=>{

        if(customer.customerId){
            try{
                const{data}= await axiosClient.put(`/customers/${customer.customerId}`, customer, config);
                const updatedCustomer = customers.map(customersState=>customersState.customerId === data.customerId? data:customersState);
                setCustomers(updatedCustomer);
                getCustomers();
            } catch(error){
                console.log(error);
                return false;
            }
        } else{
            try{
                const{data} = await axiosClient.post('/customers', customer,config);

                setCustomers([...customers,data]);
                 getCustomers();
            } catch(error){
                console.error(error);
                return false;
            }
        }
        return true;
    }
    const setEdit=(customer)=>setCustomer(customer);
    const deleteCustomer = async customerId => {
        
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
            await swalButton.fire(
                'Borrado!',
                'Se ha eliminado correctamente',
                'success'
            )
            try {

                const { data } = await axiosClient.delete(`/customers/${customerId}`, config);
                const updatedCustomer = customers.filter(customersState => customersState.customerId !== customerId);
                setCustomers(updatedCustomer);
                getCustomers();
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
        <CustomerContext.Provider
        value={{
            customers,
            saveCustomer,
            setEdit,
            customer,
            deleteCustomer
        }}> {children}   </CustomerContext.Provider>
    )
}

export{
    CustomerProvider
}

export default CustomerContext;
