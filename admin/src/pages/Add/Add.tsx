import React, { useState } from 'react'
import './Add.css'
import {assets} from '../../assets/assets'
import 'react-dropzone-uploader/dist/styles.css'
import { useDropzone } from 'react-dropzone'

const Add = () => {

  return (
    <div className='add'>
      <form className="flex-col">
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <Dropzone getUploadParams={getUploadParams} onChangeStatus={handleChangeStatus} onSubmit={handleSubmit} accept='image/*'/>
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input type="text" name='name' placeholder='Type here'/>
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea name='description' rows="5" placeholder='Write Brief Description'/>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input type="number" name='price' placeholder='₹XXX' />
          </div>
        </div>
        <button type='submit' className='add-btn'>Add Product</button>
      </form>
    </div>
  )
}

export default Add