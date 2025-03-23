import React from "react"
import styles from "./CartItem.module.scss"
import { useDispatch } from "react-redux"
import { TypeCartItem } from "../../Types/types"
import { addItem, dellItem, clearSingleItem } from "../../redux/slices/CartSlice"
import { toggleActive } from "../../redux/slices/CartSlice"
import { Link } from "react-router-dom"

import more from "../../assets/icons/more.svg"
import bagCross from "../../assets/icons/bag-cross.svg"
import minus from "../../assets/icons/minus.png"
import plus from "../../assets/icons/plus.png"

type ProductProps = {
    data: TypeCartItem
}

const CartItem: React.FC<ProductProps> = ({ data }) => {
    const dispatch = useDispatch()
    
    const [isMoreActive, setIsMoreActive] = React.useState(false)

    return (
        <div className={styles.cart_item}>
            <div className={styles.cart_item_more_container}>
                {
                    isMoreActive &&
                    <div className={styles.more_actions}>
                        <button onClick={() => dispatch(clearSingleItem(data.id))}>
                            <img src={bagCross} alt="delete item icon" />
                            Delete
                        </button>
                    </div>
                }
                <button className={styles.more} onClick={() => setIsMoreActive(!isMoreActive)}>
                    <img src={more} alt="more icon" />
                </button>
            </div>
            <div className={styles.cart_item_info}>
                <Link to={`/about/${data.id}`} onClick={() => dispatch(toggleActive())}>
                    <img src={data.image[0]} alt="item img" />
                </Link>
                <div>
                    <p>{data.description}</p>
                    <p>{data.title}</p>
                </div>
            </div>
            <div className={styles.cart_item_actions}>
                <button onClick={() => dispatch(dellItem(data.id))}>
                    <img src={minus} alt="minus icon" />
                </button>
                <p className={styles.cart_item_actions_count}>{data.count}</p>
                <button onClick={() => dispatch(addItem(data))}>
                    <img src={plus} alt="plus icon" />
                </button>
                <p className={styles.cart_item_actions_price}>{data.count * data.price}₴</p>
            </div>
        </div>
    )
}

export default CartItem