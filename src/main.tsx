import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router/dom"
import './index.css'
import App from '@/pages/Home.tsx'
import Game from '@/pages/Question'
import MainLayout from '@/layouts/MainLayout.tsx'
import { ThemeProvider } from './components/theme-provider'
import useQuestions from './hooks/useQuestions'

const { getById } = useQuestions()
const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <App /> },
      {
        path: "/game/:qid",
        loader: async ({ params }) => {
          // params are available in loaders/actions
          const id = parseInt(params.qid || "0", 10);
          let question = await getById(id);
          return { question };
        },
        Component: Game,
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />,
    </ThemeProvider>
  </StrictMode>,
)
