const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },


    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }, addresses: [{
        fullname:{
            type:String,
            require:true
        }, mobile: {
        type: String,
        required: true
    },
    addressLine: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    }

    }]
});

module.exports = mongoose.model("User", userSchema);