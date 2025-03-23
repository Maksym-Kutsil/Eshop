import React from "react"
import styles from "./Cart.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { toggleActive, clearItems } from "../../redux/slices/CartSlice"
import { TypeCartItem } from "../../Types/types"
import { TypeRoot } from "../../redux/store"

import CartItem from "../CartItem/CartItem"

import cross from "../../assets/icons/close-circle.svg"
import bagCross from "../../assets/icons/bag-cross.svg"

const Cart = () => {
    const dispatch = useDispatch()

    const { items } = useSelector((state: TypeRoot) => state.cart)
    const { email } = useSelector((state: TypeRoot) => state.user)


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

    const { totalPrice, totalCount } = getTotalPriceAndCount(items)
    
    React.useEffect(() => {
        if (email) {
            localStorage.setItem("cartItems", JSON.stringify(items))
        }
    },[items])

    return (
        <div className={styles.cart_container}>
            <div className={styles.cart}>
                <div className={styles.cart_header}>
                    <div className={styles.cart_header_close}>
                        <p>Cart</p>
                        <button onClick={() => dispatch(toggleActive())}>
                            <img src={cross} alt="close img" />
                        </button>
                    </div>
                    <div className={styles.cart_header_clear}>
                        <div className={styles.cart_header_clear_count}>
                            <p>Items : {totalCount}</p>
                            <p>Price : {totalPrice}₴</p>
                        </div>
                        <button onClick={() => dispatch(clearItems())}>
                            <img src={bagCross} alt="clear cart icon" />
                        </button>
                    </div>
                </div>
                {items.length > 0 ? (
                    <div className={styles.cart_items}>
                        {items.map((item) => (
                            <CartItem key={item.id} data={item} />
                        ))}
                    </div>
                ) : (
                    <div className={styles.cart_noItems}>
                        <p>You have no products in your cart</p>
                        <img src={bagCross} alt="clear cart icon" />
                    </div>
                )}
                <div className={styles.cart_footer}>
                    <button onClick={() => dispatch(toggleActive())}>
                        Сontinue shopping
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cart