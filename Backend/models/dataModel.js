const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    name : {
        type:String ,
        required:true ,
    } , 
    url : [
        {
            type:String , 
            required : true 
        }
    ]
})

module.exports = mongoose.model("Data" , dataSchema);