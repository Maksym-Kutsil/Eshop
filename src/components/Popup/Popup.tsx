import React from "react"
import styles from "./Popup.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { setPopup, setPopupText } from "../../redux/slices/CartSlice"
import { TypeRoot } from "../../redux/store"

const Popup = () => {
    const dispatch = useDispatch()
    
    const { popupText } = useSelector((state: TypeRoot) => state.cart)

    React.useEffect(() => {
        setTimeout(() => {
            dispatch(setPopup())
            dispatch(setPopupText(""))
        },2000)
    },[])

    return (
        <div className={styles.popup_container}>
            <div className={styles.popup}>
                {popupText}
            </div>
        </div>
    )
}

export default Popup