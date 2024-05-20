import React from 'react'
import ser1 from '../assets/ser1.png'
import ser2 from '../assets/ser2.png'
import ser3 from '../assets/ser3.png'
const Page3 = () => {
  return (
    <div className="w-full  flex flex-col items-center justify-center ">
      <div className="w-full flex items-center justify-center text-3xl font-bold my-4">
        Our Specialty
      </div>
      <div className="flex flex-col sm:flex-row w-12/12 sm:max-h-[500px] md:w-8/12 rounded-xl shadow-2xl my-10">
        <div className=" sm:w-1/2 flex flex-col p-8 ">
          <h1 className="text-3xl md:text-[3.3vw] mt-10  font-bold ">
            Daal Makhni
          </h1>
          <p className=" md:py-8 text-md md:text-lg font-medium">
            Discover the star of our menu: Dal Makhni Slow-cooked lentils
            infused with aromatic spices create a rich, creamy stew that's both
            comforting and flavorful. Served with fragrant basmati rice, it's a
            delicious journey for your taste buds that you won't want to miss.
            Taste the tradition, experience the magic - only at our restaurant!
          </p>

          <button className="relative mx-2 w-[150px] my-4 px-4 py-2 rounded-full bg-black isolation-auto z-10 border-2 border-black before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-green-500 text-white before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700">
            {' '}
            <a href="#menu">Explore More </a>
          </button>
        </div>

        <div className="w-full md:w-1/2 max-h-[300px] md:max-h-[500px] md:h-full md:rounded-e-xl overflow-hidden">
          <img
            src="https://s3-alpha-sig.figma.com/img/9b3a/795c/2f9591210aaf188b1a41698993da4515?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eJ5Gl5pZDQa0AiP~dCxcHdI507MqEACO1x16SjIN1vgbszXShlscrhYm1n8vcDO5KvgOfJI-FPF7htqzSmQ2AdqekddozBDIqq0EF9IgUUPeqrW6jILS2~0V~et6KYYq5QukkBKGfjckpo17sc7oeauObJ~FfBbmISjZFMdPW0OjjuMlaapucJsbPo7Q5-Z6WlDpoKHsyxSDvTpxkbWMQY-vfYADvg4OJJjuBulb9KimRvnyhPioMYJ5ZpnMuF0J8ugCRhb8vbeHzTRO0zNY2QQJkhVAJ33I-GVc80mnTst~BNVBxj6rzZcpWxL1SKiQIzFL6ldZgr2EhaRcBJOkjg__"
            alt=""
            className="w-full h-full object-center object-cover"
          />
        </div>
      </div>
      <div
        id="services"
        className="w-full flex items-center justify-center text-3xl font-bold my-5"
      >
        Our Services
      </div>
      <div className="w-full my-10 flex items-center justify-center">
        <div className="w-11/12 sm:shadow-2xl p-6 md:p-10 md:py-20 rounded-2xl flex flex-col sm:flex-row items-center justify-center gap-10 sm:w-8/12">
          <img src={ser1} className="w-2/6 md:w-3/12 " />
          <img src={ser2} className="w-2/6 md:w-3/12 " />
          <img src={ser3} className="w-2/6 md:w-3/12 " />
        </div>
      </div>
    </div>
  )
}

export default Page3
