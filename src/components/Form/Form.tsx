import React from "react"
import styles from "./Form.module.scss"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setPopup, setPopupText } from "../../redux/slices/CartSlice"

type TypeFormProps = {
    title: string,
    handleSubmit: (email: string, password: string) => void
}

const Form: React.FC<TypeFormProps> = ({ title, handleSubmit }) => {
    const dispatch = useDispatch()
    const location = useLocation()

    const [email, setEmail] = React.useState<string>("")
    const [password, setPassword] = React.useState<string>("")

    const regex = {
        email: /^[a-zA-Z0-9а-яА-ЯґєіїҐЄІЇ._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        password: /^[a-zA-Z0-9а-яА-ЯґєіїҐЄІЇ!@#$%^&*()_+={}\[\]:;"'<>?,./~`|-]{6,100}$/
    }

    const submit = () => {
        if (regex.email.test(email) && regex.password.test(password)) {
            handleSubmit(email, password)
        } else {
            dispatch(setPopup())
            dispatch(setPopupText("Email must contain @gmail.com and password should be at least 6 sumbols"))
        }
    }

    React.useEffect(() => {
        if (location.pathname !== "/login") return
        const authString = localStorage.getItem("auth")
        if (authString) {
            const auth = JSON.parse(authString)
            setEmail(auth.email)
        }
    },[])

    return (
        <div className={styles.form}>
            <div className={styles.form_inputs}>
                <input value={email} onInput={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder="Email" type="email" />
                <input value={password} onInput={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} placeholder="Password" type="password" />
            </div>
            <div className={styles.form_links}>
                <Link to={location.pathname === "/signup" ? "/login" : "/signup"}>{location.pathname === "/signup" ? "Already have acount?" : "Don't have acount yet"}</Link>
                <Link to="/">Home</Link>
            </div>
            <button onClick={submit}>{title}</button>
        </div>
    )
}

export default Form