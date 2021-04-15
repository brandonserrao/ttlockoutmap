//SIDEBAR SETUP CODE//
var sidebar = L.control.sidebar(sidebarOptions).addTo(myMap);
sidebar.addPanel(homePanelContent)
//            .open('home'); //open frontpage panel after adding
sidebar.addPanel(githubButton);
//            sidebar.open('ticker'); //open ticker for debugging

myMap.on('click', function() {
/*                //taken from the sidebar code
    if (!L.DomUtil.hasClass(sidebar._container, 'collapsed')) {sidebar.close};
    else {};*/
    sidebar.close();

   var button = document.getElementById('openFormButton')
   if (button)
   {button.setAttribute('disabled','false')}
   else
   {console.log('no openFormButton exists yet')};//update selection coords to be sent with form
});


//END SIDEBAR SETUP CODE//


//taken from end of original js code execution//
document.addEventListener( "DOMContentLoaded", function() {
  sidebar.open('home');
//		var news = new Ticker( "ticker" );

	});
