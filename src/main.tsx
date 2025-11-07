import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router/dom"
import './index.css'
import App from '@/pages/Home.tsx'
import Game from '@/pages/game.tsx'
import MainLayout from '@/layouts/MainLayout.tsx'

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/game", element: <Game /> }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>,
)
