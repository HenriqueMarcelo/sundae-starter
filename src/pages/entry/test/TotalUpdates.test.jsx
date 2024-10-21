// eslint-disable-next-line no-unused-vars
import { logRoles, render, screen } from '../../../test-utils/testing-library-utils'
import Options from '../Options'
import userEvent from '@testing-library/user-event'
import { OrderEntry } from '../OrderEntry'

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
  const user = userEvent.setup()

  // Asset on default toppings subtotal
  const toppingsSubtotal = screen.getByText('Toppings total', { exact: false })
  expect(toppingsSubtotal).toHaveTextContent('$0.00')

  // Find and tick one box, assert on updated subtotal
  const cherriesCheckbox = await screen.findByRole('checkbox', { name: /cherries/i })
  await user.click(cherriesCheckbox)
  expect(toppingsSubtotal).toHaveTextContent('$1.50')

  // tick another box on, assert on subtotal
  // Não precisou ser asincrono pois a tela já tinha carregado
  const hotFudgeCheckbox = screen.getByRole('checkbox', { name: /hot fudge/i })
  await user.click(hotFudgeCheckbox)
  expect(toppingsSubtotal).toHaveTextContent('$3.00')

  // thick one of the boxes off (click it again) and assert on subtotal
  await user.click(cherriesCheckbox)
  expect(toppingsSubtotal).toHaveTextContent('$1.50')
})

describe('grand total', () => {
  test('grand total starts at $0.00', () => {
    render(<OrderEntry />)
    const grandTotalElement = screen.getByRole('heading', { name: /grand total: /i })

    expect(grandTotalElement).toHaveTextContent('$0.00')
  })

  test('grand total updates properly if scoop is added first', async () => {
    // eslint-disable-next-line no-unused-vars
    const { container } = render(<OrderEntry />)
    // logRoles(container)
    const user = await userEvent.setup()
    const grandTotalElement = screen.getByRole('heading', { name: /grand total: /i })

    const chocolateScoopElement = await screen.findByRole('spinbutton', { name: /chocolate/i })
    await user.clear(chocolateScoopElement)
    await user.type(chocolateScoopElement, '1')
    expect(grandTotalElement).toHaveTextContent('$2.00')

    const hotFudgeToppingElement = await screen.findByRole('checkbox', { name: /hot fudge/i })
    await user.click(hotFudgeToppingElement)
    expect(grandTotalElement).toHaveTextContent('$3.50')
  })

  test('grand total updates properly if topping is added first', async () => {
    render(<OrderEntry />)
    const user = await userEvent.setup()
    const grandTotalElement = await screen.findByRole('heading', { name: /grand total: /i })

    const hotFudgeToppingElement = await screen.findByRole('checkbox', { name: /hot fudge/i })
    await user.click(hotFudgeToppingElement)

    const chocolateScoopElement = await screen.findByRole('spinbutton', { name: /chocolate/i })
    await user.clear(chocolateScoopElement)
    await user.type(chocolateScoopElement, '1')

    expect(grandTotalElement).toHaveTextContent('$3.50')
  })

  test('grand total updates properly if item is removed', async () => {
    render(<OrderEntry />)
    const user = await userEvent.setup()
    const grandTotalElement = await screen.findByRole('heading', { name: /grand total: /i })

    const hotFudgeToppingElement = await screen.findByRole('checkbox', { name: /hot fudge/i })
    await user.click(hotFudgeToppingElement)

    const chocolateScoopElement = await screen.findByRole('spinbutton', { name: /chocolate/i })
    await user.clear(chocolateScoopElement)
    await user.type(chocolateScoopElement, '2')

    await user.clear(chocolateScoopElement)
    await user.type(chocolateScoopElement, '1')

    expect(grandTotalElement).toHaveTextContent('$3.50')
  })
})

test('scoops total must not me updated is a invalid value is in input', async () => {
  const user = userEvent.setup()
  render(<Options optionType="scoops" />)

  const vanillaInput = await screen.findByRole('spinbutton', { name: /vanilla/i })
  await user.clear(vanillaInput)
  await user.type(vanillaInput, '-5')

  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false })
  expect(scoopsSubtotal).toHaveTextContent('$0.00')

  await user.clear(vanillaInput)
  await user.type(vanillaInput, '5')

  expect(scoopsSubtotal).toHaveTextContent('$10.00')
})
