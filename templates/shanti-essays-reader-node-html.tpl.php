<div id="node-<?php print $node->nid; ?>" class="book-node level-<?php print $depth; ?>">
  <h1 class="book-heading"><?php print $title; ?></h1>
  <div class="book-edit-menu"></div>
  <?php print $content; ?>
  <?php print $children; ?>
</div>