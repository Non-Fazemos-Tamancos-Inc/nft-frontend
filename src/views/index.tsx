import { ToastContainer } from 'react-toastify'

import { FullscreenLoader } from '../components/core/FullscreenLoader.tsx'

import { Router } from './routes.tsx'

import 'react-toastify/dist/ReactToastify.css'

export function Index() {
  return (
    <>
      <Router />
      <FullscreenLoader />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}
