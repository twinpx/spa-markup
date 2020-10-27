( function($) {

  'use strict';
  
  $( function() {
    
    //lazyload
    $( '.b-projects__img' ).lazyload();
    
    //scroll
    window.addEventListener( 'scroll', function(e) {
      
      if ( window.matchMedia( '(min-width: 576px)' ).matches ) {
        document.querySelectorAll( '.b-projects__row' ).forEach( function( elem, index ) {
          if ( elem.className.search( 'b-projects__row--shown' ) !== -1 ) {
            return;
          }
          
          if ( $( elem ).offset().top <= window.scrollY + window.outerHeight - 150 ) {
            elem.classList.add( 'b-projects__row--shown' );
          }
        });
      } else {
        document.querySelectorAll( '.b-projects__item' ).forEach( function( elem, index ) {
          if ( elem.className.search( 'b-projects__item--shown' ) !== -1 ) {
            return;
          }
          
          if ( $( elem ).offset().top <= window.scrollY + window.outerHeight - 50 ) {
            elem.classList.add( 'b-projects__item--shown' );
          }
        });
      }
      
    });
    
    setTimeout( function() {
      window.dispatchEvent( new Event( 'scroll' ) );
    }, 500);
    
    //switch
    document.querySelectorAll( '.b-switch span' ).forEach( function( elem, index ) {
      if ( index === 0 ) {
        elem.addEventListener( 'click', function() {
          elem.parentNode.classList.remove( 'inverse' );
          document.querySelector( '.b-projects__tabs' ).classList.remove( 'inverse' );
        });
      } else {
        elem.addEventListener( 'click', function() {
          elem.parentNode.classList.add( 'inverse' );
          document.querySelector( '.b-projects__tabs' ).classList.add( 'inverse' );
          
          //yandex map
          if ( !document.querySelector( '#projectsYmap ymaps' )) {
            ymaps.ready(function () {
              showProjectsMap();
            });
          }
        });
      }
    });
    
    //ymap
    function showProjectsMap() {
      var projectsYmap = new ymaps.Map( 'projectsYmap', {
          center: window.projectsYmapCenter,
          zoom: window.projectsYmapZoom,
          controls: [ 'zoomControl', 'typeSelector' ]
      }, {
        yandexMapDisablePoiInteractivity: true
      }),
      projectsObj = {},
      placemarks = {},
      regionName = "Звенигород";

      var hintContentLayoutClass = ymaps.templateLayoutFactory.createClass(
        '<div class="b-project-hint">{{properties.name}}</div>' 
      );
      
      //touch devices
      if ( "ontouchstart" in document.documentElement ) {
        projectsYmap.behaviors.disable('drag');
        projectsYmap.events.add( 'click', function (e) {
          projectsYmap.behaviors.enable('drag');
        });
      }
      
      projectsYmap.behaviors.disable( 'scrollZoom' );
      
      if ( window.projectsPlacemarks ) {
        
        for ( var projectsType in window.projectsPlacemarks ) {
          
          //create placemarks array
          placemarks[ projectsType ] = [];
          
          for ( var i = 0; i < window.projectsPlacemarks[ projectsType ].length; i++ ) {
            
            projectsObj = window.projectsPlacemarks[ projectsType ][i];
            
            placemarks[ projectsType ][i] = new ymaps.Placemark(
              projectsObj.coords,
              {
                name: projectsObj.name
              },
              {
                iconLayout: 'default#image',
                iconImageHref: projectsObj.src,
                iconImageSize: [64, 64],
                iconImageOffset: [-32, -32],
                hintLayout: hintContentLayoutClass
              }
            );

            placemarks[ projectsType ][i].events.add([ 'click' ], clickPlacemark( projectsObj.url ));
            
          }
            
          //projectsYmap.geoObjects.add( clusterers[ projectsType ] );
          for ( var q = 0; q < placemarks[ projectsType ].length; q++ ) {
            projectsYmap.geoObjects.add( placemarks[ projectsType ][q] );
          }
          
        }
      }

      function clickPlacemark( url ) {
        return function() {
          window.location = url;
        };
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
              projectsYmap.geoObjects.add(p);
            }
          });
        }, function( err ) {
          //console.log( err );
        });
    }
    
  });

}( jQuery ));