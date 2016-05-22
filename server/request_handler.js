'use strict'
const path = require('path');
const key = require(path.resolve(__dirname + '/../api_key_511.js'));

const url = require('url');
const request = require('request');
const parseString = require('xml2js').parseString;
const _ = require('lodash');

module.exports.agencies = (clientReq, clientRes) => {
  console.log('got providers request');
  const endpoint = 'http://services.my511.org/Transit2.0/GetAgencies.aspx';
  request({url: endpoint, qs: {token: key}}, (err, apiRes, body) => {
    if (err) {
      console.log(err);
      return;
    }
    parseString(body, (err, result) => {
      const agencies = result.RTT.AgencyList[0].Agency.map((route) => {
        return route.$.Name;
      });
      clientRes.send(agencies);
    });
  });
};

module.exports.lines = (clientReq, clientRes) => {
  console.log('got lines request');
  const endpoint = 'http://services.my511.org/Transit2.0/GetRoutesForAgency.aspx';
  const urlParts = url.parse(clientReq.url, true);
  const agencyName = urlParts.query.agency;

  console.log(agencyName);

  request({url: endpoint, qs: {token: key, agencyName: agencyName}}, (err, apiRes, body) => {
    if (err) {
      console.log(err);
      return;
    }
    parseString(body, (err, result) => {
      const lines = result.RTT.AgencyList[0].Agency[0].RouteList[0].Route.map((route) => {
        return route.$;
      });
      clientRes.send(lines);
    });
  });
};

module.exports.times = (clientReq, clientRes) => {
  console.log('got stops request');
  // determine routeidf by parsing querystring
  const stopsEndpoint = 'http://services.my511.org/Transit2.0/GetStopsForRoute.aspx';
  const timesEndpoint = 'http://services.my511.org/Transit2.0/GetNextDeparturesByStopCode.aspx';
  const urlParts = url.parse(clientReq.url, true);
  const query = urlParts.query;
  const agency = query.agency;
  const routeCode = query.route;
  const direction = query.direction;
  const routeIDF = agency + '~' + routeCode + '~' + direction;

  // get list of stops for routeidf
  request({url: stopsEndpoint, qs: {token: key, routeIDF: routeIDF}}, (err, apiRes, body) => {
    if (err) {
      console.log(err);
      return;
    }
    parseString(body,(err, result) => {
      let firstStopCode;
      switch (agency) {
        case 'SF-MUNI':
        firstStopCode = result.RTT.AgencyList[0].Agency[0]
        .RouteList[0].Route[0].RouteDirectionList[0].RouteDirection[0]
        .StopList[0].Stop[0].$.StopCode;
      }

      // then find times for first stop on the line
      request({url: timesEndpoint, qs: {token: key, stopCode: firstStopCode}}, (err, apiRes, body) => {
        if (err) {
          console.log(err);
          return;
        }
        parseString(body, (err, result) => {
          const routes = result.RTT.AgencyList[0].Agency[0].RouteList[0].Route;
          const route = routes.filter((route) => {
            return (route.$.Code === routeCode ? true : false);
          })[0];

          const times = route.RouteDirectionList[0].RouteDirection[0]
          .StopList[0].Stop[0].DepartureTimeList[0].DepartureTime;
          clientRes.send(times);
        });
      });
    });
  });
};
