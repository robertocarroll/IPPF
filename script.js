var geoJsonData = [{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "country": "Côte d'Ivoire ",
        "title": "Abortion in the national agenda",
        "description": "Abortion issues added to the national Strategic Plan on Family Planning from 2012-2016 for the first time. SAMPLE VIDEO<div class='embed-container'><iframe src='http://www.youtube.com/embed/UkYWLahNpDM' frameborder='0' allowfullscreen></iframe></div>",
        "type": "abortion"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -5.54708,
          7.539989
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "country": "Liberia ",
        "title": "Providing nationwide  adolescent reproductive health services",
        "description": "The Member Association successfully advocated for a national strategy on adolescent sexual and reproductive health service provision, which was then developed and validated.",
        "type": "education"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -9.429499,
          6.428055
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "country": "Seychelles ",
        "title": "Reviewing the national impact of service access",
        "description": "A monitoring and evaluation framework was developed for the new national strategic plan for access to sexual and reproductive health services.",
        "type": "srh"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          55.491977,
          -4.679574
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "country": "Uganda ",
        "title": "Removing taxes on contraceptives",
        "description": "The Member Association successfully advocated to the Ministry of Finance, the Ministry of Health, key MPs  and the Uganda Revenue Authority to remove the 18 % Value Added Tax and 6 % withholding tax being levied on reproductive health commodities, such as Contraceptives and Mama Kits.",
        "type": "srh"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          32.290275,
          1.373333
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "country": "Uganda ",
        "title": "Comprehensive Sexuality Education is part of the national curriculum",
        "description": "The Member Association successfully advocated for the government to introduce Comprehensive Sexuality Education in the national curriculum. Previously the sexuality education was limited to abstinence and general sexual and reproductive health. The Member Association gave input into the content of the curriculum and reviewed it before it was finalised.",
        "type": "education"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          32.581111,
          0.313611
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "country": "Uganda ",
        "title": "National Youth Employment Policy integrates sexual and reproductive health education with business training.",
        "description": "The Member Association successfully advocated for the inclusion of sexual and reproductive health rights into the National Business and Entrepreneurial Manual.  All recipients of the National Youth Fund are required under the National Youth Employment Policy to undergo Business and Entrepreneurship training. The Member Association provided the sexual and reproductive health content for the manual and conducted the final review.",
        "type": "srh"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          32.581111,
          1.313611
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "country": "Congo, Dem. Republic ",
        "title": "Sexual and reproductive health a national issue",
        "description": "The Member Association and UNFPA successfully advocated to the Ministry of Health for sexual and reproductive health to be allocated in the national budget.",
        "type": "srh"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          15.313889,
          -4.331667
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "country": "Albania",
        "title": "Comprehensive sexuality education policy adopted by the Ministry of Health.",
        "description": "The Member Association contributed to a policy adopted by the Ministry of Health. The paper states the principles of comprehensive sexuality education as being based on human rights, being evidence based, culturally sensitive, and participatory. It identifies the multi-sectorial efforts and dimensions of prevention education and furthermore identifies the role of different institutions in terms of planning, implementing and evaluation initiatives.",
        "type": "education"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          20.168331,
          41.153332
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "country": "Albania",
        "title": "Ensuring quality services through Ministry of Health approved HIV and STI guidelines for youth",
        "description": "The Member Association was supported by UNICEF to successfully advocate to the Ministry of Health for the approval of Guidelines it drafted on STI/HIV services for Youth. The MA then focused on access and quality of services by training service providers and other key actors in the industry. The MA then supervised and monitored the efforts in the follow up phase to ensure proper practice and quality of services.",
        "type": "hiv"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          19.8318,
          41.33165
        ]
      }
    }
  ]
}
];



var map = L.mapbox.map('map', 'robertocarroll.ippf');

var mainMarkers = L.mapbox.markerLayer();

mainMarkers.on('layeradd', function(e) {
    var marker = e.layer,feature = marker.feature;
     
    marker.setIcon(L.mapbox.marker.icon({
    'marker-color': '#000'
    }));

});
 
 mainMarkers.setGeoJSON(geoJsonData);




  var clusterMarkers = L.markerClusterGroup({spiderfyOnMaxZoom: false, showCoverageOnHover: false, zoomToBoundsOnClick: false, maxClusterRadius:70});

    var geoJsonLayer = L.geoJson(geoJsonData);
    clusterMarkers.addLayer(geoJsonLayer);



 map.on('zoomend', onZoomend);

 function onZoomend(){
   if(map.getZoom()>2)

  {
    map.addLayer(mainMarkers);
    map.removeLayer(clusterMarkers);

  }
 
    if(map.getZoom()<=2)
    {
      
      map.addLayer(clusterMarkers);
      map.removeLayer(mainMarkers);
    
    }

}










