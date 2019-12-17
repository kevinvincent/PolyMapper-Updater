var Datastore = require('nedb')
const fs = require('fs');
var GeoJSON = require('geojson');
const request = require('request-promise-native');

const baseRequest = request.defaults({
   jar: true
});

/**
 * Copy down buildings geojson
 */
(async () => {
   var buildings = await baseRequest("https://maps.calpoly.edu/data/datasets/calpoly/buildings.json");
   fs.writeFileSync('buildings.json', buildings);
})()


/**
 * Make section geojson 
 */
var tdb = new Datastore({ filename: 'term.db', autoload: true });
tdb.find({}, function (err, docs) {
   
   docs = docs.map(function(doc) {
      doc.type = "sections";
      return doc;
   });
   
   var sectionsGeoJson = GeoJSON.parse(docs, {Point: ['lat', 'lng']});
   fs.writeFileSync('sections.json', JSON.stringify(sectionsGeoJson));
   
});

/**
 * Make rooms geojson 
 */
var rdb = new Datastore({ filename: 'rooms.db', autoload: true });
rdb.find({}, function (err, docs) {
   
   var classrooms = {};
   docs.forEach(function(doc) {
      if(!classrooms[doc.bldgName]) {
         classrooms[doc.bldgName] = {}
      }
      classrooms[doc.bldgName][doc.room] = { lat : doc.lat, lng : doc.lng};
   });
   
   var classroomsData = [];
   Object.keys(classrooms).forEach(function(building) {
      Object.keys(classrooms[building]).forEach(function(room){
         classroomsData.push({
            bldg: building.split("-")[1].trim(),
            bldgName: building.split("-")[0].trim(),
            room: room.trim(),
            roomRef: building.split("-")[1].trim() + room,
            lat: classrooms[building][room].lat,
            lng: classrooms[building][room].lng,
            type: "classrooms"
         })
      })
   });
   
   var classroomsGeoJson = GeoJSON.parse(classroomsData, {Point: ['lat', 'lng']});
   fs.writeFileSync('classrooms.json', JSON.stringify(classroomsGeoJson));
   
});