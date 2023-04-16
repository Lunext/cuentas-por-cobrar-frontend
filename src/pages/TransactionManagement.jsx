import React from 'react'
import TransactionList from '../Components/Transaction/TransactionList'
import { TransactionProvider } from '../context/TransactionProvider';
import TransactionForm from '../Components/Transaction/TransactionForm';
import { CustomerProvider } from '../context/CustomerProvider';
import { DocumentProvider } from '../context/DocumentProvider';
import TransactionFilteredByDate from '../Components/Transaction/TransactionFilteredByDate';
 import SentToContabilidadButton from '../Components/sentToContabilidadButton';
const TransactionManagement = () => {




    return (
      <div className='mx-auto px-10'>
      <TransactionProvider>
        <CustomerProvider>
            <DocumentProvider>
           
          
              <TransactionForm /> 
              <TransactionFilteredByDate />
             <SentToContabilidadButton/>
            </DocumentProvider>
        </CustomerProvider>

          
          <TransactionList />
      
        </TransactionProvider>
        </div>
  )
}

export default TransactionManagement;