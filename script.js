

// Load the map 
var map = L.mapbox.map('map', 'robertocarroll.ippf', {

    center: [25, -15],
    zoom: 2,
    minZoom: 2,
    maxZoom: 5,
    maxBounds: [[-85, -180.0],[85, 180.0]],

    gridLayer: {},
    // This line redefines part of the underlying code which
    // sanitizes HTML from MapBox Hosting. The original code is there
    // for the protection of sites, so that malicious map-creators
    // can't add cross-site scripting attacks to sites that use their
    // maps.
    // Turning it off allows any content to be available in tooltips.
    // It's recommended to only with trusted maps.
    gridControl: {
        sanitizer: function (x) { return x; }
    }
});

// Add a marker layer
var LeafIcon = L.Icon.extend({
                options: {
                    shadowUrl: 'images/shadow.png',
                    shadowRetinaUrl: 'images/shadow@2x.png',
                    iconSize:     [32, 43],
                    shadowSize:   [32, 43],
                    iconAnchor:   [22, 42],
                    shadowAnchor: [22, 42]
                }
            });
     
     var s;
     var customIcon;
     var introText = $("<div />").append($("#info").clone()).html();

// Add a marker layer
var mainMarkers = L.mapbox.markerLayer();

// Customise the marker layer
mainMarkers.on('layeradd', function(e) {
    var marker = e.layer,feature = marker.feature;
     
    // this is to get the correct marker icon depending on the type 
    s = feature.properties.type;
    customIcon = new LeafIcon({iconUrl: 'images/'+s+'-off.png',iconRetinaUrl: 'images/'+s+'@2x-off.png'});

    marker.setIcon(customIcon);

});
 
// set the lat/lon for marker layer
mainMarkers.setGeoJSON(geoJsonData);

// Create a cluster marker layer
var clusterMarkers = L.markerClusterGroup({spiderfyOnMaxZoom: false, showCoverageOnHover: false, zoomToBoundsOnClick: false, maxClusterRadius:70});

// Set the lat/lon for the cluster layer 
var geoJsonLayer = L.geoJson(geoJsonData);

// Add the lat/lon to the layer
clusterMarkers.addLayer(geoJsonLayer);

// Add the layer to the map for the initial view
map.addLayer(clusterMarkers);

// Control which layers show at which zoom level
map.on('zoomend', onZoomend);

function onZoomend()
{
  // As you zoom out, remove the marker layer and add the cluster layer 
  if(map.getZoom()<=2)
    {
      map.addLayer(clusterMarkers);
      map.removeLayer(mainMarkers);
      document.getElementById('info').innerHTML = introText;
    }

  // As you zoom in, remove the cluster layer and add the marker layer
  if(map.getZoom()>2)
    {
      map.addLayer(mainMarkers);
      map.removeLayer(clusterMarkers);
    }
}


// Listen for individual marker clicks
mainMarkers.on('click',function (e) {

  e.layer.unbindPopup();

  var details = e.layer.feature;
                
  var info = '<img class="header" src="images/' + details.properties.type +'.png" alt="Type of win: ' + details.properties.type +'">' +
              '<h1>' + details.properties.country + '</h1>' +
             '<p class="bold">' + details.properties.title + '</p>' +
             '<p>' + details.properties.description + '</p>';

 
 // Centre the map around the clicked marker 
   if($("html").hasClass("ie8")) {document.getElementById('info').innerHTML = info;}

    else {$('#info').hide().html(info).fadeIn('slow');}

  // Centre the map around the clicked marker  
    map.panTo(e.layer.getLatLng());

});


// Clear the tooltip when map is clicked
map.on('click',function(e){
   document.getElementById('info').innerHTML = introText;
});




