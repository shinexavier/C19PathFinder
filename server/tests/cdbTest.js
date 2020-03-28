/*eslint strict: ["error", "global"]*/

'use strict';


var config = require('../resources/config');
var mongoose = require('mongoose');

var connectionString =
  'mongodb://' +
  config.COSMOSDB_HOST + ':' +
  config.COSMOSDB_PORT + '/' +
  config.COSMOSDB_DBNAME + '?ssl=true&replicaSet=globaldb&retrywrites=false';

console.log(connectionString);

var baseConfig = {
  // If you've got a lot of different data types, you could also consider
  // setting up a secondary index here.
  discriminatorKey: '_type',
  collection: 'alldata',
};


var commonModel = mongoose.model(
  'Common',
  new mongoose.Schema({},
    baseConfig));

var Family_common = commonModel.discriminator(
  'FamilyType',
  new mongoose.Schema({
    lastName: String,
    parents: [{
      familyName: String,
      firstName: String,
      gender: String,
    }],
    children: [{
      familyName: String,
      firstName: String,
      gender: String,
      grade: Number,
    }],
    pets: [{
      givenName: String,
    }],
    address: {
      country: String,
      state: String,
      city: String,
    },
  }, baseConfig));

var Vacation_common = commonModel.discriminator(
  'VacationDestinationsType',
  new mongoose.Schema({
    name: String,
    country: String,
  }, baseConfig));

var family_common = new Family_common({
  lastName: 'Andersen',
  parents: [{
    firstName: 'Thomas',
  },
  {
    firstName: 'Mary Kay',
  },
  ],
  children: [{
    firstName: 'John',
    gender: 'male',
    grade: 7,
  }],
  pets: [{
    givenName: 'Fluffy',
  }],
  address: {
    country: 'USA',
    state: 'WA',
    city: 'Seattle',
  },
});

var vacay_common = new Vacation_common({
  name: 'Honolulu',
  country: 'USA',
});

mongoose
  .connect(connectionString, {
    auth: {
      user: config.COSMODDB_USER,
      password: config.COSMOSDB_PASSWORD,
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(function() {
    console.log('Connected to the database');

    family_common.save(function(err, saveFamily) {
      if (err) {
        console.log('Error: ' + err);
        return;
      }

      console.log('Saved: ' + saveFamily);

      vacay_common.save(function(err, saveVacay) {
        if (err) {
          console.log('Error: ' + err);
          return;
        }

        console.log('Saved: ' + saveVacay);

        Family_common.find({
          'children.gender': 'male',
        }, function(err, foundFamily) {
          if (err) {
            console.log('Error: ' + err);
          }

          foundFamily.forEach(function(fam) {
            console.log('Found Family (discriminator): ' + fam);
          });

          process.exit(1);
        }).sort({
          _id: -1,
        }).limit(1);
      });
    });
  })
  .catch(function(err) {
    console.error(err);
  });

// // Create Schema
// // Use this way, if you'd like to store one type of data per collection.
// // This method could be expensive since CosmosDB charges per collection.
// // In this case, 2 collections will be created. One for Family,
// // the other for VacationDestinations
// var Family = mongoose.model('Family', new mongoose.Schema({
//     lastName: String,
//     parents: [{
//         familyName: String,
//         firstName: String,
//         gender: String
//     }],
//     children: [{
//         familyName: String,
//         firstName: String,
//         gender: String,
//         grade: Number
//     }],
//     pets: [{
//         givenName: String
//     }],
//     address: {
//         country: String,
//         state: String,
//         city: String
//     }
// }));

// var family = new Family({
//     lastName: 'Andersen',
//     parents: [
//         { firstName: 'Thomas' },
//         { firstName: 'Mary Kay' }
//     ],
//     children: [
//         { firstName: 'John', gender: 'male', grade: 7 }
//     ],
//     pets: [
//         { givenName: 'Fluffy' }
//     ],
//     address: { country: 'USA', state: 'WA', city: 'Seattle' }
// });

// family.save((err, saveFamily) => {
//     console.log(JSON.stringify(saveFamily));
// });

// var VacationDestinations = mongoose.model(
//     'VacationDestinations',
//     new mongoose.Schema({
//         name: String,
//         country: String
//     }));

// var vacaySpot = new VacationDestinations({
//     name: 'Honolulu',
//     country: 'USA'
// })

// vacaySpot.save((err, saveVacay) => {
//     console.log(JSON.stringify(saveVacay));
// });

//  Reading data from CosmosDB - without discriminator
// Family.find({ 'children.gender': 'male' }, function (err, foundFamily) {
//     foundFamily.forEach(function (fam) {
//         console.log('Found Family: ' + JSON.stringify(fam))
//     });
// });
