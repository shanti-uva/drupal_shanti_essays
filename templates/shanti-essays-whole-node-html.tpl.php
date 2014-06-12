<div id="node-<?php print $node->nid; ?>" class="book-section section-<?php print $depth; ?>">
  <h1 class="book-heading"><?php print $title; ?></h1>
  
  <!-- Create this as a link in a render array -->
  <div class="book-edit-menu">
    <span class="page-menu-action" id="toc-edit-page">
    <?php print render($book_edit_menu['links']['toc-edit-page']); ?>
    <!--
			<a title="Edit this page" href="/node/<?php print $node->nid; ?>/edit?destination=shanti_essays/whole/<?php print $node->book['bid']?>#node-<?php print $node->nid; ?>">
				<i class="fa fa-edit fa-lg"></i>
			</a>
		-->
		</span>
  	<span class="page-menu-action" id="toc-add-child-page">
		<?php print render($book_edit_menu['links']['toc-add-child-page']); ?>
  	<!--
  		<a title="Add a child page" href="/node/add/book?parent=<?php print $node->nid; ?>?destination=shanti_essays/whole/<?php print $node->book['bid']?>#node-<?php print $node->nid; ?>">
  			<i class="fa fa-plus fa-lg"></i>
  		</a>
  		-->
  	</span>
  </div>
  
  <?php print $content; ?>
  <?php print $children; ?>
</div>