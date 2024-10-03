import { createContext, useContext, useState } from 'react'
import { pricePerItem } from '../constants'

const OrderDetailsContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export function useOrderDetails() {
  const contextValue = useContext(OrderDetailsContext)

  if (!contextValue) {
    throw new Error('useOrderDetails must be colled from within an OrderDetailsProvider')
  }

  return contextValue
}

export function OrderDetailsProvider({ children, ...props }) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: {}, // { Chocolate: 1, Vanilla: 2 }
    toppings: {}, // { "Gummi Bears": 1 }
  })

  function updateItemCount(itemName, newItemCount, optionType) {
    const newOptionsCounts = { ...optionCounts }

    newOptionsCounts[optionType][itemName] = newItemCount
    setOptionCounts(newOptionsCounts)
  }

  function resetOrder() {
    setOptionCounts({
      scoops: {},
      toppings: {},
    })
  }

  function calculateTotal(optionType) {
    const countsArray = Object.values(optionCounts[optionType])

    const totalCount = countsArray.reduce((total, value) => total + value, 0)

    return totalCount * pricePerItem[optionType]
  }

  const totals = {
    scoops: calculateTotal('scoops'),
    toppings: calculateTotal('toppings'),
    total: calculateTotal('scoops') + calculateTotal('toppings'),
  }

  return (
    <OrderDetailsContext.Provider
      value={{
        optionCounts,
        totals,
        updateItemCount,
        resetOrder,
      }}
      {...props}
    >
      {children}
    </OrderDetailsContext.Provider>
  )
}
