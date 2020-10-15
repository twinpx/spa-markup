( function($) {

  'use strict';
  
  $( function() {
    
    //gallery
    initSwiper( '.swiper-container[ data-tab="plan" ]' );
    
    //print
    document.querySelector( '.b-flat-detail__print' ).addEventListener( 'click', function(e) {
      e.preventDefault();
      window.print();
    });
    
    //switch
    document.querySelectorAll( '.b-flat-detail__galleries-switch a' ).forEach( function( elem, index ) {
      elem.addEventListener( 'click', function(e) {
        e.preventDefault();
        
        document.querySelectorAll( '.b-flat-detail__galleries-switch a' )[ Number( !index )].classList.remove( 'active' );
        
        elem.classList.add( 'active' );
        
        document.querySelectorAll( '.b-flat-detail__body .swiper-container' ).forEach( function( container ) {
          container.style.display = 'none';
        });
        
        var hiddenElem = document.querySelector( '.b-flat-detail__body .swiper-container[ data-tab=' + elem.getAttribute( 'data-tab' ) + ']' );
        
        hiddenElem.style.display = 'block';
        
        if ( hiddenElem.className.search( 'swiper-container-initialized' ) === -1 ) {
          initSwiper( hiddenElem );
        }
      });
    });
    
    function initSwiper( elem ) {
      return new Swiper( elem, {
        loop: true,
        pagination: {
          el: '.swiper-pagination',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        lazy: {
          loadPrevNext: true,
        },
      });
    }
    
  });

}( jQuery ));