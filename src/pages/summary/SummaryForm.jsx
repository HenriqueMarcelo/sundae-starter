import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'

const popover = (
  <Popover id="popover-basic">
    <Popover.Body>No ice cream will actually be delivered</Popover.Body>
  </Popover>
)

const checkboxLabel = (
  <span>
    I agree to
    <OverlayTrigger placement="right" overlay={popover}>
      <span style={{ color: 'blue' }}>Terms and Conditions</span>
    </OverlayTrigger>
  </span>
)

export function SummaryForm({ setOrderPhase }) {
  const [tcChecked, setTcChecked] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setOrderPhase('complete')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={tcChecked}
          onChange={e => setTcChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!tcChecked}>
        Confirm order
      </Button>
    </Form>
  )
}
