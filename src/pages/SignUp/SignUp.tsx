import styles from "./SignUp.module.scss"
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/slices/UserSlice";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { TypeRoot } from "../../redux/store";
import { setPopup, setPopupText } from "../../redux/slices/CartSlice";

import Popup from "../../components/Popup/Popup";
import Form from "../../components/Form/Form";

type TypeRegister = (email: string, password: string) => void

const SignUp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { popupIsActive } = useSelector((state: TypeRoot) => state.cart)

    const handleRegister: TypeRegister = (email, password) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.refreshToken
                }))
                navigate("/")
                localStorage.setItem("auth", JSON.stringify({email: email}))
            })
            .catch(() => {
                dispatch(setPopup())
                dispatch(setPopupText("This user is already registrated"))
            })
    }

    return (
        <>
            <div className={styles.signUp_container}>
                <Form title="Register" handleSubmit={handleRegister} />
            </div>
            {
                popupIsActive && <Popup />
            }
        </>
    )
}

export default SignUp