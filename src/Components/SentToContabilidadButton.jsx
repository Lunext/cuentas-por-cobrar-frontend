import React from 'react'
import useTransaction from '../hooks/useTransaction'
import { useState } from 'react';
import { useEffect } from 'react';
import savingChangesAlert from './SavingChanges';

const SentToContabilidadButton = () => {


    const {sendToContabilidad, transaction} = useTransaction(); 
    const [id_aux, setAuxiliarId] = useState(5); 
    const [nombre_aux, setAuxiliarName] = useState("Cuentas por cobrar"); 
    const [cuenta, setCuenta] = useState(1); 
    const [origen, setMovementType] = useState('');
    const [monto, setAmount] = useState(0); 


    useEffect(() => {
        
    }, [transaction])


    const handleSubmit = async e => {
        e.preventDefault();

        try {
            let result = await sendToContabilidad({ origen, id_aux, nombre_aux, cuenta, monto });
            if (result) {
                savingChangesAlert(); 
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Bobaso',
                text: 'Usted se la acaba de beberrrrr'
            });
        }
    }







  return (
    <div>
      
          <form onSubmit={handleSubmit}>
              
              <input
                  type="submit"
                  value="Contabilizar"
                  className='flex-1 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg rounded-full'
              />
              
          </form>
    </div>
  )
}

export default SentToContabilidadButton
