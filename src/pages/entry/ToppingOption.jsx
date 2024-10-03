import { Col, Form } from 'react-bootstrap'
import { useOrderDetails } from '../../contexts/OrderDetails'

export default function ToppingOption({ name, imagePath }) {
  const { updateItemCount } = useOrderDetails()

  function handleCheckBoxChange(e) {
    const number = Number(e.target.checked)
    updateItemCount(name, number, 'toppings')
  }

  return (
    <>
      <Col xs={6} sm={4} md={3} lg={2} style={{ textAlign: 'center' }}>
        <img style={{ width: '75%' }} src={`http://localhost:3030/${imagePath}`} alt={`${name} topping`} />
        <Form.Group controlId={`${name}-topping-checkbox`}>
          <Form.Check type="checkbox" onChange={handleCheckBoxChange} label={name} />
        </Form.Group>
      </Col>
    </>
  )
}
