<!-- Gallery links -->
<?php

//ensuere query is reset after loading in FLEX content
wp_reset_query();

$page_id =  get_the_ID();
$postlist_args = array(
    'posts_per_page'  => -1,
    'order'           => 'ASC',
    'post_type'       => 'gallery',
    'orderby'=> 'menu_order',
);

//get all posts initial data
$postlist = get_posts( $postlist_args );

$ids = array();

foreach( $postlist as $post){
    $ids[] = $post->ID;
}
$thisindex = array_search($page_id, $ids);
$total_items = count($ids);

$previd = false;
$nextid = false;

//safety check
if($thisindex+1 === $total_items){
    $nextid = false;
}else{
    $nextid = $ids[$thisindex+1];
}

if($thisindex - 1 === -1){
    $previd = false;
}else{
    $previd = $ids[$thisindex-1];
}
//echo "<pre>";
//print_r($page_id);
//echo "</pre>";
?>

<div class="section m-page scene_element scene_element--fadein">
    <nav class="post-nav">
        <div class="row no-margin">
            <!-- Gallery Item -->
            <div class="col-xs-12 col-sm-6 prev-post">
                <?php

                if ( $previd != false ) {

                    //check for masonry size wide
                    $object_masonry = get_field_object( 'gallery_thumbnail_size', $previd);
                    if($object_masonry['value'] === 'wide'){
                        $get_image = get_field_object( 'gallery_wide_image', $previd);
                    }else{
                        $get_image = get_field_object( 'gallery_square_image', $previd);
                    }
                    $featured_image_prev = $get_image['value']['sizes']['neat-gallery-thumb-sm'];


                    $title = get_the_title($previd);
                    $link = get_permalink($previd);


                    echo '
    <div
        class="post-nav-thumb img-loader-bg"
        style="background-image: url('. esc_url($featured_image_prev) .')"></div>
    <div class="post-nav-overlay"></div>
    <div class="post-nav-content">
        <div class="post-nav-subtitle">'. esc_html__('Prev Project', 'neat') .'</div>
        <h2 class="post-nav-title"><span>'. wp_kses($title, 'neat') .'</span></h2>
    </div>
    <a href="'. esc_url($link) .'"></a>';

                } else {
                    //Get the bottoms item

                    $args = array(
                        'posts_per_page'  => 1,
                        'order'           => 'DESC',
                        'post_type'       => 'gallery',
                    );
                    $last = new WP_Query($args); $last->the_post();
                    $title = get_the_title();
                    $get_image = get_field_object( 'gallery_square_image', $post->ID);
                    $featured_image_prev = $get_image['value']['sizes']['neat-gallery-thumb-sm'];
                    $link = get_permalink($post->ID);

                    echo '
    <div
        class="post-nav-thumb img-loader-bg"
        style="background-image: url('. esc_url($featured_image_prev) .')"></div>
    <div class="post-nav-overlay"></div>
    <div class="post-nav-content">
        <div class="post-nav-subtitle">'. esc_html__('Prev Project', 'neat') .'</div>
        <h2 class="post-nav-title"><span>'. wp_kses($title, 'neat') .'</span></h2>
    </div>
    <a href="'. esc_url($link) .'"></a>';

                };

                ?>
            </div>
            <!-- Gallery Item -->
            <div class="col-xs-12 col-sm-6 next-post">
                <?php
                if ( $nextid != false ) {
                    $object_masonry_next = get_field_object( 'gallery_thumbnail_size', $nextid);

                    if($object_masonry_next['value'] === 'wide'){
                        $get_image = get_field_object( 'gallery_wide_image', $nextid);
                    }else{
                        $get_image = get_field_object( 'gallery_square_image', $nextid);
                    }
                    $featured_image_next = $get_image['value']['sizes']['neat-gallery-thumb-sm'];
                    $title = get_the_title($nextid);
                    $link = get_permalink($nextid);

                    echo '
    <div
        class="post-nav-thumb img-loader-bg"
        style="background-image: url('.  esc_url($featured_image_next) .')"></div>
    <div class="post-nav-overlay"></div>
    <div class="post-nav-content">
        <div class="post-nav-subtitle">'. esc_html__('Next Project', 'neat') .'</div>
        <h2 class="post-nav-title"><span>'. wp_kses($title, 'neat') .'</span></h2>
    </div>
    <a href="'. esc_url($link) .'"></a>';


                } else {
                    //Get the bottoms item
                    $args = array(
                        'posts_per_page'  => 1,
                        'order'           => 'ASC',
                        'orderby'=> 'menu_order',
                        'post_type'       => 'gallery',
                    );
                    $first = new WP_Query($args); $first->the_post();
                    $title = get_the_title();
                    $get_image = get_field_object( 'gallery_square_image', $post->ID);
                    $featured_image_prev = $get_image['value']['sizes']['neat-gallery-thumb-sm'];
                    $link = get_permalink($post->ID);

                    echo '
    <div
        class="post-nav-thumb img-loader-bg"
        style="background-image: url('. esc_url($featured_image_prev) .')"></div>
    <div class="post-nav-overlay"></div>
    <div class="post-nav-content">
        <div class="post-nav-subtitle">'. esc_html__('Next Project', 'neat') .'</div>
        <h2 class="post-nav-title"><span>'.  wp_kses($title, 'neat') .'</span></h2>
    </div>
    <a href="'. esc_url($link) .'"></a>';

                };

                ?>

            </div>
        </div>
        <!-- end row -->
    </nav>
    <!-- end nav -->
</div>
<!-- End Gallery Links -->