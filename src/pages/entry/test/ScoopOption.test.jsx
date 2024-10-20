import userEvent from '@testing-library/user-event'
import ScoopOptions from '../ScoopOption'
import { render, screen } from '../../../test-utils/testing-library-utils'

test('show error when user put negative value', async () => {
  render(<ScoopOptions />)
  const user = await userEvent.setup()

  const scoopInput = screen.getByRole('spinbutton')
  await user.clear(scoopInput)
  await user.type(scoopInput, '-1')
  expect(scoopInput).toHaveClass('is-invalid', { exact: false })

  await user.clear(scoopInput)
  await user.type(scoopInput, '10')
  expect(scoopInput).not.toHaveClass('is-invalid', { exact: false })
})

test('show error when user put decimal value', async () => {
  render(<ScoopOptions />)
  const user = await userEvent.setup()

  const scoopInput = screen.getByRole('spinbutton')

  await user.clear(scoopInput)
  await user.type(scoopInput, '1.5')
  expect(scoopInput).toHaveClass('is-invalid', { exact: false })

  await user.clear(scoopInput)
  await user.type(scoopInput, '10')
  expect(scoopInput).not.toHaveClass('is-invalid', { exact: false })
})

test('show error when user put above 10', async () => {
  render(<ScoopOptions />)
  const user = await userEvent.setup()

  const scoopInput = screen.getByRole('spinbutton')

  await user.clear(scoopInput)
  await user.type(scoopInput, '20')
  expect(scoopInput).toHaveClass('is-invalid', { exact: false })

  await user.clear(scoopInput)
  await user.type(scoopInput, '10')
  expect(scoopInput).not.toHaveClass('is-invalid', { exact: false })
})
