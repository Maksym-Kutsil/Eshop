import React from "react"
import styles from "./About.module.scss"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { TypeRoot } from "../../redux/store"
import { TypeDispatch } from "../../redux/store"
import { ClipLoader } from "react-spinners"
import { addItem, dellItem, clearSingleItem, setItems } from "../../redux/slices/CartSlice"
import { setPopup, setPopupText } from "../../redux/slices/CartSlice"
import { TypeCartItem } from "../../Types/types"
import { useGetAboutQuery } from "../../redux/Api/AboutApi"

import minus from "../../assets/icons/minus.png"
import plus from "../../assets/icons/plus.png"
import bagCross from "../../assets/icons/bag-cross.svg"
import profile from "../../assets/icons/profile.svg"
import star from "../../assets/icons/Star.svg"
import darkStar from "../../assets/icons/Dark_star.svg"
import { IoIosSend } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";

const About = () => {
    const dispatch = useDispatch<TypeDispatch>()
    const navigate = useNavigate()

    const { id } = useParams<{ id: string }>()
    const { items } = useSelector((state: TypeRoot) => state.cart)
    const { isLoading, isError, isSuccess, data, refetch } = useGetAboutQuery(id ?? "")
    const { email } = useSelector((state: TypeRoot) => state.user)

    const [image, setImage] = React.useState<string>("")
    const [cartItem, setCartItem] = React.useState<any>("")
    const [rating, setRating] = React.useState<number>(0)
    const [comment, setComment] = React.useState<string>("")

    React.useEffect(() => {
        if (data) {
            setImage(data.image[0])
            const itemIndex = items.findIndex((item) => item.id === data.id)
            if (itemIndex !== -1) {
                setCartItem(items[itemIndex])
            } else {
                setCartItem("")
            }
        }
    }, [data, items])

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

    React.useEffect(() => {
        if (email) {
            localStorage.setItem("cartItems", JSON.stringify(items))
        }
    }, [items])

    const addToCart = () => {
        if (email) {
            if (data?.available) {
                dispatch(addItem(data))
            } else {
                dispatch(setPopup())
                dispatch(setPopupText("This product is not available"))
            }
        } else {
            navigate("/signup")
        }
    }

    const addComment = async () => {
        if (!data || !email) {
            navigate("/signup");
            return;
        }

        if (!comment || !rating) {
            dispatch(setPopup())
            dispatch(setPopupText("You need to specify a comment and a rating"))
            return
        }
        try {
            const updateAbout = {
                ...data,
                comments: [
                    {
                        "user": email,
                        "text": comment,
                        "rating": rating
                    },
                    ...data.comments
                ]
            }
            await axios.put(`${import.meta.env.VITE_API}/${data.id}`, updateAbout)
            refetch()
            setRating(0)
            setComment("")
        } catch (error) {
            dispatch(setPopup())
            dispatch(setPopupText("Something went wrong"))
        }
    }

    const deleteComment = async (commentIndex: number) => {
        if (!data) return
        try {
            const updatedComments = data.comments.filter((_, index) => index !== commentIndex)
            const updateAbout = {
                ...data,
                comments: updatedComments
            }
            await axios.put(`${import.meta.env.VITE_API}/${data.id}`, updateAbout)
            refetch()
        } catch (error) {
            dispatch(setPopup())
            dispatch(setPopupText("Something went wrong"))
        }
    }

    return (
        <section className={styles.about}>
            {
                isLoading &&
                <div className={styles.about_loading}>
                    <ClipLoader />
                </div>
            }
            {
                isError &&
                <div className={styles.about_error}>
                    <p>Something went wrong</p>
                </div>
            }
            {
                isSuccess && data &&
                <div className={styles.about_content}>
                    <div className={styles.about_content_info}>
                        <div className={styles.about_content_info_left}>
                            <img src={image ? image : data.image[0]} alt="image" />
                            <div className={styles.carousel}>
                                {data.image.map((img) => (
                                    <button key={img} onClick={() => setImage(img)}>
                                        <img src={img} alt="img" />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className={styles.about_content_info_right}>
                            <p>{data.title}</p>
                            <p>{data.description}</p>
                            <p className={data.available ? styles.about_content_info_right_avaliable : styles.about_content_info_right_notAvaliable}>
                                {data.available ? "Є в наявності" : "Нема в наявності"}
                            </p>
                            <div className={styles.about_content_info_right_actions}>
                                <button onClick={() => dispatch(dellItem(data.id))}>
                                    <img src={minus} alt="minus icon" />
                                </button>
                                <p className={styles.about_content_info_right_actions_count}>{cartItem ? cartItem.count : 0}</p>
                                <button onClick={addToCart}>
                                    <img src={plus} alt="plus icon" />
                                </button>
                                <button onClick={() => dispatch(clearSingleItem(data.id))}>
                                    <img src={bagCross} alt="delete item icon" />
                                </button>
                                <p className={styles.about_content_info_right_actions_price}>{cartItem ? cartItem.count * cartItem.price : 0}₴</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.about_content_comments}>
                        <div className={styles.add_comment}>
                            <textarea name="comment" value={comment} onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)} placeholder="Write your comment"></textarea>
                            <div className={styles.add_comment_raiting}>
                                {[...new Array(5)].map((_, value) => (
                                    <button key={value} onClick={() => setRating(value + 1)}>
                                        <img src={value < rating ? star : darkStar} alt="star icon" />
                                    </button>
                                ))}
                                <button onClick={addComment}>
                                    <IoIosSend />
                                </button>
                            </div>
                        </div>
                        {data.comments.map((item, index) => (
                            <div key={item.user} className={styles.comment}>
                                <div className={styles.comment_info}>
                                    <img src={profile} alt="profile css" />
                                    <div>
                                        <p>{item.user}</p>
                                        <p>{item.text}</p>
                                    </div>
                                </div>
                                <div className={styles.comment_rating}>
                                    {[...new Array(item.rating)].map((_, index) => (
                                        <img key={index} src={star} alt="star icon" />
                                    ))}
                                    {email &&
                                        item.user === email ? (
                                        <button className={styles.comment_rating_delete} onClick={() => deleteComment(index)}>
                                            <MdDeleteForever />
                                        </button>
                                    ) : ("")
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </section>
    )
}

export default About