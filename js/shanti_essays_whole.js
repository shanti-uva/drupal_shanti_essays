(function($){
  
/// DEFAULTS ///
 
var dims = {
  wbreak:       800,
  hbreak:       400,
  toc_open_w:   300, 
  toc_close_w:  20
};
  
var colors = {
  toc_bg:         'rgba(50,50,50,.85)',
  toc_btn_open:   'rgba(200,200,200,1)', // #c8c8c8
  toc_btn_close:  'rgba(169,169,169,1)', // #a9a9a9 darkgray
};

var device_type = '';
var state = ''; 
    
Drupal.behaviors.shantiEssaysWhole = {
  
  attach: function (context, settings) {
  
  
  	
  /// STATES (for #toc and #book-content) ///
  /// *_v_r = vertical right (non-mobile), *_h = horizontal (mobile)
  /// open_* = TOC is open, closed_* = TOC is closed
    
  var states = {
    
      '#toc': {
        'open_v_r': {
  				  'position':				'fixed', 
          'top':						  '0px',
          'right':					  '0px',
  				  'bottom':					'0px',
  				  'left':						'auto',
          'width':            dims.toc_open_w + 'px',
          'height':           '100%',
          'padding':   			 '0em .5em 0em 0em',
          'margin':					 '0px',
          'background-color': colors.toc_bg
        },
        'closed_v_r': {
          'position':				 'fixed', 
          'top':						   '0px',
          'right':					   '0px',
  				  'bottom':					 '0px',
          'left':						 'auto',
          'width':            dims.toc_close_w + 'px',
          'height':           '100%',
          'padding':   			  '1em .5em 0 .5em',
          'margin':					  '0px',
  				  'background-color': colors.toc_bg
        },
        'closed_h': {
          'top':            '0px',
					'left':						'0px',
					'right':					  '0px',
					'bottom':					'0px',
          'width':          '100%',
          'height':         '20px',
					'padding':				 '.5em',
          'margin':					'0px',
          'background-color': colors.toc_bg
        },
        'open_h': {
          'top':            '0px',
					'left':						'0px',
					'right':					  '0px',
					'bottom':					'0px',
          'width':          '100%',
          'height':         '100%',
          'padding':				  '1em 0 0 1em',
          'margin':					'0px',
          'background-color': colors.toc_bg
        }        
      },
      
      '#book-content': {
        'open_v_r': {
        	  'position':				'relative', 
          'top': 						'0px',
          'bottom': 				  '0px',
          'width':					  'auto',
					'height':					'100%',
          'padding':				  '0 3em 0 1em', 
        },
        'closed_v_r': {
        	  'position':				'relative', 
          'top':            '0px',
          'bottom':         '0px',
					'width':					  'auto',
					'height':					'100%',
          'padding':				  '0 3em 0 1em', 
        },
        'closed_h': {
          'top':            '60px',
          'left':           '0px',
					'right':					  '0px',
					'bottom':					'0px',
					'width':					  '100%',
					'height':					'100%',
          'padding-left':   '1em',
          'padding-right':  '1em',
          'margin-right':   '0px'
        },
        'open_h': {
          'left':           '0px',
					'right':					  '0px',
          'bottom': 				  '0px',
					'width':					  '100%',
					'height':					'100%',
          'margin-right':   '0px',
          'padding-right':  '1em',
          'padding-left':   '1em'          
        }
      },
      
      '#toc-bar': {
        	'open_v_r': {
        		'display': 'block',
        		'height':	document.height,
          	'background-color': 'none',
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
    
    function tocCloseVertRight(){
      $('#toc').transition(states['#toc'].closed_v_r, 'slow');
      $('#toc-bar').transition(states['#toc-bar'].closed_v_r, 'slow');
      $('#toc-menu').transition(states['#toc-menu'].closed_v_r, 'fast');
      $('#book-content').transition(states['#book-content'].closed_v_r, 'slow');
      $('.toc-action.openonly').hide();
      $('.toc-action a, .toc-action').transition({ color: 'darkgray'}, 'slow');   
      $('#toc .level-0').hide();
      $('#toc-collapse-toggle i').removeClass( "fa-chevron-right" ).addClass( "fa-chevron-left" ).transition({ color: 'darkgray', 'padding-left': '0px'}, 'slow');
      state = 'closed_v_r';   
    }
    
    function tocOpenVertRight(){
      $('#toc').transition(states['#toc'].open_v_r, 'slow');   
      $('#toc-bar').transition(states['#toc-bar'].open_v_r, 'slow');
      $('#toc-menu').transition(states['#toc-menu'].open_v_r, 'slow');
      $('#book-content').transition(states['#book-content'].open_v_r, 'slow');   
      $('.toc-action.openonly').show();
      $('.toc-action a, .toc-action').transition({ color: colors.toc_btn_open }, 'slow');   
      $('#toc .level-0').show();
      $('#toc-collapse-toggle i').removeClass( "fa-chevron-left" ).addClass( "fa-chevron-right" ).transition({ color: '#c8c8c8', 'padding-left': '0px' }, 'slow');
      adjustTocWidth();
      state ='open_v_r';
    }

    function tocCloseHoriz(){
      $('#toc').transition(states['#toc'].closed_h, 'slow');
      $('#book-content').transition(states['#book-content'].closed_h, 'slow');      
      $('.toc-action a, .toc-action').transition({ color: 	colors.toc_btn_close }, 'slow');   
      $('#toc .level-0').hide();
      $('#toc-collapse-toggle-h i').removeClass( "fa-chevron-up" ).addClass( "fa-bars" );
      $('#toc-collapse-toggle-h i').transition({ color: colors.toc_btn_close }, 'slow');
      state = 'closed_h';
    }
    
    function tocOpenHoriz(){
      $('#toc').transition(states['#toc'].open_h, 'slow');   
      $('#book-content').transition(states['#book-content'].open_h, 'slow');   
      $('.toc-action a, .toc-action').transition({ color: colors.toc_btn_open}, 'slow');   
      $('#toc .level-0').show();
      $('#toc-collapse-toggle-h i').removeClass( "fa-bars" ).addClass( "fa-chevron-up" );
      $('#toc-collapse-toggle-h i').transition({ color: colors.toc_btn_open }, 'slow');
      state = 'open_h';
    }
        
    function getDeviceType(){
   		if (window.innerWidth <= dims.wbreak && window.innerHeight <= dims.hbreak) {
   		  return 'mobile';
   		}
   		else {
   		  return 'not mobile';
   		} 
		}
		
		function adjustTocWidth(){
      if (window.innerWidth > $('#book-content').outerWidth() 
       && window.innerWidth > dims.wbreak) {
        $('#toc').width(window.innerWidth - $('#book-content').outerWidth());
      }
      $('#toc-adjust-width').hide();
		}
		
		function addInternalHeadersToToc() {
      $('#toc li', context).each(function(){
        $(this).append("<ul class='internal-headers'></ul>");
      });
      var header_id_index = 0;
		  $('#book-content .book-section', context).each(function(){
		    var section_id = $(this).attr('id');
		    $('> .field-name-field-book-content > .field-items > .field-item > h1, > .field-name-field-book-content > .field-items > .field-item > h2, > .field-name-field-book-content > .field-items > .field-item > h3', this).each(function(){
		      var tagName = $(this).attr('tagName');
	        header_id_index++;
	        header_id = "book-content-header-" + header_id_index;
	        $(this).before("<a id='"+header_id+"'></a>");
		      $('#toc-item-' + section_id + ' .internal-headers').append("<li class='toc-item-internal-header "+tagName+"'><a href='#"+header_id+"'>"+ $(this).html() +"</a></li>");
		    });
		  });		    
		}
		
		// Make sure images are not too wide for mobile
		function adjustImages(){
		  $('#book-content img', context).each(function(){
		    var w1 = $(this).width();
		    var w2 = window.innerWidth;
		    if (w1 > w2) {
          var h1 = $(this).height();
          var h2 = w2 * (h1/w1);
          $(this).width(w2);
          $(this).height(h2);		      
		    }
		  });
		}
		
    /// EVENTS (which trigger TRANSITIONS) ///
    
    // Init
    
    addInternalHeadersToToc();
    
    	device_type = getDeviceType();
    	if (device_type == 'not mobile') {
    		$('#toc-collapse-toggle-h').hide();
				if (window.innerWidth <= dims.wbreak) { 
				  tocCloseVertRight(); 
				}
				else { 
					tocOpenVertRight(); 
				}
    	}
    	else { 
    	  adjustImages();
    		$('#reader').addClass('mobile');
    		$('#toc-collapse-toggle').hide();
      $('#toc-adjust-width').hide();
      $('#toc-bar').hide();
    		$('#toc-edit').hide();
    		tocCloseHoriz(); 
    	}
    	$('#toc').css('display','block');
    	$('#book-content').css('display','block');
    
    // TOC Toggles
    $('#toc-collapse-toggle').click(function(){
    	 state == 'closed_v_r' ? tocOpenVertRight() : tocCloseVertRight();
    });
		$('#toc-collapse-toggle-h').click(function(){
    	 state == 'closed_h' ? tocOpenHoriz() : tocCloseHoriz(); 
    });

    // Show visible articles on TOC
    $('div.book-section', context).bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
      var toc_target = "#toc a[href='#"+ $(this).attr('id') +"']";
      if (isInView) {
        $(toc_target).css('color','orange');
      } 
      else {
        $(toc_target).css('color', colors.toc_btn_open);
      }
    });
   
    /* THIS CONFLICTS WITH THE ABOVE
     * PLUS HEADERS ARE NOT CONTAINERS!
    // Show visible internal headers on TOC
    $('.field-item > h1, .field-item > h2, .field-item > h3', context).bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
      var toc_target = "#toc a[href='#"+ $(this).prev('a').attr('id') +"']";
      if (isInView) {
        $(toc_target).css('color','lightgreen'); // The new black
      } 
      else {
        $(toc_target).css('color', colors.toc_btn_open);
      }
    });
    */

    // Adjust TOC width manually
    $('#toc-adjust-width').click(function(){
      adjustTocWidth();
    });
        
    // Collapse vertical menu on non-mobiles on window width shrink
    $(window).resize(function(e){
    	  if (state == 'open_v_r') {
				if (window.innerWidth <= dims.wbreak) {
					tocCloseVertRight();
				} 
				else {
					adjustTocWidth();
				}
			} 
			else if (state == 'closed_v_r') {
        if (window.innerWidth > dims.wbreak) {
          tocOpenVertRight();
        } 
        else {
          //adjustTocWidth();
        }
			}
    });
    
  	  // Close menu after clicking on link when in mobile mode
    $('#toc .level-0 a').click(function(e){
			e.preventDefault(); 
      	var target = $(this).attr('href');
			var y = $(target).position().top;
			window.scrollTo(0, y);
			if (device_type == 'mobile'){
        tocCloseHoriz();			  
			} 
			else if (window.innerWidth <= dims.wbreak) {
			  tocCloseVertRight();
			}
			return true;
	  });
     		   
		
		// Home-made resize functions (bc JQuery is buggy on divs with absolute pos)   
		$('#toc-bar').mousedown(function(e){
			e.preventDefault();
			$(document).mousemove(function(e){
				$('#toc').width(window.innerWidth - e.clientX);
			});
		});
		
		// Part of above function
		$(document).mouseup(function(e){	
		  			
			$(document).unbind('mousemove');
			
			var a = window.innerWidth;
			var b = $('#book-content').outerWidth();
			var c = a - b; // right margin
			var d = $('#toc').width();
      
      // Right margin is greater than TOC
      if (c > d && state == 'open_v_r'){
        if (d < $('#toc-menu').width()) {
          tocCloseVertRight(); 
        }
        else {
          $('#toc-adjust-width i').removeClass('fa-caret-square-o-right').addClass('fa-caret-square-o-left');
          $('#toc-adjust-width').show();       
        }
   
      } 
      // TOC overlaps page content
      else if (d > c && state == 'open_v_r' && a >= dims.wbreak){   
        $('#toc-adjust-width i').removeClass('fa-caret-square-o-left').addClass('fa-caret-square-o-right');
        $('#toc-adjust-width').show();      

      } 
      else {
        $('#toc-adjust-width').hide();      
      }
      
		});

  }
  
};

  
})(jQuery);

