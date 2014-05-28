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
  	
  	var colors = {};
  	
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
          'height':        '100%',
          'padding':   			'1em .5em 0 .5em',
          'margin':					'0px'
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
          'margin':					'0px'
        },
        'closed_h': {
          'top':            '0px',
					'left':						'0px',
					'right':					'0px',
					'bottom':					'0px',
          'width':          '100%',
          'height':         '40px',
					'padding':				'.5em',
          'margin':					'0px'
        },
        'open_h': {
          'top':            '0px',
					'left':						'0px',
					'right':					'0px',
					'bottom':					'0px',
          'width':          '100%',
          'height':         '100%',
          'padding':				'1em 0 0 1em',
          'margin':					'0px'
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
        	//'position':			'relative', // bc resizable()
          'top': 						'0px',
          //'right': 					dims.toc_open_w + 'px',
          'right': 					dims.toc_close_w + 'px',
          'bottom': 				'0px',
          'width':					'auto',
					'height':					'100%',
          //'padding':  			'0 2em',
          'padding':  			'0 1	em',
          'margin-right':		'1em',   // WHY??
          //'margin-left':    dims.toc_open_w + 'px', // Not needed if position:fixed
          'margin-left':    dims.toc_close_w + 'px', // Not needed if position:fixed
        },
        'closed_v_r': {
        	//'position':				'relative', // bc resizable()
          'top':            '0px',
          'right':          dims.toc_close_w + 'px',
          'bottom':         '0px',
					'width':					'auto',
					'height':					'100%',
          'padding':				'0 1em',
          'margin-right':		'1em', // WHY?
					'margin-left':    dims.toc_close_w + 'px',
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
      }
    };
    
    //// TRANSITIONS (which employ STATES) ////

		var state = ''; // Current state of the two elements

    function tocCloseVert(){
    	//var top = $(window).scrollTop();
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
			$('#toc').resizable('disable');
			$('#toc').draggable('disable');
      $('#toc', context).transition(states['#toc'].closed_v_r, 'slow');
      $('#book-content', context).transition(states['#book-content'].closed_v_r, 'slow');
      $('.toc-action a, .toc-action', context).transition({ color: 'darkgray'}, 'slow');   
      $('#toc .level-0', context).hide();
      $('.toc-action.openonly').hide();
      $('#toc-collapse-toggle i', context).removeClass( "fa-chevron-right" ).addClass( "fa-chevron-left" ).transition({ color: 'darkgray', 'padding-left': '0px'}, 'slow');
      state = 'closed_v_r';   
    }
    
    function tocOpenVertRight(){
			$('#toc').resizable('enable');
			$('#toc').draggable('enable');
      $('#toc', context).transition(states['#toc'].open_v_r, 'slow');   
      $('#book-content', context).transition(states['#book-content'].open_v_r, 'slow');   
      $('#toc-menu').css('text-align','right');
      //$('#toc-menu').css('position','fixed');      
      //$('#toc-menu').css('right','0px');
      //$('#toc-menu').css('padding-right','1em');
      //$('#toc-menu').css('width','100%');
      //$('#toc-menu').css('background-color', 'rgba(50,50,50,.9)');
      //$('#toc .level-0').css('margin-top','30px');
      $('.toc-action.openonly').show();
      $('.toc-action a, .toc-action', context).transition({ color: '#c8c8c8'}, 'slow');   
      $('#toc .level-0', context).show();
      $('#toc-collapse-toggle i', context).removeClass( "fa-chevron-left" ).addClass( "fa-chevron-right" ).transition({ color: '#c8c8c8', 'padding-left': '0px'}, 'slow');
      state ='open_v_r';
    }

    function tocCloseHoriz(){
      $('#toc', context).transition(states['#toc'].closed_h, 'slow');
      $('#book-content', context).transition(states['#book-content'].closed_h, 'slow');      
      $('.toc-action a, .toc-action', context).transition({ color: 'darkgray'}, 'slow');   
      $('#toc .level-0', context).hide();
      $('#toc-collapse-toggle-h i', context).removeClass( "fa-chevron-up" );
      $('#toc-collapse-toggle-h i', context).addClass( "fa-bars" );
      $('#toc-collapse-toggle-h i', context).transition({ color: 'darkgray'}, 'slow');
      state = 'closed_h';   
    }
    
    function tocOpenHoriz(){
      $('#toc', context).transition(states['#toc'].open_h, 'slow');   
      $('#book-content', context).transition(states['#book-content'].open_h, 'slow');   
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
				$('#toc').draggable({
					axis:'x',
					//start: function (e,ui) {$('#toc').css("right", "0"); },
					//drag: function (e,ui) {$('#toc').css("right", "0");},
					//stop: function (e,ui) {$('#toc').css("right", "0"); }					
				});
				$('#toc').resizable({ 
					handles: "w", 
					containment: "document", 
					minWidth: 100,
					grid: [0,5],
					//start: function (e,ui) {$('#toc').css("position", "fixed"); },
					//resize: function (e,ui) {},
					//stop: function(e, ui) {$('#toc').css("position", "fixed"); }
				});
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
  
  	// Close menu after clicking on link when in mobile mode
    $('#toc .level-0 a', context).click(function(e){
			e.preventDefault(); 
    	var target = $(this).attr('href');
			var y = $(target).position().top;
			window.scrollTo(0, y);
			//mobile ? tocCloseHoriz() : tocCloseVertRight();
			mobile ? tocCloseHoriz() : 0;
	  });
 		
   // Toggle Pages
   /*
   $('.head-toggle').click(function(e){
    var label = $(this).text();
    var id    = $(this).parent().parent().attr("id");
    var sel   = '#' + id + ' .book-content'; 
    $(sel).slideToggle("fast");
   });
   */
 
       
  }
  
};

  
})(jQuery);

