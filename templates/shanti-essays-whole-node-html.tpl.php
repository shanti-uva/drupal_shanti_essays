<div id="book-node-<?php print $node->nid; ?>" class="book-section section-<?php print $depth; ?>">
  <h1 class="book-heading"><?php print $title; ?></h1>  
  <?php #print render($book_edit_menu); ?>
  <?php print $content; ?>
  <?php print $children; ?>
</div>