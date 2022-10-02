import './App.css';
import { Header, Icon } from 'semantic-ui-react';
import React, { useState } from 'react';
import Create from './components/create/Create';
import Output from './components/output/Output';
const { io } = require('socket.io-client');
const socket = io("http://localhost:5000");


function App() {
  const [datas, setdatas] = useState([]);

  socket.on("render_response", (data) => {
    // console.log(data);
    setdatas(data);
  })

  return (
    <>
      <div className='ui container ic'>
        <center><Header as='h2' icon>
          <Icon name='users' />
          Live Connect With World
          <Header.Subheader>
            Do Crud Operations Live On A Single Database <br/>
            <a href="https://amitdubeyport.netlify.app/"><Icon name="address card outline"></Icon><Header>Reach Me</Header></a>
          </Header.Subheader>
        </Header></center>
      </div>
      <div >
        <Create socket={socket} />
        <Output socket={socket} data={datas} />
      </div>
    </>
  );
}

export default App;
