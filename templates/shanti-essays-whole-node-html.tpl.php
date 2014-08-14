<div id="node-<?php print $node->nid; ?>" class="book-section section-<?php print $depth; ?>">
  <h1 class="book-heading"><?php print $title; ?></h1>  
  <div class="book-edit-menu">
    <span class="page-menu-action" id="toc-edit-page">
      <?php print render($book_edit_menu['links']['toc-edit-page']); ?>
		</span>
  	<span class="page-menu-action" id="toc-add-child-page">
		  <?php print render($book_edit_menu['links']['toc-add-child-page']); ?>
  	</span>
  </div>
  <?php print $content; ?>
  <?php print $children; ?>
</div>