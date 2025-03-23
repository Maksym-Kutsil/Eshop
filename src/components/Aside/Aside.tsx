import styles from "./Aside.module.scss"
import { useDispatch } from "react-redux";
import { setOrder, setSortBy } from "../../redux/slices/FilterSlice";

import AsideFilter from "../AsideFilter/AsideFilter";

import { VscClearAll } from "react-icons/vsc";
import { FaLaptop } from "react-icons/fa"
import { MdOutlineSmartphone } from "react-icons/md";
import { FaTabletAlt } from "react-icons/fa";
import { BsSmartwatch } from "react-icons/bs";
import { FaTv } from "react-icons/fa";
import { FaGamepad } from "react-icons/fa";
import { MdOutlineAudiotrack } from "react-icons/md";
import { FaPaperclip } from "react-icons/fa";

const Aside = () => {
    const dispatch = useDispatch()

    const handleSort = (params: string) => {
        const [sortBy, order] = params.split(" ")
        dispatch(setOrder(order))
        dispatch(setSortBy(sortBy))
    }

    const filters = [
        { img: VscClearAll, value: "", text: "All" },
        { img: FaLaptop, value: "laptop", text: "Laptops" },
        { img: MdOutlineSmartphone, value: "smartphone", text: "Smartphone" },
        { img: FaTabletAlt, value: "tablet", text: "Tablet" },
        { img: BsSmartwatch, value: "smartwatch", text: "Smartwatch" },
        { img: FaTv, value: "tv", text: "TV" },
        { img: FaGamepad, value: "gaming", text: "Gaming" },
        { img: MdOutlineAudiotrack, value: "audio", text: "Audio" },
        { img: FaPaperclip, value: "accessories", text: "Accessories" }
    ]

    return (
        <aside className={styles.aside}>
            {filters.map((filter) => (
                <AsideFilter key={filter.value} img={filter.img} value={filter.value} text={filter.text} />
            ))}
            <div className={styles.aside_sort}>
                <p>Sort:</p>
                <select name="sort-select" onChange={(e) => handleSort(e.target.value)}>
                    <option value="">Remove sort</option>
                    <option value="price asc">0 - 99</option>
                    <option value="price desc">99 - 0</option>
                    <option value="title asc">A - Z</option>
                    <option value="title desc">Z - A</option>
                </select>
            </div>
        </aside>
    )
}

export default Aside