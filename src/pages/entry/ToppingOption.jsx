import { Col } from 'react-bootstrap'
import { useOrderDetails } from '../../contexts/OrderDetails'

export default function ToppingOption({ name, imagePath }) {
  const { updateItemCount } = useOrderDetails()

  function handleCheckBoxChange(e) {
    const number = Number(e.target.checked)
    updateItemCount(name, number, 'toppings')
  }

  return (
    <>
      <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
        <img style={{ width: '75%' }} src={`http://localhost:3030/${imagePath}`} alt={`${name} topping`} />
      </Col>
      <Col>
        <label htmlFor={name}>
          {name}
          <input type="checkbox" id={name} onChange={handleCheckBoxChange} />
        </label>
      </Col>
    </>
  )
}
