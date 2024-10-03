import { useOrderDetails } from '../../contexts/OrderDetails'
import { formatCurrency } from '../../utilities'
import Options from './Options'

export function OrderEntry() {
  const {
    totals: { total },
  } = useOrderDetails()
  return (
    <div>
      <h1>Design Your Sundae</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />

      <h2>Grand total: {formatCurrency(total)}</h2>
      <button>Order Sundae!</button>
    </div>
  )
}
