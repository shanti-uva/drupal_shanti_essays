<div name='toc' id='toc' class='open'>
  
	<div id="toc-bar"></div>
  
  <div id='toc-menu'>
    <span class="toc-action openonly" id="toc-adjust-width">
    	<i class="fa fa-caret-square-o-left fa-lg"></i>
    </span>
  <!--
    <span class="toc-action" id="toc-collapse-toggle"><i class="fa fa-chevron-left fa-lg"></i></span>
  -->
    <span class="toc-action" id="toc-collapse-toggle-h"><i class="fa fa-bars fa-lg"></i></span>
    <span class="toc-action" id="toc-reorder"><?php print render($toc_menu['links']['toc-reorder']); ?></span>
    <span class="toc-action" id="toc-go-home"><a href="/"><i class="fa fa-home fa-lg"></i></a></span>
  </div>

  <ul class='level-0'>
  <?php print $toc_block; ?>
  </ul>
    
  <div id='log'></div>
</div>

<div id="book-content">
  <?php print $contents; ?>
</div>