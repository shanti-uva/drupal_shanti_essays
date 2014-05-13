<?php
  /**
   * The given node is /embedded to its absolute depth in a top level
   * section/. For example, a child node with depth 2 in the hierarchy is
   * contained in (otherwise empty) &lt;div&gt; elements corresponding to
   * depth 0 and depth 1. This is intended to support WYSIWYG output - e.g.,
   * level 3 sections always look like level 3 sections, no matter their
   * depth relative to the node selected to be exported as printer-friendly
   * HTML.
   */
  $div_close = '';
?>
  <div name='toc' id='toc'>
    <button>Contents</button>
    <ul class='level-0'>
    <?php print $toc_block; ?>
    </ul>
  </div>

  <?php for ($i = 1; $i < $depth; $i++): ?>
  <div class="book section-<?php print $i; ?>">
  <?php $div_close .= '</div>'; ?>
  <?php endfor; ?>
  <?php print $contents; ?>
  <?php print $div_close; ?>