<?php
/**
 * Menu item custom fields
 *
 * Copy this file into your wp-content/mu-plugins directory.
 *
 * @package sprout_Menu_Item_Custom_Fields_Example
 * @version 0.2.0
 * @author Dzikri Aziz <kvcrvt@gmail.com>
 *
 *
 * Plugin name: Menu Item Custom Fields Example
 * Plugin URI: https://github.com/kucrut/wp-menu-item-custom-fields
 * Description: Example usage of Menu Item Custom Fields in plugins/themes
 * Version: 0.2.0
 * Author: Dzikri Aziz
 * Author URI: http://kucrut.org/
 * License: GPL v2
 * Text Domain: sprout
 */

require_once get_template_directory() . '/inc/custom-menu/menu-item-custom-fields/menu-item-custom-fields.php';
require_once get_template_directory() . '/inc/custom-menu/custom-walker.php';

class sprout_Menu_Item_Custom_Fields_Example {

    /**
     * Holds our custom fields
     *
     * @var    array
     * @access protected
     * @since  sprout_Menu_Item_Custom_Fields_Example 0.2.0
     */
    protected static $fields = array();


    /**
     * Initialize plugin
     */
    public static function init() {
        add_action( 'wp_nav_menu_item_custom_fields', array( __CLASS__, '_fields' ), 10, 4 );
        add_action( 'wp_update_nav_menu_item', array( __CLASS__, '_save' ), 10, 3 );
        add_filter( 'manage_nav-menus_columns', array( __CLASS__, '_columns' ), 99 );

        self::$fields = array(
//            'field_image' => esc_html__( 'Image Link', 'sprout' ),
//            'field_icon' => esc_html__( 'Icon CSS Name', 'sprout' ),
//            'field_viewall' => esc_html__( 'Text', 'sprout' ),
        );
    }


    /**
     * Save custom field value
     *
     * @wp_hook action wp_update_nav_menu_item
     *
     * @param int   $menu_id         Nav menu ID
     * @param int   $menu_item_db_id Menu item ID
     * @param array $menu_item_args  Menu item data
     */
    public static function _save( $menu_id, $menu_item_db_id, $menu_item_args ) {
        if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
            return;
        }

        check_admin_referer( 'update-nav_menu', 'update-nav-menu-nonce' );

        foreach ( self::$fields as $_key => $label ) {
            $key = sprintf( '_menu_item_%s', $_key );

            // Sanitize
            if ( ! empty( $_POST[ $key ][ $menu_item_db_id ] ) ) {
                // Do some checks here...
                $value = $_POST[ $key ][ $menu_item_db_id ];
            }
            else {
                $value = null;
            }

            // Update
            if ( ! is_null( $value ) ) {
                update_post_meta( $menu_item_db_id, $key, $value );
            }
            else {
                delete_post_meta( $menu_item_db_id, $key );
            }
        }
    }


    /**
     * Print field
     *
     * @param object $item  Menu item data object.
     * @param int    $depth  Depth of menu item. Used for padding.
     * @param array  $args  Menu item args.
     * @param int    $id    Nav menu ID.
     *
     * @return string Form fields
     */
    public static function _fields( $id, $item, $depth, $args ) {
        foreach ( self::$fields as $_key => $label ) :
            $key   = sprintf( '_menu_item_%s', $_key );
            $id    = sprintf( 'edit-%s-%s', $key, $item->ID );
            $name  = sprintf( '%s[%s]', $key, $item->ID );
            $value = get_post_meta( $item->ID, $key, true );
            $class = sprintf( 'field-%s', $_key );
            ?>
            <p class="description description-wide <?php echo esc_attr( $class ) ?>">
                <?php printf(
                    '<label for="%1$s">%2$s<br /><input type="text" id="%1$s" class="widefat %1$s" name="%3$s" value="%4$s" /></label>',
                    esc_attr( $id ),
                    esc_html( $label ),
                    esc_attr( $name ),
                    esc_attr( $value )
                ) ?>
            </p>
        <?php
        endforeach;
    }


    /**
     * Add our fields to the screen options toggle
     *
     * @param array $columns Menu item columns
     * @return array
     */
    public static function _columns( $columns ) {
        $columns = array_merge( $columns, self::$fields );

        return $columns;
    }
}
sprout_Menu_Item_Custom_Fields_Example::init();