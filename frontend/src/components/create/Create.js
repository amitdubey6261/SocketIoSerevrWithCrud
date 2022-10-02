import React, { Component } from 'react'
import { Button, Form  } from 'semantic-ui-react'
import Axios from 'axios'
import "./create.css"

export class Create extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            file: null,
            img_gen_url: ""
        }
    }

    onChangeFile = (e) => {
        this.setState({ file: e.target.files[0] })
    }

    handleOnchange = (e) => {
        // console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value,
        })
    }


    handleFormSubmit = (e) => {
        e.preventDefault();
        if(this.state.name === "" || this.state.file === null ){
            alert("Name And File Is Required Field");
            return ;
        }
        const formData = new FormData();
        formData.append("file", this.state.file);
        formData.append("upload_preset", "internImages");
        Axios.post("https://api.cloudinary.com/v1_1/daj3qkez6/image/upload", formData).then((response) => {
            this.setState({ img_gen_url: response.data.secure_url }, () => {
                this.sendDataToServer();
            });
        })
    }


    sendDataToServer = () => {
        // console.log(this.state);
        this.props.socket.emit("form_submit", this.state);
        this.props.socket.on("create_response", (data) => { console.log(data) });
    }

    render() {
        return (
            <div className='ui container frmB'>
                <Form onSubmit={this.handleFormSubmit}>
                    <Form.Field>
                        <label htmlFor="name">Name</label>
                        <input placeholder='Please Enter Name' onChange={this.handleOnchange} value={this.state.name} type="text" name="name" id="name" />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="file">Upload File</label>
                        <input type="file" onChange={this.onChangeFile} />
                    </Form.Field>
                    <Button type="submit">Submit Form </Button>
                </Form>
            </div>
        )
    }
}

export default Create;