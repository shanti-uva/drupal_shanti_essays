<!-- NODE START -->
<div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> clearfix" <?php print $attributes; ?>>

  <!-- ESSAY CONTENT START -->
  <div id="shanti-essay-page-content">
    
    <!-- ESSAY CONTENT HEADER START -->
    <div id="shanti-essay-page-content-body-header">
      <div class="shanti-essay-page-navigation">
      <?php print render($content['book_navigation']); ?>
      </div>    
      <!-- <div id="shanti-essay-page-links"><?php print render($content['links']); ?></div> -->
    </div><!-- ESSAY CONTENT HEADER END -->
  
    <!-- ESSAY CONTENT BODY START -->
    <div id="shanti-essay-page-content-body">
    <?php
    if (isset($content['field_book_content'])) { print render($content['field_book_content'][0]['#markup']); } 
    else { print book_children($node->book);} 
    ?>
    </div><!-- ESSAY CONTENT BODY END -->
    
    <!-- ESSAY CONTENT FOOTER START -->
    <div id="shanti-essay-page-content-body-footer">
      <div class="shanti-essay-page-navigation">
      <?php print render($content['book_navigation']); ?>
      </div>    
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
  </div><!-- ESSAY CONTENT FOOTER END -->

  </div><!-- ESSAY CONTENT END -->

  <!-- ESSAY TOC START -->
  <div id="shanti-essay-page-toc" class="">
    <?php print "<a class='book-outline-title' href='". $shanti_essays['book_url'] ."'>" . $shanti_essays['book_title'] . "</a>"; // Should be put in a render array, I know. ?>
    <?php print render(book_explorer_block_view()); ?>
    <?php if (user_access('add content to books')) print render($content['links']['book']); ?>
    <?php print render($content['links']['essays']['viewers']); ?>
    <?php print render(field_view_field('node',$node,'field_kmap_term','default')); ?>
  </div>
  <!-- ESSAY TOC END -->

  <!-- TITLE PREFIX START -->
  <?php print render($title_prefix); ?><!-- TITLE PREFIX END -->

  <?php if (!$page): ?>
    <!-- NON-PAGE TITLE START -->
    <h2<?php print $title_attributes; ?>>
      <a href="<?php print $node_url; ?>"><?php print $title; ?></a>
    </h2><!-- NON-PAGE TITLE START -->
  <?php endif; ?>

  <!-- TITLE SUFFIX START -->
  <?php print render($title_suffix); ?><!-- TITLE SUFFIX END -->

</div><!-- NODE END -->