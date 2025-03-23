import styles from "./Pagination.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { setPage } from "../../redux/slices/FilterSlice"
import { TypeRoot } from "../../redux/store"

const Pagination = () => {
    const dispatch = useDispatch()

    const { page } = useSelector((state : TypeRoot) => state.filters)
    
    const pages = [1, 2, 3]

    const handleBackPage = () => {
        if (page > 1) {
            dispatch(setPage(page - 1))
        }
    }

    const handleNextPage = () => {
        if (page < 3) {
            dispatch(setPage(page + 1))
        }
    }

    return (
        <div className={styles.pagination}>
            <ul>
                <li>
                    <button onClick={handleBackPage} className={page === 1 ? styles.disabled : ""}>
                        -
                    </button>
                </li>
                {pages.map((value) => (
                    <li key={value}>
                        <button onClick={() => dispatch(setPage(value))} className={page === value ? styles.active : ""}>
                            {value}
                        </button>
                    </li>
                ))}
                <li>
                    <button onClick={handleNextPage} className={page === 3 ? styles.disabled : ""}>
                        +
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default Pagination