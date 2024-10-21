import { useEffect, useState } from 'react'
import { useOrderDetails } from '../../contexts/OrderDetails'
import axios from 'axios'
import AlertBanner from '../entry/common/AlertBanner'

export function OrderConfirmation({ setOrderPhase }) {
  const { resetOrder } = useOrderDetails()
  const [orderNumber, setOrderNumber] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    axios
      .post('http://localhost:3030/order')
      .then(response => {
        setOrderNumber(response.data.orderNumber)
      })
      .catch(() => {
        setError(true)
      })
  }, [])
  function handleClick() {
    resetOrder()

    setOrderPhase('inProgress')
  }

  if (error) {
    return (
      <>
        <AlertBanner />
        <button onClick={handleClick}>Create new order</button>
      </>
    )
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
