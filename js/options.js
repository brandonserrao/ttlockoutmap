var mapOptions = {
    inertia: true,
    zoomControl: false,
    zoomDelta: 1,
    center: [11,-61],
    zoom: 3,
    maxBounds: [[80, -180],
               [-80, 180]],  
    noWrap: true,
    //maxBounds: [[85, -Infinity], [-85, Infinity]],//markers do not map to the horizontal space
    minZoom: 2,
    maxZoom: 8,
    markerZoomAnimation: true,
    maxBoundsViscosity: 0.1,
    };

var panOptions = {
    animate: true,
    duration: 0.5,
    easeLinearity: 0.25,
};

var geocoderControlOptions = {
    position: 'topleft', // In addition to standard 4 corner Leaflet control layout, this will position and size from top center.
    geonamesSearch: 'https://secure.geonames.org/searchJSON', // Override this if using a proxy to get connection to geonames.
    geonamesPostalCodesSearch: 'https://secure.geonames.org/postalCodeSearchJSON', // Override this if using a proxy to get connection to geonames.
    username: 'brandonserrao', // Geonames account username.  Must be provided.
    maxresults: 10, // Maximum number of results to display per search.
    zoomLevel: null, // Max zoom level to zoom to for location. If null, will use the map's max zoom level.
    className: 'leaflet-geonames-icon', // Class for icon.
    workingClass: 'leaflet-geonames-icon-working', // Class for search underway.
    featureClasses: ['A', 'P'], // Feature classes to search against.  See: http://www.geonames.org/export/codes.html.
    baseQuery: 'isNameRequired=true', // The core query sent to GeoNames, later combined with other parameters above.
    showMarker: true, // Show a marker at the location the selected location.
    showPopup: true, // Show a tooltip at the selected location.
    adminCodes: {}, // Filter results by the specified admin codes mentioned in `ADMIN_CODES`. Each code can be a string or a function returning a string. `country` can be a comma-separated list of countries.
    bbox: {}, // An object in form of {east:..., west:..., north:..., south:...}, specifying the bounding box to limit the results to.
    lang: 'en', // Locale of results.
    alwaysOpen: false, // If true, search field is always visible.
    enablePostalCodes: false, // If true, use postalCodesRegex to test user provided string for a postal code.  If matches, then search against postal codes API instead.
    postalCodesRegex: POSTALCODE_REGEX_US, // Regex used for testing user provided string for a postal code.  If this test fails, the default geonames API is used instead.
    title: 'Search by location name or postcode', // Search input title value.
    placeholder: 'Enter nearby city name' // Search input placeholder text.
};

var tickerControlOptions = {
    position: 'bottomleft'
}

var pulseIconOptions = {
            iconSize:[20,20], 
            color:'blue', 
            fillColor:'blue',
            animate: true,
            heartbeat: 2 //pulse frequency in seconds
        };

var pulseIconOptions2 = {
            iconSize:[8,8],
            color:'red'
        };

var clusterMarkerOptions = {
            showCoverageOnHover: false, //default true
            zoomToBoundsOnClick: true, //true is default
            //iconCreateFunction: function(cluster) {return L.divIcon({ html: '<b>' + cluster.getChildCount() + '</b>' });},//
            iconCreateFunction: function(cluster) {return L.icon.pulse(pulseIconOptions);},//passes a cluster object (like above) and can base icon creation on it's characteristics
        };


var sidebarOptions = {
    autopan: true,       // whether to maintain the centered map point when opening the sidebar
    closeButton: true,    // whether t add a close button to the panes
//    container: 'tickerdiv', // the DOM container or #ID of a predefined sidebar container that should be used
    container: 'sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
    position: 'left',     // left or right
}
    
var homePanelContent = {
    id: 'home',
    tab: '<i class="fa fa-home"></i>',
    title:'T&T Lockout Map',
//    pane:'<h2>Content Header</h2><p>Button leads to submission form.</p><br><button onclick="openPrefilledForm(formLink);">Open Form</button>',
    pane:'<div id="mapinfo_container" class="sidebarsection"><h3 class="sidebarh3">A map of stranded nationals, their situation, and experiences.</h3></div><h3 class="sidebarh3">Ticker - Story Snippets</h3><div id="ticker"><div id="ticker-wrapper"><ul id="ticker-wrapper-inner"></ul></div></div><h3 class="sidebarh3">About</h3><div id="about_container"><a id="registerLink" onclick="openGeoSearch(this);">Register</a></div><div><h4 class="sidebarh4">Author&#39s Note:</h4>"This map is my personal project in service to the fellow nationals who are outside of the country - it is no way affiliated with or supported by any University/Government/Organization or such body.<br>I ask for your understanding and that you not abuse this link or the systems associated with it."<br><i>~Brandon Serrao.</i></div><p><a href="mailto:ttlockoutmap@gmail.com">ttlockoutmap@gmail.com</a></div>',    position: 'top',
};
/*
var homePanelContent = {
    id: 'home',
    tab: '<i class="fa fa-home"></i>',
    title:'T&T Lockout Map',
//    pane:'<h2>Content Header</h2><p>Button leads to submission form.</p><br><button onclick="openPrefilledForm(formLink);">Open Form</button>',
    pane:'<div id="mapinfo_container" class="sidebarsection"><h2 class="sidebarh2">A map of stranded nationals, their situation, and experiences.</h2></div><h3 class="sidebarh3">Ticker - Story Snippets</h3><div id="ticker"><div id="ticker-wrapper"><ul id="ticker-wrapper-inner"></ul></div></div><h3 class="sidebarh3">About</h3><div id="about_container"><p>Register linktext leads to submission form.</p><br><button onclick="openPrefilledForm(formLink);">Open Form</button><a id="registerLink" onclick="openGeoSearch(this);">Register</a></div><div><button onclick="createTickerEntry()">createTickerEntry()</button><button onclick="fillTicker(snippetCount)">fillTicker(snippetCount)</button></div>',
    position: 'top',
};*/

function openGeoSearch(element) {
    element.outerHTML = '<p id="registerLink">Find your nearest location using the search bar.</p>';
//    element.onclick = 'onGeocoderSelect(this);';
    geocoderControl.addTo(myMap)
        .show()
        //.focus()
    ;
}


var githubButton = {
    id: 'ghlink',
    tab: '<i class="fa fa-github"></i>',
    button:'https://github.com/brandonserrao/legendary-barnacle',
    position: 'bottom',
};
/*

var storyTickerContent = {
    id: 'ticker',
    tab: '<i class="fa fa-comments"></i>',
    //title:'Stories',
//    pane:'<h2>Content Header</h2><p>TODO: CREATE UPDATING+SCROLLING TICKER OF STORY SNIPPETS, LINKED TO LOCATION-GOTO LOCATION ONCLICK</p>',
    //'<div id="ticker"><div id="ticker-wrapper"><ul id="ticker-wrapper-inner"><li>placeholder ticker html string</li></ul></div></div>'
//    pane:'<h2>Content Header</h2><p>TODO: CREATE UPDATING+SCROLLING TICKER OF STORY SNIPPETS, LINKED TO LOCATION-GOTO LOCATION ONCLICK</p>',
    pane: '<div><h1>Snippet Ticker Tab</h1><p>Button adds an entry to the list below.<br>Clicking on the text should move you to the location and open up a popup with the full text.</p><h3>TODO:</h3><ul><li>fix zooming in and breaking apart clusters to successfully open popups.</li><li>Get CSS Autoscrolling animation working for the ticker.</li><li>Add childCount to larger cluster icons (maybe)?</li><li>Fill Home tab with info/splash text, and update with official/useful links</li><button onclick="createTickerEntry()">createTickerEntry()</button><button onclick="fillTicker(snippetCount)">fillTicker(snippetCount)</button></div><div id="ticker"><div id="ticker-wrapper"><ul id="ticker-wrapper-inner"></ul></div></div>'

};

var testContent = {
    id: 'test',
    tab: '<i class="fa fa-circle"></i>',
    title:'TickerTesting',
    pane: document.getElementById('ticker_template').innerHTML,
};

var formTabContent = {
    id: 'form',
    tab: '<i class="fa fa-bars"></i>',
    //title:'Stories',
    pane:'<h2>TODO:</h2><h3>CREATE UPDATING+SCROLLING TICKER OF STORY SNIPPETS, LINKED TO LOCATION-GOTO LOCATION ONCLICK</h3>'
};

*/
