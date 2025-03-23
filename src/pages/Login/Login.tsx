import styles from './Login.module.scss'
import { useDispatch, useSelector } from "react-redux"
import { setUser } from '../../redux/slices/UserSlice'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { TypeRoot } from '../../redux/store';
import { setPopup, setPopupText } from '../../redux/slices/CartSlice';

import Popup from '../../components/Popup/Popup';
import Form from '../../components/Form/Form';

type TypeRegister = (email: string, password: string) => void

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { popupIsActive } = useSelector((state: TypeRoot) => state.cart)

    const handleLogin: TypeRegister = (email, password) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
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
                dispatch(setPopupText("Invalid data"))
            })
    }

    return (
        <>
            <div className={styles.login_container}>
                <Form title="Login" handleSubmit={handleLogin} />
            </div>
            {
                popupIsActive && <Popup />
            }
        </>
    )
}

export default Login