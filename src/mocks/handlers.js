// src/mocks/handlers.js
import { delay, http, HttpResponse } from 'msw'

export const handlers = [
  http.get('http://localhost:3030/scoops', () => {
    return HttpResponse.json([
      {
        name: 'Chocolate',
        imagePath: '/image/chocolate.png',
      },
      {
        name: 'Vanilla',
        imagePath: '/image/vanilla.png',
      },
      {
        name: 'Mint chip',
        imagePath: '/image/mint-chip.png',
      },
    ])
  }),

  http.get('http://localhost:3030/toppings', () => {
    return HttpResponse.json([
      {
        name: 'Cherries',
        imagePath: '/images/cherries.png',
      },
      {
        name: 'M&Ms',
        imagePath: '/images/m-and-ms.png',
      },
      {
        name: 'Hot fudge',
        imagePath: '/images/hot-fudge.png',
      },
    ])
  }),

  http.post('http://localhost:3030/?', async () => {
    await delay(400)
    return HttpResponse.json(true, { status: 201 })
  }),
]
