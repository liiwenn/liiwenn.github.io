// JavaScript Document

//////////////////////////////////////////////////////////////////////////
//                                                                      //
//                          NAV BAR ANIMATION                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////
$(function(){
  $("#burger").on("click",toggleNav);
})

$(window).scroll(scrollHandlerNavBar);

// $(window).resize(function() {
//     if (window.matchMedia('(max-width: 767px)').matches) {
//       $('#burger').removeClass('d-md-none');
//     }
// });

// var toggledOrNot = $('#burger').hasClass('toggle');



function scrollHandlerNavBar(e){
  checkBackgroundColor();
  var scroll_start = 0;
  // var startchange = $('.startChange');
  // var offset = startchange.offset();
  scroll_start = $(this).scrollTop();

  var toggledOrNot = $('#burger').hasClass('toggle');

  if(scroll_start > 82) {
  // if(scroll_start > offset.top) {

    if(toggledOrNot == false){
    //scrolled down but not toggled

      //show burger
      // $('.navbar ul').css('display', 'none');
      $('#burger').removeClass('d-md-none');

      // console.log("scrolled down but not toggled");


      } else if (toggledOrNot == true){
      //scrolled down and toggled
        rearrangeList();
        // console.log("scrolled down and toggled");
        }

  } else if (scroll_start < 82) {
    // } else if (scroll_start < offset.top) {

      if(toggledOrNot == false){
      //not toggled, scrolled down, then scrolled up again which is the default state

        //show nav bar, hide burger
        $('.navbar ul').css('display', 'flex');
        $('#burger').addClass('d-md-none');
        rearrangeList();
        // console.log("not toggled, scrolled down, then scrolled up again which is the default");

        // if (window.matchMedia('(max-width: 767px)').matches) {
        //   $('#burger').removeClass('d-md-none');
        // }
        //
        // } else {
        //   $('#burger').addClass('d-md-none');
        // }

      } else if (toggledOrNot == true){
      //toggled, scrolled down, then scrolled up again
        rearrangeList();
        // console.log("toggled, scrolled down, then scrolled up again");
        }
      }

      return scroll_start; //pass over to toggleNav
}


//fullscreen nav bar
function toggleNav() {

  var y = scrollHandlerNavBar();

  $('.navbar').toggleClass('full-scr-nav');
  $('.navbar').toggleClass('navbar-expand-md');
  // $('nav.container').css('max-width','100%');
  $('nav.container').toggleClass('col');
  $('.navbar ul').css('display', 'flex');
  //burger animation
  $('#burger').toggleClass('toggle');
  var toggledOrNot = $('#burger').hasClass('toggle');
  rearrangeList();

  //for mobile responsive
  $('.navbar-nav').toggleClass('d-none');


  if (y<82) { //hide burger

    // if (window.matchMedia('(max-width: 767px)').matches) {
    //   $('#burger').removeClass('d-md-none');
    // }
    //
    // } else {
    //   $('#burger').addClass('d-md-none');
    // }


    $('#burger').addClass('d-md-none');
  }

}

  function rearrangeList() {
    var toggledOrNot = $('#burger').hasClass('toggle');
    if (toggledOrNot == false) { //not toggled
      $('.navbar ul').css('position','static');
      $('.navbar-nav-1').removeClass('display-3 text-center navbarToggled-1');
      $('.navbar-nav-2').removeClass('navbarToggled-2 justify-content-center');
      $('.navbar-nav-2').css('width','100px');
      $('.navbar-nav-3').removeClass('flex-row navbarToggled-3 justify-content-center');
      $('.nav-item>a').css('line-height','0.5');


      //change colour
      $('.logo-darkBlue').css('fill','#1D3144');
      $('a.nav-link').css('color','#1D3144');
      $('a.nav-link-white').css('color','#fff');
      $('#vsco').css('fill','#1D3144');
      $('#behance').css('fill','#1D3144');
      $('#email').css('fill','#1D3144');
      $('#linkedin').css('fill','#1D3144');

      //remove underline selected
      $('#nav-selected').addClass('nav-selected-underline');
      $('#nav-selected').removeClass('nav-animation');


    } else { //toggled
      $('.navbar ul').css('position','absolute');
      $('.navbar-nav-1').addClass('display-3 text-center navbarToggled-1');
      $('.navbar-nav-2').addClass('navbarToggled-2 justify-content-center');
      $('.navbar-nav-2').css('width','70px');
      $('.navbar-nav-3').addClass('flex-row navbarToggled-3 justify-content-center');
      $('.nav-item>a').css('line-height','1.2');


      //change colour
      $('.logo-darkBlue').css('fill','#fff');
      $('a.nav-link').css('color','#fff');
      $('#vsco').css('fill','#fff');
      $('#behance').css('fill','#fff');
      $('#email').css('fill','#fff');
      $('#linkedin').css('fill','#fff');

      //remove underline selected
      $('#nav-selected').removeClass('nav-selected-underline');
      $('#nav-selected').addClass('nav-animation');


      //burger change colour
      $("#burger div").css('background-color', '#fff');

    }
  }


  function checkBackgroundColor() {
    if ($("body").hasClass("body-change-color")){

      if ($("body").hasClass("color-white")) {
        $("#burger div").css('background-color', '#1D3144');
      } else {
        $("#burger div").css('background-color', '#fff');
      }
    }

    else if ($("body").css('background-color', '#fff')) {
      $("#burger div").css('background-color', '#1D3144');
    }

    else
    {
      // $("#burger div").css('background-color', '#fff');
    }
  }


/**
 * jquery.hoverdir.js v1.1.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2012, Codrops
 * http://www.codrops.com
 */


 //////////////////////////////////////////////////////////////////////////
 //                                                                      //
 //                            HOVER EFFECT                              //
 //                                                                      //
 //////////////////////////////////////////////////////////////////////////
;( function( $, window, undefined ) {

	'use strict';

	$.HoverDir = function( options, element ) {

		this.$el = $( element );
		this._init( options );

	};

	// the options
	$.HoverDir.defaults = {
		speed : 300,
		easing : 'ease',
		hoverDelay : 0,
		inverse : false
	};

	$.HoverDir.prototype = {

		_init : function( options ) {

			// options
			this.options = $.extend( true, {}, $.HoverDir.defaults, options );
			// transition properties
			this.transitionProp = 'all ' + this.options.speed + 'ms ' + this.options.easing;
			// support for CSS transitions
			this.support = Modernizr.csstransitions;
			// load the events
			this._loadEvents();

		},
		_loadEvents : function() {

			var self = this;

			this.$el.on( 'mouseenter.hoverdir, mouseleave.hoverdir', function( event ) {

				var $el = $( this ),
					$hoverElem = $el.find( 'div' ),
					direction = self._getDir( $el, { x : event.pageX, y : event.pageY } ),
					styleCSS = self._getStyle( direction );

				if( event.type === 'mouseenter' ) {

					$hoverElem.hide().css( styleCSS.from );
					clearTimeout( self.tmhover );

					self.tmhover = setTimeout( function() {

						$hoverElem.show( 0, function() {

							var $el = $( this );
							if( self.support ) {
								$el.css( 'transition', self.transitionProp );
							}
							self._applyAnimation( $el, styleCSS.to, self.options.speed );

						} );


					}, self.options.hoverDelay );

				}
				else {

					if( self.support ) {
						$hoverElem.css( 'transition', self.transitionProp );
					}
					clearTimeout( self.tmhover );
					self._applyAnimation( $hoverElem, styleCSS.from, self.options.speed );

				}

			} );

		},
		// credits : http://stackoverflow.com/a/3647634
		_getDir : function( $el, coordinates ) {

			// the width and height of the current div
			var w = $el.width(),
				h = $el.height(),

				// calculate the x and y to get an angle to the center of the div from that x and y.
				// gets the x value relative to the center of the DIV and "normalize" it
				x = ( coordinates.x - $el.offset().left - ( w/2 )) * ( w > h ? ( h/w ) : 1 ),
				y = ( coordinates.y - $el.offset().top  - ( h/2 )) * ( h > w ? ( w/h ) : 1 ),

				// the angle and the direction from where the mouse came in/went out clockwise (TRBL=0123);
				// first calculate the angle of the point,
				// add 180 deg to get rid of the negative values
				// divide by 90 to get the quadrant
				// add 3 and do a modulo by 4  to shift the quadrants to a proper clockwise TRBL (top/right/bottom/left) **/
				direction = Math.round( ( ( ( Math.atan2(y, x) * (180 / Math.PI) ) + 180 ) / 90 ) + 3 ) % 4;

			return direction;

		},
		_getStyle : function( direction ) {

			var fromStyle, toStyle,
				slideFromTop = { left : '0px', top : '-100%' },
				slideFromBottom = { left : '0px', top : '100%' },
				slideFromLeft = { left : '-100%', top : '0px' },
				slideFromRight = { left : '100%', top : '0px' },
				slideTop = { top : '0px' },
				slideLeft = { left : '0px' };

			switch( direction ) {
				case 0:
					// from top
					fromStyle = !this.options.inverse ? slideFromTop : slideFromBottom;
					toStyle = slideTop;
					break;
				case 1:
					// from right
					fromStyle = !this.options.inverse ? slideFromRight : slideFromLeft;
					toStyle = slideLeft;
					break;
				case 2:
					// from bottom
					fromStyle = !this.options.inverse ? slideFromBottom : slideFromTop;
					toStyle = slideTop;
					break;
				case 3:
					// from left
					fromStyle = !this.options.inverse ? slideFromLeft : slideFromRight;
					toStyle = slideLeft;
					break;
			};

			return { from : fromStyle, to : toStyle };

		},
		// apply a transition or fallback to jquery animate based on Modernizr.csstransitions support
		_applyAnimation : function( el, styleCSS, speed ) {

			$.fn.applyStyle = this.support ? $.fn.css : $.fn.animate;
			el.stop().applyStyle( styleCSS, $.extend( true, [], { duration : speed + 'ms' } ) );

		},

	};

	var logError = function( message ) {

		if ( window.console ) {

			window.console.error( message );

		}

	};

	$.fn.hoverdir = function( options ) {

		var instance = $.data( this, 'hoverdir' );

		if ( typeof options === 'string' ) {

			var args = Array.prototype.slice.call( arguments, 1 );

			this.each(function() {

				if ( !instance ) {

					logError( "cannot call methods on hoverdir prior to initialization; " +
					"attempted to call method '" + options + "'" );
					return;

				}

				if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {

					logError( "no such method '" + options + "' for hoverdir instance" );
					return;

				}

				instance[ options ].apply( instance, args );

			});

		}
		else {

			this.each(function() {

				if ( instance ) {

					instance._init();

				}
				else {

					instance = $.data( this, 'hoverdir', new $.HoverDir( options, this ) );

				}

			});

		}

		return instance;

	};

} )( jQuery, window );
