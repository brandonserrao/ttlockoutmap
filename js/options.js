var mapOptions = {
    zoomDelta: 1,
    center: [-61.22, 10.69],
    zoom: 2,
    maxBounds: [[80, -180],
               [-75, 180]],    
    //maxBounds: [[85, -Infinity], [-85, Infinity]],//markers do not map to the horizontal space
    minZoom: 2,
    maxZoom: 12,
    markerZoomAnimation: true,
    maxBoundsViscosity: 0.1,
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

