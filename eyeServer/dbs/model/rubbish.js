const mongoose = require('mongoose')
const Schema = mongoose.Schema
const rubbishSchema = new Schema({
    rubbish_classify: Array,
    detail:Object
})


module.exports = mongoose.model('Rubbish', rubbishSchema)