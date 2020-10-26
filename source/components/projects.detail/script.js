( function($) {

  'use strict';
  
  $( function() {

    //anchor menu
    $( '.b-projects-detail__anchor-menu a' ).click( function(e) {
      e.preventDefault();
      $( document ).scrollTo( $( $( this ).attr( 'href' )).offset().top - 100, 500);
    });

    //advantages
    document.querySelectorAll( '.b-advantages__menu a' ).forEach( function( elem ) {
      elem.addEventListener( 'click', function(e) {
        e.preventDefault();

        //elem class active
        document.querySelectorAll( '.b-advantages__menu a' ).forEach( function( linkElem ) {
          linkElem.classList.remove( 'active' );
        });

        elem.classList.add( 'active' );

        //tab class active
        var tab = elem.getAttribute( 'data-tab' );
        document.querySelectorAll( '.b-advantages__tab' ).forEach( function( tabElem ) {
          tabElem.classList.remove( 'active' );
        });
        
        document.querySelector( '.b-advantages__tab[data-tab="' + tab + '"]' ).classList.add( 'active' );

        //lazyload images
        $( '.b-advantages__tab[data-tab="' + tab + '"] img' ).lazyload();
      });
    });

    //advantages swiper menu
    if ( window.matchMedia( "(max-width: 767px)" ).matches ) {

      var slidesPerView = 1.8;
  
      if ( window.matchMedia( "(min-width: 700px)" ).matches ) {
        slidesPerView = 4;
      } else if ( window.matchMedia( "(min-width: 500px)" ).matches ) {
        slidesPerView = 2.5;
      } else if ( window.matchMedia( "(min-width: 400px)" ).matches ) {
        slidesPerView = 2.2;
      } else if ( window.matchMedia( "(min-width: 360px)" ).matches ) {
        slidesPerView = 2;
      }

      //init swiper
      new Swiper( '.b-advantages__menu .swiper-container', {
        slidesPerView: slidesPerView,
        spaceBetween: 30,
        freeMode: true
      });
    }
    
    //lazyload
    $( '.b-flat-card__img, .b-advantages img' ).lazyload();
    
    //click
    $( '.b-projects-detal' ).delegate( '.b-flat-card', 'click', function() {
      window.location = this.getAttribute( 'data-href' );
    });
    
    $( '.b-projects-detal' ).delegate( '.b-flat-card__project a', 'click', function(e) {
      e.stopPropagation();
    });
    
  });

}( jQuery ));