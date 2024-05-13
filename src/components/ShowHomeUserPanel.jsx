import React from 'react'
import illus from '../assets/illus.png'

const ShowHomeUserPanel = () => {
  return (
    <div className="bg-cover bg-left w-full flex flex-col items-center  text-black justify-center h-screen">
      <h1 className="text-2xl md:text-4xl font-bold py-4 ">
        This is User panel
      </h1>
      <h1>
        You can check your Orders and Reservation by navigating through the
        sidebar
      </h1>
    </div>
  )
}

export default ShowHomeUserPanel
