(function($){
       
Drupal.behaviors.shantiEssaysMegaSearch = {
  
  attach: function (context, settings) {
    
    var text_list = $("<ul></ul>");
    
    $.getJSON('/shanti_essays/mega_search/0/0', function(data){
      for (var nid in data) {
        text_list.append("<li><a class='shanti-essays-mega-search-link' href='/node/"+nid+"' data-nid='" + nid + "'>" + data[nid].link_title + "</a></li>");
      }
      $('.shanti-essays-mega-search-box').append(text_list); 
    });
    
    /*
    $('.shanti-essays-mega-search-link').live('click', function(){
      var nid = $(this).data('nid');
      var flyOutState = $('#gen-search').hasClass('isOpened'); // NOW DEPENDS ON THEME ... GRRRR
      console.log(nid);
      console.log(flyOutState);
      // BUT THIS WILL NOT BE THE SAME IN ALL THEMES!!!!
      //$("section.content-section article.tab-pane").load("/shanti_essays/node_ajax_local/" + nid);
    });
    */
  }, 
      
  detach: function (context, settings) {
    
  }, 

};
  
})(jQuery);

