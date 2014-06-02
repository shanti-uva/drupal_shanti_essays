(function($){
  
var dims = {
  wbreak:       800,
  hbreak:       400,
  toc_open_w:   300, 
  toc_close_w:  20
};

var colors = {
  toc_bg:         'rgba(50,50,50,.85)',
  toc_btn_open:   '#c8c8c8',
  toc_btn_close:  'darkgray'
};

var state       = '';  
var device_type = '';
  
Drupal.behaviors.shantiEssaysReader = {
  
  attach: function (context, settings) {
    
    // Init
    device_type = getDeviceType();
    $('#log').html(window.innerWidth);
    if (device_type == 'not mobile') {
      if (window.innerWidth <= dims.wbreak) { 
         
      }
      else { 
         
      }
    }
    else { 
      $('body').addClass('mobile');
    }
    
  	}
  	
};

function getDeviceType(){
  if (window.innerWidth <= dims.wbreak && window.innerHeight <= dims.hbreak) {
    return 'mobile';
  }
  else {
    return 'not mobile';
  } 
}

})(jQuery);