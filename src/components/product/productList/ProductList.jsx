import React from 'react'
import "./productList.scss"
import { SpinnerImg } from '../../loader/Loader'
import { FaEdit,FaTrashAlt } from 'react-icons/fa'
import {GrFormView} from "react-icons/gr"
import { useState } from "react"
import Search from '../../search/Search'
import {useDispatch, useSelector} from "react-redux"
import { FILTER_PRODUCTS, selectFilteredProducts } from '../../../redux/features/product/filterSlice'
import { useEffect } from 'react'
import ReactPaginate from "react-paginate"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { delete_A_product, getAllProduct } from '../../../redux/features/product/productSlice'
import { Link } from 'react-router-dom'


export const ProductList = ({products,isLoading}) => {

    //function to display short text in the table data below n represent number of char that i want to display
    const [search, setSearch] = useState("")
    const filtereProducts=useSelector(selectFilteredProducts)//useSelector is for individual state
    const dispatch = useDispatch()//this is for main reducers
    // console.log(products)
    const shortenText=(text,n)=>{
        if(text.length > n){
            const shortText=text.substring(0,n).concat("...")
            return shortText
        }
        return text
    }

    const deleteProduct=async(id)=>{
        // console.log(id)
        await dispatch(delete_A_product(id))//delete the product
        
    //    //after delete we need to get the refreshed store or the new store back so use get method
        await dispatch(getAllProduct())
        
        
    }

    //this is for the alert to confirm the delete or cancel copied from react-confirm-alert package
    const confirmDelete=(id)=>{

        confirmAlert({
            title: 'Delete product',
            message: 'Are you sure you want to delete product.',
            buttons: [
              {
                label: 'Delete',
                onClick: () =>deleteProduct(id)
                
              },
              {
                label: 'Cancel',
                // onClick: () => 
              }
            ]
          });
    }







////////pagination-----from npm react-paginate-------entire code copied
    
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage=5;//self made
  
    //this is from website copy pasted
    useEffect(() => {
      // Fetch items from another resources.
      const endOffset = itemOffset + itemsPerPage;

    //   console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      
      setCurrentItems(filtereProducts.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(filtereProducts.length / itemsPerPage));
    }, [itemOffset, itemsPerPage,filtereProducts]);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = event.selected * itemsPerPage % filtereProducts.length;
    //   console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
      setItemOffset(newOffset);
    }
    

/////////pagination-react end///////


//search filter 
    useEffect(()=>{
        dispatch(FILTER_PRODUCTS({products,search}))//dispatch is for entire reducer in filterSlice
        //If you were to use round brackets instead, like dispatch(FILTER_PRODUCTS(products, search)), it would imply that you are passing products and search as separate arguments to the action creator function. This might not align with how your action creator is defined, which is why object brackets are commonly used to pass an object with named properties as a single argument.
    },[products,search,dispatch])


  return (
    <div className='product-list'>
        <hr />
        <div className="table">
            <div className="--flex-between --flex-dir-column">
                <span>
                    <h3>Inventory Items</h3>
                </span>
                <span>
                    <Search value={search} onChange={(event)=>{setSearch(event.target.value)}}/>
                </span>
            </div>

            {isLoading && <SpinnerImg/>}

            <div className="table">
                {!isLoading && products.length===0 ? (<p>No products found, please add a product mf</p>):(
                    <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Value</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((elem,index)=>{
                                const{_id,name,category,price,quantity}=elem
                                return (
                                    <tr key={_id+1}>
                                        <td key={_id}>{index+1}</td>
                                        <td key={index}>
                                            {shortenText(name,16)}
                                        </td>
                                        <td>{category}</td>
                                        <td>{`Rs ${price}`}</td>
                                        <td>{quantity}</td>
                                        <td>{price * quantity}</td>
                                        <td className='icons'>
                                            <span>
                                                <Link to={`/product-details/${_id}`}>
                                                   <GrFormView size={30} color={"red"}/>
                                                </Link>
                                            </span>
                                            <span>
                                                <Link to={`/product-update/${_id}`}>
                                                    <FaEdit size={20} color={"green"}/>
                                                </Link>
                                            </span>
                                            <span>
                                                <FaTrashAlt size={20} color={"red"} onClick={()=>confirmDelete(_id)}/>
                                            </span>

                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                )}
            </div>
            <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="< Prev"
        renderOnZeroPageCount={null}
        containerClassName='pagination'
        pageLinkClassName='page-num'
        previousLinkClassName='page-num'
        nextLinkClassName='page-num'
        activeLinkClassName='activePage'
      />
        </div>
    </div>
  )
}
