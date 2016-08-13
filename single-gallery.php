<?php
/**
 * The template for displaying service detail pages.
 *
 *
 * @package Sprout
 */
get_header();
$page_layout = get_redux_options('main_page_layout');
?>
    <main class="container-fluid">

        <section>

            <div class="row">

                <div class="sprout-page-wrapper">

                    <?php while ( have_posts() ) : the_post(); ?>

                        <?php get_template_part( 'assets/views/content', 'page' ); ?>

                    <?php endwhile; // end of the loop. ?>

                </div><!-- /.sprout-page-wrapper -->
                
                <?php

                /**
                 * Add Gallery Nav
                 */
                get_template_part( 'assets/views/gallery', 'nav' );
                
                
                ?>

            </div><!-- /.row -->

        </section>

    </main><!-- /.container -->

<?php get_footer(); ?>