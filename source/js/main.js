//placeholders
setTimeout( function() {
  $( '.ph-block, h1' ).addClass( 'ph-block--animated' );
}, 500 );


//header dropdown
document.querySelector( '.b-header__menu-icon' ).addEventListener( 'click', function(e) {
  e.preventDefault();
  $( '.b-header__dropdown-wrapper' ).slideToggle();
  return false;
});

//header scroll
if ( window.matchMedia( '(min-width: 576px)' ).matches ) {
  var headerTop = document.querySelector( '.b-header__top' );
  window.addEventListener( 'scroll', function(e) {
    var height = headerTop.offsetHeight;
    if ( window.scrollY >= height ) {
      document.querySelector( 'body' ).classList.add( 'header-fixed' );
    } else {
      document.querySelector( 'body' ).classList.remove( 'header-fixed' );
    }
  });
  
  window.dispatchEvent( new Event( 'scroll' ));
}