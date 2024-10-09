import { Outlet } from 'react-router-dom'
import Navbar from '@/components/shared/navbar'
import Footer from '@/components/shared/footer'

function Layout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Layout