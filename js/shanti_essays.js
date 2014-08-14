(function($){
  
Drupal.behaviors.shantiEssays = {
  attach: function (context, settings) {

    // Get the actual height of the containing div for the SHANTI Essays 'app'
    // and set the TOC div to that height in CSS
    //divHeight = $('#node-' + Drupal.settings.shantiEssays.book.nid).height();
    //$('.node-book').css('height', divHeight + 50);
    
    // Keep the nav bar at the top
    var bookHeader = $("#shanti-essay-page-content-body-header");
    var o = bookHeader.offset();  
    var w = bookHeader.width();    
    var h = bookHeader.height();

    /*
    var bookToc = $("#shanti-essay-page-toc");
    var o1 = bookToc.offset();  
    var w1 = bookToc.width();    
    var h1 = bookToc.height();
    */

    var x = $('#admin-menu').height();
    console.log(x);
    //$('#shanti-essay-page-content-body').css("margin-top",h+10);   

    $(window).scroll(function() {
      var wpos = $(window).scrollTop();
      if (wpos >= o.top) {
          
          bookHeader.css("position","fixed");
          bookHeader.css("top",x);
          bookHeader.css("width",w);
          /*
          bookToc.css("position","fixed");
          bookToc.css("top",x);
          bookToc.css("width",w1);
          */
          
      } else {
          bookHeader.css("position","absolute");
          /*
          bookToc.css("position","absolute");
          bookToc.css("margin-left","6.5in");
          */
      }
      
    });
    
  }
};
  
})(jQuery);