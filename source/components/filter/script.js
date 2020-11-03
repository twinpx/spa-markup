( function($) {

  'use strict';
  
  $( function() {

    //select
    $( '.b-filter select' ).ikSelect();
    
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



    //change the filter - set page opacity
    document.querySelectorAll( '.b-filter input[type=checkbox]' ).forEach( function( elem ) {
      elem.addEventListener( 'change', function() {
        setPageOpacity();
      });
    });

    $( '.b-filter' ).delegate( 'select', 'change', function() {
      setPageOpacity();
    });

    $( 'body' ).click( function(e) {
      if ( !$( 'body' ).hasClass( 'opacity' ) || e.target.closest( '.b-filter' )) {
        return;
      }
      removePageOpacity();
    });



    //submit
    var moreButtonFlag = false;
    $( '.b-filter form[ data-ajax=true ]' ).submit( function(e) {

      e.preventDefault();

      var $form = $( this );
      var $filter = $form.closest( '.b-filter' );

      $.ajax({
        url: $form.attr( 'action' ),
        type: $form.attr( 'method' ),
        dataType: "html",
        data: $form.serialize(),
        success: function( html ) {
          removePageOpacity();
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
    $( '.b-filter-result' ).delegate( '.b-filter-result__more .btn', 'click', function(e) {
      e.preventDefault();

      //increase the page num
      document.querySelector( '.b-filter input[ name=page ]' ).value = $( this ).data( 'page' );
      $( this ).closest( '.b-filter-result__more' ).remove();

      //download
      moreButtonFlag = true;
      document.querySelector( '.b-filter form' ).requestSubmit();
    });

    Number.prototype.format = function(){
      return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
    };
    
    String.prototype.deformat = function(){
      return Number( this.toString().split( ' ' ).join(''));
    };




    //set sliders
    [ 'square', 'price' ].forEach( function( elem ) {
      
      var $range = $( '.b-filter__' + elem + '-range' );
      var min = 1 * $range.data( 'min' );
      var max = 1 * $range.data( 'max' );
      var inputMin = document.querySelector( '.b-filter__' + elem + '-min' );
      var inputMax = document.querySelector( '.b-filter__' + elem + '-max' );

      //format input values
      inputMin.value = Number( inputMin.value ).format();
      inputMax.value = Number( inputMax.value ).format();
      
      //range
      $range.slider({
        animate: 'slow',
        range: true,
        min: min,
        max: max,
        values: [ String( inputMin.value ).deformat(), String( inputMax.value ).deformat() ],
        slide: function( event, ui ) {
          changeInput( ui.values, min, max, [ inputMin, inputMax ], $range );
        },
        change: function() {
          setPageOpacity();
        }
      });
      
      //min
      $( inputMin )
      
      .blur( function(e) {
        
        if ( e.which === '13' ) {
          e.stopPropagation();
          e.preventDefault();
        }
        
        changeInput( [this.value], min, max, [ inputMin, inputMax ], $range );
      })
      
      .keydown( function(e) {
        if ( e.which === 13 ) {
          return false;
        }
        setPageOpacity();
      })
      .keyup( function(e) {
        if ( e.which === 13 ) {
          return false;
        } else {
          inputMin.value = Number( String( inputMin.value ).deformat()).format();
        }
        setPageOpacity();
      });
      
      //max
      $( inputMax )
      
      .blur( function(e) {
        
        if ( e.which === '13' ) {
          e.stopPropagation();
          e.preventDefault();
        }
        
        changeInput( [undefined, this.value], min, max, [ inputMin, inputMax ], $range );
      })
      
      .keydown( function(e) {
        if ( e.which === 13 ) {
          return false;
        }
        setPageOpacity();
      })
      .keyup( function(e) {
        if ( e.which === 13 ) {
          return false;
        } else {
          inputMax.value = Number( String( inputMax.value ).deformat() ).format();
        }
        setPageOpacity();
      });
      
    });
    
    function changeInput( valuesArray, min, max, inputArray, $range ) {
      
      if ( !valuesArray[0]) {
        valuesArray[0] = String( inputArray[0].value ).deformat();
      } else {

        //only digits
        valuesArray[0] = 1 * String( valuesArray[0]).split( /\D/g ).join('');
        //min
        if ( valuesArray[0] < min || valuesArray[0] > String( inputArray[1].value ).deformat() ) {
          valuesArray[0] = min;
        }

      }

      if ( !valuesArray[1]) {
        valuesArray[1] = String( inputArray[1].value ).deformat();
      } else {

        //only digits
        valuesArray[1] = 1 * String( valuesArray[1]).split( /\D/g ).join('');
        //max
        if ( valuesArray[1] > max || valuesArray[1] < String( inputArray[0].value ).deformat() ) {
          valuesArray[1] = max;
        }
        

      }
      
      
      valuesArray.forEach( function( value, index ) {

        if ( !value ) {
          return;
        }

        //set value
        if ( Number( value ) === 0 ) {
          inputArray[ index ].value = '';
        } else {
          inputArray[ index ].value = Number( value ).format();
        }

        //and range
        $range.slider( "values", valuesArray );

      });

      

    }
    
    function setPageOpacity() {

      if ( document.querySelector( 'body' ).getAttribute( 'class' ) && document.querySelector( 'body' ).getAttribute( 'class' ).search( 'opacity' ) !== -1 ) {
        return;
      }
      
      document.querySelector( 'body' ).classList.add( 'opacity' );

      setClear( document.querySelector( '.b-filter' ));

      function setClear( elem ) {
        if ( elem.getAttribute( 'class' ).search( 'b-page-content' ) !== -1 || elem.tagName.toLowerCase === 'body' ) {
          return;
        }
        elem.classList.add( 'opacity-clear' );
        setClear( elem.parentNode );
      }
    }

    function removePageOpacity() {
      if ( document.querySelector( 'body' ).getAttribute( 'class' ) && document.querySelector( 'body' ).getAttribute( 'class' ).search( 'opacity' ) === -1 ) {
        return;
      }
      
      document.querySelector( 'body' ).classList.remove( 'opacity' );

      document.querySelectorAll( '.opacity-clear' ).forEach( function( elem ) {
        elem.classList.remove( 'opacity-clear' );
      });
    }
    
  });

}( jQuery ));