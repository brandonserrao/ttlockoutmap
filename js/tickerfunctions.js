L.Control.Ticker = L.Control.extend({
    onAdd: function(map) {
        var div = L.DomUtil.create('div');
/*        div.style.width = '100vw';
        div.style.height = '20vh';*/
        div.id = tickerContainerId;
        div.innerHTML='<p>This is a paragraph element with this text inside of it./p>';
        return div;
    },
    
    onRemove: function(map) {
        //don't do anything; onRemove required to be valid apparently
    }
    
});

L.control.ticker = function(opts) {
    return new L.Control.Ticker(opts);
}

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
function randomSnippet(marker, len) {
    let s = marker.feature.properties.story;
    if (s.length >= len) {
    let i = Math.floor(Math.random() * (s.length - len));

    let snippet = s.slice(i, i+len);
        console.log(snippet.length);
    if 
        (i !== 0) { snippet = '...' + snippet;}
    if 
        (i+len < s.length) { snippet += '...'}
    
    return snippet;
    } else
        {return s};
};

//creates (and returns0) HTML to be put into the ticker container
function createTickerEntry() {
    
    marker = randomMarker();
    while (marker.feature.properties.story == storyPlaceholder
           || marker.feature.properties.story == undefined) {
        marker = randomMarker();
    }
    let id = marker._leaflet_id; //ID that can be passed to LayerGroup.getLayer(ID) to retreive the layer (i.e. marker) later
    let s = marker.feature.properties.story;
    container = document.getElementById(tickerContainerId);
    
    newTickerEntry = L.DomUtil.create('li','snippet',container);
    newTickerEntry.innerHTML = '<template>' + id + '</template>' + randomSnippet(marker, snippetLength);
    
        newTickerEntry.setAttribute("onclick", "onTickerItemClick(this)");
    
    return newTickerEntry;
};

//htmlElement usually assigned via this keyword
function onTickerItemClick(element) {
    console.log('onTickerItemClick Fired: element');
    console.log(element);
    console.log('getting leafletID from inside template tag');
    let leafletID = element.getElementsByTagName('template')[0].innerHTML;
    console.log(leafletID);
    
    //refocusing on marker to show the popup
    let l = markers.getLayer(leafletID);
    console.log(l);
//    myMap.setView(l.getLatLng());
//    myMap.panTo(l.getLatLng());
    
//    myMap.once('zoomend', function() {l.openPopup()})
    //myMap.flyTo(l.getLatLng());
    
    markers.zoomToShowLayer(l, function() {
//        l.togglePopup();
        l.togglePopup();
        
/*        let p = l.getPopup();
        console.log(p.getContent());
        myMap.panTo(p.getLatLng());
        l.openPopup();*/
        
    }); //: Zooms to show the given marker (spiderfying if required), calls the callback when the marker is visible on the map.
    //myMap.setZoom(myMap.getMaxZoom());
    //probably should bind the full story content to the popup at this point
    //or change the popup content to whatever info you want to display when they click on a snippet
    return leafletID;
    };


//fills ticker with n number of random snippets
function fillTicker(n) {
    console.log('filling ticker with ' + n.toString() + ' snippets');
    for (i = 0; i < n; i++) {
        createTickerEntry();
    }
//    var ticker = new Ticker( "ticker" );
}

function refillTicker() {};
