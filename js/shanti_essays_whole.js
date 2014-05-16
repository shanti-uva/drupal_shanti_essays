(function($){
  
Drupal.behaviors.shantiEssaysWhole = {
  attach: function (context, settings) {
    
    // Toggle TOC
    $('#toc button').click(function(e){
      $('#toc ul').slideToggle("fast");
    });
    
    // Toggle Pages
    $('.head-toggle').click(function(e){
      // Get parent attribute?
      var label = $(this).text();
      var id = $(this).parent().parent().attr("id");
      var sel = '#' + id + ' .book-content'; 
      $(sel).slideToggle("fast");
    });
    
     $("#toc h1").toggle(
      function(){
        $('#toc').transition({ width: '10px'}, 'slow');   
        $('#toc h1').transition({ color: 'darkgray'}, 'slow');   
        $('#toc .level-0').hide();
      },
      function(){
        $('#toc .level-0').show();
        $('#toc').transition({ width: '250px'}, 'slow');
        $('#toc h1').transition({ color: 'white'}, 'slow');   
      }
    );

    // TEST
    //target_id = $('.section-1').attr('id');
    //$('#content').prepend("<div id='left-toc' style='position:fixed;bottom:0px;overflow:hidden;width:200px;height:100%;top:0px;left:0;background-color:rgba(0,0,0,.5);float:left;'>BOO</div>");
    //h5o = HTML5Outline(document.getElementById(target_id));
    //$('#left-toc').html(h5o.asHTML(true));    
  }
};

  
})(jQuery);