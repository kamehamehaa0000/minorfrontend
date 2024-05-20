import React, { useContext } from 'react'
import { MdOutlineShoppingCart } from 'react-icons/md'
import loginModalContext from './contexts/loginModal.context'
import { useCookies } from 'react-cookie'
import cartModalContext from './contexts/cartModal.context'

const Navbar = ({ isLoggedIn, userDets }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['authToken'])

  const handleLogout = () => {
    removeCookie('authToken')
    removeCookie('details')
  }
  const { isOpen, setIsOpen } = useContext(loginModalContext)
  const { isOpenCart, setIsOpenCart } = useContext(cartModalContext)

  return (
    <div className="w-full h-[60px] p-4 md:p-8 justify-between flex items-center">
      <div className="font-bold text-2xl">FoodTime</div>
      <div className="hidden md:flex font-bold items-center text-md gap-2 md:gap-7">
        <a href="#home">
          <div className="hover:border-b-2">Home</div>
        </a>
        <a href="#services">
          <div className="hover:border-b-2">Services</div>
        </a>
        <a href="#reservation">
          <div className="hover:border-b-2">Reservation</div>
        </a>
        <a href="#footer">
          <div className="hover:border-b-2">Contact us</div>
        </a>
      </div>
      <div className="flex font-semibold items-center gap-2 md:gap-4">
        {isLoggedIn ? (
          <>
            <a
              href="/user"
              className="capitalize"
            >{`Hey, ${cookies?.details?.firstName[0]}`}</a>
            <button className="text-sm md:text-md" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <button
            className="text-sm md:text-lg"
            onClick={() => setIsOpen(!isOpen)}
          >
            Login
          </button>
        )}
        <div>
          <button
            onClick={() => {
              setIsOpenCart((prev) => !prev)
            }}
            className="text-white flex items-center  bg-green-700 px-3 py-1 rounded-full "
          >
            <MdOutlineShoppingCart className="inline text-md md:text-lg m-1 " />
            <p className="md:mr-2 text-sm md:text-lg">My Cart</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
