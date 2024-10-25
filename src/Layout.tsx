import { Outlet } from 'react-router-dom'
import Navbar from '@/components/shared/navbar/index'

function Layout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    {/* <Footer/> */}
    </>
  )
}

export default Layout