import React from 'react'
import { Header } from 'semantic-ui-react'
import Delete from '../delete/Delete'
import FileUpload from '../fileUpload/FileUpload'
import ImageViewer from '../imageShow/ImageViewer'
import Update from '../update/Update'
import "./output.css"

const Output = ({ data  , socket }) => {
    return (
        <div className='ui container '>
            {
                data.map((ele , idx)=>{
                    return <div className='optB' key={ele._id}> <br /> <Header as='h1'>{ele.name}</Header> <ImageViewer url={ele.url}/>  <Update socket={socket} id={ele._id}/> <Delete socket={socket} id={ele._id}/> <FileUpload socket={socket} id={ele._id}/> <br /></div>
                })
            }
        </div>
    )
}

export default Output