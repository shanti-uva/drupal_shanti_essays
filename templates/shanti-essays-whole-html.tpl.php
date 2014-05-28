
<nav name='toc' id='toc' class='open'>
  <div id='toc-menu'>
    <span class="toc-action" id="toc-collapse-toggle"><i class="fa fa-chevron-left fa-lg"></i></span>
    <span class="toc-action" id="toc-collapse-toggle-h"><i class="fa fa-bars fa-lg"></i></span>
    <!--
    <span class="toc-action openonly" id="toc-increase"><i class="fa fa-plus fa-lg"></i></span>
    <span class="toc-action openonly" id="toc-decrease"><i class="fa fa-minus fa-lg"></i></span>
    -->
    <span class="toc-action" id="toc-edit"><a href="/node/<?php print $book_id; ?>"><i class="fa fa-lg fa-book"></i></a></span>
    <span class="toc-action" id="toc-go-home"><a href="/"><i class="fa fa-home fa-lg"></i></a></span>
  </div>

  <ul class='level-0'>
  <?php print $toc_block; ?>
  </ul>
  <div id='log'></div>

</nav>

<section id="book-content">
  <?php print $contents; ?>
</section>