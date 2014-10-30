(function($){

Drupal.behaviors.shantiEssays = {
  
  attach: function (context, settings) {   
    $('#shanti-essays-sidebar').tabs();
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