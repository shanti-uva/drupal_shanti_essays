(function($){
  
Drupal.behaviors.shantiEssaysWhole = {
  attach: function (context, settings) {
  
  
  	/// DEFAULTS ///
  
  	var dims = {
  		wbreak: 			800,
  		hbreak: 			400,
  		toc_open_w: 	300,
  		toc_close_w: 	20
  	};
  	
  	var colors = {
  		toc_bg:					'rgba(50,50,50,.9)',
  		toc_btn_open:		'#c8c8c8',
  		toc_btn_close:	'darkgray'
  	};
  	
    /// STATES (for #toc and #book-content) ///
    /// *_v = vertical (non-mobile), *_h = horizontal (mobile)
    
    var states = {
    
      '#toc': {
        'open_v': {
        	'top':						'0px',
        	'left':						'0px',
					'bottom':					'0px',
          'width':          dims.toc_open_w + 'px',
          'height':         '100%',
          'padding':   			'1em .5em 0 .5em',
          'margin':					'0px'
        },
        'closed_v': {
        	'top':						'0px',
        	'left':						'0px',
					'bottom':					'0px',
          'width':          dims.toc_close_w + 'px',
          'height':         '100%',
          'padding':   			'1em .5em 0 .5em',
          'margin':					'0px'
        },
        'open_v_r': {
					'position':				'fixed', // bc resizable()
        	'top':						'0px',
        	'right':					'0px',
					'bottom':					'0px',
					'left':						'auto',
          'width':          dims.toc_open_w + 'px',
          'height':         '100%',
          'padding':   			'0em .5em 0em 0em',
          'margin':					'0px',
          'background-color': colors.toc_bg
        },
        'closed_v_r': {
        	'position':				'fixed', // bc resizable()
        	'top':						'0px',
        	'right':					'0px',
					'bottom':					'0px',
          'left':						'auto',
          'width':          dims.toc_close_w + 'px',
          'height':         '100%',
          'padding':   			'1em .5em 0 .5em',
          'margin':					'0px',
					'background-color': colors.toc_bg

        },
        'closed_h': {
          'top':            '0px',
					'left':						'0px',
					'right':					'0px',
					'bottom':					'0px',
          'width':          '100%',
          'height':         '40px',
					'padding':				'.5em',
          'margin':					'0px',
          'background-color': colors.toc_bg
        },
        'open_h': {
          'top':            '0px',
					'left':						'0px',
					'right':					'0px',
					'bottom':					'0px',
          'width':          '100%',
          'height':         '100%',
          'padding':				'1em 0 0 1em',
          'margin':					'0px',
          'background-color': colors.toc_bg
        }        
      },
      
      '#book-content': {
        'open_v': {
          'top': 						'0px',
          'left': 					dims.toc_open_w + 'px',
          'bottom': 				'0px',
					'width':					'auto',
					'height':					'100%',
          'padding':  			'0 2em',
          'margin-left':		'1em',   // WHY??
          'margin-right':   dims.toc_open_w + 'px'
        },
        'closed_v': {
          'top':            '0px',
          'left':           dims.toc_close_w + 'px',
          'bottom':         '0px',
					'width':					'auto',
					'height':					'100%',
          'padding':				'0 1em',
          'margin-left':		'0px', // WHY?
					'margin-right':   dims.toc_close_w + 'px'
        },
        'open_v_r': {
        	'position':			'relative', // bc resizable()
          'top': 						'0px',
          //'right': 					dims.toc_open_w + 'px',
          //'right': 					dims.toc_close_w + 'px',
          'bottom': 				'0px',
          'width':					'auto',
					'height':					'100%',
          //'padding':  			'0 2em',
          'padding':				'0 3em 0 1em', // 36 = 16 (ie 1em) + dim.toc_close_w
          //'margin-right':		'1em',   // WHY??
          //'margin-left':    dims.toc_open_w + 'px', // Not needed if position:fixed
          //'margin-left':    dims.toc_close_w + 'px', // Not needed if position:fixed
          //'margin':					'0 auto'
        },
        'closed_v_r': {
        	'position':				'relative', // bc resizable()
          'top':            '0px',
          //'right':          dims.toc_close_w + 'px',
          'bottom':         '0px',
					'width':					'auto',
					'height':					'100%',
          'padding':				'0 3em 0 1em', // 36 = 16 (ie 1em) + dim.toc_close_w
          //'margin-right':		'1em', // WHY?
					//'margin-left':    dims.toc_close_w + 'px',
          //'margin':					'0 auto'
        },
        'closed_h': {
          'top':            '60px',
          'left':           '0px',
					'right':					'0px',
					'bottom':					'0px',
					'width':					'100%',
					'height':					'100%',
          'padding-left':   '1em',
          'padding-right':  '1em',
          'margin-right':   '0px',
        },
        'open_h': {
          'top':            '60px',
          'left':           '0px',
					'right':					'0px',
          'bottom': 				'0px',
					'width':					'100%',
					'height':					'100%',
          'margin-right':   '0px',
          'padding-right':  '1em',
          'padding-left':   '1em'          
        }
      },
      
      '#toc-bar': {
      	'open_v_r': {
      		'display': 'block',
      		'height':		window.height,
          'background-color': 'none'
      	},
      	'closed_v_r': {
      		'display': 'none'
      	},
      	'open_h': {
					'display': 'none'
      	},
      	'closed_h': {
      		'display': 'none'      	
      	},
      },
      
			'#toc-menu': {
      	'open_v_r': {
      		'position': 'fixed',
      		'top': '0px',
      		'right': '0px',
      		'padding': '.5em 0 0 1em',
      		'background-color': 'black'
      	},
      	'closed_v_r': {
      		'position': 'relative',
      		'display': 'inline',
      		'padding': '0px',
      		'background-color': 'rgba(0,0,0,0)'
      	},
      	'open_h': {
					
      	},
      	'closed_h': {
      	},
      }

      
    };
    
    //// TRANSITIONS (which employ STATES) ////

		var state = ''; // Current state of the two elements

    function tocCloseVert(){
      $('#toc', context).transition(states['#toc'].closed_v, 'slow');
      $('#book-content', context).transition(states['#book-content'].closed_v, 'slow');
      $('.toc-action a, .toc-action', context).transition({ color: 'darkgray'}, 'slow');   
      $('#toc .level-0', context).hide();
      $('#toc-collapse-toggle i', context).removeClass( "fa-chevron-left" ).addClass( "fa-chevron-right" ).transition({ color: 'darkgray', 'padding-left': '0px'}, 'slow');
      state = 'closed_v';   
    }
    
    function tocOpenVert(){
      $('#toc', context).transition(states['#toc'].open_v, 'slow');   
      $('#book-content', context).transition(states['#book-content'].open_v, 'slow');   
      $('.toc-action a, .toc-action', context).transition({ color: '#c8c8c8'}, 'slow');   
      $('#toc .level-0', context).show();
      $('#toc-collapse-toggle i', context).removeClass( "fa-chevron-right" ).addClass( "fa-chevron-left" ).transition({ color: '#c8c8c8', 'padding-left': '0px'}, 'slow');
      state ='open_v';
    }
    
    function tocCloseVertRight(){
      $('#toc', context).transition(states['#toc'].closed_v_r, 'slow');
      $('#toc-bar').transition(states['#toc-bar'].closed_v_r, 'slow');
      $('#toc-menu').transition(states['#toc-menu'].closed_v_r, 'slow');
      $('#book-content', context).transition(states['#book-content'].closed_v_r, 'slow');
      $('.toc-action a, .toc-action', context).transition({ color: 'darkgray'}, 'slow');   
      $('#toc .level-0', context).hide();
      $('.toc-action.openonly').hide();
      $('#toc-collapse-toggle i', context).removeClass( "fa-chevron-right" ).addClass( "fa-chevron-left" ).transition({ color: 'darkgray', 'padding-left': '0px'}, 'slow');
      state = 'closed_v_r';   
    }
    
    function tocOpenVertRight(){
      $('#toc', context).transition(states['#toc'].open_v_r, 'slow');   
      $('#toc-bar').transition(states['#toc-bar'].open_v_r, 'slow');
      $('#toc-menu').transition(states['#toc-menu'].open_v_r, 'slow');
      $('#book-content', context).transition(states['#book-content'].open_v_r, 'slow');   
      $('#toc-menu').css('text-align','right');      
      $('.toc-action.openonly').show();
      $('.toc-action a, .toc-action', context).transition({ color: colors.toc_btn_open}, 'slow');   
      $('#toc .level-0', context).show();
      $('#toc-collapse-toggle i', context).removeClass( "fa-chevron-left" ).addClass( "fa-chevron-right" ).transition({ color: '#c8c8c8', 'padding-left': '0px'}, 'slow');
      state ='open_v_r';
    }

    function tocCloseHoriz(){
      $('#toc', context).transition(states['#toc'].closed_h, 'slow');
      $('#book-content', context).transition(states['#book-content'].closed_h, 'slow');      
      $('#toc-bar').transition(states['#toc-bar'].closed_v_r, 'slow');
      $('.toc-action a, .toc-action', context).transition({ color: 	colors.toc_btn_close}, 'slow');   
      $('#toc .level-0', context).hide();
      $('#toc-collapse-toggle-h i', context).removeClass( "fa-chevron-up" );
      $('#toc-collapse-toggle-h i', context).addClass( "fa-bars" );
      $('#toc-collapse-toggle-h i', context).transition({ color: 'darkgray'}, 'slow');
      state = 'closed_h';   
    }
    
    function tocOpenHoriz(){
      $('#toc', context).transition(states['#toc'].open_h, 'slow');   
      $('#book-content', context).transition(states['#book-content'].open_h, 'slow');   
      $('#toc-bar').transition(states['#toc-bar'].closed_v_r, 'slow');
      $('.toc-action a, .toc-action', context).transition({ color: '#c8c8c8'}, 'slow');   
      $('#toc .level-0', context).show();
      $('#toc-collapse-toggle-h i', context).removeClass( "fa-bars" );
      $('#toc-collapse-toggle-h i', context).addClass( "fa-chevron-up" );
      $('#toc-collapse-toggle-h i', context).transition({ color: '#c8c8c8'}, 'slow');
      state = 'open_h';
    }
        
    function isMobile(){
   		if (window.innerWidth <= dims.wbreak && window.innerHeight <= dims.hbreak) {return true;}
     	else {return false;}
		}
				
    /// EVENTS (which trigger TRANSITIONS) ///
    
    // Init
    var mobile = false;
    $(document, context).ready(function(){
    	mobile = isMobile();
    	if (!mobile) {
    		$('#toc-collapse-toggle-h', context).hide();
				var ww = $(window).width();
				if (ww <= dims.wbreak) { tocCloseVertRight(); }
				else { tocOpenVertRight(); }
    	}
    	else { 
    		$('#content', context).addClass('mobile');
    		$('#toc-collapse-toggle', context).hide();
    		$('#toc-edit', context).hide();
    		$('.toc-action i', context).removeClass('fa-2x').addClass('fa-3x');
    		tocCloseHoriz(); 
    	}
    	$('#toc', context).css('display','block');
    	$('#book-content', context).css('display','block');
    });
    
    // TOC Toggles
    
    // Modify to handle 
    $('#toc-collapse-toggle', context).click(function(){
    	state == 'closed_v_r' ? tocOpenVertRight() : tocCloseVertRight();
    });
    
		$('#toc-collapse-toggle-h', context).click(function(){
    	state == 'closed_h' ? tocOpenHoriz() : tocCloseHoriz(); 
    });

    // Show visible articles on TOC
    
    $('article', context).bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
      var toc_target = "#toc a[href='#"+ $(this).attr('id') +"']";
      if (isInView) {
        $(toc_target).css('color','orange'); // The new black
      } 
      else {
        $(toc_target).css('color','#C8C8C8'); // rgb(200,200,200)
      }
    });
        
    // Collapse vertical menu on non-mobiles on window width shrink
    /*
    $(window).resize(function(){
    	var ww = $(window).width();
    	if (!mobile && (state == 'open_v_r' || state == 'open_v')) {
				if (ww <= dims.wbreak) {
					tocCloseVertRight();
				} 
				// Does not work
				if (ww > dims.wbreak) {
					tocOpenVertRight();
				}
			}
    });
    */

		//
  	// Close menu after clicking on link when in mobile mode
    $('#toc .level-0 a', context).click(function(e){
			e.preventDefault(); 
    	var target = $(this).attr('href');
			var y = $(target).position().top;
			window.scrollTo(0, y);
			//mobile ? tocCloseHoriz() : tocCloseVertRight();
			mobile ? tocCloseHoriz() : 0;
	  });
 		//
 		
   // Toggle Pages
   /*
   $('.head-toggle').click(function(e){
    var label = $(this).text();
    var id    = $(this).parent().parent().attr("id");
    var sel   = '#' + id + ' .book-content'; 
    $(sel).slideToggle("fast");
   });
   */
   
		// Home-made resize functions (bc JQuery is buggy on divs with absolute pos)   
		
		$('#toc-bar').mousedown(function(e){
			e.preventDefault();
			var w = window.innerWidth;
			$(document).mousemove(function(e){
				$('#toc').css("width",(w - e.clientX));
			})
		});
		
		$(document).mouseup(function(e){
			$(document).unbind('mousemove');
		});
		
  }
  
};

  
})(jQuery);

