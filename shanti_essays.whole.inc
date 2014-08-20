<?php 

/**
 * The function creates a single page out of all the nodes that compose a
 * book. It also generates a table of contents and then passes these to
 * two templates, very much as the default book print function works.
 */
function shanti_essays_whole($nid) {
  $node = node_load($nid);
  if (!$node) { return MENU_NOT_FOUND; }
  if (!node_access('view', $node)) { return MENU_ACCESS_DENIED; }
  if (user_access('access content')) {
    if (isset($node->book)) {
      $tree         = book_menu_subtree_data($node->book);
      $contents     = book_export_traverse($tree, 'shanti_essays_whole_node');            
      $toc_block    = book_export_traverse($tree, 'shanti_essays_whole_toc');
      $book_id      = $node->book['bid'];
      return theme('shanti_essays_whole_html', array('title' => $node->title, 'book_id' => $book_id, 'contents' => $contents, 'toc_block' => $toc_block, 'depth' => $node->book['depth']));
    } 
    else { drupal_not_found(); }
  } 
  else { drupal_access_denied(); }
}

/**
 * This exists to conform to the model of how the book print function works.
 * Not sure if it is necceary to specify a new view mode but what the heck.
 */
function shanti_essays_entity_info_alter(&$info) {
  $info['node']['view modes'] += array(
    'whole' => array(
      'label' => t('Whole'),
      'custom settings' => FALSE,
    ),
  );
}

/**
 * Called by book_export_traverse() above to generate the content of the page.
 * May want to rewrite; this was just copied from the book module's print
 * function.
 */ 
function shanti_essays_whole_node($node, $children = '') {
	// This returns a render array (RA) for the view mode defined in shanti_essays_entity_info_alter()
  $build = node_view($node, 'whole'); 
  
  // We remove the theme option that may be have been set in the RA
  unset($build['#theme']); 
  
  // We hide a few things from the RA
  hide($build['group_content_access']);
  hide($build['links']);
  
  // Now we render it
  $node->rendered = drupal_render($build);
  
  // And we send the node and children to our theme
  return theme('shanti_essays_whole_node_html', array('node' => $node, 'children' => $children));
}

/**
 * Also called by book_export_traverse() to generate a table of contents.
 * This is a hand-made function that might be replaced by something more Drupally.
 */
function shanti_essays_whole_toc($node, $children = '') {
    $output = '';
    $nid = $node->nid;
    $title = check_plain($node->title);
    $depth = $node->book['depth'];
    if ($prev = book_prev($node->book)) {
      $x = $depth - $prev['depth'];
      if ($x > 0) $output .= "<ul class='level-{$prev['depth']}'>\n"; // $x should never be > 1
      elseif ($x < 0) {
        for ($i = 0; $i > $x; $i--) {
          $output .= "</ul>\n"; 
        }
      }
    }
    $output .= "<li id='toc-item-node-$nid'><a href='#node-$nid'>$title</a></li>\n";
    if ($next = book_next($node->book)) {
      // Do nothing
    } else {
      // Clean up ..
      for ($i = 0; $i < ($depth - 1); $i++) {
        $output .= "</ul>\n";         
      }
    }
    $output .= $children;
    return $output;
}

/**
 * We prepare variables for dispay of the SHANTI Reader page.
 * These provide some a book level edit link and a home button.
 * @param array $vars
 */
function template_preprocess_shanti_essays_whole_html(&$vars) {
        
  $vars['toc_menu']['links'] = array(
    'toc-reorder' => array(
      '#markup' => l(
        '<i class="fa fa-edit fa-lg"></i>',
        "admin/content/book/{$vars['book_id']}", 
        array('query' => array('destination' => "/shanti_essays/whole/{$vars['book_id']}"),'html' => TRUE)
      ),
      '#access' => user_access('administer book outlines')
    ),
  );
      
  drupal_add_css(SHANTI_ESSAYS_PATH . '/css/shanti_essays_whole.css');
  drupal_add_css(SHANTI_ESSAYS_PATH . '/css/shanti_essays_footnotes.css');
  $js_settings = array('base_path' => SHANTI_ESSAYS_PATH);
  drupal_add_js(array('shantiEssays' => $js_settings), 'setting');
  drupal_add_js(SHANTI_ESSAYS_PATH . '/js/shanti_essays_whole_2.js', 'file');
  drupal_add_js(SHANTI_ESSAYS_PATH . '/js/jquery.transit.min.js', 'file');
  drupal_add_js(SHANTI_ESSAYS_PATH . '/js/jquery.inview.min.js', 'file');
}

/**
 * We prepare variables for the display of individual nodes in the SHANTI
 * Reader. These show links to edit or add pages.
 * @param type $vars
 */
function template_preprocess_shanti_essays_whole_node_html(&$vars) {
  $vars['book_edit_menu']['links'] = array(
    'toc-edit-page' => array(
      '#markup'   => l(
        '<i class="fa fa-edit fa-lg"></i>',
        "node/{$vars['node']->nid}/edit",
        array(
          'html' => TRUE, 
          'query' => array('destination' => current_path()),
          'fragment' => "node-{$vars['node']->nid}" 
          // Above does not work. May need to define a menu path that calls drupal_goto() 
        )
      ),
      '#access' => user_access('add content and child pages to books')
    ),
    'toc-add-child-page' => array(
      '#markup' => l(
        '<i class="fa fa-plus fa-lg"></i>',
        "node/add/book",
        array(
          'html' => TRUE,
          'query' => array('parent',$vars['node']->nid)
        )
       ),
      '#access' => user_access('add content and child pages to books')
    )
  );
  // Do we need these?
  $vars['depth']    = $vars['node']->book['depth'];
  $vars['title']    = check_plain($vars['node']->title);
  $vars['content']  = $vars['node']->rendered;
}

/**
 * We define some of our own templates, which may be overridden by others.
 * NOTE: These have everything to do with the viewer defined above.
 */
function shanti_essays_theme($existing, $type, $theme, $path) {
  return array(
    'shanti_essays_whole_html' => array(
      'variables' => array('title' => NULL, 'contents' => NULL, 'depth' => NULL),
      'template' => 'templates/shanti-essays-whole-html',
      'path' => SHANTI_ESSAYS_PATH,
    ),
    'shanti_essays_whole_node_html' => array(
      'variables' => array('node' => NULL, 'children' => NULL),
      'template' => 'templates/shanti-essays-whole-node-html',
      'path' => SHANTI_ESSAYS_PATH,
    ),
  );
}

/** 
 * Here we attempt to remove any CSS files from our viewer, which we want to be
 * pristine.
 * This DOES apply even when using your own delivery callback
 * May want to add this in the callback itself
 * Also: Seems incredibly inefficient 
 */
function shanti_essays_css_alter (&$css) {
  if (preg_match("/^shanti_essays\/whole/", SHANTI_ESSAYS_Q)) {
    global $theme_key;
    foreach ($css as $k => $v) {
      if (preg_match("/$theme_key/",$k)) {
        unset($css[$k]);
      }
    }
  }
}

/**
 * This is necessary to have the local templates apply
 */
function shanti_essays_preprocess_html(&$vars) {
  if (preg_match("/^shanti_essays\/whole/", SHANTI_ESSAYS_Q)) {
    $vars['theme_hook_suggestions'][] = 'html__book';
  }
}

/**
 * This is necessary to have the local templates apply
 */
function shanti_essays_preprocess_page(&$vars, $hook) {
  if (preg_match("/^shanti_essays\/whole/", SHANTI_ESSAYS_Q)) {
    $vars['theme_hook_suggestions'][] = 'page__node__book';
  }
}

