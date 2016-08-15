<?php
/**
 * Template for displaying search forms
 *
 * @package WordPress
 */
?>

<form role="search" method="get" class="sprout-search" action="<?php echo esc_url( home_url( '/' ) ); ?>">
    <label>
        <?php echo esc_html__( 'Search:', 'sprout' ); ?>
        <span class="screen-reader-text"><?php echo _x( 'Search for:', 'label', 'sprout' ); ?></span>
    </label>
    <input type="search" class="search-field" placeholder="<?php echo esc_attr( 'Search...' ); ?>" value="<?php echo get_search_query(); ?>" name="s" />
</form>
