(function($){
  
Drupal.behaviors.shantiEssaysWhole = {
  attach: function (context, settings) {
 
    /*
    ww = $(window).width();
    if (ww > 768) tocOpenVert();
    else tocCloseHoriz();
    */
    
    /// STATES ///
    var state = '';
    
    var states = {
      '#toc': {
        'closed_v': {
          'width':          '20px',
          'height':         '100%',
          'padding-left':   '.25em'
        },
        'open_v': {
          'width':          '220px',
          'height':         '100%',
          'padding-left':   '1em',
          'padding-top':    '1em'         
        },
        'closed_h': {
          'top':            '0px',
          'height':         '40px',
          'width':          '100%',
          'padding-top':    '1em',
          'padding-left':   '1em'
        },
        'open_h': {
          'width':          '100%',
          'height':         '100%',
          'top':            '0px',
          'padding-left':   '1em',
          'padding-top':    '1em'                   
        },
        'push_out': {
          'margin-left':    '-250px'
        },
        'pull_in': {
          'margin-left':    '0px'
        }
        
      },
      '#page-wrapper': {
        'closed_v': {
          'top':            '0px',
          'left':           '60px',
          'margin-right':   '60px',
          'padding-right':  '1.5em',
          'padding-left':   '1.5em'          
        },
        'closed_h': {
          'top':            '60px',
          'left':           '0px',
          'margin-right':   '0px',
          'padding-right':  '1em',
          'padding-left':   '1em'
        },
        'open_v': {
          'top': '0px',
          'left': '250px',
          'margin-right':   '250px',
          'padding-right':  '2em',
          'padding-left':   '2em'
        },
        'open_h': {
          'top':            '60px',
          'left':           '0px',
          'margin-right':   '0px',
          'padding-right':  '1em',
          'padding-left':   '1em'          
        },
        'push_out': {
          'left':           '0px'
        },
        'pull_in': {
          'left':           '250px'          
        }
      }
    };
    
    //// TRANSITIONS (which employ STATES) ////
    
    function tocCloseHoriz(){
      $('#toc').transition(states['#toc'].closed_h, 'slow');
      $('#page-wrapper').transition(states['#page-wrapper'].closed_h, 'slow');      
      $('#toc h1').transition({ color: 'darkgray'}, 'slow');   
      $('.toc-action a, .toc-action').transition({ color: 'darkgray'}, 'slow');   
      $('#toc .level-0').hide();
      $('#toc-edit').hide();
      $('#toc-collapse-toggle-h i').removeClass( "fa-chevron-up" );
      $('#toc-collapse-toggle-h i').addClass( "fa-bars" ).transition({ color: 'darkgray'}, 'slow');
      state = 'closed_h';   
    }
    
    function tocOpenHoriz(){
      $('#toc').transition(states['#toc'].open_h, 'slow');   
      $('#page-wrapper').transition(states['#page-wrapper'].open_h, 'slow');   
      $('#toc h1').transition({ color: '#c8c8c8'}, 'slow');   
      $('.toc-action a, .toc-action').transition({ color: '#c8c8c8'}, 'slow');   
      $('#toc .level-0').show();
      $('#toc-collapse-toggle-h i').removeClass( "fa-bars" );
      $('#toc-collapse-toggle-h i').addClass( "fa-chevron-up" ).transition({ color: '#c8c8c8'}, 'slow');
      state = 'open_h';
    }
    
    function tocCloseVert(){
      $('#toc').transition(states['#toc'].closed_v, 'slow');
      $('#page-wrapper').transition(states['#page-wrapper'].closed_v, 'slow');
      $('#toc h1').transition({ color: 'darkgray'}, 'slow');   
      $('.toc-action a, .toc-action').transition({ color: 'darkgray'}, 'slow');   
      $('#toc .level-0').hide();
      $('#toc-collapse-toggle i').removeClass( "fa-chevron-left" ).addClass( "fa-chevron-right" ).transition({ color: 'darkgray', 'padding-left': '5px'}, 'slow');
      state = 'closed_v';   
    }
    
    function tocOpenVert(){
      $('#toc').transition(states['#toc'].open_v, 'slow');   
      $('#page-wrapper').transition(states['#page-wrapper'].open_v, 'slow');   
      $('#toc h1').transition({ color: '#c8c8c8'}, 'slow');   
      $('.toc-action a, .toc-action').transition({ color: '#c8c8c8'}, 'slow');   
      $('#toc .level-0').show();
      $('#toc-collapse-toggle i').removeClass( "fa-chevron-right" ).addClass( "fa-chevron-left" ).transition({ color: '#c8c8c8', 'padding-left': '0px'}, 'slow');
      state ='open_v';
    }
    
    function tocPushOut() {
      $('#toc').transition(states['#toc'].push_out, 'slow');
      $('#page-wrapper').transition(states['#page-wrapper'].push_out, 'slow');
    }
    
    function tocPullIn() {
      $('#toc').transition(states['#toc'].pull_in, 'slow');      
      $('#page-wrapper').transition(states['#page-wrapper'].pull_in, 'slow');
    }
    
    
    /// EVENTS (which trigger TRANSITIONS) ///
    
    
    $('#toc-collapse-toggle').toggle(
      function(){tocCloseVert();}, 
      function(){tocOpenVert();}
    );
    
    $('#toc-collapse-toggle-h').toggle(
      function(){tocOpenHoriz();},
      function(){tocCloseHoriz();} 
    );

    $('#toc a').click(
      function(){
        window.location = $(this).attr('href');
        ww = $(window).width();
        if (ww <= 768) {
          tocCloseHoriz();
          $('html, body').transition({scrollDown: '40px'}, 800);
        }
      }
    );
     
    /*
    $(window).resize(function(){
      if ($(this).width() <= 768) tocCloseHoriz();
      else if ($(this).width() > 768) tocOpenVert();
    });
    */
   



    // Some mobile stuff
    var isPad = navigator.userAgent.match(/(iPad|Nexus|iPhone|Android)/i) != null;
    if (isPad) {
      $('#toc *').css('font-size',"110%");
    }

    // Diagnostics
    /*
        
    $("#log").html(navigator.userAgent);

    var ww = $(window).width();
    var wh = $(window).height();
    $('#log').html('<br />W: ' + ww + '<br/>H: ' + wh + '<br/>');  
    window.onresize = function (e){
      ww = $(window).width();
      wh = $(window).height();
      $('#log').html('<br />W: ' + ww + '<br/>H: ' + wh + '<br/>');  
    } 
    */  
   
   // Show visible articles on TOC
   $('article').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
     var toc_target = "#toc a[href='#"+ $(this).attr('id') +"']";
     if (isInView) {
       $(toc_target).css('color','orange'); // The new black
     } else {
       $(toc_target).css('color','#C8C8C8'); // rgb(200,200,200)
     }
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