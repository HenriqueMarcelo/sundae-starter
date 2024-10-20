import Col from 'react-bootstrap/Col'
import { useOrderDetails } from '../../contexts/OrderDetails'
import { Form, Row } from 'react-bootstrap'
import { useState } from 'react'

export default function ScoopOptions({ name, imagePath }) {
  const [isValid, setIsValid] = useState(true)
  const { updateItemCount } = useOrderDetails()

  function handleChange(e) {
    const valueNumber = Number(e.target.value)
    if (valueNumber > 10) {
      setIsValid(false)
      return
    }

    if (valueNumber % 1 > 0) {
      setIsValid(false)
      return
    }

    if (valueNumber < 0) {
      setIsValid(false)
      return
    }

    setIsValid(true)
    updateItemCount(name, valueNumber, 'scoops')
  }

  return (
    <Col xs={6} sm={4} md={3} lg={2} style={{ textAlign: 'center', marginBottom: '16px' }}>
      <img style={{ width: '75%' }} src={`http://localhost:3030/${imagePath}`} alt={`${name} scoop`} />
      <Form.Group controlId={`${name}-count`} as={Row} style={{ marginTop: '10px' }}>
        <Form.Label column xs="6" style={{ textAlign: 'right' }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: 'left' }}>
          <Form.Control type="number" defaultValue={0} onChange={handleChange} isInvalid={!isValid} />
        </Col>
      </Form.Group>
    </Col>
  )
}
