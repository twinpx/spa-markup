( function($) {

  'use strict';
  
  $( function() {
    
    new Swiper( '.b-gallery .swiper-container', {
      loop: true,
      autoplay: {
        delay: 2500,
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

}( jQuery ));