var mapOptions = {
    zoomControl: false,
    zoomDelta: 1,
    center: [-61.22, 10.69],
    zoom: 2,
    maxBounds: [[80, -180],
               [-75, 180]],    
    //maxBounds: [[85, -Infinity], [-85, Infinity]],//markers do not map to the horizontal space
    minZoom: 2,
    maxZoom: 8,
    markerZoomAnimation: true,
    maxBoundsViscosity: 0.1,
    };

var geocoderControlOptions = {
    position: 'topleft', // In addition to standard 4 corner Leaflet control layout, this will position and size from top center.
    geonamesSearch: 'https://secure.geonames.org/searchJSON', // Override this if using a proxy to get connection to geonames.
    geonamesPostalCodesSearch: 'https://secure.geonames.org/postalCodeSearchJSON', // Override this if using a proxy to get connection to geonames.
    username: 'brandonserrao', // Geonames account username.  Must be provided.
    maxresults: 5, // Maximum number of results to display per search.
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


var homePanelContent = {
    id: 'home',
    tab: '<i class="fa fa-home"></i>',
    title:'Home Panel',
    pane:'<h2>Content Header</h2><p>Put your content into here</p><br><button onclick="openPrefilledForm(formLink);">Open Form</button>',
    position: 'top',
};

var githubButton = {
    id: 'ghlink',
    tab: '<i class="fa fa-github"></i>',
    button:'https://github.com/brandonserrao/legendary-barnacle',
    position: 'bottom',
};

var storyTickerContent = {
    id: 'ticker',
    tab: '<i class="fa fa-comments"></i>',
    //title:'Stories',
    pane:'<h2>Content Header</h2><p>TODO: CREATE UPDATING+SCROLLING TICKER OF STORY SNIPPETS, LINKED TO LOCATION-GOTO LOCATION ONCLICK</p>',
};

var formTabContent = {
    id: 'ticker',
    tab: '<i class="fa fa-map-marked"></i>',
    //title:'Stories',
    pane:'<h2>Content Header</h2><p>TODO: CREATE UPDATING+SCROLLING TICKER OF STORY SNIPPETS, LINKED TO LOCATION-GOTO LOCATION ONCLICK</p>',
};

