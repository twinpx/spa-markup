( function($) {

  'use strict';
  
  $( function() {
    
    //lazyload
    $( '.b-flat-card__img' ).lazyload();
    
    //click
    $( '.b-projects-detal' ).delegate( '.b-flat-card', 'click', function() {
      window.location = this.querySelector( '.b-flat-card__img' ).getAttribute( 'href' );
    });
    
    $( '.b-projects-detal' ).delegate( '.b-flat-card__project a', 'click', function(e) {
      e.stopPropagation();
    });
    
  });

}( jQuery ));