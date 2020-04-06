const axios = require('axios');
const cheerio = require('cheerio');
const MOH_URL = 'https://www.mohfw.gov.in/';

axios
  .get(MOH_URL)
  .then(function (response) {
    // handle success
    //console.log(response.data);
    let $ = cheerio.load(response.data);
    //console.log($('table tbody tr').length)
    indiaStatsConfirmed = 0;
    indiaStatsRecovered = 0;
    indiaStatsDeceased = 0;

    $('table tbody tr').each(function (index, element) {
      if ($('table tbody tr').length - 2 != index) {
        let state = $($(this).find('td')[1]).text();
        let confirmedCases = +$($(this).find('td')[2]).text();
        let recoveredCases = +$($(this).find('td')[3]).text();
        let deceasedCases = +$($(this).find('td')[4]).text();
        console.log(
          state,
          ' ',
          confirmedCases,
          ' ',
          recoveredCases,
          ' ',
          deceasedCases,
          ' index ',
          index
        );
        indiaStatsConfirmed += confirmedCases;
        indiaStatsRecovered += recoveredCases;
        indiaStatsDeceased += deceasedCases;
      }
    });
    console.log(
      'India ',
      indiaStatsConfirmed,
      ' ',
      indiaStatsRecovered,
      ' ',
      indiaStatsDeceased
    );
    
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
