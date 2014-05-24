<article id="node-<?php print $node->nid; ?>" class="book-section section-<?php print $depth; ?>">
  
  <h1 class="book-heading"><?php print $title; ?>
    <a style="float:right;color:darkgray;" href="/node/<?php print $node->nid; ?>/edit?destination=shanti_essays/whole/<?php print $node->book['bid']; ?>#node-<?php print $node->nid; ?>">
      <i class="fa fa-pencil-square"></i>
    </a>
  </h1>
  
  <div class="book-edit-menu">
    <!-- <a class='head-toggle action'>VIZ</a> -->
    <!-- |<a class='toc-return action' href='#toc'>TOC</a> -->
    <?php //print li("<i class='fa fa-pencil'></a>",url("node/{$node->nid}/edit",array('absolute' => TRUE, 'query' => array('destination' => "shanti_essays/whole/{$node->book['bid']}"), 'fragment' => "node-{$node->nid}")),array('attributes' => array('class' => 'action'))); ?>
  </div>
  
  <div class="book-content">
  <?php print $content; ?>
  </div>
  
  <?php print $children; ?>
  
</article>
