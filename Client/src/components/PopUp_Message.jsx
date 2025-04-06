import React from 'react'
function PopUp_Message({message,color}) {
  return (
    <>
        <div className={`fixed top-10 left-[50%] translate-x-[-50%] mx-auto ${color=="warning" ? `bg-red-500` : `bg-green-500`}   text-white px-4 py-2 rounded-lg shadow-lg z-50`}>
           {message}  
        </div>
    </>
  )
}

export default PopUp_Message