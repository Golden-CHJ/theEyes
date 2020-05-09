const mongoose = require('mongoose')
const Schema = mongoose.Schema
const rubbishesSchema = new Schema({
    rubbish_classify: Array,
    detail:Object
})


module.exports = mongoose.model('Rubbishes', rubbishesSchema)