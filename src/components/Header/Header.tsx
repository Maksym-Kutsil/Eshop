import React from "react"
import styles from "./Header.module.scss"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setSearch, setPage } from "../../redux/slices/FilterSlice"
import { toggleActive } from "../../redux/slices/CartSlice"
import { TypeRoot } from "../../redux/store"
import { TypeCartItem } from "../../Types/types"
import { removeUser } from "../../redux/slices/UserSlice"

import logoBlue from "../../assets/icons/logo_blue.svg"
import basket from "../../assets/icons/basket.svg"
import register from "../../assets/icons/profile-add.svg"
import login from "../../assets/icons/profile-tick.svg"
import logout from "../../assets/icons/profile-remove.svg"
import user from "../../assets/icons/user.svg"
import searchIcon from "../../assets/icons/search.svg"

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { items } = useSelector((state: TypeRoot) => state.cart)
    const { email } = useSelector((state: TypeRoot) => state.user)
    const [searchValue, setSearchValue] = React.useState<string>("")
    const [userActive, setUserActive] = React.useState<boolean>(false)

    const getTotalPriceAndCount = (items: TypeCartItem[]) => {
        return items.reduce(
            (acc, item) => {
                acc.totalPrice += item.price * item.count
                acc.totalCount += item.count
                return acc
            },
            { totalPrice: 0, totalCount: 0 }
        )
    }

    const { totalCount } = getTotalPriceAndCount(items)

    const handleSearch = () => {
        dispatch(setSearch(searchValue))
        dispatch(setPage(1))
    }

    const searching = (value: string) => {
        if (!value) {
            dispatch(setSearch(value))
        }
        setSearchValue(value)
    }

    const openCart = () => {
        if (email) {
            dispatch(toggleActive())
        } else {
            navigate("/signup")
        }
    }

    return (
        <nav className={styles.navigation_panel}>
            <div className={styles.navigation_panel_left}>
                <Link to="/">
                    <img className={styles.navigation_panel_logo} src={logoBlue} alt="logo" />
                </Link>
            </div>
            <div className={styles.navigation_panel_center}>
                <div>
                    <input value={searchValue} onInput={(e: React.ChangeEvent<HTMLInputElement>) => searching(e.target.value)} type="text" placeholder="Enter search quary..." />
                    <button onClick={handleSearch}>
                        <img src={searchIcon} alt="search icon" />
                    </button>
                </div>
            </div>
            <div className={styles.navigation_panel_right}>
                <button onClick={openCart}>
                    <p className={styles.count}>{totalCount}</p>
                    <img className={styles.navigation_panel_logo} src={basket} alt="basket" />
                </button>
                <button onClick={() => setUserActive(!userActive)}>
                    {userActive && (
                        <div className={styles.user_container}>
                            <div className={styles.user}>
                                {email ? (
                                    <div>
                                        <p>{email}</p>
                                        <button onClick={() => dispatch(removeUser())}>
                                            <p>Logout</p>
                                            <img src={logout} alt="logout icon" />
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <Link onClick={() => setUserActive(false)} to="signup">
                                            <p>Register</p>
                                            <img src={register} alt="register icon" />
                                        </Link>
                                        <Link onClick={() => setUserActive(false)} to="login">
                                            <p>Login</p>
                                            <img src={login} alt="login icon" />
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    <img className={styles.user_icon} src={email ? login : user} alt="profile" />
                </button>
            </div>
        </nav>
    )
}

export default Header