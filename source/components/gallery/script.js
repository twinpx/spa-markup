( function($) {

  'use strict';
  
  $( function() {
    
    document.querySelectorAll( '.b-gallery .swiper-container' ).forEach( function(elem) {
      new Swiper( '.b-gallery .swiper-container', {
        loop: true,
        autoplay: {
          delay: 1*elem.getAttribute( 'data-delay' ) || 3500,
          disableOnInteraction: false,
        },
        effect: 'fade',
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        lazy: {
          loadPrevNext: true,
        },
      });
    });
    
    
  });

}( jQuery ));