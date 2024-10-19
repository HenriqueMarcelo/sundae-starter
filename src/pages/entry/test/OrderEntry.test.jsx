import { OrderEntry } from '../OrderEntry'
import { http, HttpResponse } from 'msw'
import { server } from '../../../mocks/server'
import { expect } from 'vitest'
import { render, screen } from '../../../test-utils/testing-library-utils'
import userEvent from '@testing-library/user-event'

test('handles error for scoops and toppings routes', async () => {
  server.resetHandlers(
    http.get('http://localhost:3030/scoops', () => {
      return new HttpResponse(null, { status: 500 })
    }),
    http.get('http://localhost:3030/toppings', () => {
      return new HttpResponse(null, { status: 500 })
    })
  )

  render(<OrderEntry />)

  const alerts = await screen.findAllByText('An unexpected error occurred. Please try again later.')

  expect(alerts).toHaveLength(2)
})

test('order button must be disabled if there is no scoops selected', async () => {
  render(<OrderEntry setOrderPhase={vi.fn()} />)
  const user = await userEvent.setup()

  const orderButton = screen.getByRole('button', { name: /Order Sundae/i })
  expect(orderButton).toBeDisabled()

  const vanillaInput = await screen.findByRole('spinbutton', { name: /vanilla/i })
  await user.type(vanillaInput, '1')
  expect(orderButton).toBeEnabled()

  await user.clear(vanillaInput)
  await user.type(vanillaInput, '0')
  expect(orderButton).toBeDisabled()
})
