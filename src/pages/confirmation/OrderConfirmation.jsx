import { useOrderDetails } from '../../contexts/OrderDetails'

export function OrderConfirmation({ setOrderPhase }) {
  const { resetOrder } = useOrderDetails()
  function handleClick() {
    setOrderPhase('inProgress')
    resetOrder()
  }
  return (
    <>
      <h1>Thank you!</h1>
      <p>Your order Number is 123</p>
      <span>as per our terms and conditions, nothing will happen now</span>
      <button onClick={handleClick}>Create new order</button>
    </>
  )
}
