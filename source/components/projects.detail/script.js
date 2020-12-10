( function($) {

  'use strict';
  
  $( function() {

    //chess hint
    $( document ).delegate( '.b-chess-table__flats a, .b-chess-table__flats span', 'mouseenter', function() {
      var $elem = $( this );
      var $block = $elem.closest( '.b-chess-block' );

      if ( $elem.offset().left + ( 48 - 20 + 250 ) > $block.offset().left + $block.outerWidth()) {
        $elem.find( '.b-chess-hint' ).addClass( 'left' );
      }
    });

    //switch
    document.querySelectorAll( '.b-switch-block' ).forEach( function( switchBlock, index ) {

      switchBlock.querySelectorAll( '.b-switch span' ).forEach( function( elem, index ) {
        if ( index === 0 ) {
          elem.addEventListener( 'click', function() {
            elem.parentNode.classList.remove( 'inverse' );
            switchBlock.querySelector( '.b-filter-chess__tabs' ).classList.remove( 'inverse' );
          });
        } else {
          elem.addEventListener( 'click', function() {
            elem.parentNode.classList.add( 'inverse' );
            switchBlock.querySelector( '.b-filter-chess__tabs' ).classList.add( 'inverse' );
            
            //load chess
            if ( !switchBlock.querySelector( '.b-filter-chess__tabs .b-chess' )) {
              var tab = switchBlock.querySelector( '.b-filter-chess__tab[ data-url ]' );
              $.ajax({
                url: tab.getAttribute( 'data-url' ),
                type: tab.getAttribute( 'data-method' ),//GET
                dataType: "html",
                success: function( html ) {
                  if ( html ) {
                    tab.innerHTML = html;

                    //chess menu
                    tab.querySelectorAll( '.b-chess-menu div' ).forEach( function( elem ) {
                      elem.addEventListener( 'click', function(e) {
                        tab.querySelectorAll( '.b-chess-menu div' ).forEach( function( item ) {
                          item.classList.remove( 'active' );
                        });
                        tab.querySelectorAll( '.b-chess-table' ).forEach( function( item ) {
                          item.classList.remove( 'active' );
                        });
                        elem.classList.add( 'active' );
                        elem.closest( '.b-chess' ).querySelector( '.b-chess-table[data-tab="' + elem.getAttribute( 'data-tab' ) + '"]' ).classList.add( 'active' );
                      });
                    });
                  }
                },
                error: function( a, b, c ) {
                  if( window.console ) {
                    console.log(a);
                    console.log(b);
                    console.log(c);
                  }
                }
              });
            }
            
          });
        }
      });

    });
    
    //progress
    var progressSlidesPerView = 3, progressSpaceBetween = 30;
    if ( window.matchMedia( "(max-width: 400px)" ).matches ) {
      progressSlidesPerView = 1;
      progressSpaceBetween = 10;
    } else if ( window.matchMedia( "(max-width: 700px)" ).matches ) {
      progressSlidesPerView = 2;
      progressSpaceBetween = 10;
    }
    var swiper = new Swiper('.b-projects-detail__progress .swiper-container', {
      slidesPerView: progressSlidesPerView,
      spaceBetween: progressSpaceBetween,
      navigation: {
        nextEl: '.swiper-arrow-right',
        prevEl: '.swiper-arrow-left',
      },
      preloadImages: false,
      lazy: {
        loadPrevNext: true
      },
      watchSlidesVisibility: true,
      on: {
        init: function () {
          $( '.b-shops' ).addClass( 'i-swiper-init' );
        },
      }
    });

    //anchor menu
    document.querySelectorAll( '.b-projects-detail__anchor-menu a' ).forEach( function( elem ) {
      if ( !document.getElementById( elem.getAttribute( 'href' ).substring(1))) {
        elem.parentNode.removeChild( elem );
      }
    });

    document.querySelector( '.b-projects-detail__anchor-menu' ).classList.add( 'show' );

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