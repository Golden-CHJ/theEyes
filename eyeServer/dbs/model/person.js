const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PersonSchema = new Schema({
    id: {
        type:Number,
        unique:true,
        require:true
    },
    spell: {
        type:String,
        require:true
    },
    name: {
        type:String,
        require:true
    }
})


module.exports = mongoose.model('Person', PersonSchema)