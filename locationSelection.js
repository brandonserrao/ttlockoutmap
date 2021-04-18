//GOOGLE FORM PREFILLING AND LOCATION SELECTOR CODE

function rebuildFormLink() { //TODO: Trigger this when a selector marker is repositioned
  let link = googleFormBaseURL
  +'&entry.'+formEntryCodes.city+'='+selectorValues.city
  +'&entry.'+formEntryCodes.coords+'='+selectorValues.coords;
  return link;
}

function openPrefilledForm(link) {
  document.getElementById('registrationSteps').innerHTML = '';
  geocoderControl.removeMarker(); //geocoder raises errors/marker misses chance to remove if not done
  mycontrol._container.hidden=true;
  //myMap.fire('click');
  window.open(formLink,"_blank");
  //need to reset the custom control
}

//for adding the custom control for the geosearch to map
L.control.myControl = function(options) {
return new L.Control.MyControl(options);
}

L.Control.MyControl = L.Control.extend({
onAdd: function(map) {
    var div = L.DomUtil.create('div');
    div.id = 'myControl';
    div.class = 'myControl-container';
    div.innerHTML='<p>Placeholder content for myControl.</p>';
    return div;
},

onRemove: function(map) {}
    //don't do anything; onRemove required to be valid apparently
});


function openGeoSearch() {
    mycontrol = L.control.myControl(myControlOptions).addTo(myMap);
    document.getElementById('myControl').innerHTML = '<ol><li id="step1" class="steps">Use the searchbar to find your nearest city,</li><li id="step2" class="steps">...</li></ol>';
    sidebar.close();
    geocoderControl.addTo(myMap)
        .focus()
//    element.outerHTML += '<button type="button" id="formButton" disabled="true">Open Submission Form</button>';
    alert("Use the searchbar to find your nearest city, then follow the button to the submission form.")
}


function clearRegistrationSteps () {
  console.log('clearing registration steps')
  document.getElementById('registrationSteps').innerHTML = '';
  selectorValues.coords = 'placeholder';
  selectorValues.city = 'placeholder';
}


//init empty variable
let formLink = '';
let mycontrol; //to hold custom leaflet control with registration instructions

const selectorValues = { //init container for for location selector values
        city : 'placeholder',
        coords : 'placeholder',
    }

//call function to make a valid link with placeholder info
rebuildFormLink();

//GEOCODER CODE
const geocoderControl = L.control.geonames(geocoderControlOptions)//.addTo(myMap)
;
geocoderControl.on('select', function(e) {
    console.log(e.geoname);
    selectorValues.coords = e.geoname.lat + "," + e.geoname.lng;
    selectorValues.city = e.geoname.toponymName;
    formLink = rebuildFormLink();

    //old process; replacing with a custom leaflet control
/*                document.getElementById('step2').innerHTML = 'If the location is correct:<br>' + '<button id="openFormButton" type="button" onclick="openPrefilledForm(formLink)">Go to Form</button>'
    sidebar.open('home');
    document.getElementById('openFormButton').scrollIntoView();*/
    if (mycontrol) { mycontrol._container.hidden = false;}

    document.getElementById('step2').innerHTML = 'If the location is correct:<br>'
    + '<button id="openFormButton" type="button" onclick="openPrefilledForm(formLink)">Go to Form</button>';


}); //giving access to the location of the found



//END GEOCODER CODE


//EXPERIMENTAL//
//making selector marker
locationSelector = L.marker([0,0], {
                        draggable: true,
                        autoPan: true,
                    })
//            .addTo(myMap)
.bindPopup('<p>alles gut</p>')
.on('moveend', onMoveEnd)
.on('click', onClick)
.on('movestart', onMoveStart)
.on('mouseover', onMouseOver)
.on('mouseout', onMouseOut)

if (selectorOn) {
    locationSelector.addTo(myMap);
}
//check the docs for details on the triggers
function onMoveStart(e) {
    console.log('movestart');
    this.setPopupContent('*<b>SCREAMS</b>*');
    this.openPopup()
    selectorValues.coords='moving';
}
function onMoveEnd(e) {
    console.log('onmoveend');
    let latlng = this.getLatLng();
    console.log(latlng);
    selectorValues.coords=latlng.lat.toString()+','+latlng.lng.toString();
    rebuildFormLink();
    console.log('formLink: ' + formLink);
    this.closePopup();
}

function onClick(e) {
    console.log('onclick');
    console.log(e);
}

function onMouseOver(e) {
    console.log('mouseover');
    this.setOpacity(0.3);
}
function onMouseOut(e) {
    console.log('mouseout');
    this.setOpacity(1);
}

function onDblClick(e) {
    console.log(this.remove());
    console.log('ondblclick removed');
}

function onRemove(e) {
    console.log('location selector removed');
}
function onAdd(e) {
    console.log('location selector added');
}
function onPopupOpen(e) {
    console.log('popup opened');
}
function onPopupClose(e) {
    console.log('popup closed');
}
function onContextMenu(e) {
    console.log('rightclicked aka contextmenu')
}





//END GOOGLE FORM AND SELECTOR CODE
