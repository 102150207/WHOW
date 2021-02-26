const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email : {
        type : String,
        require : true,
    },
    username : {
        type : String,
        require : true,
        minlength : 6
    },
    password : {
        type : String,
        require : true,
        minlength : 6
    },
    fullname : {
        type : String,
    },
    age : {
        type : Number,
        default : 0
    },
    address : {
        type : String
    },
    gender : {
        type : String,
        enum : ['Male','Famale','Other'],
        default : 'Male'
    },
    roles : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Role'
        }
    ]
})

module.exports = mongoose.model('User',userSchema);