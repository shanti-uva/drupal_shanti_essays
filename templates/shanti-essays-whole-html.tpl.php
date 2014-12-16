<div id="book-content">
  <?php print $contents; ?>
</div>
<div name='toc' id='toc' class='open'>
  <!-- <div id="toc-bar"></div> -->
  <ul class='level-0'>
  <?php print $toc_block; ?>
  </ul>
  <?php print drupal_render($description); ?>
</div>