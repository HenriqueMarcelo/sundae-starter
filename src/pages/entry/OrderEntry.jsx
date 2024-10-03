import Options from './Options'

export function OrderEntry() {
  return (
    <div>
      <h1>Design Your Sundae</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />

      <h2>Grand total: $10.50</h2>
      <button>Order Sundae!</button>
    </div>
  )
}
