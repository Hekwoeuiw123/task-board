import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Board from './pages/Board.jsx'
import PrivateRoute from './routes/PrivateRoute.jsx'
import PublicRoute from './routes/GuestRoute.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Page404 from './pages/Page404.jsx'
import { Provider } from 'react-redux'
import store from './app/store.js'
import App from './App.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>

        {/* PUBLIC ROUTES: Only accessible if LOGGED OUT */}
        <Route element={<PublicRoute />}>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* PRIVATE ROUTES: Only accessible if LOGGED IN */}
        <Route element={<PrivateRoute />}>
          <Route path="/board" element={<Board />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<Page404 />} />
      </Route></>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
