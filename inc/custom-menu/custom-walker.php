<?php

class neat_Walker_Nav_Menu extends Walker_Nav_Menu{
    /**
     * @see Walker::start_lvl()
     * @since 3.0.0
     *
     * @param string $output Passed by reference. Used to append additional content.
     * @param int $depth Depth of page. Used for padding.
     */
    //First UL in the dropdown is in the header
    //this inserts the 2nd ul in a drop down for a nav item
    public function start_lvl( &$output, $depth = 0, $args = array() ) {
        $indent = str_repeat( "\t", $depth );
        $output .= $indent . '<ul role="menu" class="dropdown-menu">';

    }

    /**
     * @see Walker::start_el()
     * @since 3.0.0
     *
     * @param string $output Passed by reference. Used to append additional content.
     * @param object $item Menu item data object.
     * @param int $depth Depth of menu item. Used for padding.
     * @param int $current_page Menu item ID.
     * @param object $args
     */
    public function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
        $indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';

        /**
         * Dividers, Headers or Disabled
         * =============================
         * Determine whether the item is a Divider, Header, Disabled or regular
         * menu item. To prevent errors we use the strcasecmp() function to so a
         * comparison that is not case sensitive. The strcasecmp() function returns
         * a 0 if the strings are equal.
         */

        $class_names = $value = '';

        //build an array of arrays for all the classes that get added to each item - then add last item -> menu-item +id
        $classes = empty( $item->classes ) ? array() : (array) $item->classes;
        $classes[] = 'menu-item-' . $item->ID;

        //another hook that only gets the css classes and flattens them into one string for each item.
        $class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args ) );

        //if there are children
        if ( $args->has_children )
            $class_names .= ' dropdown';

        //if the current item is selected -
        if ( in_array( 'current-menu-item', $classes ) )
            $class_names .= ' active';

        //sanitize class names
        $class_names = $class_names ? ' class="' . esc_attr( $class_names ) . '"' : '';

        //hook into the function nav_menu_item_id --> pass in 'menu-item' , + other variables , item ID, item, and args
        //this filters the menu item and returns the id added onto menu-item
        $id = apply_filters( 'nav_menu_item_id', 'menu-item-'. $item->ID, $item, $args );

        //this next line sanitizes the id and creates a string id="menu-item-1366";
        $id = $id ? ' id="' . esc_attr( $id ) . '"' : '';

        //this puts it all together into a full li html string
        //not sure how the </li> gets added on - automatic maybe?
        $output .= $indent . '<li' . $id . $value . $class_names .'>';
        //$indent is if the li is a sub item of a Ul dropdown I think

        $atts = array();

        //target = item target and so on but he adds it to the atts array
        $atts['title']  = ! empty( $item->title )	? $item->title	: '';
        $atts['target'] = ! empty( $item->target )	? $item->target	: '';
        $atts['rel']    = ! empty( $item->xfn )		? $item->xfn	: '';

        // If item has_children add atts to <a> tag
        if ( $args->has_children && $depth === 0 ) {
            $atts['href']   		= '#';
            $atts['data-toggle']	= 'dropdown';
            $atts['class']			= 'dropdown-toggle';
            $atts['aria-haspopup']	= 'true';
        } else {
            $atts['href'] = ! empty( $item->url ) ? $item->url : '';
        }

        //build attr key/value pair into an array for each menu item -> array = array({key:value}), array({key:value});
        $atts = apply_filters( 'nav_menu_link_attributes', $atts, $item, $args );


        $attributes = '';
        //this loops through the atts array and gets the key/value pair
        foreach ( $atts as $attr => $value ) {
            if ( ! empty( $value ) ) {

                //If the attr(key) = href sanitize the URL with esc_Url otherwise sanitize the value
                $value = ( 'href' === $attr ) ? esc_url( $value ) : esc_attr( $value );

                //combines the title with the string and the href with the link value
                $attributes .= ' ' . $attr . '="' . $value . '"';

            }
        }

        //currently empty
        $item_output = $args->before;

        /*
         * Glyphicons
         * ===========
         * Since the the menu item is NOT a Divider or Header we check the see
         * if there is a value in the attr_title property. If the attr_title
         * property is NOT null we apply it as the class name for the glyphicon.
         */
        if ( ! empty( $item->attr_title ) )
            $item_output .= '<a'. $attributes .'><span class="glyphicon ' . esc_attr( $item->attr_title ) . '"></span>&nbsp;';
        else
            $item_output .= '<a'. $attributes .'>';

        $item_output .= $args->link_before . apply_filters( 'the_title', $item->title, $item->ID ) . $args->link_after;
        $item_output .= ( $args->has_children && 0 === $depth ) ? ' <span class="caret"></span></a>' : '</a>';
        $item_output .= $args->after;

        $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
    }

    /**
     * Traverse elements to create list from elements.
     *
     * Display one element if the element doesn't have any children otherwise,
     * display the element and its children. Will only traverse up to the max
     * depth and no ignore elements under that depth.
     *
     * This method shouldn't be called directly, use the walk() method instead.
     *
     * @see Walker::start_el()
     * @since 2.5.0
     *
     * @param object $element Data object
     * @param array $children_elements List of elements to continue traversing.
     * @param int $max_depth Max depth to traverse.
     * @param int $depth Depth of current element.
     * @param array $args
     * @param string $output Passed by reference. Used to append additional content.
     * @return null Null on failure with no changes to parameters.
     */
    public function display_element( $element, &$children_elements, $max_depth, $depth, $args, &$output ) {
        if ( ! $element )
            return;

        $id_field = $this->db_fields['id'];

        // Display this element.
        if ( is_object( $args[0] ) )
            $args[0]->has_children = ! empty( $children_elements[ $element->$id_field ] );

        parent::display_element( $element, $children_elements, $max_depth, $depth, $args, $output );
    }

    /**
     * Menu Fallback
     * =============
     * If this function is assigned to the wp_nav_menu's fallback_cb variable
     * and a manu has not been assigned to the theme location in the WordPress
     * menu manager the function with display nothing to a non-logged in user,
     * and will add a link to the WordPress menu manager if logged in as an admin.
     *
     * @param array $args passed from the wp_nav_menu function.
     *
     */
    public static function fallback( $args ) {
        if ( current_user_can( 'manage_options' ) ) {

            extract( $args );

            $fb_output = null;

            if ( $container ) {
                $fb_output = '<' . $container;

                if ( $container_id )
                    $fb_output .= ' id="' . $container_id . '"';

                if ( $container_class )
                    $fb_output .= ' class="' . $container_class . '"';

                $fb_output .= '>';
            }

            $fb_output .= '<ul';

            if ( $menu_id )
                $fb_output .= ' id="' . $menu_id . '"';

            if ( $menu_class )
                $fb_output .= ' class="' . $menu_class . '"';

            $fb_output .= '>';
            $fb_output .= '<li><a href="' . admin_url( 'nav-menus.php' ) . '">Add a menu</a></li>';
            $fb_output .= '</ul>';

            if ( $container )
                $fb_output .= '</' . $container . '>';

            echo $fb_output;
        }
    }
}

class Sv_Walker_Nav_Menu extends Walker_Nav_Menu{
    private $curItem;
    /**
     * @see Walker::start_lvl()
     * @since 3.0.0
     *
     * @param string $output Passed by reference. Used to append additional content.
     * @param int $depth Depth of page. Used for padding.
     */

    //First UL in the dropdown is in the header
    //this inserts the 2nd ul in a drop down for a nav item
    public function start_lvl( &$output, $depth = 0, $args = array() ) {

    //enable check for item for debugging
//     var_dump($this->curItem);

        $indent = str_repeat( "\t", $depth );

        switch($depth){

            case 0 :
                switch($this->curItem->attr_title){

                    case 'gallery':
                        $output .= "\n$indent<ul role=\"menu\" class=\" cd-dropdown-gallery is-hidden\">\n";
                        $output .= '<li class="go-back"><a href="#0">Menu</a></li>';
                    break;

                    case 'icons':
                        $output .= "\n$indent<ul role=\"menu\" class=\" cd-dropdown-icons is-hidden\">\n";
                        $output .= '<li class="go-back"><a href="#0">Menu</a></li>';
                        break;

                    default:
                        $output .= "\n$indent<ul role=\"menu\" class=\"neat-secondary-dropdown is-hidden\">\n";
                        $output .= '<li class="go-back"><a href="#0">Back</a></li>';
                        $output .= '<li class="sub-title"><a href="#0">Browse '. $this->curItem->title .'</a></li>';
                }

                //VIEW ALL BTN check example
                //switch( strlen($this->curItem->view_all) > 0 ){
                //    case true:
                //        $output .= '<li class="see-all">
                //                        <a href="'. $this->curItem->url .'">'. $this->curItem->view_all .'</a>
                //                    </li>';
                //        break;
                //
                //    default:
                //        $output .= '<li class="see-all"><a href="'. $this->curItem->url .'">View All</a></li>';
                //}

            break;

            default:
                $output .= "\n$indent<ul role=\"menu\" class=\" is-hidden\">\n";
                $output .= '<li class="go-back"><a href="#0">Menu</a></li>';
        }

    }

    /**
     * @see Walker::start_el()
     * @since 3.0.0
     *
     * @param string $output Passed by reference. Used to append additional content.
     * @param object $item Menu item data object.
     * @param int $depth Depth of menu item. Used for padding.
     * @param int $current_page Menu item ID.
     * @param object $args
     */
    public function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {

        $this->curItem = $item;

        //Setup for custom menu fields in front end
        //Get data from each object here and place it on the nav item for use later when building the html
        $item->image = wp_get_attachment_image_src( get_post_thumbnail_id(get_post_meta( $item->ID, '_menu_item_field_image', true)), 'neat-nav-thumb', true);
        // $item->view_all = get_post_meta( $item->ID, '_menu_item_field_viewall', true);
        $item->icon = get_post_meta( $item->ID, '_menu_item_field_icon', true);
        $indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';

        /**
         * Dividers, Headers or Disabled
         * =============================
         * Determine whether the item is a Divider, Header, Disabled or regular
         * menu item. To prevent errors we use the strcasecmp() function to so a
         * comparison that is not case sensitive. The strcasecmp() function returns
         * a 0 if the strings are equal.
         */

        //if the item attr title is set to divider in the menu in WP it will add a divider
        if ( strcasecmp( $item->attr_title, 'gallery' ) == 0 && $depth === 1){
            $output .= $indent . '
                <li role="presentation" class="plus-effect">
                    <a class="cd-dropdown-item" href="' . esc_url( $item->url ) . '">
                        <div class="hover-container">
                            <div class="plus-hover hidden-xs hidden-sm">
                                <i class="fa fa-plus-circle"></i>
                            </div>';

                            if( $item->image == true ){
                                $output .= '<img src="' . esc_url( $item->image[0] ) . '" alt="Product Image">';
                            }else{
                                $output .= '<img src="http://placehold.it/300x227" alt="Product Image">';
                            }

                        $output .= '</div>
                        <h3>' . wp_kses( $item->title, 'neat' ) . '</h3>
                    </a>';
        } else if ( strcasecmp( $item->attr_title, 'icon' ) == 0 && $depth === 1){
            $output .= $indent . '
                <li>
                    <a class="cd-dropdown-item" href="' . esc_url( $item->url ) . '">
                        <div class="icon-wrapper sv-icon">
                            <i class="fa ' . esc_attr( $item->icon ) . '"></i>
                        </div>
                        <h3>' . wp_kses( $item->title, 'neat' ) . '</h3>
                        <p>' . wp_kses( $item->view_all, 'neat' ) . '</p>
                    </a>';
        } else {

            $class_names = $value = '';

            //build an array of arrays for all the classes that get added to each item - then add last item -> menu-item +id
            $classes = empty( $item->classes ) ? array() : (array) $item->classes;
            $classes[] = 'menu-item-' . $item->ID;

            if ( $args->has_children ):

            else:
                $classes[] = 'single-item';
            endif;

            //another hook that only gets the css classes and flattens them into one string for each item.
            $class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args ) );

            //sanitize class names
            $class_names = $class_names ? ' class="' . esc_attr( $class_names ) . '"' : '';

            //hook into the function nav_menu_item_id --> pass in 'menu-item' , + other variables , item ID, item, and args
            //this filters the menu item and returns the id added onto menu-item
            $id = apply_filters( 'nav_menu_item_id', 'menu-item-'. $item->ID, $item, $args );

            //this next line sanitizes the id and creates a string id="menu-item-1366";
            $id = $id ? ' id="' . esc_attr( $id ) . '"' : '';

            //this puts it all together into a full li html string
            //not sure how the </li> gets added on - automatic maybe?
//            $output .= $indent . '<li' . $id . $value . $class_names .'>';
            $output .= $indent . '
                <li' . $id . $value . $class_names .'>';
            //$indent is if the li is a sub item of a Ul dropdown I think

            $atts = array();

            //target = item target and so on but he adds it to the atts array
//            $atts['title']  = ! empty( $item->title )	? $item->title	: '';
            $atts['target'] = ! empty( $item->target )	? $item->target	: '';
            $atts['rel']    = ! empty( $item->xfn )		? $item->xfn	: '';
            //data tab used for Price page automation in url
            $atts['data-tab']    = ! empty( $item->icon )		? $item->icon	: '';

            // If item has_children add atts to <a> tag
            if ( $args->has_children && $depth === 0 ) {
                $atts['href']   		= $item->url;
            } else {
                $atts['href'] = ! empty( $item->url ) ? $item->url : '';
            }

            //build attr key/value pair into an array for each menu item -> array = array({key:value}), array({key:value});
            $atts = apply_filters( 'nav_menu_link_attributes', $atts, $item, $args );


            $attributes = '';
            //this loops through the atts array and gets the key/value pair
            foreach ( $atts as $attr => $value ) {
                if ( ! empty( $value ) ) {

                    //If the attr(key) = href sanitize the URL with esc_Url otherwise sanitize the value
                    $value = ( 'href' === $attr ) ? esc_url( $value ) : esc_attr( $value );

                    //combines the title with the string and the href with the link value
                    $attributes .= ' ' . $attr . '="' . $value . '"';

                }
            }

            //currently empty
            $item_output = $args->before;

            /*
             * Glyphicons
             * ===========
             * Since the the menu item is NOT a Divider or Header we check the see
             * if there is a value in the attr_title property. If the attr_title
             * property is NOT null we apply it as the class name for the glyphicon.
             */

            $item_output .= '<a'. $attributes .'>';

            $item_output .= $args->link_before . apply_filters( 'the_title', $item->title, $item->ID ) . $args->link_after;
            $item_output .= ( $args->has_children && 0 === $depth ) ? ' </a>' : '</a>';
            $item_output .= $args->after;

            $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
        }
    }

    /**
     * Traverse elements to create list from elements.
     *
     * Display one element if the element doesn't have any children otherwise,
     * display the element and its children. Will only traverse up to the max
     * depth and no ignore elements under that depth.
     *
     * This method shouldn't be called directly, use the walk() method instead.
     *
     * @see Walker::start_el()
     * @since 2.5.0
     *
     * @param object $element Data object
     * @param array $children_elements List of elements to continue traversing.
     * @param int $max_depth Max depth to traverse.
     * @param int $depth Depth of current element.
     * @param array $args
     * @param string $output Passed by reference. Used to append additional content.
     * @return null Null on failure with no changes to parameters.
     */
    public function display_element( $element, &$children_elements, $max_depth, $depth, $args, &$output ) {
        if ( ! $element )
            return;

        $id_field = $this->db_fields['id'];

        // Display this element.
        if ( is_object( $args[0] ) )
            $args[0]->has_children = ! empty( $children_elements[ $element->$id_field ] );

        parent::display_element( $element, $children_elements, $max_depth, $depth, $args, $output );
    }

    /**
     * Menu Fallback
     * =============
     * If this function is assigned to the wp_nav_menu's fallback_cb variable
     * and a manu has not been assigned to the theme location in the WordPress
     * menu manager the function with display nothing to a non-logged in user,
     * and will add a link to the WordPress menu manager if logged in as an admin.
     *
     * @param array $args passed from the wp_nav_menu function.
     *
     */
    public static function fallback( $args ) {
        if ( current_user_can( 'manage_options' ) ) {

            extract( $args );

            $fb_output = null;

            if ( $container ) {
                $fb_output = '<' . $container;

                if ( $container_id )
                    $fb_output .= ' id="' . $container_id . '"';

                if ( $container_class )
                    $fb_output .= ' class="' . $container_class . '"';

                $fb_output .= '>';
            }

            $fb_output .= '<ul';

            if ( $menu_id )
                $fb_output .= ' id="' . $menu_id . '"';

            if ( $menu_class )
                $fb_output .= ' class="' . $menu_class . '"';

            $fb_output .= '>';
            $fb_output .= '<li><a href="' . admin_url( 'nav-menus.php' ) . '">Add a menu</a></li>';
            $fb_output .= '</ul>';

            if ( $container )
                $fb_output .= '</' . $container . '>';

            echo $fb_output;
        }
    }
}