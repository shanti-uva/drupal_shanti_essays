(function($){
  
Drupal.behaviors.shantiEssays = {
  attach: function (context, settings) {

    // Just testing things out ...
    $('#shanti-essay-page-marginalia').html("We're in. Now what?");
    
    // Get the actual height of the containing div for the SHANTI Essays 'app'
    // and set the TOC div to that height in CSS
    divHeight = $('#node-' + Drupal.settings.shantiEssays.book.nid).height();
    $('.node-book').css('height', divHeight);
  
  }
};
  
})(jQuery);