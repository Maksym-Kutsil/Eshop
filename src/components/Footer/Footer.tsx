import styles from "./Footer.module.scss"

import location from "../../assets/icons/location.svg"
import call from "../../assets/icons/call-calling.svg"
import sms from "../../assets/icons/sms-edit.svg"
import user from "../../assets/icons/footer_user.svg"
import arrow from "../../assets/icons/arrow-right.svg"
import Facebook from "../../assets/icons/Facebook.svg"
import Twitter from "../../assets/icons/twitter.svg"
import Instagram from "../../assets/icons/Instagram.svg"
import Youtube from "../../assets/icons/Youtube.svg"
import chat from "../../assets/icons/online chat.svg"
import back from "../../assets/icons/back to up bottun.svg"
import copyright from "../../assets/icons/copyright.svg"

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer_info}>
                <div>
                    <ul>
                        <li>
                            <p>Comapny</p>
                        </li>
                        <li>
                            <a href="#">about us</a>
                        </li>
                        <li>
                            <a href="#">blog</a>
                        </li>
                        <li>
                            <a href="#">returns</a>
                        </li>
                        <li>
                            <a href="#">other status</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li>
                            <p>Info</p>
                        </li>
                        <li>
                            <a href="#">How it works?</a>
                        </li>
                        <li>
                            <a href="#">our promises</a>
                        </li>
                        <li>
                            <a href="#">FAQ</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li>
                            <p>Contact us</p>
                        </li>
                        <li>
                            <a href="#">
                                <img src={location} alt="location" />
                                123 Main Street, Anytown,USA
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img src={call} alt="call" />
                                +1 (555) 123-4567
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img src={sms} alt="sms" />
                                TechHeimSupport@gmail.com
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li>
                            <p>Sign up for News and updates</p>
                        </li>
                        <li>
                            <div className={styles.footer_info_email}>
                                <button>
                                    <img src={user} alt="user icon" />
                                </button>
                                <input type="email" placeholder="E-mail Address" />
                                <button>
                                    <img src={arrow} alt="arrow right icon" />
                                </button>
                            </div>
                        </li>
                        <li>
                            <div className={styles.links_container}>
                                <a target="blank" href="https://www.facebook.com/">
                                    <img src={Facebook} alt="Facebook" />
                                </a>
                                <a target="blank" href="https://x.com/">
                                    <img src={Twitter} alt="Twitter" />
                                </a>
                                <a target="blank" href="https://www.instagram.com/">
                                    <img src={Instagram} alt="Instagram" />
                                </a>
                                <a target="blank" href="https://www.youtube.com/">
                                    <img src={Youtube} alt="Youtube" />
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className={styles.buttons_container}>
                    <button>
                        <img src={chat} alt="online chat" />
                    </button>
                    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                        <img src={back} alt="back to up bottun" />
                    </button>
                </div>
            </div>
            <div className={styles.footer_links}>
                <div>
                    <img src={copyright} alt="copyright" />
                    <p>2023 Tech Heim.</p>
                </div>
                <ul>
                    <li>
                        <a href="#">cookie settings</a>
                    </li>
                    <li>
                        <a href="#">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#">Terms and Conditions </a>
                    </li>
                    <li>
                        <a href="#">Imprint </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer