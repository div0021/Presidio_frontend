import { Outlet } from "react-router-dom"
import Navbar from "../../components/navbar/Navbar"
import "./Layout.css"
import Footer from "../../components/footer/Footer"
const Layout = () => {
  return (
    <div className="layout_container">
    <Navbar />
    <Outlet />
    <Footer />
    </div>
  )
}

export default Layout