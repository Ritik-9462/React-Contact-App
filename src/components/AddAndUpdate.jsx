import React from 'react'
import Modal from './Modal'
import { ErrorMessage, Field,Form, Formik } from 'formik'
import {db} from "../config/firebase"
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
    name: Yup.string().required("* Name is Required"),
    email: Yup.string().email("Invalid Email").required("* Email is Required"),
})

const AddAndUpdate = ({isOpen, onClose , isUpdate , contact}) => {

   const addContact = async (contact) =>{
    try {
        const contactRef = collection(db , "contacts");
        await addDoc(contactRef, contact);
        onClose();
        toast.success("Contact Added Successfully");
    } catch (error) {
        console.log(error);
        
    }
   }

   const updateContact = async (contact, id) =>{
    try {
        const contactRef = doc(db , "contacts" , id);
        await updateDoc(contactRef, contact);
        onClose();
        toast.success("Contact Updated Successfully");
    } catch (error) {
        console.log(error);
        
    }
   }

  return (
    <div>
       <Modal isOpen={isOpen} onClose={onClose}> 
     <Formik
     validationSchema={contactSchemaValidation}
     initialValues={isUpdate ? {
        name : contact.name,
        email: contact.email,
     }
       : {
        name : "",
        email: "",
     }}
     onSubmit={(values) => {
            console.log(values);
            isUpdate ? updateContact(values, contact.id) :
            addContact(values);
     }}>
        <Form className='flex flex-col'>
            <div className='flex flex-col gap-1'> 
                <label  htmlFor='name'>Name</label>
                <Field name= "name" className='border rounded px-2'/>
                <div className='text-red-500 text-xs'>
                    <ErrorMessage name="name"/>
                </div>
            </div>

            <div className='flex flex-col gap-1 pt-3 pb-4'> 
                <label  htmlFor='email'>Email</label>
                <Field  name= "email" className='border rounded px-2'/>
                <div className='text-red-500 text-xs'>
                    <ErrorMessage name="email"/>
                </div>
            </div>

            <button className='self-end bg-orange border-black text-white rounded px-2 py-1 mb-5 '>{ isUpdate ? "Update" : "Add"} Contact </button> 
        </Form>
     </Formik>

        </Modal>
    </div>
  )
}

export default AddAndUpdate
