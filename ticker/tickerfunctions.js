
//returns random marker from the input (L.markerClusterGroup); markers will allow accessing popups etc
function randomMarker() {
    let Data = markers;// assumed data source to be the clustermarkers layer
    let lyrs = Data.getLayers();
    let i = Math.floor(Math.random() * lyrs.length);
    return lyrs[i];
}
function randomFeature() { //replaces randomEntry
    return randomMarker().feature; //gets the feature with all its sheet data
};

//returns random section of string of input length
function randomSnippet(marker, n) {
    let s = marker.feature.properties.story;
    if (s.length >= n) {
    let i = Math.floor(Math.random() * (s.length - n));

    let snippet = s.slice(i, i+n);
        console.log(snippet.length);
    if 
        (i !== 0) { snippet = '...' + snippet;}
    if 
        (i+n < s.length) { snippet += '...'}
    
    return snippet;
    } else
        {return s};
};

//creates (and returns0) HTML to be put into the ticker container
function createTickerEntry() {
    
    marker = randomMarker();
    let id = marker._leaflet_id; //ID that can be passed to LayerGroup.getLayer(ID) to retreive the layer (i.e. marker) later
    let s = marker.feature.properties.story;

    container = L.DomUtil.get(tickerContainerId);
    newTickerEntry = L.DomUtil.create('div','snippet',container);
//    newTickerEntry.innerHTML = '<template>' + c + '</template>' + '<p>' + randomSnippet(entry, snippetLength) + '</p>';
    newTickerEntry.innerHTML = '<template>' + id + '</template>' + '<p>' + randomSnippet(marker, snippetLength) + '</p>';

    newTickerEntry.setAttribute("onclick", "onTickerItemClick(this)");
    
    return newTickerEntry;
};

//htmlElement usually assigned via this keyword
function onTickerItemClick(element) {
    console.log('onTickerItemClick Fired: element');
    console.log(element);
    console.log('getting leafletID from inside template tag');
    let leafletID = element.getElementsByTagName('template')[0].innerHTML;
    console.log(leafletID)
    
    //refocusing on marker to show the popup
    let l = markers.getLayer(leafletID);
//    myMap.setView(l.getLatLng());
//    myMap.panTo(l.getLatLng());
    myMap.once('zoomend', function() {l.openPopup()});
    myMap.flyTo(l.getLatLng());
    //myMap.setZoom(myMap.getMaxZoom());
    //probably should bind the full story content to the popup at this point
    //or change the popup content to whatever info you want to display when they click on a snippet
//    myMap.once('zoomend', l.openPopup());
    //myMap.zoomIn(4);
    //l.openPopup();
    console.log(l.getLatLng());
    return leafletID;
    };





/*//BACKUP CODE - WORKS USING GEOJSON FEATURE COLLECTION (personData)
//htmlElement usually assigned via this keyword
function onTickerItemClick(element) {
    console.log('onTickerItemClick Fired: element');
    console.log(element);
    console.log('getting coords from inside template tag');
    let coordlist = element.getElementsByTagName('template')[0].innerHTML.split(',');//in 'lng,lat' form
    let latlng = L.latLng([coordlist[1], coordlist[0]]);
    console.log(latlng);
    
    };



//returns random entry from the input GeoJSON FeatureCollection of persons data
function randomEntry(Data) {
    let i = Math.floor(Math.random() * Data.features.length);
    return Data.features[i];
};

//returns random section of string of input length
function randomSnippet(feature, n) {
    let s = feature.properties.story;
    if (s.length >= n) {
    let i = Math.floor(Math.random() * (s.length - n));

    let snippet = s.slice(i, i+n);
        console.log(snippet.length);
    if 
        (i !== 0) { snippet = '...' + snippet;}
    if 
        (i+n < s.length) { snippet += '...'}
    
    return snippet;
    } else
        {return s};
};

//creates (and returns0) HTML to be put into the ticker container
function createTickerEntry(Data) {
    
    entry = randomEntry(Data);
    let c = entry.geometry.coordinates.toString(); //string format: lng, lat (geojson spec)
    let s = entry.properties.story;

    container = L.DomUtil.get(tickerContainerId);
    newTickerEntry = L.DomUtil.create('div','snippet',container);
    newTickerEntry.innerHTML = '<template>' + c + '</template>' + '<p>' + randomSnippet(entry, snippetLength) + '</p>';

    newTickerEntry.setAttribute("onclick", "onTickerItemClick(this)");
    
    return newTickerEntry;
};

*/
