( function($) {

  'use strict';
  
  $( function() {
    
    //lazyload
    $( '.b-flat-card__img' ).lazyload();
    
    //show result
    $( '.b-filter-result' ).find( '.b-filter-result__block:last' ).slideDown();

    //flat click
    $( '.b-filter-result' )
    .delegate( '.b-flat-card', 'click', function() {
      window.location = this.getAttribute( 'data-href' );
    })
    .delegate( '.b-flat-card__project a', 'click', function(e) {
      e.stopPropagation();
    });

    //submit
    var moreButtonFlag = false;
    $( '.b-filter form' ).submit( function(e) {

      e.preventDefault();

      var $form = $( this );

      $.ajax({
        url: $form.attr( 'action' ),
        type: $form.attr( 'method' ),
        dataType: "html",
        data: $form.serialize(),
        success: function( html ) {
          if ( moreButtonFlag ) {
            $( '.b-filter-result' ).append( html ).find( '.b-filter-result__block:last' ).slideDown();
          } else {
            $( '.b-filter-result' ).html( html ).find( '.b-filter-result__block:last' ).slideDown();
          }
          $( '.b-filter-result .b-filter-result__block:last .b-flat-card__img' ).lazyload();
          moreButtonFlag = false;
        },
        error: function( a, b, c ) {
          if ( window.console ) {
            console.log(a);
            console.log(b);
            console.log(c);
          }
        }
      });

    });

    //more
    if ( document.querySelector( '.b-filter-result__more' )) {
      document.querySelector( '.b-filter-result__more' ).addEventListener( 'click', function(e) {
        e.preventDefault();

        //increase the page num
        var page = 1 * document.querySelector( '.b-filter input[ name=page ]' ).value;
        document.querySelector( '.b-filter input[ name=page ]' ).value = ++page;

        //download
        moreButtonFlag = true;
        document.querySelector( '.b-filter form' ).requestSubmit();
      });
    }

    //sliders
    var $squareRange = $( '.b-filter__square-range' ),
        squareMin = $squareRange.data( 'min' ),
        squareMax = $squareRange.data( 'max' ),
        $squareInputMin = $( '.b-filter__square-min' ),
        $squareInputMax = $( '.b-filter__square-max' );

    var $priceRange = $( '.b-filter__price-range' ),
        priceMin = $priceRange.data( 'min' ),
        priceMax = $priceRange.data( 'max' ),
        $priceInputMin = $( '.b-filter__price-min' ),
        $priceInputMax = $( '.b-filter__price-max' );
    
    $squareRange.slider({
      range: true,
      min: squareMin,
      max: squareMax,
      values: [ squareMin, squareMax ],
      slide: function( event, ui ) {
        $squareInputMin.val( ui.values[0] );
        $squareInputMax.val( ui.values[1] );
      }
    });
    
    $priceRange.slider({
      range: true,
      min: priceMin,
      max: priceMax,
      values: [ priceMin, priceMax ],
      slide: function( event, ui ) {
        $priceInputMin.val( ui.values[0] );
        $priceInputMax.val( ui.values[1] );
      }
    });

    $( '.b-filter__square, .b-filter__price' ).find( 'input[ type=text ]')
    .keydown( function(e) {
      if ( e.which === 13 ) {
        $( this ).blur().focus();
        return false;
      }
    })
    .keyup( function(e) {
      if ( e.which === 13 ) {
        $( this ).blur().focus();
        return false;
      }
    });

    $squareInputMin.blur( function(e) {
      if ( e.which === '13' ) {
        e.stopPropagation();
        e.preventDefault();
      }
      var inputValue = $( this ).val();
      if ( inputValue < squareMin) {

        inputValue = squareMin;
        $( this ).val( inputValue );

      } else if ( inputValue > $squareRange.slider( "values", 1 )) {

        inputValue = $squareRange.slider( "values", 1 );
        $( this ).val( inputValue );

      }
      $squareRange.slider( "values", 0, inputValue);
    });

    $squareInputMax.blur( function(e) {
      if ( e.which === '13' ) {
        e.stopPropagation();
        e.preventDefault();
      }
      var inputValue = $( this ).val();
      if ( inputValue > squareMax) {

        inputValue = squareMax;
        $( this ).val( inputValue );

      } else if ( inputValue < $squareRange.slider( "values", 0 )) {

        inputValue = $squareRange.slider( "values", 0 );
        $( this ).val( inputValue );

      }
      $squareRange.slider( "values", 1, inputValue);
    });

    $priceInputMin.blur( function(e) {
      if ( e.which === '13' ) {
        e.stopPropagation();
        e.preventDefault();
      }
      var inputValue = $( this ).val();
      if ( inputValue < squareMin) {

        inputValue = squareMin;
        $( this ).val( inputValue );

      } else if ( inputValue > $priceRange.slider( "values", 1 )) {

        inputValue = $priceRange.slider( "values", 1 );
        $( this ).val( inputValue );

      }
      $priceRange.slider( "values", 0, inputValue);
    });

    $priceInputMax.blur( function(e) {
      if ( e.which === '13' ) {
        e.stopPropagation();
        e.preventDefault();
      }
      var inputValue = $( this ).val();
      if ( inputValue > squareMax) {

        inputValue = squareMax;
        $( this ).val( inputValue );

      } else if ( inputValue < $priceRange.slider( "values", 0 )) {

        inputValue = $priceRange.slider( "values", 0 );
        $( this ).val( inputValue );

      }
      $priceRange.slider( "values", 1, inputValue);
    });
    
  });

}( jQuery ));