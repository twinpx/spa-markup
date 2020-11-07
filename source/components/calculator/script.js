( function($) {

  'use strict';
  
  $( function() {

    Number.prototype.format = function(){
      return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
    };
    
    String.prototype.deformat = function(){
      return Number( this.toString().split( ' ' ).join(''));
    };
    
    //tr click
    $( '.b-calculator tbody tr' ).click( function(e) {
      e.preventDefault();
      window.location = document.querySelector( '.b-calculator .btn' ).getAttribute( 'href' );
    });
    
    var priceInput = document.querySelector( '.b-calculator__price input[ type=text ]' );
    var paymentInput = document.querySelector( '.b-calculator__payment input[ type=text ]' );
    var periodInput = document.querySelector( '.b-calculator__period input[ type=text ]' );
    
    //set input values
    priceInput.value = Number( priceInput.value ).format();
    paymentInput.value = Number( paymentInput.value ).format();
    
    //count table result
    countResult();
    
    //set sliders
    [ 'price', 'payment', 'period' ].forEach( function( elem ) {
      
      var $range = $( '.b-calculator__' + elem + '-range' );
      var min = 1 * $range.data( 'min' );
      var max = 1 * $range.data( 'max' );
      var input = document.querySelector( '.b-calculator__' + elem + ' input[ type=text ]' );
      
      //range
      $range.slider({
        animate: 'slow',
        range: 'min',
        min: min,
        max: max,
        value: String( input.value ).deformat(),
        slide: function( event, ui ) {
          changeInput( ui.value, elem, min, max, input, $range );
        }
      });
      
      $( input )
      
      .blur( function(e) {
        
        if ( e.which === '13' ) {
          e.stopPropagation();
          e.preventDefault();
        }
        
        changeInput( this.value, elem, min, max, this, $range );
      })
      
      .keydown( function(e) {
        if ( e.which === 13 ) {
          return false;
        }
      })
      .keyup( function(e) {
        
        if ( e.which === 13 ) {
          return false;
        } else {
          changeInput( this.value, elem, min, max, this, $range );
        }
      });
      
    });
    
    function changeInput( value, elem, min, max, input, $range ) {
      
      var inputValue = 1 * String( value ).split( /\D/g ).join('');//only digits
          
      //min max
      if ( inputValue < min) {
        inputValue = min;
      } else if ( inputValue > max ) {
        inputValue = max;
      }
      
      //price & payment
      if ( elem === 'price' && inputValue < String( paymentInput.value ).deformat()) {
        paymentInput.value = Number( inputValue ).format();
        $( '.b-calculator__payment-range' ).slider( 'value', inputValue );
      }
      
      if ( elem === 'payment' && inputValue > String( priceInput.value ).deformat()) {
        paymentInput.value = priceInput.value;
        inputValue = 1 * String( priceInput.value ).split( /\D/g ).join('');
        $( '.b-calculator__payment-range' ).slider( 'value', inputValue );
      }
      
      //set value and range
      if ( Number( inputValue ) === 0 ) {
        input.value = '';
      } else {
        input.value = Number( inputValue ).format();
      }
      $range.slider( "value", inputValue );
      
      countResult();
    }
      
    function countResult() {
      var e = String( priceInput.value ).deformat();
      var f = String( paymentInput.value ).deformat();
      var g = periodInput.value;
      
      var h = e - f;
      var i = g * 12;
      
      $( '.b-calculator tbody tr' ).each( function( index, elem ) {
        var b = parseInt( $( elem ).find( 'td:eq(1)' ).text(), 10);
        var k = b / 12 / 100;
        var j = Math.pow((1 + k),i);
        var result = Math.round( h * k * j / (j - 1));
        $( elem ).find( 'td:eq(3)' ).text( Number( result ).format() + " руб." );
      });
    }

  });

}( jQuery ));