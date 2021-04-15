//attaches information to the individual points
function onEachFeature (feature, layer) {
  let outputString = '';
  //            outputString += '<b>' + feature.properties.status + '</b>';
  if (feature.properties.story == undefined) {
      feature.properties.story = storyPlaceholder;
  }
  outputString += '<p class="popupTime">' + feature.properties.time + '</p>';
  outputString += '<p class="popupName">' + feature.properties.name + '</p>';
  outputString += '<p class="popupStatus">' + feature.properties.status + '</p>';
  outputString += '<p class="popupStory">' + feature.properties.story + '</p>';
  //console.log(feature);
  layer.bindPopup(outputString,
                 storyPopupOptions, //
                 );
}

//obsoleted - was being used to affect the markers drawn by the geojson layer;
// markers now drawn by clustermakerlayer (var markers)
// and appearance controlled by options.js
function styleFunction(feature) {
  switch (feature.properties.status) {
      case 'waiting': return {fillColor: 'red'};
      case 'granted': return {fillColor: 'green'};
  }
}

function pointToLayer(feature, latlng) {
  return L.circleMarker(latlng, {
              radius: 8,
              weight: 1,
              fillOpacity: 1,
              fillColor: 'blue',
              color: 'black'
          })
}


//taken from Chaining Promises
// https://developers.google.com/web/updates/2015/03/introduction-to-fetch
function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

function json(response) {
  return response.json()
}


//construct geojson out of array of data from the google sheet
//create spec-respecting collection of geojson points out of the data
function toGeoJSONFeatureCollection(arrayOfRows) {
    var outputGeoJSON = {"type": "FeatureCollection",
                        "features": []
                        };

    headers = arrayOfRows.shift(); //get rid of header row and store it

    for (let i = 0; i < headers.length; i++) { //construct headersDictionary to reference field
        headersDict[headers[i]] = i;
    }

    arrayOfRows.forEach(function(row) {
        var feature = {"type": "Feature"};
        feature["geometry"] = {"type": "Point",
                              "coordinates": [//geoJSON spec is lng,lat as decimals and in that order
                                  parseFloat(row[headersDict.lng]),
                                  parseFloat(row[headersDict.lat])
                                             ]};
        feature["properties"] = {};
        for (let i = 0; i < headers.length; i++){
            feature["properties"][headers[i]] = row[i];
                }
        outputGeoJSON["features"].push(feature);
    })
    return outputGeoJSON;
    };


    //
function loadData(data, leafletLayer) {
    leafletLayer.addData(data.features);

    markers.addLayer(leafletLayer);
    markers.eachLayer(function (layer) {
        layer.setIcon(pulseIcon2);
    });
    myMap.addLayer(markers);
    //myMap.fitBounds(markers.getBounds());
    //leafletLayer.addTo(myMap);
}



//icons
const pulseIcon = L.icon.pulse(pulseIconOptions);
const pulseIcon2 = L.icon.pulse(pulseIconOptions2);

//initing
let personData;
const personLayer = L.geoJSON(null,{
                            //pointToLayer: pointToLayer, //default is to spawn a ddefault Marker a la function(geoJson, latlng) {return L.marker(latlng);}
                            style: styleFunction,
                            onEachFeature: onEachFeature,
                            });

const markers = L.markerClusterGroup(clusterMarkerOptions);

//asynch pull data from googlesheet
console.log('fetching data from google sheet')
const apiUrl = 'https://sheets.googleapis.com/v4/spreadsheets/'
let spreadsheetId = googleDocURL.indexOf('/d/') > 0
                        ? googleDocURL.split('/d/')[1].split('/')[0]
                        : googleDocURL
let headers;//container for list of sheet headers
let headersDict={};


//fetch(apiUrl + spreadsheetId + '?key=' + googleApiKey)
fetch(apiUrl + spreadsheetId + '/values/Points?key=' + googleApiKey)
.then(status)
.then(json)
.then(function(data) {

    console.log('storing personData');
    personData = toGeoJSONFeatureCollection(data.values);

    console.log('loading data into map layer');
    loadData(personData, personLayer);
//                fillTicker(snippetCount);

    console.log('filling ticker');
    fillTicker(snippetTotal); //from tickerfunction.js
    console.log('filled Ticker as part of fetch');
})
.then(function () {
  ticker = new Ticker("ticker")
})
.catch(function(error) {
  console.log('Request failed', error)
});
