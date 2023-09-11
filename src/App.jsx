import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import {BsSearch} from "react-icons/bs"
import {IoIosAddCircle} from "react-icons/io"
import {collection, getDocs, onSnapshot} from "firebase/firestore"
import {db} from "./config/firebase"
import ContactCard from "./components/ContactCard"
import Modal from "./components/Modal"
import AddAndUpdate from "./components/AddAndUpdate"
import useDisclose from "./hooks/useDisclose"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundContact from "./components/NotFoundContact"


const App = () => {
  const [contacts, setContacts] = useState([]);
  const {isOpen , onClose, onOpen} = useDisclose();

  useEffect(() =>{
    const getContacts = async() => {
      try {
        const contactsRef = collection(db, "contacts");
       
        onSnapshot(contactsRef , (snapshot) => {
        const contactLists = snapshot.docs.map((doc) => {
          return {
            id:doc.id ,
            ...doc.data(),
          };
        });
        setContacts(contactLists);
        return contactLists;
       } )
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  } , []);

  const filterContacts = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "contacts");
       
        onSnapshot(contactsRef , (snapshot) => {
        const contactLists = snapshot.docs.map((doc) => {
          return {
            id:doc.id ,
            ...doc.data(),
          };
        });

        const filteredContacts = contactLists.filter(contact => contact.name.toLowerCase().includes(value.toLowerCase()) )

        setContacts(filteredContacts);


        return filteredContacts;
       } )
  }

  return (

    <>
    <div className="max-w-[370px] mx-auto px-4">
      <Navbar/>
      <div className="flex items-center gap-1 pb-2">
        <BsSearch className="text-white absolute text-2xl ml-2 "/>
        <input
        onChange={filterContacts} type="text" 
        className="border border-white bg-transparent
        rounded-md h-10 text-white flex-grow relative px-10" />

        <IoIosAddCircle onClick={onOpen} className="text-white text-5xl cursor-pointer"/>
      </div>

      <div>{
        contacts.length <= 0 ? <NotFoundContact/> : contacts.map((contact) =>(
          <ContactCard key={contact.id} contact={contact}/>
        ))
         }</div>
  
         <AddAndUpdate onClose={onClose} isOpen={isOpen}/>
         <ToastContainer position="bottom-center"/>
      </div>

     

     
    </>

  
  )
};

export default App;
