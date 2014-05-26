(function($){
  
Drupal.behaviors.shantiEssaysWhole = {
  attach: function (context, settings) {
  
  
  	/// DIMENSIONS ///
  
  	var dims = {
  		wbreak: 800,
  		hbreak: 400
  	};
  	
 
    /// STATES (for #toc and #page-wrapper) ///
    /// *_v = vertical (non-mobile), *_h = horizontal (mobile)
    
    var states = {
      '#toc': {
        'open_v': {
        	'top':						'0px',
        	'left':						'0px',
					'bottom':					'0px',
          'width':          '220px',
          'height':         '100%',
          'padding':   			'1em .5em 0 .5em',
          'margin':					'0px'
        },
        'closed_v': {
        	'top':						'0px',
        	'left':						'0px',
					'bottom':					'0px',
          'width':          '20px',
          'height':         '100%',
          'padding':   			'1em .5em 0 .5em',
          'margin':					'0px'
        },
        'closed_h': {
          'top':            '0px',
					'left':						'0px',
					'bottom':					'0px',
          'width':          '100%',
          'height':         '40px',
					'padding':				'.5em',
          'margin':					'0px'
        },
        'open_h': {
          'top':            '0px',
					'left':						'0px',
					'bottom':					'0px',
          'width':          '100%',
          'height':         '100%',
          'padding':				'1em 0 0 1em',
          'margin':					'0px'
        }        
      },
      '#page-wrapper': {
        'open_v': {
          'top': 						'0px',
          'left': 					'250px',
          'bottom': 				'0px',
					'width':					'100%',
					'height':					'100%',
          'margin-right':   '250px',
          'padding-right':  '2em',
          'padding-left':   '2em'
        },
        'closed_v': {
          'top':            '0px',
          'left':           '40px',
          'bottom':         '0px',
					'width':					'100%',
					'height':					'100%',
          'margin-right':   '1em',
          'margin-left':		'1em'
        },
        'closed_h': {
          'top':            '60px',
          'left':           '0px',
					'bottom':					'0px',
					'width':					'auto',
					'height':					'100%',
          'margin-right':   '0px',
          'padding-right':  '1em',
          'padding-left':   '1em',
        },
        'open_h': {
          'top':            '60px',
          'left':           '0px',
          'bottom': 				'0px',
					'width':					'auto',
					'height':					'100%',
          'margin-right':   '0px',
          'padding-right':  '1em',
          'padding-left':   '1em'          
        }
      }
    };
    
    //// TRANSITIONS (which employ STATES) ////

		var state = ''; // Current state of the two elements

    function tocCloseHoriz(){
      $('#toc', context).transition(states['#toc'].closed_h, 'slow');
      $('#page-wrapper', context).transition(states['#page-wrapper'].closed_h, 'slow');      
      $('.toc-action a, .toc-action', context).transition({ color: 'darkgray'}, 'slow');   
      $('#toc .level-0', context).hide();
      $('#toc-collapse-toggle-h i', context).removeClass( "fa-chevron-up" );
      $('#toc-collapse-toggle-h i', context).addClass( "fa-bars" );
      $('#toc-collapse-toggle-h i', context).transition({ color: 'darkgray'}, 'slow');
      state = 'closed_h';   
    }
    
    function tocOpenHoriz(){
      $('#toc', context).transition(states['#toc'].open_h, 'slow');   
      $('#page-wrapper', context).transition(states['#page-wrapper'].open_h, 'slow');   
      $('.toc-action a, .toc-action', context).transition({ color: '#c8c8c8'}, 'slow');   
      $('#toc .level-0', context).show();
      $('#toc-collapse-toggle-h i', context).removeClass( "fa-bars" );
      $('#toc-collapse-toggle-h i', context).addClass( "fa-chevron-up" );
      $('#toc-collapse-toggle-h i', context).transition({ color: '#c8c8c8'}, 'slow');
      state = 'open_h';
    }
    
    function tocCloseVert(){
      $('#toc', context).transition(states['#toc'].closed_v, 'slow');
      $('#page-wrapper', context).transition(states['#page-wrapper'].closed_v, 'slow');
      $('.toc-action a, .toc-action', context).transition({ color: 'darkgray'}, 'slow');   
      $('#toc .level-0', context).hide();
      $('#toc-collapse-toggle i', context).removeClass( "fa-chevron-left" ).addClass( "fa-chevron-right" ).transition({ color: 'darkgray', 'padding-left': '0px'}, 'slow');
      state = 'closed_v';   
    }
    
    function tocOpenVert(){
      $('#toc', context).transition(states['#toc'].open_v, 'slow');   
      $('#page-wrapper', context).transition(states['#page-wrapper'].open_v, 'slow');   
      $('.toc-action a, .toc-action', context).transition({ color: '#c8c8c8'}, 'slow');   
      $('#toc .level-0', context).show();
      $('#toc-collapse-toggle i', context).removeClass( "fa-chevron-right" ).addClass( "fa-chevron-left" ).transition({ color: '#c8c8c8', 'padding-left': '0px'}, 'slow');
      state ='open_v';
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
				if (ww <= 800) { tocCloseVert(); }
				else { tocOpenVert(); }
    	}
    	else { 
    		$('#main', context).addClass('mobile');
    		$('#toc-collapse-toggle', context).hide();
    		$('#toc-edit', context).hide();
    		$('.toc-action i', context).removeClass('fa-2x').addClass('fa-3x');
    		tocCloseHoriz(); 
    	}
    	$('#toc', context).css('display','block');
    	$('#page-wrapper', context).css('display','block');
    });
    
    // TOC Toggles
    
    $('#toc-collapse-toggle', context).click(function(){
    	state == 'closed_v' ? tocOpenVert() : tocCloseVert();
    });
    
		$('#toc-collapse-toggle-h', context).click(function(){
    	state == 'closed_h' ? tocOpenHoriz() : tocCloseHoriz(); 
    });

    // Show visible articles on TOC
    
    $('article').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
      var toc_target = "#toc a[href='#"+ $(this).attr('id') +"']";
      if (isInView) {
        $(toc_target).css('color','orange'); // The new black
      } 
      else {
        $(toc_target).css('color','#C8C8C8'); // rgb(200,200,200)
      }
    });
    
    // Collapse vertical menu on non-mobiles on window width shrink
    
    $(window).resize(function(){
    	var ww = $(window).width();
			!mobile && ww < dims.wbreak && state == 'open_v' ? tocCloseVert() : 0;
    });
  
  	// Close menu after clicking on link when in mobile mode
  	
    $('#toc a', context).click(function(e){
			e.preventDefault(); 
    	var target = $(this).attr('href');
			var y = $(target).position().top;
			window.scrollTo(0, y);
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

