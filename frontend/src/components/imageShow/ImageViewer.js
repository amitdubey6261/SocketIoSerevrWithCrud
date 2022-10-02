import React from 'react'
import { Image } from 'semantic-ui-react'
import "./ImageViewer.css"

const ImageViewer = ({url}) => {
  return (
    <div  className='imageWali'>
        {
            url.map((ele)=>{
                return <Image className='img' src={ele} ></Image>
            })
        }
    </div>
  )
}

export default ImageViewer