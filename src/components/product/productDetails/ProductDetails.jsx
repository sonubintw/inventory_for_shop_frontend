//single product details

import React from 'react'
import "./ProductDetails.scss"
import {useRedirectLoggedOutUser} from "../../../customHook/useRedirectLoggedOutUser"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSingleProductOnly } from '../../../redux/features/product/productSlice'
import { useEffect } from 'react'
import { selectIsLoggedIn } from '../../../redux/features/auth/authSlice'
import Card from "../../card/Card"
import { SpinnerImg } from '../../loader/Loader'

const ProductDetails = () => {
    const dispatch=useDispatch()
    const {id}=useParams()

    useRedirectLoggedOutUser("/login")
    
    const isLoggedIn=useSelector(selectIsLoggedIn);
    //product
    const {product,isLoading,isError,message}=useSelector((state)=>state.product)
    // console.log(id)

    //for changing the color according to the quantity
    const stockStatus=(quantity)=>{
        if(quantity > 0){
            return <span className='--color-success'>In stock</span>
        }
       
        return <span className='--color-danger'>Out of stock</span>
    }
    useEffect(() => {
        if(isLoggedIn === true){

            dispatch(getSingleProductOnly(id))
            // console.log(product)
        }
        if(isError){
            console.log(message);
        }

    }, [dispatch,id,isError,message,isLoggedIn]);


  return (
    <div className='product-detail'>
        <h3 className='--mt'>Product Detail</h3>
        <Card className="card">
            {isLoading && <SpinnerImg/>}
            {product && (
                <div className="detail">
                    <Card className="group">
                        {product?.image ? (
                            <img src={product.image.filePath} alt={product.image.fileName} height={"200px"}></img>
                        ):(<p> no image is set for this product</p>)}
                    </Card>
                    <h4>Product Availability: {stockStatus(product.quantity)}</h4>
                <hr />
                <h4>
                    <span className='badge'>Name: </span> &nbsp;
                    {product.name}
                </h4>
                <p>
                    <b>&rarr; SKU: </b> {product.sku}
                </p>
                <p>
                    <b>&rarr; Category: </b> {product.category}
                </p>
                <p>
                    <b>&rarr; Price: </b>{"Rs"} {product.price}
                </p>
                <p>
                    <b>&rarr; Quantity: </b> {product.quantity}
                </p>
                <p>
                    <b>&rarr; Total value in Stock: </b> {"Rs"} {product.quantity * product.price}
                </p>
                <hr />
                
                </div>
            )}
        </Card>
    </div>
  )
}

export default ProductDetails