import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const checkboxLabel = (
  <span>
    I agree to <span style={{ color: "blue" }}>Terms and Conditions</span>
  </span>
);

export function SummaryForm() {
  const [tcChecked, setTcChecked] = useState(false);

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={tcChecked}
          onChange={(e) => setTcChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!tcChecked}>
        Confirm order
      </Button>
    </Form>
  );
}
