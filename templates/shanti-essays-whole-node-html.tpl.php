<div id="node-<?php print $node->nid; ?>" class="book-section section-<?php print $depth; ?>">
  <h1 class="book-heading"><?php print $title; ?></h1>
  <div class="book-edit-menu">
    <a href="/node/<?php print $node->nid; ?>/edit?destination=shanti_essays/whole/<?php print $node->book['bid']?>#node-<?php print $node->nid; ?>">
      <i class="fa fa-edit fa-lg"></i>
    </a>
  </div>
  <?php print $content; ?>
  <?php print $children; ?>
</div>