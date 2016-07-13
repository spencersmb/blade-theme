<?php
/**
 * Template for displaying search forms
 *
 * @package WordPress
 */
?>
<form role="search" method="get" class="neat-search" action="<?php echo esc_url( home_url( '/' ) ); ?>">
    <label for="search-field"><?php echo esc_html__( 'Search:', 'neat' ); ?></label>
    <input
        type="search"
        class="search-field"
        placeholder="<?php echo esc_attr( 'Search...'); ?>"
        value="<?php echo get_search_query(); ?>"
        name="s" title="<?php echo esc_attr( 'Search for:'); ?>">
</form>