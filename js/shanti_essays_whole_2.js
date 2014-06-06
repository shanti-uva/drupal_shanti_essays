(function($){
  
/// DEFAULTS ///
 
var dims = {
  wbreak:       800,
  hbreak:       800,
  toc_open_w:   300, 
  toc_close_w:  20,
  page_width:   576, // 6in @ 96 dpi
};
    
var colors = {
	toc_bg:              'rgba(50,50,50,.85)',
	toc_btn_open:        'rgba(200,200,200,1)', // #c8c8c8
	toc_btn_close:       'rgba(169,169,169,1)', // #a9a9a9 darkgray
	toc_menu_bg_open:    'rgba(0,0,0,1)', // black
  toc_menu_bg_close:   'rgba(0,0,0,1)' // black
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
      'wide': {
        'position':           'fixed', 
        'top':                '0px',
        'left':               'auto', // This is changed on resize
        'right':              '0px',
        'bottom':             '0px',
        'width':              dims.toc_open_w + 'px', // This is changed on resize
        'height':             '100%',
        'padding':            '0em 1em 0em 0em',
        'margin':             '0px',
        'background-color':   colors.toc_bg       
      },
      'narrow_toc_close': {
        'position':           'fixed',
        'top':                '0px',
        'left':               '0px',
        'right':              '0px',
        'bottom':             '0px',
        'width':              '100%',
        'height':             '20px',
        'padding':            '.5em',
        'margin':             '0px',
        'background-color':   colors.toc_bg       
      },
      'narrow_toc_open': {
        'position':           'fixed',
        'top':                '0px',
        'left':               '0px',
        'right':              '0px',
        'bottom':             '0px',
        'width':              'auto',
        'height':             '100%',
        'padding':            '1em',
        'margin':             '0px',
        'background-color':   colors.toc_bg       
      },
    },
            
    '#book-content': {
      'wide': {
        'position':       'relative', 
        'top':            '0px',
        'bottom':         '0px',
        'width':          'auto',
        'max-width':      dims.page_width, //'6in',
        'height':         '100%',
        'padding':        '0 2em 0 1em',
        'margin':         '0'
      },
      'narrow_toc_close': {
        'top':            '60px',
        'left':           '0px',
        'right':          '0px',
        'bottom':         '0px',
        '_width':          '100%',
        'max-width':      '100%',
        'height':         '100%',
        'margin':         '0 1em',
        'padding':        '0 1em'
      },
      'narrow_toc_open': {
        'left':           '0px',
        'right':          '0px',
        'bottom':         '0px',
        '_width':          '100%',
        'max-width':      '100%',
        'height':         '100%',
        'margin':         '0 1em',
        'padding':        '0 1em'
      }
    },
    '#toc-bar': {
      'wide': {
        'display': 'block',
        'height': document.height,
        'background-color': 'transparent',          
      },
      'narrow_toc_close': {
        'background-color': 'transparent',          
      },
      'narrow_toc_open': {
        'background-color': 'transparent',          
      },
    },
    
    '#toc-menu': {
      'wide': {
        'position': 'absolute',
        'top': '0px',
        'right': '0px',
        'left': 'auto',
        'padding': '.5em 1em 0 1em',
        'background-color': colors.toc_menu_bg_open // 'black'         
      },
      'narrow_toc_close': {
        'position': 'absolute',
        'top': '0px',
        'left': '0px',
        'right': '0px',
        'padding': '.5em 0 0 1em',
        'background-color': colors.toc_menu_bg_close // 'black'
      },
      'narrow_toc_open': {
        'position': 'absolute',
        'top': '0px',
        'left': '0px',
        'right': '0px',
        'padding': '.5em 0 0 1em',
        'background-color': colors.toc_menu_bg_close // 'black'         
      },
    }
  };
    
  //// TRANSITIONS (which employ STATES) ////
  
  function changeState(mysel,mystate,speed){
    speed = typeof speed !== 'undefined' ? speed : 'slow';
    $(mysel).transition(states[mysel][mystate],speed);
    state = mystate;
    //console.log(state);
  }
  
  function goWide(){
    changeState('#book-content','wide');
    changeState('#toc','wide');
    changeState('#toc-menu','wide');
    $('#toc-bar').hide(); // MAY REMOVE THIS WIDGET
    $('#toc .level-0').show();
    $('#toc-adjust-width').hide();
    $('#toc-collapse-toggle').hide();
    $('#toc-collapse-toggle-h').hide();
    $('#toc-edit').show();
    $('#toc-go-home').show();
    adjustTocWidth();
  }
  
  function goWideCloseToc(){}
    
  function goNarrowCloseToc(){
    changeState('#toc','narrow_toc_close','fast');
    changeState('#toc-menu','narrow_toc_close','fast');
    changeState('#book-content','narrow_toc_close','fast');
    $('#toc-bar').hide(); // MAY REMOVE THIS WIDGET 
    $('#toc .level-0').hide();
    $('#toc-adjust-width').hide();
    $('#toc-collapse-toggle').hide();
    $('#toc-collapse-toggle-h').show();
    $('#toc-collapse-toggle-h i').removeClass( "fa-chevron-up" ).addClass( "fa-bars" ).transition({ color: colors.toc_btn_close }, 'slow'); 
    $('#toc-edit').hide();
    $('#toc-go-home').show();
  }
    
  function goNarrowOpenToc(){
    changeState('#toc','narrow_toc_open');
    changeState('#toc-menu','narrow_toc_open');
    changeState('#book-content','narrow_toc_open'); 
    $('#toc-bar').hide(); // MAY REMOVE THIS WIDGET
    $('#toc .level-0').show();      
    $('#toc-adjust-width').hide();
    $('#toc-collapse-toggle').hide();
    $('#toc-collapse-toggle-h').show();
    $('#toc-collapse-toggle-h i').removeClass( "fa-bars" ).addClass( "fa-chevron-up" ).transition({ color: colors.toc_btn_open }, 'slow'); 
    $('#toc-edit').hide();
    $('#toc-go-home').show();
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
	  /*
    if (window.innerWidth > $('#book-content').outerWidth() 
     && window.innerWidth > dims.wbreak) {
      $('#toc').width(window.innerWidth - $('#book-content').outerWidth());
      //$('#toc').css('left',$('#book-content').outerWidth());
    }
    $('#toc-adjust-width').hide(); // Only if allowed to manually set
    */
   if (state == 'wide'|| window.innerWidth > dims.wbreak) {
      $('#toc').width(window.innerWidth - $('#book-content').outerWidth());     
      $('#toc').css('left',$('#book-content').outerWidth());
      //$('#toc').width(window.innerWidth - dims.page_width + 32);
      //$('#toc').css('left', dims.page_width + 32);
   }
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
			if (window.innerWidth <= dims.wbreak) { 
			  goNarrowCloseToc(); 
			}
			else { 
				goWide(); 
			}
    	}
    	
    	// Mobile devices 
    	else { 
    	  adjustImages();
    		$('#reader').addClass('mobile');
    		goNarrowCloseToc(); 
    	}
    	$('#toc').css('display','block');
    	$('#book-content').css('display','block');
    
    // TOC Toggles
    // REMOVE
    $('#toc-collapse-toggle').click(function(){
    	 state == 'closed_v_r' ? tocOpenVertRight() : tocCloseVertRight();
    });

    // KEEP
		$('#toc-collapse-toggle-h').click(function(){
    	 state == 'narrow_toc_close' ? goNarrowOpenToc() : goNarrowCloseToc(); 
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

    // Adjust TOC width manually -- MAY REMOVE 
    $('#toc-adjust-width').click(function(){
      adjustTocWidth();
    });
        
    // Collapse vertical menu on non-mobiles on window width shrink
    $(window).resize(function(e){
    	  if (state == 'wide') {
				if (window.innerWidth <= dims.wbreak) {
					goNarrowCloseToc();
				} 
				else {
          //goWide();
					adjustTocWidth();
				}
			} 
			else if (state == 'narrow_toc_close') {
        if (window.innerWidth > dims.wbreak) {
          goWide();
        } 
        else {
          // Do nothing
        }
			}
			else if (state == 'narrow_toc_open') {
			  // Not sure
			}
    });
    
  	  // Close menu after clicking on link when in mobile mode
    $('#toc .level-0 a').click(function(e){
			e.preventDefault(); 
      	var target = $(this).attr('href');
			var y = $(target).position().top;
			window.scrollTo(0, y);
			if (state != 'wide') {
			   goNarrowCloseToc();
			}
			return true; // I think this is needed since e.preventDefault() was used
	  });
     		   
		
		// Home-made resize functions (bc JQuery is buggy on divs with absolute pos)
		/*   
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
		*/

  }
  
};

  
})(jQuery);

