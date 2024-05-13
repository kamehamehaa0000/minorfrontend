import React from 'react'
import { useState } from 'react'
import TextInput from './Shared/TextInput'
import { useCookies } from 'react-cookie'
import extractErrorMessage from '../utilities/extractErrorMsg'
import { makeAuthenticatedPOSTrequest } from '../utilities/apiCall'
const Reservation = () => {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const [heads, setHeads] = useState(0)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [cookie, setCookie, removeCookie] = useCookies(['authToken'])
  const [loading, setLoading] = useState(false)
  const clearFields = () => {
    setTime('')
    setDate('')
    setHeads('')
    setPhoneNumber(0)
  }
  const handleSumbit = async () => {
    try {
      setLoading(true)
      const response = await makeAuthenticatedPOSTrequest(
        '/reservation/add',
        { time, date, heads, phoneNumber },
        cookie.authToken
      )
      setLoading(false)
      console.log(response)
      if (response?.data) {
        alert(`Order Successfully Placed`)
        clearFields()
      } else {
        throw error
      }
    } catch (error) {
      const message = extractErrorMessage(error?.response?.data)
      if (!cookie.authToken) {
        alert('Please Login First')
      } else {
        alert(`Reservation not placed ${message}`)
      }
      setLoading(false)
    }
  }
  const loadingAnimation = (
    <>
      <div className="flex flex-col m-4  rounded-md ">
        <l-dot-stream size="80" speed="3" color="black" />
      </div>
    </>
  )
  return (
    <div
      id="reservation"
      className="w-full flex items-center justify-center my-10 md:my-24"
    >
      <div className="flex flex-col md:flex-row md:max-h-[600px] w-11/12 md:w-8/12 h-full shadow-xl rounded-xl">
        <div className="w-full sm:w-1/2 overflow-hidden">
          <img
            src="https://s3-alpha-sig.figma.com/img/87b8/2510/60dce437200ff8b9998e58b286c200b9?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ibCghOlVcGht~xBGR94ZIeomvoyNzyi-237XafN4CftS07e5YCXdJCWKJN1PxUZaWoRtrt7k-Ls7CqPkrCDiPgENFagg6osfWnYU2ZSOplsp-7kYXLMq7tpuFm3oYVopRZwG0xyxSopjLhdi8mnFYoUwt4tlHJS9p-R~pg77cKO7V3QX704bYmO524ZPiOmR7rRl73cJmipp1sy-8wz6u5Mmq95dRSnYdtHtGbmd8bV6H5yR-I3POIlWCYitQg6m3CL5Cvo6ecO8cB3ohhcvsPX8zfgnm09liU7TsM~ZGmzK16c5x~8njs2SPSwzVIStARq5NxJBqbi-JhP1a3uRYw__"
            alt=""
            className="rounded-xl sm:rounded-s-xl sm:rounded-e-none h-full w-full object-cover object-center"
          />
        </div>

        <div className="w-full sm:w-1/2  overflow-hidden ">
          <h1 className="text-center mt-4 mb-2 text-3xl font-semibold">
            Make Reservation
          </h1>
          <div className="w-full py-8 md:py-16  flex flex-col items-center ">
            <TextInput
              label={'Phone Number'}
              placeholder={'Enter your phone number'}
              type={'text'}
              value={phoneNumber}
              onChange={setPhoneNumber}
            />

            <TextInput
              label={'Date'}
              placeholder={'Date of the reservation'}
              type={'text'}
              value={date}
              onChange={setDate}
            />
            <TextInput
              label={'Time'}
              placeholder={'Time you want to eat at.'}
              type={'text'}
              value={time}
              onChange={setTime}
            />

            <TextInput
              label={'Heads'}
              placeholder={'No. of people dining'}
              type="number"
              value={heads}
              onChange={setHeads}
            />
            <button
              onClick={handleSumbit}
              className=" relative mx-2 my-4 w-1/2  px-4 py-2 rounded-full bg-black isolation-auto z-10 border-2
                       border-black before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full 
                       before:-left-full before:hover:left-0 before:rounded-full before:bg-green-500 text-white before:-z-10 
                       before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 font-semibold "
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reservation
