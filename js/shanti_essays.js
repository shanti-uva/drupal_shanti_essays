(function($){

Drupal.behaviors.shantiEssays = {
  
  attach: function (context, settings) {   
  
    var kwic_n = Drupal.settings.shantiEssays.kwic_n;
    if (kwic_n) {
      // If there is a kwic number ...
      location.href = '#' + 'shanti-essays-search-hit-' + kwic_n;
    } else {
      // This handles scrolling to anchors which doesn't otherwise work  
      location.href = '#' + window.location.hash.substr(1);
    }
    
    $('#shanti-essays-sidebar-tabs li.first a').tab('show'); // Bootstrap
    
    $('#shanti-essays-sidebar').css('display','block');      

    $('.toc-item-node', context).localScroll({
      target:'#shanti-essays-body',
      duration: 10,
    });
    
  },

  detach: function (context, settings) {
  
  },

};
  
})(jQuery);