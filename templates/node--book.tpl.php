<?php if ($teaser): ?><?php print render($content); ?>
<?php else: ?><div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> clearfix" <?php print $attributes; ?>>
  <?php print render($content['shanti_essays_container']); ?>
</div><?php endif; ?>