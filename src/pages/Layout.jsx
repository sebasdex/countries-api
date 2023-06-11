import { CountryProvider } from "../context/CountryProvider"
import Header from "../components/Header"
import Main from "../components/Main"
import { Outlet } from "react-router-dom"

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