//----------------------------------------------------------------------------//
//                               Imports & Constants                          //
//----------------------------------------------------------------------------//

//Importing express module
const express = require('express');

//Setting express to a constant
const app = express();

//Importing mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://localhost/facility-store-db';

//Connecting mongoose to MongoDB
mongoose.connect(mongoDB);

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
var Facility = mongoose.model('Facility', facilitySchema);

//Make this available to Node app users.
module.exports = facility;

//----------------------------------------------------------------------------//
//                               Function Calls                               //
//----------------------------------------------------------------------------//

app.get('/facility', function (req, res)) {

  FacilityModel.find({facilityID: req.query.facilityID}, function (err, facility){

    res.send(facility);

  });

});

//----------------------------------------------------------------------------//

app.post('/form', function(req, res){

    facility.findOneAndUpdate({facilityID: req.body.facilityID}, req.body , {upsert:true})

    //Writing out the post information to console.
    console.log('POST -> facilityID: ' + req.body.facilityID + ', location: ' + req.body.location);

});

//----------------------------------------------------------------------------//

app.listen(8080, function() {

  console.log('Listening on port 8080!')

});
