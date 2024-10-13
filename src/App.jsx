import { Container } from 'react-bootstrap'
import { OrderEntry } from './pages/entry/OrderEntry'
import { OrderDetailsProvider } from './contexts/OrderDetails'
import { OrderSummary } from './pages/summary/OrderSummary'
import { useState } from 'react'
import { OrderConfirmation } from './pages/confirmation/OrderConfirmation'

function App() {
  const [orderPhase, setOrderPhase] = useState('inProgress')

  const CurrentPhase = () => {
    switch (orderPhase) {
      case 'inProgress':
        return <OrderEntry setOrderPhase={setOrderPhase} />
      case 'review':
        return <OrderSummary setOrderPhase={setOrderPhase} />
      case 'complete':
        return <OrderConfirmation setOrderPhase={setOrderPhase} />

      default:
        return null
    }
  }

  return (
    <Container>
      <OrderDetailsProvider>
        <CurrentPhase />
      </OrderDetailsProvider>
    </Container>
  )
}

export default App
