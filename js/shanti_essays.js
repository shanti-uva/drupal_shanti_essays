(function($){

Drupal.behaviors.shantiEssays = {

  attach: function (context, settings) {   
    
    $('#shanti-essays-sidebar').tabs();
        
    $('.toc-item-node').localScroll({
      target:'#shanti-essays-body',
    });
    
  },

  detach: function (context, settings) {
  
  },

};
  
})(jQuery);