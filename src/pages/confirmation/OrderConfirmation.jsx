import { useEffect, useState } from 'react'
import { useOrderDetails } from '../../contexts/OrderDetails'
import axios from 'axios'

export function OrderConfirmation({ setOrderPhase }) {
  const { resetOrder } = useOrderDetails()
  const [orderNumber, setOrderNumber] = useState(null)

  useEffect(() => {
    axios
      .post('http://localhost:3030/order')
      .then(response => {
        setOrderNumber(response.data.orderNumber)
      })
      .catch(error => {
        console.error(error)
      })
  })
  function handleClick() {
    resetOrder()

    setOrderPhase('inProgress')
  }

  if (!orderNumber) {
    return <p>Loading...</p>
  }

  return (
    <>
      <h1>Thank you!</h1>
      <p>Your order Number is {orderNumber}</p>
      <span>as per our terms and conditions, nothing will happen now</span>
      <button onClick={handleClick}>Create new order</button>
    </>
  )
}
