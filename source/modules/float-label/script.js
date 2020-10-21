$( '.b-float-label input, .b-float-label textarea' ).each( function() {
  if ( $.trim( $( this ).val()) !== '' ) {
    $( this ).siblings( 'label' ).addClass( 'active' );
  }
}).blur( function() {
  var $input = $( this ),
      $label = $input.siblings( 'label' );
  if ( $input.val() !== '' ) {
    $label.addClass( 'active' );
  } else {
    $label.removeClass( 'active' );
  }
});