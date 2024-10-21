import { delay, http, HttpResponse } from 'msw'
import { server } from '../../../mocks/server'
import { render, screen } from '../../../test-utils/testing-library-utils'
import { OrderConfirmation } from '../OrderConfirmation'

test('alert must appears on error from server', async () => {
  server.resetHandlers(
    http.post('http://localhost:3030/order', async () => {
      await delay(100)
      return HttpResponse.json(null, { status: 400 })
    })
  )

  render(<OrderConfirmation />)
  const errorBox = await screen.findByRole('alert')
  expect(errorBox).toHaveTextContent('An unexpected error occurred. Please try again later.')
})
