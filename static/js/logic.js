// Create the map object
var myMap = L.map("map", {
    center: [37.7749, -122.4194],
    zoom: 5
});

// Add the tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
}).addTo(myMap);

// USGS URL for json Earthquake Data
var quakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var geojson;
// Function to determine marker size based on earthquake richter rating
// function markerSize(richter) {
//     return rating * 10;
// }

// var quakeMarkers = [];

// Perform a GET request to quakeURL & send the data.features object to the createFeatures function
d3.json(quakeUrl, function(response) {
    console.log(response);
    for (var i = 0; i < response.length; i++) {
        var color = "";
        if (properties[i].mag > 6) {
            color = "red";
        }
        else if (properties[i].mag > 4) {
            color = "orange";
        }
        else if (properties[i].mag > 2) {
            color = "yellow";
        }
        else {
            color = "blue";
        }
        // quakeMarkers.push(
        L.circle(geometry.coordinates[1],geometry.coordinates[0], {
            stroke: false,
            fillOpacity: 0.75,
            color: "white",
            fillColor: color,
            radius: properties[i].mag * 10
            }).bindPopup("<h1>" + properties[i].title + "</h1>").addTo(myMap);
    }
})

 
