import { CountryProvider } from "../context/CountryProvider"
import Header from "../components/Header"
import { Outlet } from "react-router-dom"
import '../index.css'

function Layout() {
    return (
        <>
            <CountryProvider>
                <Header />
                <Outlet/>                
            </CountryProvider>
        </>
    )
}

export default Layout