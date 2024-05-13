import React, { useContext, useState } from 'react'
import { useCart } from './contexts/cart.context'
import { makeAuthenticatedPOSTrequest } from '../utilities/apiCall'
import { useCookies } from 'react-cookie'
import { dotStream } from 'ldrs'
import cartModalContext from './contexts/cartModal.context'
import { IoMdAdd } from 'react-icons/io'
import { IoMdClose } from 'react-icons/io'
import { IoMdRemove } from 'react-icons/io'
import extractErrorMessage from '../utilities/extractErrorMsg'

dotStream.register()

const OrderForm = () => {
  const {
    cartItems,
    formatCartDataForBackend,
    addItemToCart,
    clearCart,
    removeItemFromCart,
    updateItemQuantity,
  } = useCart()
  const { isOpenCart, setIsOpenCart } = useContext(cartModalContext)
  const [cookie, setCookie, removeCookie] = useCookies(['authToken'])

  const handlePlaceOrder = async () => {
    const cartDataForBackend = formatCartDataForBackend()
    console.log(cartDataForBackend)
    try {
      setLoading(true)
      const response = await makeAuthenticatedPOSTrequest(
        '/order/add',
        { items: cartDataForBackend },
        cookie.authToken
      )
      setLoading(false)
      if (response.data) {
        alert(`Order Successfully Placed`)
        clearCart()
        setIsOpenCart(false)
      } else {
        throw error
      }
    } catch (error) {
      const message = extractErrorMessage(error.response.data)
      if (!cookie.authToken) {
        alert('Please Login First')
      } else {
        alert(`Order not placed ${message}`)
      }
      setLoading(false)
    }
  }
  const [loading, setLoading] = useState(false)
  const loadingAnimation = (
    <>
      <div className="flex flex-col m-4  rounded-md ">
        <l-dot-stream size="80" speed="3" color="black" />
      </div>
    </>
  )
  const handleIncreaseQuantity = (itemId) => {
    updateItemQuantity(itemId, 1) // Corrected the quantity argument to 1
  }

  const handleDecreaseQuantity = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId)
    if (item.quantity > 1) {
      updateItemQuantity(itemId, -1)
    } else {
      removeItemFromCart(itemId)
    }
  }

  const handleRemoveItem = (itemId) => {
    removeItemFromCart(itemId)
  }

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  }

  return (
    <>
      {isOpenCart && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50">
          <div
            className="absolute top-0 left-0 w-full h-full bg-black opacity-70"
            onClick={() => setIsOpenCart(!isOpenCart)}
          ></div>
          <div className="relative w-11/12 lg:w-1/2 p-2 md:p-4 bg-white rounded-xl z-10">
            {loading ? (
              <div className="flex justify-center mt-4">{loadingAnimation}</div>
            ) : (
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold">Order Summary</h2>
                <div className="w-full text-sm sm:text-md font-semibold rounded-lg bg-white border-2 ">
                  <div className=" py-2 bg-white border-b-2 grid grid-cols-7 rounded-t-lg items-center justify-items-center">
                    <div className="col-span-2 justify-self-start px-4">
                      Name
                    </div>
                    <div className="col-span-1">Price</div>
                    <div className="col-span-1">Decrease</div>
                    <div className="col-span-1">Qty.</div>
                    <div className="col-span-1">Add</div>
                    <div className="col-span-1">Remove</div>
                  </div>
                  {cartItems.map((item) => (
                    <div
                      className=" gap-y-4 gap-x-2 grid grid-cols-7 items-center justify-items-center my-4 p-2 rounded-md"
                      key={item.id}
                    >
                      <h1 className=" justify-self-start px-4 col-span-2 ">
                        {item.name}
                      </h1>
                      <h1 className="  px-4 col-span-1 ">Rs. {item.price}</h1>
                      <button
                        className="col-span-1 rounded-full  p-2"
                        onClick={() => handleDecreaseQuantity(item.id)}
                      >
                        <IoMdRemove />
                      </button>
                      <h1 className="col-span-1">{item.quantity}</h1>
                      <button
                        className="col-span-1 rounded-full  p-2"
                        onClick={() => handleIncreaseQuantity(item.id)}
                      >
                        <IoMdAdd />
                      </button>
                      <button
                        className="col-span-1"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <IoMdClose />
                      </button>
                    </div>
                  ))}
                </div>
                <p className="">
                  Total Price:{'  '}
                  <span className="text-lg underline font-semibold">
                    Rs. {getTotalPrice()}
                  </span>
                </p>
                <div className="w-full flex items-center justify-center">
                  <button
                    className="relative mx-2 my-4 w-1/2 px-4 py-2 rounded-full bg-black isolation-auto z-10 border-2 border-black before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-green-500 text-white before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default OrderForm
/*<div>
      <h2>Order Summary</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - Quantity: {item.quantity}
            <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
            <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total Price: ${getTotalPrice()}</p>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div> */
