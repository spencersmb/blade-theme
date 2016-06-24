<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package Neat
 */

get_header();
$page_layout = get_redux_options('main_page_layout');

?>
    <div class="container-fluid">

        <?php // Rearragne container class to allow for full width header ?>

        <div class="row">

            <!-- user chooses block layout - needs to be moved inside page-content layout -->
            <div class="et-page-wrapper">

                <?php while ( have_posts() ) : the_post(); ?>

                    <?php get_template_part( 'assets/views/content', 'page' ); ?>

                <?php endwhile; // end of the loop. ?>

            </div>
            <!-- /.et-page-wrapper -->

        </div>
        <!-- /.row -->

    </div>
    <!-- /.container -->

<?php get_footer(); ?>