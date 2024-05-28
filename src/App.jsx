import { Toaster } from "react-hot-toast"
import { Outlet } from "react-router-dom"

function App() {

  return (
    <>
     <main className=''>
     <Toaster
  position="top-right"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    className: '',
    duration: 3000,
    style: {
      background: '#fff',
      color: '#000',
    },

    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>
      <Outlet />
     </main>
    </>
  )
}

export default App
