import React, { useState } from 'react'
import './Add.css'
// import {assets} from '../../assets/assets.js';
import { Assets } from '../../assets/assets.ts';
import 'react-dropzone-uploader/dist/styles.css'
import { useDropzone } from 'react-dropzone'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

declare const assets: Assets;

const Add:React.FC = ({url}) => {
  const [files, setFiles] = useState<File[] | undefined>([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept:{
      'image/png':['.png','.PNG']
    },
    onDrop: (acceptedFiles, rejectedFiles)=>{
      if(acceptedFiles?.length){
        setFiles((previousFiles)=>[
            ...(previousFiles ?? []),
            ...acceptedFiles.map(file=>
              Object.assign(file, {preview: URL.createObjectURL(file)})
            )

        ] as File[])
      }
      console.log(acceptedFiles);
      if(rejectedFiles?.length)        
      {
        rejectedFiles.forEach(f=>{
          if(f.file.size > 1024 * 1000) 
          {
            toast('Oops! File size is greater than 1 MB');
          }
        })
      }
    },
    maxFiles:4,
    minSize:0,
    maxSize:1048576
  })

  const removeFile = (name) =>{
    setFiles(files=> files?.filter(file=>file.name !== name))
  }

  const [data, setData] = useState({
    name:"",
    description:"",
    price:"",
    cat:"Salad"
  })

  const onChangeHandler = (e) =>{
    const name = e.target.name;
    const value = e.target.value;

    setData(prev=>({...prev,[name]:value}))
  }

  const onSubmitHandler = async (e:React.SyntheticEvent)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("name",data.name)
    formData.append("description",data.description)
    formData.append("price",Number(data.price))
    formData.append("cat",data.cat)
    // console.log(acceptedFiles);
    files?.forEach(file=>formData.append('img',file));
    const response = await axios.post(`${url}/api/food/add`,formData);
    if(response.data.success){
      setData({
        name:"",
        description:"",
        price:"",
        cat:"Salad"
      })
      setFiles([])
      toast.success(response.data.message);
    }
    else{
      toast.error(response.data.message);
    }
  }
  return (
    <div className='add'>
      <form className="flex-col" onSubmit={onSubmitHandler} encType='multipart/form-data'>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <div {...getRootProps({className: 'dz'})}>
            <input {...getInputProps({name: 'img'})}/>
              <div className='drop-files-sec'>
                <p>Drag your files here | Click here to select files to upload</p>
              </div>
            </div>
            {/*Preview*/}
            <h4>Uploaded Files: </h4>
            <ul className='files-grid'>
              {files?.map(file=>(
                <li key={file.name} className='files-grid-item'>
                  <img src={file.preview} alt='' width={150} height={150} onLoad={()=>{URL.revokeObjectURL(file.preview)}}/>
                  <button type='button' className='remove-file-btn' onClick={()=>removeFile(file.name)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                  </button>
                </li>
              ))}
            </ul>
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here'/>
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} value={data.description} name='description' rows={5} placeholder='Write Brief Description'/>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category">
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
            <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='₹XXX' />
          </div>
        </div>
        <button type='submit' className='add-btn'>Add Product</button>
      </form>
      <ToastContainer theme='dark'/>
    </div>
  )
}

export default Add;