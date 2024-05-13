import React, { useContext, useState } from 'react'
import loginModalContext from './contexts/loginModal.context.js'
import TextInput from './Shared/TextInput.jsx'
import { dotStream } from 'ldrs'
import axios from 'axios'
import extractErrorMessage from '../utilities/extractErrorMsg.js'
dotStream.register()
import registrationModalContext from './contexts/registerationModal.context.js'
const Register = () => {
  const ApiURL = import.meta.env.VITE_APIURL
  const { isOpenReg, setIsOpenReg } = useContext(registrationModalContext)
  const { isOpen, setIsOpen } = useContext(loginModalContext)
  const [loading, setLoading] = useState(false)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [profileImage, setProfileImage] = useState(null)

  const clearAllInputs = () => {
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setConfirmPass('')
    setUsername('')
  }

  const handleSignUp = async () => {
    if (confirmPass === password) {
      const formData = new FormData()
      formData.append('firstName', firstName)
      formData.append('lastName', lastName)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('username', password)
      formData.append('profileImage', profileImage)
      setLoading(true)
      const response = await axios
        .post(`${ApiURL}/user/register`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          setLoading(false)
          alert('User Successfully Registered')
          clearAllInputs()
          setIsOpen(true)
          setIsOpenReg(false)
        })
        .catch((error) => {
          if (error?.response) {
            alert(extractErrorMessage(error?.response?.data))
          }
          setLoading(false)
        })
    } else {
      alert('Passwords do not match')
    }
  }
  const loadingAnimation = (
    <>
      <div className="flex flex-col m-4 rounded-md ">
        <l-dot-stream size="80" speed="3" color="black" />
      </div>
    </>
  )
  return (
    <>
      {isOpenReg && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50">
          <div
            className="absolute top-0 left-0 w-full h-full bg-black opacity-70"
            onClick={() => setIsOpenReg(!isOpenReg)}
          ></div>
          <div className="relative w-5/6 md:w-1/2 bg-white rounded-xl z-10">
            {loading ? (
              <div className="flex justify-center mt-4">{loadingAnimation}</div>
            ) : (
              <div className="w-full flex justify-center rounded-xl">
                <div className="w-0 max-h-1/2 sm:w-1/2 overflow-hidden ">
                  <img
                    src="https://i.pinimg.com/originals/f3/b7/01/f3b701ccc28a910700bb9e3d65b2c9c5.jpg"
                    alt=""
                    className="rounded-s-md w-full h-full "
                  />
                </div>
                <div className="flex-grow flex flex-col items-start justify-center p-4 md:p-8">
                  <TextInput
                    label={'First Name'}
                    placeholder={'Enter your First Name'}
                    type={'text'}
                    value={firstName}
                    onChange={setFirstName}
                  />
                  <TextInput
                    label={'Last Name'}
                    placeholder={'Enter your Last Name'}
                    type={'text'}
                    value={lastName}
                    onChange={setLastName}
                  />
                  <TextInput
                    label={'Email Address'}
                    placeholder={'Enter your email address'}
                    type={'text'}
                    value={email}
                    onChange={setEmail}
                  />

                  <TextInput
                    label={'What should we call you ?'}
                    placeholder={'Enter your Username '}
                    type={'text'}
                    value={username}
                    onChange={setUsername}
                  />
                  <TextInput
                    label={'Create Password'}
                    placeholder={'Enter a strong Password'}
                    type="password"
                    value={password}
                    onChange={setPassword}
                  />
                  <TextInput
                    label={'Confirm your Password'}
                    placeholder={'Confirm your Password'}
                    type="password"
                    value={confirmPass}
                    onChange={setConfirmPass}
                  />
                  <label className="font-semibold">
                    Profile Picture :
                    <input
                      type="file"
                      onChange={(e) => {
                        setProfileImage(e.target.files[0])
                      }}
                      name="profileImage"
                      accept="image/*"
                      className="flex h-10 my-2 w-full rounded-md border-2 border-black border-input  bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent  file:text-blue-600 file:text-sm file:font-medium"
                    />
                  </label>
                  <div className="flex w-full items-center justify-between mt-4">
                    <button
                      className=" relative mx-2 my-4 w-1/2  px-4 py-2 rounded-full bg-black isolation-auto z-10 border-2
                       border-black before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full 
                       before:-left-full before:hover:left-0 before:rounded-full before:bg-green-500 text-white before:-z-10 
                       before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 font-semibold "
                      onClick={handleSignUp}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Register
