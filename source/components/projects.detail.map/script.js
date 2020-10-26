( function($) {

  'use strict';
  
  $( function() {
    
    //yandex map
    if ( document.querySelector( '#projectsDetailYmap' )) {
      ymaps.ready(function () {
        showProjectsMap();
      });
    }
    
    function showProjectsMap() {
      var projectsDetailYmap = new ymaps.Map( 'projectsDetailYmap', {
        center: window.projectsDetailYmapCenter,
        zoom: window.projectsDetailYmapZoom,
        controls: [ 'zoomControl', 'typeSelector' ]
      }, {
        yandexMapDisablePoiInteractivity: true
      }),
      placemarks = [],
      regionName = "Звенигород";

      projectsDetailYmap.behaviors.disable( 'scrollZoom' ); 
      projectsDetailYmap.events.add( 'click', function (e) {
        projectsDetailYmap.balloon.close();
      });
      
      if ( window.projectsDetailPlacemarks ) {
        
        for ( var i = 0; i < window.projectsDetailPlacemarks.length; i++ ) {
          
          placemarks[i] = new ymaps.Placemark(
            window.projectsDetailPlacemarks[i].coords,
            {},
            {
              iconLayout: 'default#image',
              iconImageHref: window.projectsDetailPlacemarks[i].src,
              iconImageSize: [64, 64],
              iconImageOffset: [-32, -32]
            }
          );
          
        }
      }

      placemarks.push( new ymaps.Placemark(
        window.projectsDetailYmapCenter,
        {},
        {
          iconLayout: 'default#image',
          iconImageHref: window.projectsDetailYmapIcon,
          iconImageSize: [82, 82],
          iconImageOffset: [-41, -41]
        }
      ));
        
      //projectsDetailYmap.geoObjects.add( clusterers[ projectsType ] );
      for ( var q = 0; q < placemarks.length; q++ ) {
        projectsDetailYmap.geoObjects.add( placemarks[q] );
      }

      // Запрашиваем через геокодер район (у Яндекса этой возможности пока нет, придется пользоваться OSM)
      var url = "http://nominatim.openstreetmap.org/search";

      $.getJSON( url, { q: regionName, format: "json", polygon_geojson: 1 })
        .then( function (data) {
          $.each( data, function( ix, place ) {
            if ( "relation" === place.osm_type ) {
              // Создаем полигон с нужными координатами
              var p = new ymaps.Polygon( place.geojson.coordinates, {}, {
                fillColor: '#ffffff00',
                strokeColor: "#610618",
                strokeWidth: 5,
                strokeStyle: 'dot'
              });
              // Добавляем полигон на карту
              projectsDetailYmap.geoObjects.add(p);
            }
          });
        }, function( err ) {
          console.log( err );
        });
    }
    
  });

}( jQuery ));