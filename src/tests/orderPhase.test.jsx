import { render, screen } from '@testing-library/react'
import App from '../App'
import userEvent from '@testing-library/user-event'

test('order phases for happy path', async () => {
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
  const user = await userEvent.setup()

  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole('spinbutton', { name: /vanilla/i })
  await user.clear(vanillaInput)
  await user.type(vanillaInput, '1')

  const hotFudgeCheckbox = await screen.findByRole('checkbox', { name: /hot fudge/i })
  await user.click(hotFudgeCheckbox)

  // find and click order button

  const orderButton = screen.getByRole('button', { name: /order sundae/i })
  await user.click(orderButton)

  // check if summary information is correct base on order

  const scoopsTotal = screen.getByText('Scoops: $', { exact: false })
  expect(scoopsTotal).toHaveTextContent('2.00')

  const toppingsTotal = screen.getByText('Toppings: $', { exact: false })
  expect(toppingsTotal).toHaveTextContent('1.50')

  // accept terms and conditions and click button to confirm order

  const termsCheckbox = screen.getByRole('checkbox', { name: /i agree/i })
  await user.click(termsCheckbox)

  const confirmButton = screen.getByRole('button', { name: /confirm order/i })
  await user.click(confirmButton) // problema

  // confirm order number on confirmation page

  const orderNumber = await screen.findByText(/number/i)
  expect(orderNumber).toHaveTextContent('123')

  // click "new order" button on confirmation page

  const newOrderButton = screen.getByRole('button', { name: /new order/i })
  await user.click(newOrderButton)

  // check that scoops and toppings subtotal have been reset

  const scoopsSubTotal = await screen.findByText(/scoops total/i)
  expect(scoopsSubTotal).toHaveTextContent('$0.00')

  const toppingsSubTotal = await screen.findByText(/toppings total/i)
  expect(toppingsSubTotal).toHaveTextContent('$0.00')
})
