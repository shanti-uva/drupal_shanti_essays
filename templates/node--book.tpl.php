<?php //kpr($node); ?>
<?php //kpr($book); ?>
<?php //kpr($shanti_essays); ?>
<?php //kpr($content['links']['book']); ?>

<div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>
<div id="shanti-essay-page-content">
  <div id="shanti-essay-page-content-body-header">
    <div id="shanti-essay-page-navigation"><?php print render($content['book_navigation']); ?></div>    
    <!-- <div id="shanti-essay-page-links"><?php print render($content['links']); ?></div> -->
  </div>
  <div id="shanti-essay-page-content-body">
    <?php
      if (isset($content['field_book_content'])) {
        print render($content['field_book_content'][0]['#markup']); 
      } else {
        print book_children($node->book);
      } 
    ?>
  </div>
  <div id="shanti-essay-page-content-body-footer">
    <div id="shanti-essay-page-extra">
  <?php
    // Remove the "Add new comment" link on the teaser page or if the comment
    // form is being displayed on the same page.
    if ($teaser || !empty($content['comments']['comment_form'])) {
      unset($content['links']['comment']['#links']['comment-add']);
    }
    // Only display the wrapper div if there are links.
    $links = render($content['links']);
    if ($links):
  ?>
  
    <div class="link-wrapper">
      <?php // print $links; ?>
    </div>
  <?php endif; ?>

  <?php if ($display_submitted): ?>
    <div class="meta submitted">
    <?php print $user_picture; ?>
    <?php print $submitted; ?>
    </div>
  <?php endif; ?>  
  </div>

  </div>
</div>

<div id="shanti-essay-page-toc" class="">
  <?php print "<a class='book-outline-title' href='". $shanti_essays['book_url'] ."'>" . $shanti_essays['book_title'] . "</a>"; // Should be put in a render array, I know. ?>
  <?php print render(book_explorer_block_view()); ?>
  <?php print render($content['links']['book']); ?>
</div>

<div>
  <?php print render($title_prefix); ?>
  <?php if (!$page): ?>
    <h2<?php print $title_attributes; ?>>
      <a href="<?php print $node_url; ?>"><?php print $title; ?></a>
    </h2>
  <?php endif; ?>
  <?php print render($title_suffix); ?>
</div>