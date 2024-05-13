import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { dotStream } from 'ldrs'
dotStream.register()

const ShowOrders = () => {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [cookies] = useCookies(['authToken'])
  const ApiURL = import.meta.env.VITE_APIURL
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${ApiURL}/order/userorder`, {
          headers: {
            Authorization: `Bearer ${cookies.authToken}`,
          },
        })
        console.log(response.data.data)
        setOrders(response.data.data)
        setIsLoading(false)
      } catch (error) {
        alert('Error fetching the Orders')
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const handleDeleteOrder = async (orderID) => {
    try {
      console.log(orderID)
      await axios.delete(`${ApiURL}/order/delete/${orderID}`, {
        headers: {
          Authorization: `Bearer ${cookies.authToken}`,
        },
      })
      setOrders((prev) => prev.filter((orders) => orders._id !== orderID))
    } catch (error) {
      alert('Error deleting the Orders')
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
      <h1 className="text-3xl font-bold mb-4">Orders</h1>
      <div>
        <h2 className="text-xl font-bold mb-2">Your Orders:</h2>
        <div className="">
          {orders.map((order) => (
            <div className="flex-col flex">
              {order.cart.map((items) => {
                return (
                  <div
                    key={items.item._id}
                    className="flex items-center gap-2 my-2"
                  >
                    <div>Item: {items.item.name}</div>
                    <div>Qty: {items.qty}</div>
                    <div>Total price: {items.totalPrice}</div>
                  </div>
                )
              })}
              <button
                className="px-2 w-[100px] py-1 bg-red-500 text-white rounded-md mt-2"
                onClick={() => handleDeleteOrder(order._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ShowOrders
