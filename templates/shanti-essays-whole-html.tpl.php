<nav name='toc' id='toc' class='open'>
  
  <div id='toc-menu'>
    <span class="toc-action" id="toc-collapse-toggle"><i class="fa fa-chevron-left fa-2x"></i></span>
    <span class="toc-action" id="toc-collapse-toggle-h"><i class="fa fa-bars fa-2x"></i></span>
    <span class="toc-action" id="toc-edit"><a href="/node/<?php print $book_id; ?>"><i class="fa fa-2x fa-book"></i></a></span>
    <span class="toc-action" id="toc-go-home"><a href="/"><i class="fa fa-home fa-2x"></i></a></span>
  </div>

  <ul class='level-0'>
  <?php print $toc_block; ?>
  </ul>
  <div id='log'></div>
  
</nav>

<section id="book-content">
  <?php print $contents; ?>
</section>