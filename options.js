 var pulseIconOptions = {
            iconSize:[20,20], 
            color:'blue', 
            fillColor:'blue',
            animate: true,
            heartbeat: 3 //pulse frequency in seconds
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