<?php //kpr($content); ?>
<?php //kpr($node); ?>
<?php //kpr($book); ?>
<?php //kpr($shanti_essays); ?>

<div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>

<!-- MODEL:
node
  shanti-essay-page-toc
  shanti-essay-page-content
    shanti-essay-page-content-body
    shanti-essay-page-content-body-footer
      shanti-essay-page-links
      shanti-essay-page-navigation 
--> 

<div id="shanti-essay-page-content">
  <div id="shanti-essay-page-content-body">
  <?php print render($content['links']); ?>
  <?php print render($content['body']); ?>
  </div>
  <div id="shanti-essay-page-content-body-footer">
    <div id="shanti-essay-page-navigation"><?php print render($content['book_navigation']); ?></div>    
    <div id="shanti-essay-page-links"><?php print render($content['links']); ?></div>
  </div>
</div>

<div id="shanti-essay-page-toc">
<?php print "<a href='". $shanti_essays['book_url'] ."'>" . $shanti_essays['book_title'] . "</a>"; // Should be put in a render array, I know. ?>
<?php print render(book_explorer_block_view()); ?>
</div>


  <?php print render($title_prefix); ?>
  <?php if (!$page): ?>
    <h2<?php print $title_attributes; ?>>
      <a href="<?php print $node_url; ?>"><?php print $title; ?></a>
    </h2>
  <?php endif; ?>
  <?php print render($title_suffix); ?>


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
      <?php print $links; ?>
    </div>
  <?php endif; ?>

  <?php if ($display_submitted): ?>
    <div class="meta submitted">
    <?php print $user_picture; ?>
    <?php print $submitted; ?>
    </div>
  <?php endif; ?>  
  </div>
  
<!--
  <div class="content clearfix"<?php print $content_attributes; ?>>
    <?php
      // We hide the comments and links now so that we can render them later.
      hide($content['comments']);
      hide($content['links']);
      print render($content);
    ?>
  </div>
  <?php
    // Remove the "Add new comment" link on the teaser page or if the comment
    // form is being displayed on the same page.
    if ($teaser || !empty($content['comments']['comment_form'])) {
      unset($content['links']['comment']['#links']['comment-add']);
    }
  ?>
  <?php print render($content['comments']); ?>
-->


</div>