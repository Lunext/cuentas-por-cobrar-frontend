import { createContext, useState, useEffect } from "react";
//Hace falta el folder config
import { axiosClient } from "../config/axios";
import config from "../config/header";
import Swal from "sweetalert2";
import { swalButton } from "../Components/DeletingFile";

const DocumentContext = createContext();
const DocumentProvider = ({children}) => {

    const[documents, setDocuments] = useState([]);
    const[document, setDocument] = useState({});

    useEffect(() => {
      
        getDocuments();
        

    }, []);
    const getDocuments = async() =>{
        try {
            const { data } = await axiosClient('/documents', config);
            setDocuments(data);
         
           
        } catch(error){
            console.log(error);
        }
    }


    
    const saveDocument=async(document)=>{
        
        if(document.documentId){
            try{
                const{data} = await axiosClient.put(`/documents/${document.documentId}`, document, config);
                const updatedDocument=documents.map(documentState=>documentState.documentId === data.documentId?data:documentState);
                setDocuments(updatedDocument);
                getDocuments();
            }catch(error){
                console.log(error);
                return false; 
            }
        } else{
            try{
                const{data} = await axiosClient.post('/documents', document, config);
              
                setDocuments([...documents, data]);

                console.log(data); 
                //getDocuments();
            } catch (error){
                console.log(error);
                return false;
            }
        }

        return true;
    }

    const setEdit=(document)=>setDocument(document);
    const deleteDocument = async documentId => {
        
        const result = await swalButton.fire({
            title: 'Está seguro?',
            text: 'No podra revertir los cambios!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí borralo!',
            cancelButtonText: 'No, cancela!',
            reverseButtons: true
             
        });

       
        if(result.isConfirmed){
            try {
                await swalButton.fire(
                    'Borrado!',
                    'Se ha eliminado correctamente',
                    'success'
                )
                
                const{data} = await axiosClient.delete(`/documents/${documentId}`, config);
                const updatedDocuments = documents.filter(documentsState=>documentsState.documentId==documentId);
                setDocuments(updatedDocuments);
                getDocuments();

            } catch(error){
                console.log(error);
            }
        }else if (result.dismiss === Swal.DismissReason.cancel) {
            await swalButton.fire(
                'Cancelado',
                'Se ha salvado!', 
                'error'
            )
        }
    }

    return (
        <DocumentContext.Provider
            value={{
                documents,
                saveDocument, 
                setEdit,
                document,
                deleteDocument,
            }}
        >

            {children}

        </DocumentContext.Provider>
    )
}
export {
    DocumentProvider
}

export default DocumentContext; 
