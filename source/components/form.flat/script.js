( function($) {

  'use strict';
  
  $( function() {

    //form
    $( '.b-form-flat input[ type=tel ]' ).mask( '+9 (999) 999-9999' );

    $( '.b-form-flat form' ).each( function() {
      
      var $form = $( this ),
          $submitButton = $form.find( '.btn[ type=submit ]' );
          
      $submitButton.click( function(e) {

        if ( $submitButton.hasClass( 'disabled' )) {
          return false;
        }
        
        $submitButton.addClass( 'disabled' );

        var errorFlag = false;
        
        //validate name input
        $form.find( 'input[ type="text" ]' ).each( function() {
          var $textInput = $( this );
          
          if ( $.trim( $textInput.val()) === '' ) {
            $textInput.closest( '.b-float-label' ).addClass( 'invalid' );
            errorFlag = true;
          } else {
            $textInput.closest( '.b-float-label' ).removeClass( 'invalid' );
          }
          
        });
        
        //validate email input
        $form.find( 'input[ type="email" ]' ).each( function() {
          
          var $emailInput = $( this );
          var emailString = $emailInput.val();
          var emailRegExp = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
        
          if ( !emailString.match( emailRegExp )) {
            $emailInput.closest( '.b-float-label' ).addClass( 'invalid' );
            errorFlag = true;
          } else {
            $emailInput.closest( '.b-float-label' ).removeClass( 'invalid' );
          }
          
        });
        
        //validate tel input
        $form.find( 'input[ type="tel" ]' ).each( function() {
          
          var $telInput = $( this );
          var telString = $telInput.val();
          var telRegExp = /^[\+]?[0-9]?\s?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9\s]{4,6}$/im;
        
          if ( !telString.match( telRegExp )) {
            $telInput.closest( '.b-float-label' ).addClass( 'invalid' );
            $telInput.siblings( 'label' ).addClass( 'active' );
            errorFlag = true;
          } else {
            $telInput.closest( '.b-float-label' ).removeClass( 'invalid' );
          }
          
        });
        
        //validate url input
        $form.find( 'input[ type="url" ]' ).each( function() {
          
          var $urlInput = $( this );
          var urlString = $urlInput.val();
          var urlRegExp = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
        
          if ( !urlString.match( urlRegExp )) {
            $urlInput.closest( '.b-float-label' ).addClass( 'invalid' );
            $urlInput.siblings( 'label' ).addClass( 'active' );
            errorFlag = true;
          } else {
            $urlInput.closest( '.b-float-label' ).removeClass( 'invalid' );
          }
          
        });
        
        if ( errorFlag ) {
          e.preventDefault();
          $form.find( '.b-float-label.invalid:eq(0) input' ).focus();
        }

        $submitButton.removeClass( 'disabled' );
      });
    });

    
    //gallery
    initSwiper( '.swiper-container[ data-tab="plan" ]' );
    
    //switch
    document.querySelectorAll( '.b-form-flat__galleries-switch a' ).forEach( function( elem, index ) {
      elem.addEventListener( 'click', function(e) {
        e.preventDefault();
        
        document.querySelectorAll( '.b-form-flat__galleries-switch a' )[ Number( !index )].classList.remove( 'active' );
        
        elem.classList.add( 'active' );
        
        document.querySelectorAll( '.b-form-flat__body .swiper-container' ).forEach( function( container ) {
          container.style.display = 'none';
        });
        
        var hiddenElem = document.querySelector( '.b-form-flat__body .swiper-container[ data-tab=' + elem.getAttribute( 'data-tab' ) + ']' );
        
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