import { render } from '@testing-library/react'
import { OrderDetailsProvider } from '../contexts/OrderDetails'

const renderWithContex = (ui, options) => render(ui, { wrapper: OrderDetailsProvider, ...options })

// re-export everything
// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react'

// overrride render method
export { renderWithContex as render }
