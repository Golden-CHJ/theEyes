const mongoose = require('mongoose')
const Schema = mongoose.Schema
const detailSchema = new Schema({
    id:Number,
    data:Object
})


module.exports = mongoose.model('Detail', detailSchema)