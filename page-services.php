<?php
/*
  Template Name: Services Index page
*/

get_header();
?>
<main class="container-fluid no-padding">

    <?php while ( have_posts() ) : the_post(); ?>

        <?php the_content(); ?>

    <?php endwhile; // end of the loop. ?>

    <!-- start list of services -->
    <div class="container neat-container-single">

        <div class="row">

            <div class="col-xs-12 m-page scene_element scene_element--fadeinup">
                <div class="neat-page-wrapper">

                    <?php
                    /////////////////////
                    //Build loop
                    /////////////////////
                    $args = array(
                        'posts_per_page'  => 20,
                        'post_parent'  => get_the_ID(),
                        'post_type' => 'page',
                        'orderby'=> 'menu_order',
                        'order'=>'ASC'
                    );

                    //pass args to new WP_Query
                    $the_query = new WP_Query( $args );

                    if( have_posts()): while( $the_query->have_posts() ): $the_query->the_post(); ?>

                        <?php

                        /*
                         * Include the Post-Format-specific template for the content.
                         * If you want to override this in a child theme, then include a file
                         * called content-___.php (where ___ is the Post Format name) and that will be used instead.
                         */
                        get_template_part( 'assets/views/content', get_post_format() );
                        ?>

                    <?php endwhile; ?>


                    <?php else : ?>

                        <?php get_template_part( 'assets/views/content', 'none' ); ?>

                    <?php endif; ?>

                </div><!-- /.neat-page-wrapper -->
                
            </div><!-- /.col main content-->
            
        </div><!-- /.row -->
        
    </div><!-- /.container -->
    
</main><!-- /.container-fluid -->




<?php get_footer(); ?>