import React,{useEffect} from 'react'
import { useRedirectLoggedOutUser } from '../../customHook/useRedirectLoggedOutUser'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice'
// import { getProducts } from '../../redux/features/product/productService'
import { ProductList } from '../../components/product/productList/ProductList'
import { getAllProduct } from '../../redux/features/product/productSlice'
import ProductSummary from '../../components/product/productSummary/ProductSummary'


const Dashboard = () => {
  //this is a custom hook for redirecting the use to login after the session is expired
  useRedirectLoggedOutUser("/login")
  const dispatch= useDispatch()
  const isLoggedin=useSelector(selectIsLoggedIn)//can do this or the below destructure
  const {products,isLoading,isError,message}=useSelector((state)=>state.product)//product is just a name assigned in store as product
  
//isLoggedin then only dispatch
  useEffect(() => {
    if(isLoggedin===true){
      dispatch(getAllProduct())
    }
    
    if(isError){
      console.log(message);
    }
  }, [isLoggedin,isError,message,dispatch]);



return (
  <div>
      <ProductSummary products={products}/>
      <ProductList products={products} isLoading={isLoading}/>
  </div>
  )
}

export default Dashboard