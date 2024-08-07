const mongoose = require('mongoose')

const Jobschema = new mongoose.Schema({
    name: {
        type: String,
        Required: true
    },
    email: {
        type: String,
        Required: true
    },
    password: {
        type: String,
        Required: true
    },
    confirmpassword: {
        type: String,
        Required: true
    },
    phone: {
        type: Number,
        Required: true
    },
    role: {
        type: String,
        Required: true
    },

}, { timestamps: true })
const JobModel = mongoose.model('jobs', Jobschema)

module.exports = JobModel