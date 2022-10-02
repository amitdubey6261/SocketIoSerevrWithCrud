const express = require('express');
const path = require('path')
const cors = require("cors");
const app  = express();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname , "../frontend/build")));

app.get("*" , (req , res)=>{
    res.sendFile(path.resolve(__dirname , "../frontend/build/index.html"));
})


module.exports = app ;