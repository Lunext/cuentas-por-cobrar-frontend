import React from 'react'
import { useState } from 'react';
import useTransaction from '../../hooks/useTransaction';
import { useEffect } from 'react';
import Modal from '../Modal';


const TransactionFilteredByDate = () => {

    const [open, setOpen] = useState(false); 
    const [firstDate, setFirstDate] = useState(''); 
    const [lastDate, setLastDate] = useState(''); 
    const { getTransactionsByDate, transactions, getTransactions, sendToContabilidad} = useTransaction(); 

    const clearFilter =  async() => {
     
        setFirstDate(''); 
        setLastDate('');
       await  getTransactions(); 
   }
    
    const handlingSubmit = async (e) => {
        e.preventDefault(); 

        try{

               
            if (firstDate && lastDate) {
                await getTransactionsByDate(firstDate, lastDate);
            
                setOpen(false)
                
            }

           
        }
        catch (error) {
            console.log(error); 
        }
    }
    

    return (
        <div className='relative min-h-scr'>
          <div className=' flex-col  my-2'>
                <button onClick={() => setOpen(!open)} className="py-3 px-4 bg-amber-500 hover:bg-amber-600  text-white font-bold text-lg rounded-full uppercase">Filtrar por fechas</button>
                <button onClick={clearFilter} className="flex-1 py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-bold text-lg rounded-full">Limpiar filtro</button>
          </div>

          {open ? <Modal>
              <div className='flex flex-col gap-2 bg-white px-4 pb-4 rounded-lg'>
                  <h1 className='text-xl text-black mt-2 font-bold pr-48'> Filtra una fecha</h1>
                  <hr />
                
                  <form
                    
                      onSubmit={handlingSubmit} 
                  > 
                  <div className='flex flex-col gap-2'>
                      <label htmlFor='firstDate'>Introduzca la primera fecha. </label>
                          <input id="firstDate" type="date" className='py-2 px-4 border border-gray-200 rounded-lg'
                            
                          value={firstDate}
                          onChange={(e)=>setFirstDate(e.target.value)} 
                          />
                         
                         
                  </div>
                  <hr />

                  <div className='flex flex-col gap-2'>
                      <label htmlFor='lastDate'>Introduzca la ultima fecha. </label>
                      <input id="lastDate"  type="date" className='py-2 px-4 border border-gray-200 rounded-lg'
                          value={lastDate}
                          onChange={e=>setLastDate(e.target.value)}
                      />
                  </div>
                      <hr />
                      
                    
                      <div className='flex flex-row gap-2 pt-6'>
                            <button onClick={() => setOpen(!open)} className="flex-1 py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white font-bold text-lg rounded-full">Cerrar</button>
                            <input type='submit' value="Filtrar" className="flex-1 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg rounded-full" />
                           
                        </div>
                      </form>
              </div>
              
          </Modal> : null}
      
      </div>
      
    
  )
}

export default TransactionFilteredByDate;