import { useState } from 'react'
import { useOrderDetails } from '../../contexts/OrderDetails'
import { formatCurrency } from '../../utilities'
import { SummaryForm } from './SummaryForm'
import axios from 'axios'

export function OrderSummary({ setOrderPhase }) {
  const { totals, optionCounts } = useOrderDetails()
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    setIsLoading(true)
    await axios.post('http://localhost:3030/order', { optionCounts })
    setIsLoading(false)

    setOrderPhase('complete')
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  const scoopArray = Object.entries(optionCounts.scoops) // [["chocolate", 2], ["vanilla", 1]]
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ))

  const toppingsArray = Object.keys(optionCounts.toppings) // ["M&M", "Gummi bears"]
  const toppingsList = toppingsArray.map(key => <li key={key}> {key} </li>)

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
      <ul>{toppingsList}</ul>
      <SummaryForm handleSubmit={handleSubmit} />
    </div>
  )
}
