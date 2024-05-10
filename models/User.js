const mongoose = require('mongoose')

const User = new mongoose.Schema({ // schema is constructor
    name:{
        type:String,
        required:true,
        unique:[true,'This username is taken'],
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },

},
{timestamps : true}
);

module.exports = mongoose.model('User',User)