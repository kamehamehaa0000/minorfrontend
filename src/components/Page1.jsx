import React from 'react'
import img1 from '../assets/1.jpg'
import img2 from '../assets/2.jpg'
import img3 from '../assets/3.jpg'
import img4 from '../assets/4.jpg'
const Page1 = () => {
  return (
    <div id="home" className="w-full flex items-center justify-center py-8">
      <div className="w-10/12 md:w-9/12 max-h-[500px] flex bg-[#e45834] flex-col md:flex-row rounded-xl shadow-lg overflow-hidden">
        <div className="w-full md:w-1/2 p-4 md:p-10 h-full">
          <h1 className="text-4xl md:text-[3.6vw] text-white font-bold leading-tight">
            Something hot.
          </h1>
          <h1 className="text-4xl md:text-[3.6vw]  text-white font-bold leading-tight">
            Something tasty.
          </h1>
          <p className="text-md md:text-[1.2vw] leading-none  my-1 md:my-4 text-white">
            At Food Time - your destination for menu viewing, reservations, and
            easy dine-in or takeaway ordering of Aromatic, Delicious, Flavorful,
            mouth-watering, Nutritious, Satisfying, Savory, Tasty, Yummy.
            Appetizing, Delectable, Saccharine Food.
          </p>
          <a
            href="#menu"
            className="relative my-4 px-4 py-2 rounded-full
           bg-white isolation-auto z-10 border-2 border-neutral-50 
            before:absolute before:w-full before:transition-all before:duration-700 
            before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full
            before:bg-green-600 text-black before:-z-10 before:aspect-square
             before:hover:scale-150 overflow-hidden before:hover:duration-700 text-md font-semibold"
          >
            Explore More
          </a>
        </div>
        <div className="w-full md:w-1/2 grid grid-cols-2 grid-rows-2  max-sm:h-[400px]  bg-white">
          <img
            src={img2}
            className="col-span-1 w-full h-full  object-cover    object-center"
            alt=""
          />
          <img
            src={img3}
            className="col-span-1 w-full h-full  object-cover    object-center"
            alt=""
          />
          <img
            src={img4}
            className="col-span-1 w-full h-full  object-cover   object-center"
            alt=""
          />{' '}
          <img
            src={img1}
            className="col-span-1 w-full h-full   object-cover    object-center"
            alt=""
          />
        </div>
      </div>
    </div>
  )
}

export default Page1
