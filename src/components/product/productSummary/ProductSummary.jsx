import React from 'react'
import "./productSummary.scss"
import {FaRupeeSign} from "react-icons/fa"
import {BsCart4,BsCartX} from "react-icons/bs"
import { BiCategory } from 'react-icons/bi'
import InfoBox from '../../infoBox/InfoBox'
import {useDispatch,useSelector} from "react-redux"
import { CALC_CATEGORY, CALC_OUTOFSTOCK, CALC_STORE_VALUE, selectCategory, selectOutOfStock, selectTotalStoreValue } from '../../../redux/features/product/productSlice'
import { useEffect } from 'react'

//icons
const earningIcon=<FaRupeeSign size={40} color={"white"}/>
const productIcon=<BsCart4 size={40} color={"white"}/>
const categoryIcon=<BiCategory size={40} color={"white"}/>
const outOfStockIcon=<BsCartX size={40} color={"white"}/>

//props from Dashboard.jsx
const ProductSummary = ({products}) => {

  const dispatch=useDispatch()

  //selecting specific state
  const totalStoreValue=useSelector(selectTotalStoreValue)
  const outOfStock= useSelector(selectOutOfStock)
  const allCategory=useSelector(selectCategory)
  
  //send payload didupdate
  useEffect(() => {
    //dispatching to store with payload
    dispatch(CALC_STORE_VALUE(products))
    dispatch(CALC_OUTOFSTOCK(products))
    dispatch(CALC_CATEGORY(products))

  }, [dispatch,products])
  
  //chat-gpt help
  const formatAsRupeeAmount=(number)=> {
    return number.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
  }
  
  // console.log(products.length+" ---------from productSummary--------------")
  // console.log(allCategory.length+" from productSummary"); 

  return (
    <div className='product-summary'>
        <h3 className='--mt'>Inventory Stats</h3>
        <div className="info-summary">
            <InfoBox icon={productIcon} title={"Total Products"} count={products.length} bgColor="card1"/>
            <InfoBox icon={earningIcon} title={"Total Store Value"} count={` ${formatAsRupeeAmount(totalStoreValue)}`} bgColor="card2"/>
            <InfoBox icon={outOfStockIcon} title={"Out of Stocks"} count={outOfStock} bgColor="card3"/>
            <InfoBox icon={categoryIcon} title={"All Categories"} count={allCategory.length} bgColor="card4"/>
        </div>
    </div>
  )
}

export default ProductSummary