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

var storyPopupOptions = {
    maxHeight: 450,
//    keepInView: true
}

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
    alwaysOpen: true, // If true, search field is always visible.
    enablePostalCodes: false, // If true, use postalCodesRegex to test user provided string for a postal code.  If matches, then search against postal codes API instead.
    postalCodesRegex: POSTALCODE_REGEX_US, // Regex used for testing user provided string for a postal code.  If this test fails, the default geonames API is used instead.
    title: 'Search by location name or postcode', // Search input title value.
    placeholder: 'Enter nearby city name' // Search input placeholder text.
};

var tickerControlOptions = {
    position: 'bottomright'
}

var myControlOptions = {
//     position: 'bottomright'
    position: 'topleft' //to make it more apparent by putting it next to the searchbar
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
//    autopan: true,       // whether to maintain the centered map point when opening the sidebar
    closeButton: true,    // whether t add a close button to the panes
//    container: 'tickerdiv', // the DOM container or #ID of a predefined sidebar container that should be used
    container: 'sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
    position: 'left',     // left or right
}
    
var homePanelContent = {
    id: 'home',
    tab: '<i class="fa fa-bars"></i>',
//    tab: '<i class="fa fa-home"></i>',
    title:'T&T Lockout Map',
//    pane:'<h2>Content Header</h2><p>Button leads to submission form.</p><br><button onclick="openPrefilledForm(formLink);">Open Form</button>',
    pane:'<div id="mapinfo_container" class="sidebarsection"><h3 class="sidebarh3">A map of stranded nationals, their situations, and experiences.</h3></div>' 
    
    + '<div><div id="about_container"><p>This map is intended as a public communication tool, to allow the stories of those locked out to reach the public at home.<br>Are you a stranded national? Were you?<br>Submit your info: ' + "<a style='cursor:pointer;' id='registerLink' onclick='openGeoSearch();'>To Register</a></p>" + "<br><ol id='registrationSteps'></ol></div></div>" 
    
    +'<div class="alert"><b>Find the official Exemption Application System here: </b><a href="https://services.mns.gov.tt/travelexemption" target="_blank">https://services.mns.gov.tt/travelexemption</a></div>'
    
    + '<div id="ticker"><div id="ticker-wrapper"><ul id="ticker-wrapper-inner"></ul></div></div>'
    
    + '<div id="disclaimer_container"><h4 id="authorsNote" class="sidebarh4">Author&#39s Note:</h4><i>"This map is my personal project in service to the fellow nationals who are outside of the country - it is no way affiliated with or supported by any University/Government/Organization or otherwise.<br>I ask for your understanding and that you not abuse this link or the systems associated with it."<br>~Brandon Serrao.</i><br><a href="mailto:ttlockoutmap@gmail.com">ttlockoutmap@gmail.com</a></div>',
    
    position: 'top',
};



function openGeoSearch() {
//    document.getElementById('registrationSteps').innerHTML = '<li id="step1" class="steps">Use the searchbar to find your nearest city,</li><li id="step2" class="steps">...</li>';
//    //element.onclick = 'onGeocoderSelect(this);';
//    sidebar.close();
//    geocoderControl.addTo(myMap)
//        .show()
//        .focus()
//    //element.outerHTML += '<button type="button" id="formButton" disabled="true">Open Submission Form</button>';
//    alert("Use the searchbar to find your nearest city, then follow the button to the submission form.")
    
    //adding code to use a leaflet control instead
    mycontrol = L.control.myControl(myControlOptions).addTo(myMap);
    document.getElementById('myControl').innerHTML = '<ol><li id="step1" class="steps">Use the searchbar to find your nearest city,</li><li id="step2" class="steps">...</li></ol>';
    sidebar.close();
    geocoderControl.addTo(myMap)
        .focus()
//    element.outerHTML += '<button type="button" id="formButton" disabled="true">Open Submission Form</button>';
    alert("Use the searchbar to find your nearest city, then follow the button to the submission form.")
}


var githubButton = {
    id: 'ghlink',
    tab: '<i class="fa fa-github"></i>',
    button:'https://github.com/brandonserrao/legendary-barnacle',
    position: 'bottom',
};

var formTabContent = {
    id: 'form',
    tab: '<i class="fa fa-bars"></i>',
    //title:'Stories',
    pane:'placeholder to be replaced'
};

