import React from "react"
import styles from "./AsideFilter.module.scss"
import { useDispatch } from "react-redux"
import { setFilter, setPage } from "../../redux/slices/FilterSlice"
import { IconType } from "react-icons"

type TypeAsideFilter = {
    img: IconType
    value: string
    text: string
}

const AsideFilter : React.FC<TypeAsideFilter> = ({ img : Icon, value, text }) => {
    const dispatch = useDispatch()

    const handleFilter = () => {
        dispatch(setFilter(value))
        dispatch(setPage(1))
    }
    
    return (
        <div className={styles.aside_item}>
            <button onClick={handleFilter}>
                <Icon />
                <p>{text}</p>
            </button>
        </div>
    )
}

export default AsideFilter