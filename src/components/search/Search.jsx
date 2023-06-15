import React from 'react'
import styles from "./Search.module.scss"
import {BiSearch} from "react-icons/bi"


//props from ProductList.jsx
const Search = ({value,onChange}) => {
  return (
    <div className={styles.search}>
        <BiSearch size={18} className={styles.icon}/>
        <input type="text" placeholder='search products' value={value} onChange={onChange}/>
    </div>
  )
}

export default Search