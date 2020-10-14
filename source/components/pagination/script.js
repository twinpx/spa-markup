( function($) {

  'use strict';
  
  $( function() {
    
    $( '.b-load__item' ).addClass( 'i-show' );

    $( '.b-load' ).delegate( '.b-load__button', 'click', function(e){
      e.preventDefault();
      
      var $loadButton = $( this );
      var $load = $loadButton.closest( '.b-load' );
      var $loadButtonBlock = $load.find( '.b-load__button-block' );
      
      $.ajax({
        url: $loadButton.data( 'ajax-url' ),
        method: $loadButton.data( 'ajax-method' ),
        dataType: 'html',
        success: function( html ) {
          
          var $item = $( html ).find( '.b-load__item' );
          
          $loadButtonBlock.remove();
          $load.append( $item );
          
          setTimeout( function() {
            $item.addClass( 'i-show' );
            $item.find( '[data-original]' ).lazyload();
          }, 100);
        },
        error: function() {}
      });
    });
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));