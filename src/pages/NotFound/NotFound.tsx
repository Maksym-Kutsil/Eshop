import styles from './NotFound.module.scss'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className={styles.not_found}>
            <div>
                <p>404 NOT FOUND</p>
                <Link to="/">Go Home</Link>
            </div>
        </div>
    )
}

export default NotFound