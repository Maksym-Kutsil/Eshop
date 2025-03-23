import React from "react"
import styles from "./Layout.module.scss"
import { Outlet, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { TypeRoot } from "../redux/store"
import { Suspense } from "react"

import Header from "../components/Header/Header"
import Aside from "../components/Aside/Aside"
import Footer from "../components/Footer/Footer"
import Cart from "../components/Cart/Cart"
import Popup from "../components/Popup/Popup"


const Layout = () => {
    const location = useLocation()

    const { isActive, popupIsActive } = useSelector((state : TypeRoot) => state.cart)
    
    const [aside, setAside] = React.useState(true)

    React.useEffect(() => {
        location.pathname.includes("/about") ? setAside(false) : setAside(true)
    },[location])

    return(
        <>
            <header>
                <Header />
            </header>
            <main className={styles.main}>
                {aside && <Aside />}
                <Suspense fallback={""}>
                    <Outlet />
                </Suspense>
            </main>
            <Footer />
            {
                isActive && <Cart />
            }
            {
                popupIsActive && <Popup />
            }
        </>
    )
}

export default Layout