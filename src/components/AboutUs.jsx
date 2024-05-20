import React from 'react'
import aboutus from '../assets/aboutus2.png'
const AboutUs = () => {
  return (
    <div className="w-full  flex flex-col items-center justify-center ">
      <div className="w-full shadow-2xl flex flex-col items-center justify-center  ">
        <div className="w-full flex items-center justify-center text-3xl font-bold my-4">
          About us
        </div>
        <div className="flex flex-col sm:flex-row w-11/12 sm:max-h-[550px] md:w-8/12 rounded-xl shadow-2xl my-10 overflow-hidden">
          <div className=" sm:w-1/2 flex flex-col p-8 ">
            <h1 className="text-3xl md:text-[3.3vw] mt-10  font-bold ">
              Food Time,
            </h1>
            <p className=" md:py-8 text-base lg:text-md xl:text-lg font-medium">
              Welcome to Food Time! We're all about delicious food served with a
              smile. At our restaurant, we believe in good times and great
              meals. Our chefs cook up tasty dishes with love, using fresh
              ingredients to give you a flavor-packed experience. Whether you're
              dining in or grabbing a quick takeaway, we're here to make every
              mealtime special. Come join us for a food adventure that's sure to
              leave you satisfied and smiling!
            </p>
          </div>

          <div className="w-full md:w-1/2 max-h-[300px] md:max-h-[550px] md:h-full md:rounded-e-xl overflow-hidden">
            <img
              src={aboutus}
              className="w-full h-full object-center object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
