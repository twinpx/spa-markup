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
      placemarks = [];

      if ( "ontouchstart" in document.documentElement ) {
        projectsDetailYmap.behaviors.disable('drag');
        projectsDetailYmap.events.add( 'click', function (e) {
          projectsDetailYmap.behaviors.enable('drag');
        });
      }

      projectsDetailYmap.behaviors.disable( 'scrollZoom' ); 
      
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
    }
    
  });

}( jQuery ));