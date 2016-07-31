<?php
/**
 * Extend Recent Posts Widget
 *
 * Adds different formatting to the default WordPress Recent Posts Widget
 */

Class neat_Recent_Posts_Widget extends WP_Widget_Recent_Posts {

    function widget($args, $instance) {

        extract( $args );

        $title = apply_filters('widget_title', empty($instance['title']) ? esc_html__('Recent Posts', 'neat') : $instance['title'], $instance, $this->id_base);

        if( empty( $instance['number'] ) || ! $number = absint( $instance['number'] ) )
            $number = 10;

        $r = new WP_Query( apply_filters( 'widget_posts_args', array( 'posts_per_page' => $number, 'no_found_rows' => true, 'post_status' => 'publish', 'ignore_sticky_posts' => true ) ) );
        if( $r->have_posts() ) :

            echo $before_widget;
            if( $title ) echo $before_title . $title . $after_title; ?>
            <ul>
                <?php while( $r->have_posts() ) : $r->the_post(); ?>
                    <li><a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_title(); ?><i class="fa fa-angle-right fa-lg" aria-hidden="true"></i></a><span><?php the_time( 'F d'); ?></span></li>
                <?php endwhile; ?>
            </ul>

            <?php
            echo $after_widget;

            wp_reset_postdata();

        endif;
    }
}
function neat_recent_widget_registration() {
    unregister_widget('WP_Widget_Recent_Posts');
    register_widget('neat_Recent_Posts_Widget');
}
add_action('widgets_init', 'neat_recent_widget_registration');


