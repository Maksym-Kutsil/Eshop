import React from "react"
import styles from "./Home.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { TypeRoot, TypeDispatch } from "../../redux/store"
import { TypeProduct } from "../../Types/types"
import { setItems } from "../../redux/slices/CartSlice"
import { TypeCartItem } from "../../Types/types"
import { useGetProductsQuery } from "../../redux/Api/ProductsApi"

import Product from "../../components/Product/Product"
import Skeleton from "../../components/Skeleton/Skeleton"
import Pagination from "../../components/Pagination/Pagination"

const Home = () => {
    const dispatch = useDispatch<TypeDispatch>()

    const { search : searchValue, filter, order, sortBy, page } = useSelector((state: TypeRoot) => state.filters)
    const { isLoading, isError, isSuccess , data } = useGetProductsQuery({searchValue, filter, order, sortBy, page})
    const { email } = useSelector((state: TypeRoot) => state.user)

    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [searchValue, filter, order, sortBy, page])

    React.useEffect(() => {
        if (email) {
            const cartItemString = localStorage.getItem("cartItems")
            if (cartItemString) {
                const cartItem: TypeCartItem[] = JSON.parse(cartItemString)
                if (cartItem.length > 0) {
                    dispatch(setItems(cartItem))
                }
            }
        }
    }, [email])

    return (
        <section className={styles.home}>
            <div className={styles.home_items}>
                {isLoading &&
                    [...new Array(8)].map((_, index) => (
                        <Skeleton key={index} />
                    ))
                }
                {isSuccess &&
                    data.map((product: TypeProduct) => (
                        <Product key={product.id} data={product} />
                    ))
                }
            </div>
            {isError &&
                <div className={styles.error}>
                    <p>Something went wrong</p>
                </div>
            }
            {isSuccess &&
                <Pagination />
            }
        </section>
    )
}

export default Home