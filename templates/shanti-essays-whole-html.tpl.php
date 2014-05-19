<div name='toc' id='toc'>
  
  <div>
  <span class="toc-action"><i id="toc-collapse-toggle" class="fa fa-caret-square-o-left fa-lg"></i></span>
  <span class="toc-action"><a id="toc-edit" href="/node/<?php print $book_id; ?>/reorder"><i class="fa fa-lg fa-book"></i></a></span>
  </div>
  <br />
  
  <h1>CONTENTS</h1>
  <ul class='level-0'>
  <?php print $toc_block; ?>
  </ul>
  
  <div id='log'></div>
  
</div>

<section id="book-content">
  <?php print $contents; ?>
</section>