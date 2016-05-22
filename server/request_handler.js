var key = require(__dirname + '/api_key_511.js');

var url = require('url');
var request = require('request');
var parseString = require('xml2js').parseString;
var _ = require('lodash');

module.exports.agencies = function(clientReq, clientRes) {
  console.log('got providers request');
  var endpoint = 'http://services.my511.org/Transit2.0/GetAgencies.aspx';
  request({url: endpoint, qs: {token: key}}, function(err, apiRes, body) {
    if (err) {
      console.log(err);
      return;
    }
    parseString(body, function (err, result) {
      var agencies = result.RTT.AgencyList[0].Agency.map(function(route) {
        return route.$.Name;
      });
      clientRes.send(agencies);
    });
  });
};

module.exports.lines = function(clientReq, clientRes) {
  console.log('got lines request');
  var endpoint = 'http://services.my511.org/Transit2.0/GetRoutesForAgency.aspx';
  var urlParts = url.parse(clientReq.url, true);
  var agencyName = urlParts.query.agency;

  console.log(agencyName);

  request({url: endpoint, qs: {token: key, agencyName: agencyName}}, function(err, apiRes, body) {
    if (err) {
      console.log(err);
      return;
    }
    parseString(body, function (err, result) {
      var lines = result.RTT.AgencyList[0].Agency[0].RouteList[0].Route.map(function(route) {
        return route.$;
      });
      clientRes.send(lines);
    });
  });
};

module.exports.times = function(clientReq, clientRes) {
  console.log('got stops request');
  // determine routeidf by parsing querystring
  var stopsEndpoint = 'http://services.my511.org/Transit2.0/GetStopsForRoute.aspx';
  var timesEndpoint = 'http://services.my511.org/Transit2.0/GetNextDeparturesByStopCode.aspx';
  var urlParts = url.parse(clientReq.url, true);
  var query = urlParts.query;
  var agency = query.agency;
  var routeCode = query.route;
  var direction = query.direction;
  var routeIDF = agency + '~' + routeCode + '~' + direction;

  // get list of stops for routeidf
  request({url: stopsEndpoint, qs: {token: key, routeIDF: routeIDF}}, function(err, apiRes, body) {
    if (err) {
      console.log(err);
      return;
    }
    parseString(body, function (err, result) {
      var firstStopCode = result.RTT.AgencyList[0].Agency[0]
      .RouteList[0].Route[0].RouteDirectionList[0].RouteDirection[0]
      .StopList[0].Stop[0].$.StopCode;
      // then find times for first stop on the line
      request({url: timesEndpoint, qs: {token: key, stopCode: firstStopCode}}, function(err, apiRes, body) {
        if (err) {
          console.log(err);
          return;
        }
        parseString(body, function(err, result) {
          var routes = result.RTT.AgencyList[0].Agency[0].RouteList[0].Route;
          var route = routes.filter(function(route) {
            return (route.$.Code === routeCode ? true : false);
          })[0];

          var times = route.RouteDirectionList[0].RouteDirection[0]
          .StopList[0].Stop[0].DepartureTimeList[0].DepartureTime;
          clientRes.send(times);
        });
      });
    });
  });
};
