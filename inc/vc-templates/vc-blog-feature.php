<?php
function neat_get_feature_posts($total, $category) {
    
    // Initialize
    $sticky = get_option( 'sticky_posts' );

    // extract ids from this and redo arrays the add ids instead of posts
    $args = array( 'post__in' => $sticky );
    
    //    $args[ 'orderby' ] = 'rand';
    $args[ 'numberposts' ] = $total;

    if ( $category ) $args[ 'category' ] = $category;
    
    // Get sticky posts
    $posts = get_posts( $args );

    // Are there enough posts?
    if ( count( $posts ) < $total ) {
        
        // Revise arguments to get remaining non-sticky posts
        $nonstickyTotal = $total - count( $posts );
        
        // remove items from args
        unset( $args[ 'post__in' ] );
        unset($args[ 'numberposts' ]);
        
        // Add args to get posts not sticky with updated count after sticky posts found
        $args[ 'post__not_in' ] = $sticky;
        $args[ 'numberposts' ] = $nonstickyTotal;

        // Merge array of data
        $posts = array_merge( $posts, get_posts( $args ) );

    }

    return $posts;

}

function build_featured_posts($args){
    $posts = neat_get_feature_posts(4, '');
    $output = '';

    $count = 0;

    //Build first Module
    foreach ($posts as $post){

        if($count === 0){

            // Build background image
            $postId = get_post_thumbnail_id($post->ID);
            $featured_image = wp_get_attachment_image_url( $postId, 'full' );
            $excerpt = get_the_excerpt($post->ID);
            $excerpt_trim = wp_trim_words( $excerpt , '25' );

            $output .= '
                <div class="blog-primary-wrapper" style="background-image: url('. esc_url($featured_image). ');">
                    <div class="blog-primary-inner" style="background-color: '.esc_attr($args['bg_color']).'">
                         <article class="blog-primary-content">
                            <h2 class="title">
                                <a href="'.esc_url( get_the_permalink($post->ID) ).'">
                                    ' . get_the_title($post->ID) . '
                                </a>
                            </h2>
                            <div class="excerpt">
                                ' . $excerpt_trim . '
                            </div>
                            <a class="moretag rounded-btn white-btn" href="'.get_the_permalink($post->ID).'">'.esc_html__("Read More", 'neat').'</a>
                         </article>';


            $output .= '
            <div class="blog-stories-container m-right-panel m-page scene_element scene_element--fadeinright">';
                    $output .= '
                <div class="blog-feature-cap">
                    '.esc_html__('top stories', 'neat').'
                </div>
            ';
            $countInner = 0;
            foreach ($posts as $postInner){
                if($countInner !== 0){

                    $comments_count = wp_count_comments($postInner->ID);
                    $comments_total = $comments_count->total_comments;

                    $output .= '
                    <article class="blog-feature-article">
                        <a href="'.get_the_permalink($postInner->ID).'">
                        <span class="blog-feature-meta">
                            <span class="blog-meta-time">
                                <i class="fa fa-clock-o" aria-hidden="true"></i>
                                '.get_the_date('', $postInner->ID).'
                            </span>';

                    // If comments exist add
                    if($comments_total > 0 && $comments_total < 2){
                        $output .= '
                        <span class="blog-meta-comments">
                            <i class="fa fa-commenting-o" aria-hidden="true"></i>
                            '.wp_kses($comments_total, 'neat').' '. esc_html__('Comment', 'neat').'
                        </span>';
                    } else if ($comments_total > 0 && $comments_total !== 1){
                        $output .= '
                        <span class="blog-meta-comments">
                            <i class="fa fa-commenting-o" aria-hidden="true"></i>
                            '.wp_kses($comments_total, 'neat').' '. esc_html__('Comments', 'neat').'
                        </span>';
                    }

                        $output .='
                            </span>
                            <h2 class="article-title">' . get_the_title($postInner->ID) . '</h2>
                        </a>
                    </article>
                ';
                }
                $countInner++;
            }

            $link = get_home_url('/');
            if($args['blog_home_page'] === "true"){
                $link = get_the_permalink($args['selected_blog']);
            }

            $output .= '
            <div class="blog-feature-cap">
                <a href="'. esc_url($link) .'">
                    '.esc_html__('view all posts', 'neat').'
                </a>
            </div>
            ';
            // End inner post count

            $output .='
        </div>
        <!-- end blog-stories-container -->
    </div>
    <!-- end blog-primary-inner -->
    ';

            $output .='
                </div>
                <!-- end blog-primary-wrapper -->
            ';
        }

        $count++;

    }

    return $output;

}

function getAllPages($type){
    // return assoc array with Name and post ID
    global $post;

    $listings = new WP_Query();

    $page_array = array();
    $string_names = '';
    $listings->query('post_type=' . $type);

    while ( $listings->have_posts() ) {
        $listings->the_post();

            $page_title = html_entity_decode(get_the_title($post->ID));
            $page_array[$page_title] = $post->ID;
    }


    wp_reset_postdata();
    return $page_array;
}

// [blog]
add_shortcode( 'blog', 'neat_blog_shortcode' );
function neat_blog_shortcode( $atts, $content = null ) { // New function parameter $content is added!
    extract( shortcode_atts( array(
        'class' => '',
        'bg_color' => '',
        'blog_meta_data' => '',
        'padding_top' => '',
        'selected_blog' => '',
        'blog_home_page' => ''

    ), $atts ) );

    // Default Color
    if($bg_color === ''){
        $bg_color = 'rgba(34, 34, 40, 0.8)';
    }

    $output = '
    <div class="blog-container et-contain no-padding m-page scene_element scene_element--fadeinup">
    ';

    // Pass through args to inner html
    $args = array(
        'bg_color' => $bg_color,
        'blog_home_page' => $blog_home_page,
        'selected_blog' => $selected_blog
    );
    $output .= build_featured_posts($args);

    $output .= '
    </div>
    <!-- end blog container -->
    ';



    return $output;
}

add_action( 'vc_before_init', 'neat_blog_vc_func' );
function neat_blog_vc_func() {
    vc_map( array(
        "name"      => esc_html__( "Feature Blog List", "neat" ),
        "base"      => "blog",
        'icon'        => 'blog_icon',
        'description' => esc_html__( 'List of feature blog posts.', 'neat' ),
        "wrapper_class" => "clearfix",
        "category" => esc_html__( 'Content', 'neat' ),
        "params"    => array(
            array(
                'param_name'  => 'blog_home_page',
                'heading'     => esc_html__( 'Add Custom Blog Homepage Link?', 'neat' ),
                'description' => esc_html__( 'If you are using a custom front page, check this box to add the new blog homepage url. Leave unchecked if using Wordpress default homepage.', 'neat' ),
                'type'        => 'checkbox',
                "value"			=> ''
            ),
            array(
                'param_name'  => 'selected_blog',
                'dependency' => array(
                    'element' => 'blog_home_page',
                    'value' => array('true')
                ),
                'heading'     => esc_html__( 'Select Blog Page', 'neat' ),
                'description' => esc_html__( 'Use dropdown to select custom blog url', 'neat' ),
                'type'        => 'dropdown',
                "value"			=> getAllPages('post')
            ),
            array(
                'param_name'  => 'blog_meta_data',
                'heading'     => esc_html__( 'Posts Meta Data', 'neat' ),
                'description' => esc_html__( 'Display comments & times', 'neat' ),
                'type'        => 'checkbox',
                "value"			=> "1"
            ),
            array(
                "type" => "colorpicker",
                "holder" => "div",
                "heading" => esc_html__( "Background color", "neat" ),
                "param_name" => "bg_color",
                "value" => 'rgba(34, 34, 40, 0.8)', //Default P color
                "description" => esc_html__( "Choose background color", "neat" )
            ),
            array(
                "type" => "textfield",
                "holder" => "div",
                "class" => "",
                "heading" => esc_html__( "Padding Top", "neat" ),
                "param_name" => "padding_top",
                "value" => '',
                "description" => esc_html__( "Add padding top to container in PX.", "neat" )
            ),
            array(
                'param_name'  => 'class',
                'heading'     => esc_html__( 'Class', 'neat' ),
                'description' => esc_html__( '(Optional) Enter a unique class name.', 'neat' ),
                'type'        => 'textfield',
                'holder'      => 'div'
            )
        )
    ) );

};