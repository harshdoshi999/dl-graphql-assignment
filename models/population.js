// Initiate dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Create Schema as per the assigment
const populationSchema = new Schema({
    country: String,
    year: String,
    area_km: String,
    total_population:String
})
module.exports = mongoose.model('Population',populationSchema);