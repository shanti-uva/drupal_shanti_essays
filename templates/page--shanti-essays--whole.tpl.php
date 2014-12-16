<?php if ($messages): ?>
<div id="messages"><?php print $messages; ?></div> 
<?php endif; ?>

<?php if ($page['highlighted']): ?>
<div id="highlighted"><?php print render($page['highlighted']); ?></div>
<?php endif; ?>

<div id="reader">
<?php print render($page['content']); ?>
</div>