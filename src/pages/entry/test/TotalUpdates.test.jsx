import { render, screen } from '../../../test-utils/testing-library-utils'
import Options from '../Options'
import userEvent from '@testing-library/user-event'

test('updates scoop subtotal when scoops change', async () => {
  const user = userEvent.setup()
  render(<Options optionType="scoops" />)

  // make sure total starts out at $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false })
  expect(scoopsSubtotal).toHaveTextContent('0.00')

  // update vanilla scoops to 1 and check subtotal
  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })

  await user.clear(vanillaInput)
  await user.type(vanillaInput, '1')
  expect(scoopsSubtotal).toHaveTextContent('2.00')

  // update chocolate scoops to 2 and check subtotal

  const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' })

  await user.clear(chocolateInput)
  await user.type(chocolateInput, '2')
  expect(scoopsSubtotal).toHaveTextContent('6.00')
})

// quiz
test('Updates toppings subtotal when toopings are checked and unchecked', async () => {
  // set up
  render(<Options optionType="toppings" />)
  const user = await userEvent.setup()

  // Asset on default toppings subtotal
  const toppingsSubtotal = screen.getByText('Toppings total', { exact: false })
  expect(toppingsSubtotal).toHaveTextContent('$0.00')

  // Find and tick one box, assert on updated subtotal
  const cherriesCheckbox = await screen.findByRole('checkbox', { name: /cherries/i })
  await user.click(cherriesCheckbox)
  expect(toppingsSubtotal).toHaveTextContent('$1.50')

  // tick another box on, assert on subtotal
  const hotFudgeCheckbox = await screen.findByRole('checkbox', { name: /hot fudge/i })
  await user.click(hotFudgeCheckbox)
  expect(toppingsSubtotal).toHaveTextContent('$3.00')

  // thick one of the boxes off (click it again) and assert on subtotal
  await user.click(cherriesCheckbox)
  expect(toppingsSubtotal).toHaveTextContent('$1.50')
})
