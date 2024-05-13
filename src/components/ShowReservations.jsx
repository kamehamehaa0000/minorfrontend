import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { dotStream } from 'ldrs'
dotStream.register()

const ShowReservations = () => {
  const [reservations, setReservations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [cookies] = useCookies(['authToken'])
  const ApiURL = import.meta.env.VITE_APIURL
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`${ApiURL}/reservation/user`, {
          headers: {
            Authorization: `Bearer ${cookies.authToken}`,
          },
        })
        console.log(response.data.data)
        setReservations(response.data.data)
        setIsLoading(false)
      } catch (error) {
        alert('Error fetching the reservations')
        setIsLoading(false)
      }
    }

    fetchReservations()
  }, [])

  const handleDeleteReservation = async (resID) => {
    try {
      await axios.delete(`${ApiURL}/reservation/delete/${resID}`, {
        headers: {
          Authorization: `Bearer ${cookies.authToken}`,
        },
      })
      setReservations((prevReservations) =>
        prevReservations.filter((reservation) => reservation._id !== resID)
      )
    } catch (error) {
      alert('Error deleting the reservation')
    }
  }
  const loadingAnimation = (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col m-4  rounded-md ">
        <l-dot-stream size="90" speed="3" color="black" />

        <h1 className="text-center font-semibold">loading...</h1>
      </div>
    </div>
  )

  if (isLoading) {
    return loadingAnimation
  }

  return (
    <div className="w-full sm:p-10 mx-auto">
      <h1 className="text-3xl font-bold mb-4">Reservations</h1>
      <div>
        <h2 className="text-xl font-bold mb-2">Your Reservations:</h2>
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation._id} className="mb-2">
              <div>Date: {reservation.date}</div>
              <div>Time: {reservation.time}</div>
              <div>Heads: {reservation.heads}</div>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded-md mt-2"
                onClick={() => handleDeleteReservation(reservation._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ShowReservations
