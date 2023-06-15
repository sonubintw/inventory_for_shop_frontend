import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./ProductForm.scss"
import Card from '../../card/Card';

//data is coming from Addproduct.jsx and EditProduct as well
const ProductForm = ({ product,productImage,ImagePreview,
  description,setDescription,handleInputChange,
  handleImageChange,saveProduct }) => {

  return (
    <div className='add-product'>
      <Card className="card">
        <form onSubmit={saveProduct}> 
          <Card className="group">
            <label>Product Image</label>
            <code className='--color-dark'>supported Formats :jpg, jpeg, png </code>
            <input type="file" name='image' onChange={handleImageChange} accept="image/*"/>
          {/* //image preview */}
          {ImagePreview !=null ?(
            <div className="image-preview">
              <img src={ImagePreview} alt="product" accept="image/*"/>
            </div>
          ):(<p> No image set for this product</p>)}
          </Card>
          <label>Product Name:</label>

          {/* //optional chaining is used to check wether the product has a name property or not if it was not written in this form eg product.name if the name was not present i would've thrown erro so use optional chaining */}
          <input type="text" placeholder='Product Name' name='name' value={product?.name} onChange={handleInputChange}/>

          <label>Product Category:</label>
          <input type="text" placeholder='Product Category' name='category' value={product?.category} onChange={handleInputChange}/>
            
          <label>Product price:</label>
          <input type="text" placeholder='Product Price' name='price' value={product?.price} onChange={handleInputChange}/>

          <label>Product Quantity:</label>
          <input type="text" placeholder='Product Quantity' name='quantity' value={product?.quantity} onChange={handleInputChange}/>
        
        {/* //ReactQuill library all copy pasted from library */}
          <label>Product Description:</label>
          <ReactQuill theme="snow" value={description} onChange={setDescription} />
        
        <div className='--my'>
          <button type="submit" className='--btn --btn-primary' >Save Product</button>
        </div>
        </form>
      </Card>
    </div>
  )
}

export default ProductForm