// src/mocks/handlers.js
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:3030/scoops", () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json([
      {
        name: "Chocolate",
        imagePath: "/image/chocolate.png",
      },
      {
        name: "Vanilla",
        imagePath: "/image/vanilla.png",
      },
    ]);
  }),
];
