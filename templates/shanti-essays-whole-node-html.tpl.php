<?php

/**
 * @file
 * Default theme implementation for a single node in a printer-friendly outline.
 *
 * @see book-node-export-html.tpl.php
 * Where it is collected and printed out.
 *
 * Available variables:
 * - $depth: Depth of the current node inside the outline.
 * - $title: Node title.
 * - $content: Node content.
 * - $children: All the child nodes recursively rendered through this file.
 *
 * @see template_preprocess_book_node_export_html()
 *
 * @ingroup themeable
 */
?>
<article id="node-<?php print $node->nid; ?>" class="book-section section-<?php print $depth; ?>">
  
  <h1 class="book-heading"><?php print $title; ?></h1>
  
  <div class="book-edit-menu">
    <a class='head-toggle action'>VIZ</a>
    <!-- |<a class='toc-return action' href='#toc'>TOC</a> -->  
    | <?php print l(t('EDIT'),url("node/{$node->nid}/edit",array('absolute' => TRUE, 'query' => array('destination' => "shanti_essays/whole/{$node->book['bid']}"), 'fragment' => "node-{$node->nid}")),array('attributes' => array('class' => 'action'))); ?>
  </div>
  
  <div class="book-content">
  <?php print $content; ?>
  </div>
  
  <?php print $children; ?>
  
</article>
