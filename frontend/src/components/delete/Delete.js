import React from 'react'
import { Button , Divider } from 'semantic-ui-react';

const Delete = ({ socket, id }) => {
    const handleDel = () => {
        // console.log(id);
        socket.emit("delete_form", { id: id });
        socket.on("delete_response", (data) => {
            console.log(data);
        })
    }
    return (
    <>
        <Button onClick={handleDel}>Delete Record</Button><Divider/>
    </>
    )
}

export default Delete