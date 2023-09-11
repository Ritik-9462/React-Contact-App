import { deleteDoc , doc} from "firebase/firestore"
import {HiOutlineUserCircle} from "react-icons/hi"
import {IoMdTrash} from "react-icons/io"
import {RiEditCircleLine} from "react-icons/ri"
import { db } from "../config/firebase"
import AddAndUpdate from "./AddAndUpdate"
import useDisclose from "../hooks/useDisclose"
import { toast } from "react-toastify"

const ContactCard = ({contact}) => {
  const {isOpen , onClose, onOpen} = useDisclose();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts" , id));
      toast.success("Contact Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
    <div key={contact.id} className="bg-yellow flex rounded-lg justify-between items-center p-2 mt-2"> 
             <div className="flex gap-2 ">
              <HiOutlineUserCircle className="text-orange text-4xl"/> 
              <div className="">
                <h2 className="text-l">{contact.name}</h2>
                <p className="text-xs "> {contact.email}</p>
                </div>
              </div>  

              <div className="flex gap-1">
                  <RiEditCircleLine onClick={onOpen}  className="text-3xl cursor-pointer"/>
                  <IoMdTrash onClick={() => deleteContact(contact.id)} className="cursor-pointer text-3xl text-orange"/>
                </div>     
     </div>
     <AddAndUpdate contact={contact} isUpdate isOpen={isOpen} onClose={onClose}/>
     </>
  )
}

export default ContactCard
