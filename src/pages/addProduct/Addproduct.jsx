import React, { useState } from 'react'
import ProductForm from '../../components/product/productForm/ProductForm'
import {useSelector} from "react-redux"
import { createProduct, selectIsLoading } from '../../redux/features/product/productSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
const Addproduct = () => {
    const [product,setProduct]=useState({
        name:"",
        category:"",
        quantity:"",
        price:""
    })

    const dispatch =useDispatch()
    const navigate = useNavigate()
    const [productImage, setProductImage] = useState("")
    const [ImagePreview, setImagePreview] = useState(null)
    const [description, setDescription] = useState("")
    const isLoading= useSelector(selectIsLoading)//from redux
    
    const{name,category,quantity,price}=product

    //for product
    const handleInputChange=(event)=>{
        const { name,value}=event.target
        setProduct({
            ...product,[name]:value
        })
    }
  
    //for imageonly
    const handleImageChange=(event)=>{
        setProductImage(event.target.files[0])//select the very first file
        setImagePreview(URL.createObjectURL(event.target.files[0]))//This URL represents the temporary object URL of the selected file.
    }

    //sku is for unique id in product
    const generateSKU=(category)=>{
        //for uniueness using first 3 letter of the category and make them capital  
        const letter= category.slice(0,3).toUpperCase()

        const number=Date.now()
        const SKU= `${letter}-${number}`
        return SKU
    }

    //saving products
    const saveProduct=async(event)=>{
        event.preventDefault()
        const formData= new FormData()//built-in function keep data in array of arrays
        //takes key value pairs
        formData.append("name",name)
        formData.append("sku",generateSKU(category))
        formData.append("category",category)
        formData.append("quantity",quantity)
        formData.append("price",price)
        formData.append("description",description)
        formData.append("image",productImage)

        // console.log(...formData)


        await dispatch(createProduct(formData))
        navigate("/dashboard")
    }


    return (
    <div>
        {isLoading && <Loader/>}
        <h3 className="--mt">Add New Product</h3>
        <ProductForm 
        product={product} 
        productImage={productImage}
        ImagePreview={ImagePreview}
        description={description} 
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveProduct={saveProduct} 
        />
        
    </div>
  )
}

export default Addproduct