import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Board from './pages/Board.jsx'
import PrivateRoute from './routes/PrivateRoute.jsx'
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
        {/* Index route for "/" */}
        <Route index element={<Login />} />

        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Route */}
        <Route element={<PrivateRoute />}>
          <Route path='/board' element={<Board />} />
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
