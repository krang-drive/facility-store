//----------------------------------------------------------------------------//
//                               Imports & Constants                          //
//----------------------------------------------------------------------------//

//Importing express module
const express = require('express');

//Setting express to a constant
const app = express();

//Importing mongoose module
var mongoose = require('mongoose');

const host = process.env.DATABASE_HOST || "facility-store-db";
const port = process.env.DATABASE_PORT || 27017;
const database = process.env.DATABASE_NAME || "facilitydb";
const user = process.env.DATABASE_USER || 'nodejs';
const pass = process.env.DATABASE_PASS || 'nodejs';
const url = `mongodb://${user}:${pass}@${host}:${port}/${database}`;

//Connecting mongoose to MongoDB
mongoose.connect(url);

//Setting the schema to use mongoose.
var Schema = mongoose.Schema;

//----------------------------------------------------------------------------//
//                               Schema & Model Creation                      //
//----------------------------------------------------------------------------//

//Creating a facilitySchema.
var facilitySchema = new Schema({

    facilityID: String,
    location: String

})

//Create a model that uses the schema.
var facility = mongoose.model('facility', facilitySchema);

//Make this available to Node app users.
module.exports = facility;

//----------------------------------------------------------------------------//
//                               Function Calls                               //
//----------------------------------------------------------------------------//

app.get('/facility', function (req, res) {

  facility.find({facilityID: req.query.facilityID}, function (err, facility){

    res.send(facility);

  });

});

//----------------------------------------------------------------------------//

app.get('/', function (req, res) {

  res.send("Hello, World!");

});

//----------------------------------------------------------------------------//

app.post('/facility', function(req, res){

    facility.findOneAndUpdate({facilityID: req.body.facilityID}, req.body , {upsert:true})

    //Writing out the post information to console.
    console.log('POST -> facilityID: ' + req.body.facilityID + ', location: ' + req.body.location);

});

//----------------------------------------------------------------------------//

app.listen(27017, function() {

  console.log('Listening on port 27017!')

});
