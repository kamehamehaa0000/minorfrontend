import React, { useState } from 'react'
import { PiEyeLight } from 'react-icons/pi'
import { PiEyeSlashLight } from 'react-icons/pi'

const TextInput = ({ label, type, placeholder, value, onChange, required }) => {
  const [seePass, setSeePass] = useState(false)
  const handleOnchange = (e) => {
    onChange(e.target.value)
  }
  return (
    <div className="w-11/12">
      <p className="font-semibold">{label} :</p>
      {type === 'password' ? (
        <div className="flex items-center justify-between border-2 border-black rounded-lg p-[2px] my-2">
          <input
            className="w-11/12 dark:text-black border:none border-r-2 rounded-lg rounded-r-none border-r-black px-2 font-medium  p-1 outline-none"
            type={seePass ? 'text' : 'password'}
            placeholder={placeholder}
            value={value}
            onChange={handleOnchange}
            required={required}
          />
          <button
            className="p-2 dark:border-[1px] dark: border-white dark:bg-white dark:text-black dark:rounded-r-lg "
            onClick={() => {
              setSeePass((prev) => !prev)
            }}
          >
            {seePass ? (
              <PiEyeSlashLight className="text-xl" />
            ) : (
              <PiEyeLight className="text-xl" />
            )}
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between border-2 border-black rounded-lg p-[2px] my-1">
          <input
            className="w-full dark:text-black border:none px-2 font-medium rounded-lg  p-1 outline-none"
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={handleOnchange}
            required={required}
          />
        </div>
      )}
    </div>
  )
}

export default TextInput
