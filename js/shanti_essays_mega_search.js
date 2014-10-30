(function($){
       
Drupal.behaviors.shantiEssaysMegaSearch = {
  
  attach: function (context, settings) {
    
    var textList = $("<ul></ul>");
    var searchBox = $('.shanti-essays-mega-search-box');
    var searchForm = $("<div id='shanti-essays-mega-search-box-form'></div>");
    searchBox.append(searchForm);
    searchForm.append("<input type='text'></input>");
    searchForm.append("<input type='radio'>full text</input>");
    searchForm.append("<input type='radio'>by title</input>");
    searchForm.append("<button>Search</button>");
    
    $('#shanti-essays-mega-search-box-form button').live('click', function(){
      var inputValue = $('#shanti-essays-mega-search-box-form input').val();
      console.log("On!: " + inputValue);
    });
    
    $.getJSON('/shanti_essays/mega_search/0/0', function(data){
      for (var nid in data) {
        textList.append("<li><a class='shanti-essays-mega-search-link' href='/node/"+nid+"' data-nid='" + nid + "'>" + data[nid].link_title + "</a></li>");
      }
      $('.shanti-essays-mega-search-box').append(textList);
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

