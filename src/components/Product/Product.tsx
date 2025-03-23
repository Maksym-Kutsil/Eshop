import styles from "./Product.module.scss"
import React from "react"
import { TypeProduct } from "../../Types/types"
import { useDispatch, useSelector } from "react-redux"
import { addItem } from "../../redux/slices/CartSlice"
import { TypeDispatch } from "../../redux/store"
import { TypeRoot } from "../../redux/store"
import { toggleActive, setPopup, setPopupText } from "../../redux/slices/CartSlice"
import { Link, useNavigate } from "react-router-dom"

import bag from "../../assets/icons/bag.svg"
import bagTick from "../../assets/icons/bag-tick.svg"

type ProductProps = {
    data: TypeProduct;
}

const Product: React.FC<ProductProps> = ({ data }) => {
    const dispatch = useDispatch<TypeDispatch>()
    const navigate = useNavigate()

    const { items } = useSelector((state: TypeRoot) => state.cart)
    const { email } = useSelector((state: TypeRoot) => state.user)

    const isInCart = items.some((item) => item.id === data.id)

    const addToCart = () => {
        if (email) {
            if (data.available) {
                dispatch(addItem(data))
                dispatch(toggleActive())
            } else {
                dispatch(setPopup())
                dispatch(setPopupText("This product is not available"))
            }
        } else {
            navigate("/signup")
        }
    }

    return (
        <div className={styles.product}>
            <Link to={`/about/${data.id}`} onClick={() => window.scrollTo({ top: 0 })}>
                <img src={data.image[0]} className={styles.product_image} alt="product image" />
            </Link>
            <div className={styles.product_info}>
                <p className={styles.product_info_name}>{data.title}</p>
                <p className={data.available ? styles.product_info_avaliable : styles.product_info_notAvaliable}>
                    {data.available ? "Є в наявності" : "Нема в наявності"}
                </p>
            </div>
            <div className={styles.product_price}>
                <p>{data.price}₴</p>
                {isInCart ?
                    <button>
                        <img src={bagTick} alt="add to cart icon" />
                    </button> :
                    <button onClick={addToCart}>
                        <img src={bag} alt="add to cart icon" />
                    </button>
                }
            </div>
        </div>
    )
}

export default Product