import React, { Component } from 'react'
import { Button , Form , Divider } from 'semantic-ui-react'

export class Update extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name : ""
        }
    }

    handleUpdate = () => {
        const {socket , id} = this.props ;
        console.log(`name is ${this.state.name}`)
        socket.emit("update_form" , {
            name : this.state.name ,
            id   : id
        })
        socket.on("update_response" , (data) =>{
            console.log(data);
        })
    }

    handleOnchange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() {
        return (
            <>
                <Form><Form.Field><label htmlFor="Update Name Field">Update Name</label><input onChange={this.handleOnchange} type="text" name="name" id="name" /></Form.Field><Button onClick={this.handleUpdate}>Update Record</Button> <Divider/></Form>
            </>
        )
    }
}

export default Update ;
