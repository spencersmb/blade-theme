<?php
/**
 * The sidebar containing the main widget area.
 *
 * @package Neat
 */

if ( ! is_active_sidebar( 'neat_sidebar_1' ) ) {
	return;
}
?>

<aside class="neat-sidebar m-right-panel m-page scene_element scene_element--fadeinright">

	<?php dynamic_sidebar( 'neat_sidebar_1' ); ?>

</aside><!-- /.neat-sidebar -->
