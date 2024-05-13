import React, { useEffect, useState } from 'react'
import DishCard from './DishCard'
import { makeAuthenticatedGETrequest } from '../utilities/apiCall'

const Menu = () => {
  const [data, setData] = useState([])
  const [categoryItems, setCategoryItems] = useState({})
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [visibleItems, setVisibleItems] = useState(10)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await makeAuthenticatedGETrequest('/menu/getmenu', '')
        setData(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (data && data.items) {
      const groupedItems = data.items.reduce((acc, item) => {
        acc[item.category] = [...(acc[item.category] || []), item]
        return acc
      }, {})
      setCategoryItems(groupedItems)
    }
  }, [data])

  const categories = Array.from(
    new Set(data?.items?.map((item) => item.category))
  )

  const handleShowMore = () => {
    setVisibleItems(visibleItems + 10)
  }

  return (
    <div className="w-11/12 sm:w-10/12 flex flex-col items-center justify-center md:p-10">
      <div className="flex justify-start px-4 py-4 w-full">
        <h1 className="text-4xl md:text-[3vw] underline underline-offset-8 text-black font-semibold">
          Menu
        </h1>
      </div>

      <div className="w-full md:px-4  my-3">
        <div className="flex flex-wrap  gap-3 items-center md:gap-5">
          <span
            onClick={() => {
              setSelectedCategory(null)
            }}
            className={`border-b-2 hover:border-orange-500 font-semibold text-sm md:text-xl mt-4 ${
              selectedCategory === null ? 'border-orange-500' : ''
            }`}
          >
            All
          </span>
          {categories.length > 0 &&
            categories.map((cat, index) => (
              <span
                onClick={() => {
                  setSelectedCategory(cat)
                }}
                key={index}
                className={`border-b-2 hover:border-orange-500 font-semibold text-sm md:text-xl mt-4 ${
                  selectedCategory === cat ? 'border-orange-500' : ''
                }`}
              >
                {cat}
              </span>
            ))}
        </div>

        <div className="w-full rounded-lg mt-2 justify-start flex flex-wrap shadow-lg">
          {(selectedCategory
            ? categoryItems[selectedCategory]
            : data.items || []
          )
            .slice(0, visibleItems)
            .map((item, idx) => (
              <DishCard
                key={idx}
                name={item.name}
                description={item.description}
                price={item.price}
                id={item._id}
                image={item.image}
              />
            ))}
        </div>
        {visibleItems <
          (selectedCategory
            ? categoryItems[selectedCategory].length
            : data?.items?.length) && (
          <div className="w-full flex justify-center">
            <button
              className="relative mx-auto my-4  px-4 py-2 rounded-full bg-white text-black  isolation-auto z-10 border-2 border-black before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-green-500  before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
              onClick={handleShowMore}
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Menu
