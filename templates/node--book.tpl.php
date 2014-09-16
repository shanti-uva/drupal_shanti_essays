<?php if ($teaser): ?><?php print render($content); ?>
<?php else: ?><div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> clearfix" <?php print $attributes; ?>>
  <div id="shanti-essays-container">
    <div id="shanti-essays-body">
      <?php print $content['shanti_essays']['body']; ?>
    </div>
    <div id="shanti-essays-sidebar">
      <ul style="width:100%;">
        <li><a href="#shanti-essays-toc">Contents</a></li>
        <li><a href="#shanti-essays-meta">Metadata</a></li>
        <li><a href="#shanti-essays-links">Actions</a></li>
      </ul>
      <div id="shanti-essays-meta">
        <?php print render($content['shanti_essays']['meta']); ?>
      </div>
      <div id="shanti-essays-toc">
        <h4 class="shanti-essays-toc-label">Contents</h4>
        <?php print $content['shanti_essays']['toc']; ?>
      </div>
      <div id="shanti-essays-links">
        <?php print render($content['links']['shanti_essays']['viewers']); ?>    
      </div>
    </div>
  </div>
</div><?php endif; ?>