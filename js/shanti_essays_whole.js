(function($){
  
Drupal.behaviors.shantiEssaysWhole = {
  attach: function (context, settings) {
 
    // Toggle Pages
    /*
    $('.head-toggle').click(function(e){
      var label = $(this).text();
      var id    = $(this).parent().parent().attr("id");
      var sel   = '#' + id + ' .book-content'; 
      $(sel).slideToggle("fast");
    });
    */
 
    // Toggle Sidebar
    $('#toc-collapse-toggle').toggle(
      function(){
        $('#toc').transition({ width: '10px'}, 'slow');   
        $('#page-wrapper').transition({ left: '50px'}, 'slow');   
        $('#toc h1').transition({ color: 'darkgray'}, 'slow');   
        $('#toc .level-0').hide();
        $('#toc-edit').hide();
        $('#toc-collapse-toggle').removeClass( "fa-caret-square-o-left" ).addClass( "fa-caret-square-o-right" ).transition({ color: 'darkgray'}, 'slow');
      },
      function(){
        $('#toc').transition({ width: '220px'}, 'slow');
        $('#page-wrapper').transition({ left: '260px'}, 'slow');   
        $('#toc h1').transition({ color: 'white'}, 'slow');   
        $('#toc .level-0').show();
        $('#toc-edit').show();
        $('#toc-collapse-toggle').removeClass( "fa-caret-square-o-right" ).addClass( "fa-caret-square-o-left" ).transition({ color: 'white'}, 'slow');
      }
    );
    
    // Some mobile stuff
    /*
    var isPad = navigator.userAgent.match(/(iPad|Nexus)/i) != null;
    if (isPad) {
      $('#toc *').css('font-size',"110%");
    }
    */

    // Diagnostics
    //$("#log").html(navigator.userAgent);
    /*
    var ww = $(window).width();
    var wh = $(window).height();
    $('#log').html('<br />W: ' + ww + '<br/>H: ' + wh + '<br/>');  
    window.onresize = function (e){
      ww = $(window).width();
      wh = $(window).height();
      $('#log').html('<br />W: ' + ww + '<br/>H: ' + wh + '<br/>');  
    }
    */
    
    /*
    elements = ['#page-wrapper','#page','#main-wrapper','#main','#content','.section'];
    $('#log').append('<table></table>');
    for (el in elements) {
      path = elements[el];
      $('#log table').append('<tr><td>' + path + '</td><td>' + $(path).width() + "</td></tr>")
    }
    */
  }
  
};

  
})(jQuery);