<?php

function shanti_essays_filter_info() {
  return array(
    'shanti_essays_pullquote' => array(
      'title'             => t('Pull Quotes'),
      'description'       => t('Makes a copy of the selection and puts it into a pull quote.'),
      'process callback'  => '_shanti_essays_pullquote_filter_process',
      'tips callback'     => '_shanti_essays_pullquote_filter_tips',
    )
  );
}

function _shanti_essays_pullquote_filter_process($text, $filter, $format) {
  $text = preg_replace("/\[pqr\](.*)\[\/pqr\]/m","$1<span class='shanti-essays-pullquote-right'>$1</span>",$text);
  $text = preg_replace("/\[pql\](.*)\[\/pql\]/m","$1<span class='shanti-essays-pullquote-left'>$1</span>",$text);
  $text_lines = explode("<",$text);
  for ($i = 0; $i < count($text_lines); $i++) {
    if (preg_match("/^h([1-7])/",$text_lines[$i],$matches)) {
      $text_lines[$i] = "<a id='h1_{$i}'></a><".$text_lines[$i]; 
    } 
    elseif ($i > 0) {
      $text_lines[$i] = "<".$text_lines[$i];
    }
  }
  $text = implode('',$text_lines);
  return $text;
}

function _shanti_essays_pullquote_filter_tips($filter, $format, $long = FALSE) {
  $text = '<em>[pqr]...[/pqr]</em> produces a right-side pull quote from the text. ';
  $text .= '<em>[pql]...[/pql]</em> produces a left-side pull quote from the text. ';
  return t($text);
}
