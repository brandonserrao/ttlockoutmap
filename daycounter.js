const currentDate = new Date();
// const borderClosureDate = new Date(2020, 2, 22, 23, 59, 59, 0);

const borderClosureDate = new Date("2020-03-22T19:59:59Z");

const dayLength = 24*60*60*1000;

const daysPassed = Math.round(Math.abs((borderClosureDate - currentDate) / dayLength));
console.log(currentDate, borderClosureDate, daysPassed);

// mycontrol = L.control.myControl(myControlOptions).addTo(myMap);
L.Control.DayCounter = L.Control.extend( {
  onAdd: function(map) {
    let div = L.DomUtil.create('div');

    div.id = 'dayCounterControl';
    div.innerHTML = '<div id="dayCounter-container">'
    + '<div id="dayCounter-title" class="subtitle dayCounter-content">Borders closed</div>'
    + '<span id="dayCounter-count" class="main dayCounter-content">999</span>'
    + '<span id="dayCounter-units" class="subtitle dayCounter-content"> days</span>'
    + '</div>';

    return div;
  },

  onRemove: function(map) {
    //do nothing
  }
});

L.control.dayCounter = function(dayCounterOpts) {
  return new L.Control.DayCounter(dayCounterOpts);
}

L.control.dayCounter(dayCounterOptions).addTo(myMap);
document.getElementById('dayCounter-count').innerHTML = daysPassed;
