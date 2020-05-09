const mongoose = require('mongoose')
const Schema = mongoose.Schema
const testSchema = new Schema({
    id: {
        type:Number,
        unique:true,
        require:true
    },

    name: {
        type:String,
        require:true
    }
})


module.exports = mongoose.model('test', testSchema)