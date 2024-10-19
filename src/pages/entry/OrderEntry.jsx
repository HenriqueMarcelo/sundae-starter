import { useOrderDetails } from '../../contexts/OrderDetails'
import { formatCurrency } from '../../utilities'
import Options from './Options'

export function OrderEntry({ setOrderPhase }) {
  const {
    totals: { total, scoops },
  } = useOrderDetails()
  return (
    <div>
      <h1>Design Your Sundae</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />

      <h2>Grand total: {formatCurrency(total)}</h2>
      <button onClick={() => setOrderPhase('review')} disabled={!scoops}>
        Order Sundae!
      </button>
    </div>
  )
}
