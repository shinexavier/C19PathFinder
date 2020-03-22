const express = require('express');

const router = express.Router();

const env = require('../../resources/config');

var mongoose = require('mongoose');
//var env = require('dotenv').config();

mongoose.connect("mongodb://" + env.COSMOSDB_HOST + ":" + env.COSMOSDB_PORT + "/" + env.COSMOSDB_DBNAME + "?ssl=true&replicaSet=globaldb&retrywrites=false", {
        auth: {
            user: env.COSMODDB_USER,
            password: env.COSMOSDB_PASSWORD
        },
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connection to CosmosDB successful'))
    .catch((err) => console.error(err));

const baseConfig = {
    discriminatorKey: "_type", //If you've got a lot of different data types, you could also consider setting up a secondary index here.
    collection: "alldata"
}

const commonModel = mongoose.model('Common', new mongoose.Schema({}, baseConfig));

const Family_common = commonModel.discriminator('FamilyType', new mongoose.Schema({
    lastName: String,
    parents: [{
        familyName: String,
        firstName: String,
        gender: String
    }],
    children: [{
        familyName: String,
        firstName: String,
        gender: String,
        grade: Number
    }],
    pets: [{
        givenName: String
    }],
    address: {
        country: String,
        state: String,
        city: String
    }
}, baseConfig));

const Vacation_common = commonModel.discriminator('VacationDestinationsType', new mongoose.Schema({
    name: String,
    country: String
}, baseConfig));

const family_common = new Family_common({
    lastName: "Andersen",
    parents: [{
            firstName: "Thomas"
        },
        {
            firstName: "Mary Kay"
        }
    ],
    children: [{
        firstName: "John",
        gender: "male",
        grade: 7
    }],
    pets: [{
        givenName: "Fluffy"
    }],
    address: {
        country: "USA",
        state: "WA",
        city: "Seattle"
    }
});

family_common.save((err, saveFamily) => {
    console.log("Saved: " + saveFamily);
    console.log("Error: " + err);
});

const vacay_common = new Vacation_common({
    name: "Honolulu",
    country: "USA"
});

vacay_common.save((err, saveVacay) => {
    console.log("Saved: " + saveVacay);
    console.log("Error: " + err);
});


/** Reading data from CosmosDB - without discriminator **/
/**Family.find({ 'children.gender' : "male"}, function(err, foundFamily){
    foundFamily.forEach(fam => console.log("Found Family: " + JSON.stringify(fam)));
});**/

/** Reading data from CosmosDB - with discriminator **/
/**Family_common.find({ 'children.gender' : "male"}, function(err, foundFamily){
    foundFamily.forEach(fam => console.log("Found Family (discriminator): " + JSON.stringify(fam)));
});**/

router.get('/data', function (req, res, next) {
    let globalStats = Family_common.find({
        'children.gender': "male"
    }, function (err, foundFamily) {
        foundFamily.forEach(fam => console.log("Found Family (discriminator): " + JSON.stringify(fam)));
        res.json(foundFamily);
    }).sort({
        '_id': -1
    }).limit(1);

});



module.exports = router;