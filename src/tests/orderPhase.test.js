import { render } from '@testing-library/react'
import App from '../App'

test('order phases for happy path', () => {
  /*
   * Debug tips
   *
   * screen.debug() // show html at that point
   *
   * const { container } = render(<App/>)
   * logRoles(container)
   *
   * await findBy !== getBy
   *
   * userEvent method should be awaited
   *
   */

  // render the app
  render(<App />)

  // add ice cream scoops and toppings

  // find and click order button

  // check if summary information is correct base on order

  // accept terms and conditions and click button to confirm order

  // confirm order number on confirmation page

  // click "new order" button on confirmation page

  // check that scoops and toppings subtotal have been reset
})
