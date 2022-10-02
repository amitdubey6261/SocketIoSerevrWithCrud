import { Button , Form  } from 'semantic-ui-react'
import Axios from 'axios'
import React, { Component } from 'react'

export class FileUpload extends Component {
    constructor(props) {
        super(props)

        this.state = {
            file: null , 
            url : "",
        }
    }

    onChange = (e) => {
        this.setState({ file: e.target.files[0] })
    }

    uploadImg = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        // console.log(this.state.file);
        formData.append("file",this.state.file);
        formData.append("upload_preset" , "internImages");
        Axios.post("https://api.cloudinary.com/v1_1/daj3qkez6/image/upload" , formData).then((Response)=>{
            this.setState({url:Response.data.secure_url} , ()=>{
                this.props.socket.emit("AddImage" , {url:this.state.url , id : this.props.id});
                this.props.socket.on("AddImage_response",(data)=>{console.log(data)});
            })
        }).catch((err)=>{
            console.log(err);
        })
    }

    render() {
        return (
            <>
                <Form onSubmit={this.uploadImg}>
                    <Form.Field>
                        <label htmlFor="Upload New Image">Upload New Image </label>
                    <input onChange={this.onChange} type="file" name="file" id="file" />
                    </Form.Field>
                    <Button type="submit">Add New Image</Button>
                </Form>
            </>
        )
    }
}

export default FileUpload






















// import React, { Component } from 'react'

// export class FileUpload extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             file: null
//         }

//         this.onFormSubmit = this.onFormSubmit.bind(this)
//         this.onChange = this.onChange.bind(this)
//         this.fileUpload = this.fileUpload.bind(this)
//     }

//     onFormSubmit(e) {
//         e.preventDefault() // Stop form submit
//         console.log(this.state.file);
//         // this.fileUpload(this.state.file).then((response) => {
//         //     console.log(response.data);
//         // })
//     }

//     onChange(e) {
//         this.setState({ file: e.target.files[0] })
//     }


//     fileUpload(file) {
//         console.log(file);
//         // const url = 'http://example.com/file-upload';
//         // const formData = new FormData();
//         // formData.append('file', file)
//         // const config = {
//         //     headers: {
//         //         'content-type': 'multipart/form-data'
//         //     }
//         // }
//         // return post(url, formData, config)
//     }

//     render() {
//         return (
//             <form onSubmit={this.onFormSubmit}>
//                 <h1>File Upload</h1>
//                 <input type="file" onChange={this.onChange} />
//                 <button type="submit">Upload</button>
//             </form>
//         )
//     }
// }

// export default FileUpload

// // import React from 'react'
// // import axios, { post } from 'axios';

// // class SimpleReactFileUpload extends React.Component {

// //   constructor(props) {
// //     super(props);
// //     this.state ={
// //       file:null
// //     }
// //     this.onFormSubmit = this.onFormSubmit.bind(this)
// //     this.onChange = this.onChange.bind(this)
// //     this.fileUpload = this.fileUpload.bind(this)
// //   }
// //   onFormSubmit(e){
// //     e.preventDefault() // Stop form submit
// //     this.fileUpload(this.state.file).then((response)=>{
// //       console.log(response.data);
// //     })
// //   }
// //   onChange(e) {
// //     this.setState({file:e.target.files[0]})
// //   }
// //   fileUpload(file){
// //     const url = 'http://example.com/file-upload';
// //     const formData = new FormData();
// //     formData.append('file',file)
// //     const config = {
// //         headers: {
// //             'content-type': 'multipart/form-data'
// //         }
// //     }
// //     return  post(url, formData,config)
// //   }

// //   render() {
// //     return (
// //       <form onSubmit={this.onFormSubmit}>
// //         <h1>File Upload</h1>
// //         <input type="file" onChange={this.onChange} />
// //         <button type="submit">Upload</button>
// //       </form>
// //    )
// //   }
// // }



// // export default SimpleReactFileUpload