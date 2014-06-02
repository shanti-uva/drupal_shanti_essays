<div id="header" class="closed"></div>

<div id="sidebar" class="open">
  
	<div id="sidebar-dragbar"></div>
  
  <div id="sidebar-tabs">
    <ul id="sidebar-tabs-menu">
      <li><a href="#sidebar-toc">Contents</a></li>
      <li><a href="#sidebar-notes">Notes</a></li>
      <li><a href="#sidebar-info">Info</a></li>
      <li><a href="#sidebar-index">Index</a></li>
    </ul>
    <div id='sidebar-toc'>
      <ul class='level-0'>
        <?php print $toc_block; ?>
      </ul>
    </div>
    <div id="sidebar-notes">NOTES GO HERE</div>
    <div id="sidebar-info">INFO (frontmatter) GOES HERE</div>
    <div id="sidebar-index">INDEX GOES HERE</div>
  </div>

</div>

<div id="book-content" class="open">
  <?php print $contents; ?>
</div>

<div id="footer" class="closed"></div>