import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { getAllProduct, getSingleProductOnly, selectIsLoading, selectProduct, updateSingleProduct } from '../../redux/features/product/productSlice';
import { useEffect,useState } from 'react';
import Loader from '../../components/loader/Loader';
import ProductForm from '../../components/product/productForm/ProductForm';

const EditProduct = () => {
    const {id}=useParams();
    const dispatch= useDispatch()
    const navigate=useNavigate()
    const isLoading= useSelector(selectIsLoading);
    
    //hold the single product which got clicked for edit
    const productEdit=useSelector(selectProduct)

    // console.log(productEdit);
    const [product,setProduct]=useState(productEdit)
    const [productImage, setProductImage] = useState("")
    const [ImagePreview, setImagePreview] = useState(null)
    const [description, setDescription] = useState("")

    //get a single product 
    useEffect(()=>{
        dispatch(getSingleProductOnly(id))
    },[dispatch,id])

    useEffect(()=>{
      //this is for when user refreshess the page the details about the product still remains in the form
      setProduct(productEdit)

      setImagePreview(
        //if product exist and has an image then preview image else display null
        productEdit && productEdit.image ? `${productEdit.image.filePath}` :null
      )

      setDescription(
        productEdit && productEdit.description ? productEdit.description : ""
      )
    },[productEdit])


    

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
//saveProduct
  const saveProduct=async(event)=>{
        event.preventDefault()
        const formData= new FormData()//built-in function keep data in array of arrays
        //takes key value pairs
        formData.append("name",product?.name)//editProduct is set to product as initialState in useState therefore product.nameOftheObject
        formData.append("category",product?.category)
        formData.append("quantity",product?.quantity)
        formData.append("price",product?.price)
        formData.append("description",description)//this description is pointing directly to description state
        //if user added a new product image then append it
        if(productImage){
          // console.log(productImage);
          formData.append("image",productImage)
        }

        // console.log(...formData)


        await dispatch(updateSingleProduct({id,formData}))
        await dispatch(getAllProduct())
        navigate("/dashboard")
    }


  return (
    <div>
    {isLoading && <Loader/>}
    <h3 className="--mt">Edit Product</h3>
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

export default EditProduct