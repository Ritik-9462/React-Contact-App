import { createPortal } from "react-dom"
import {AiOutlineClose} from "react-icons/ai"

const Modal = ({onClose, isOpen , children}) => {
  return createPortal(
    <>
    {isOpen && (
      
          <div  className="grid place-items-top backdrop-blur h-screen w-screen z-40 absolute top-0">
              
                  <div className=" rounded z-50 relative m-auto min-h-[200px] w-[300px] bg-white p-2">
                  <div className=" flex justify-end p-4">
                    <AiOutlineClose onClick={onClose} className="text-2xl cursor-pointer"/>
                  </div>
                  {children}
                  </div>
           </div>

          

          
      

    )}
    </>
  ,document.getElementById("modal-root"))
}

export default Modal
