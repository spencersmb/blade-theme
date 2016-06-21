<?php
/*
  Template Name: Page with blog sidebar
*/
/**
 * @package Neat
 */

get_header();
$page_layout = get_redux_options('main_page_layout');

//Check page for front page static
if (is_front_page()):?>
    <?php
    $show_slider = get_redux_options('slider_show');
    ?>

    <?php if($show_slider): ?>
        <div class="section container-fluid no-padding ">
            <article class="content tp-banner-container">

                <?php putRevSlider('front-page-slider', 'homepage'); ?>

            </article>
        </div>
    <?php endif; ?>

    <?php while ( have_posts() ) : the_post(); ?>

        <?php get_template_part( 'assets/views/content', 'page' ); ?>

        <?php
        // If comments are open or we have at least one comment, load up the comment template
        if ( comments_open() || get_comments_number() ) :
            comments_template();
        endif;
        ?>

    <?php endwhile; // end of the loop. ?>

    <?php

//else this is a regular page
else: ?>

    <?php // ADD HEADER HERE ?>

    <?php if($page_layout === "1"): ?>
    <div class="container-fluid et-container-primary">
    <?php else: ?>
    <div class="container et-container-primary">
    <?php endif; ?>

        <div class="row">

            <div class="col-xs-12 col-md-8 col-lg-9 m-page scene_element scene_element--fadeinup">
                <div class="et-page-wrapper">

                    <?php while ( have_posts() ) : the_post(); ?>

                        <?php get_template_part( 'assets/views/content', 'page' ); ?>

                        <?php
                        // If comments are open or we have at least one comment, load up the comment template
                        if ( comments_open() || get_comments_number() ) :
                            comments_template();
                        endif;
                        ?>

                    <?php endwhile; // end of the loop. ?>

                </div>
                <!-- /.et-page-wrapper -->
            </div>
            <!-- /.col main content-->

            <div class="col-xs-12 col-md-4 col-lg-3">
                <?php get_sidebar(); ?>
            </div>
            <!-- /.col sidebar-->

        </div>
        <!-- /.row -->

    </div>
    <!-- /.container -->

<?php endif; //end check for front page?>

<?php get_footer(); ?>




