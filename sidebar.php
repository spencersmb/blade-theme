<?php
/**
 * The sidebar containing the main widget area.
 *
 * @package Sprout
 */

if ( ! is_active_sidebar( 'sprout_sidebar_1' ) ) {
	return;
}
?>

<aside class="sprout-sidebar m-right-panel m-page scene_element scene_element--fadeinright">

	<?php dynamic_sidebar( 'sprout_sidebar_1' ); ?>

</aside><!-- /.sprout-sidebar -->
