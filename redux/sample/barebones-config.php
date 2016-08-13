<?php

    /**
     * ReduxFramework Barebones Sample Config File
     * For full documentation, please visit: http://docs.reduxframework.com/
     */

    if ( ! class_exists( 'Redux' ) ) {
        return;
    }

    // This is your option name where all the Redux data is stored.
    $opt_name = "sprout_theme_options";

    /**
     * ---> SET ARGUMENTS
     * All the possible arguments for Redux.
     * For full documentation on arguments, please refer to: https://github.com/ReduxFramework/ReduxFramework/wiki/Arguments
     * */

    $theme = wp_get_theme(); // For use with some settings. Not necessary.

    $args = array(
        // TYPICAL -> Change these values as you need/desire
        'opt_name'             => $opt_name,
        // This is where your data is stored in the database and also becomes your global variable name.
        'display_name'         => $theme->get( 'Name' ),
        // Name that appears at the top of your panel
        'display_version'      => $theme->get( 'Version' ),
        // Version that appears at the top of your panel
        'menu_type'            => 'menu',
        //Specify if the admin menu should appear or not. Options: menu or submenu (Under appearance only)
        'allow_sub_menu'       => true,
        // Show the sections below the admin menu item or not
        'menu_title'           => esc_html__( 'Sprout Options', 'sprout' ),
        'page_title'           => esc_html__( 'Sprout Options', 'sprout' ),
        // You will need to generate a Google API key to use this feature.
        // Please visit: https://developers.google.com/fonts/docs/developer_api#Auth
        'google_api_key'       => '',
        // Set it you want google fonts to update weekly. A google_api_key value is required.
        'google_update_weekly' => false,
        // Must be defined to add google fonts to the typography module
        'async_typography'     => true,
        // Use a asynchronous font on the front end or font string
        //'disable_google_fonts_link' => true,                    // Disable this in case you want to create your own google fonts loader
        'admin_bar'            => true,
        // Show the panel pages on the admin bar
        'admin_bar_icon'       => 'dashicons-portfolio',
        // Choose an icon for the admin bar menu
        'admin_bar_priority'   => 50,
        // Choose an priority for the admin bar menu
        'global_variable'      => 'sprout_theme_options',
        // Set a different name for your global variable other than the opt_name
        'dev_mode'             => false,
        // Show the time the page took to load, etc
        'update_notice'        => true,
        // If dev_mode is enabled, will notify developer of updated versions available in the GitHub Repo
        'customizer'           => false,
        // Enable basic customizer support
        //'open_expanded'     => true,                    // Allow you to start the panel in an expanded way initially.
        //'disable_save_warn' => true,                    // Disable the save warning when a user changes a field

        // OPTIONAL -> Give you extra features
        'page_priority'        => null,
        // Order where the menu appears in the admin area. If there is any conflict, something will not show. Warning.
        'page_parent'          => 'themes.php',
        // For a full list of options, visit: http://codex.wordpress.org/Function_Reference/add_submenu_page#Parameters
        'page_permissions'     => 'manage_options',
        // Permissions needed to access the options panel.
        'menu_icon'            => get_template_directory_uri() . '/assets/images/menu-icon.png',
        // Specify a custom URL to an icon
        'last_tab'             => '',
        // Force your panel to always open to a specific tab (by id)
        'page_icon'            => 'icon-themes',
        // Icon displayed in the admin panel next to your menu_title
        'page_slug'            => '_options',
        // Page slug used to denote the panel
        'save_defaults'        => true,
        // On load save the defaults to DB before user clicks save or not
        'default_show'         => false,
        // If true, shows the default value next to each field that is not the default value.
        'default_mark'         => '',
        // What to print by the field's title if the value shown is default. Suggested: *
        'show_import_export'   => true,
        // Shows the Import/Export panel when not used as a field.

        'forced_dev_mode_off' => true,

        // CAREFUL -> These options are for advanced use only
        'transient_time'       => 60 * MINUTE_IN_SECONDS,
        'output'               => true,
        // Global shut-off for dynamic CSS output by the framework. Will also disable google fonts output
        'output_tag'           => true,
        // Allows dynamic CSS to be generated for customizer and google fonts, but stops the dynamic CSS from going to the head
        // 'footer_credit'     => '',                   // Disable the footer credit of Redux. Please leave if you can help it.

        // FUTURE -> Not in use yet, but reserved or partially implemented. Use at your own risk.
        'database'             => '',
        // possible: options, theme_mods, theme_mods_expanded, transient. Not fully functional, warning!

        'use_cdn'              => true,
        // If you prefer not to use the CDN for Select2, Ace Editor, and others, you may download the Redux Vendor Support plugin yourself and run locally or embed it in your code.
        'system_info'          => false,
        //'compiler'             => true,

        // HINTS
        'hints'                => array(
            'icon'          => 'el el-question-sign',
            'icon_position' => 'right',
            'icon_color'    => 'lightgray',
            'icon_size'     => 'normal',
            'tip_style'     => array(
                'color'   => 'light',
                'shadow'  => true,
                'rounded' => false,
                'style'   => '',
            ),
            'tip_position'  => array(
                'my' => 'top left',
                'at' => 'bottom right',
            ),
            'tip_effect'    => array(
                'show' => array(
                    'effect'   => 'slide',
                    'duration' => '500',
                    'event'    => 'mouseover',
                ),
                'hide' => array(
                    'effect'   => 'slide',
                    'duration' => '500',
                    'event'    => 'click mouseleave',
                ),
            ),
        )
    );

    // ADMIN BAR LINKS -> Setup custom links in the admin bar menu as external items.
//    $args['admin_bar_links'][] = array(
//        'id'    => 'redux-docs',
//        'href'  => esc_url('http://docs.reduxframework.com/'),
//        'title' => esc_html__( 'Documentation', 'sprout' ),
//    );
//
//    $args['admin_bar_links'][] = array(
//        //'id'    => 'redux-support',
//        'href'  => esc_url('https://github.com/ReduxFramework/redux-framework/issues'),
//        'title' => esc_html__( 'Support', 'sprout' ),
//    );
//
//    $args['admin_bar_links'][] = array(
//        'id'    => 'redux-extensions',
//        'href'  => esc_url('reduxframework.com/extensions'),
//        'title' => esc_html__( 'Extensions', 'sprout' ),
//    );

    // SOCIAL ICONS -> Setup custom links in the footer for quick links in your panel footer icons.
//    $args['share_icons'][] = array(
//        'url'   => 'https://github.com/ReduxFramework/ReduxFramework',
//        'title' => esc_html__('Visit us on GitHub', 'sprout'),
//        'icon'  => 'el el-github'
//        //'img'   => '', // You can use icon OR img. IMG needs to be a full URL.
//    );
//    $args['share_icons'][] = array(
//        'url'   => esc_url('https://www.facebook.com/pages/Redux-Framework/243141545850368'),
//        'title' => esc_html__('Like us on Facebook', 'sprout'),
//        'icon'  => 'el el-facebook'
//    );
//    $args['share_icons'][] = array(
//        'url'   => esc_url('http://twitter.com/reduxframework'),
//        'title' => esc_html__('Follow us on Twitter', 'sprout'),
//        'icon'  => 'el el-twitter'
//    );
//    $args['share_icons'][] = array(
//        'url'   => esc_url('http://www.linkedin.com/company/redux-framework'),
//        'title' => esc_html__('Find us on LinkedIn', 'sprout'),
//        'icon'  => 'el el-linkedin'
//    );

    // Panel Intro text -> before the form
    if ( ! isset( $args['global_variable'] ) || $args['global_variable'] !== false ) {
        if ( ! empty( $args['global_variable'] ) ) {
            $v = $args['global_variable'];
        } else {
            $v = str_replace( '-', '_', $args['opt_name'] );
        }
//        $args['intro_text'] = sprintf( wp_kses( '<p>Did you know that Redux sets a global variable for you? To access any of your saved options from within your code you can use your global variable: <strong>$%1$s</strong></p>', 'sprout' ), $v );
    } else {
        $args['intro_text'] = wp_kses( '<p>This text is displayed above the options panel. It isn\'t required, but more info is always better! The intro_text field accepts all HTML.</p>', 'sprout' );
    }

    // Add content after the form.
//    $args['footer_text'] = wp_kses( '<p>This text is displayed below the options panel. It isn\'t required, but more info is always better! The footer_text field accepts all HTML.</p>', 'sprout' );

    Redux::setArgs( $opt_name, $args );

    /*
     * ---> END ARGUMENTS
     */

    /*
     * ---> START HELP TABS
     */

    $tabs = array(
        array(
            'id'      => 'redux-help-tab-1',
            'title'   => esc_html__( 'Theme Information 1', 'sprout' ),
            'content' => wp_kses( '<p>This is the tab content, HTML is allowed.</p>', 'sprout' )
        ),
        array(
            'id'      => 'redux-help-tab-2',
            'title'   => esc_html__( 'Theme Information 2', 'sprout' ),
            'content' => wp_kses( '<p>This is the tab content, HTML is allowed.</p>', 'sprout' )
        )
    );
    Redux::setHelpTab( $opt_name, $tabs );

    // Set the help sidebar
    $content = wp_kses( '<p>This is the sidebar content, HTML is allowed.</p>', 'sprout' );
    Redux::setHelpSidebar( $opt_name, $content );


    /*
     * <--- END HELP TABS
     */


    /*
     *
     * ---> START SECTIONS
     *
     */

    /*

        As of Redux 3.5+, there is an extensive API. This API can be used in a mix/match mode allowing for


     */

    // -> START Basic Fields

    /*
     *
     * ---> START GENERAL SECTION
     *
     */

    Redux::setSection( $opt_name, array(
        'title' => esc_html__( 'General', 'sprout' ),
        'id'    => 'general',
        'customizer_width' => '400px',
        'icon'             => 'el el-home'
    ) );

    Redux::setSection( $opt_name, array(
        'title'  => esc_html__( 'Site Info', 'sprout' ),
        'id'     => 'site_info',
        'subsection' => true,
        'fields'    => array(
            array(
                'id'        => 'blogname',
                'type'      => 'text',
                'title'     => esc_html__('Blog Title', 'sprout'),
                'default'   => get_option( 'blogname' ),
            ),
            array(
                'id'        => 'blogdescription',
                'type'      => 'text',
                'title'     => esc_html__('Blog Description', 'sprout'),
                'default'   => get_option( 'blogdescription' ),
            ),
            array (
                'title' => esc_html__('Favicon', 'sprout'),
                'id' => 'favicon',
                'type' => 'media',
                'default' => array (
                    'url' => get_template_directory_uri() . '/favicon.png',
                ),
            )
        )
    ) );

    Redux::setSection( $opt_name, array(
        'title'      => esc_html__( 'Favicon', 'sprout' ),
        'desc'       => wp_kses('<em>Upload your custom Favicon image. <br>.ico or .png file required.</em>', 'sprout'),
        'id'         => 'favicon',
        'subsection' => true,
        'fields'     => array(
            array (
                'title' => esc_html__('Favicon', 'sprout'),
                'id' => 'favicon',
                'type' => 'media',
                'default' => array (
                    'url' => get_template_directory_uri() . '/favicon.png',
                ),
            ),
        )
    ) );

    /*
     *
     * ---> LOGO SECTION
     *
     */

    Redux::setSection( $opt_name, array(
        'title'      => esc_html__( 'Logo', 'sprout' ),
        'subsection' => true,
        'fields'     => array(

            array (
                'title' => esc_html__('Your Logo', 'sprout'),
                'subtitle' => wp_kses('<em>Upload your logo image.</em>', 'sprout'),
                'id' => 'site_logo',
                'type' => 'media',
                'default' => array (
                    'url' => get_template_directory_uri() . '/assets/images/logos/sprout-logo-white.png',
                ),
            ),
            array (
                'title' => esc_html__('Alternative Logo', 'sprout'),
                'subtitle' => wp_kses('<em>The Alternative Logo is used on the <strong>Sticky Header</strong> and <strong>Mobile Devices</strong>.</em>', 'sprout'),
                'id' => 'alt_header_logo',
                'type' => 'media',
                'default' => array (
                    'url' => get_template_directory_uri() . '/assets/images/logos/sprout-logo-black.png',
                ),
            ),

            array(
                'title' => esc_html__('Logo Height', 'sprout'),
                'subtitle' => wp_kses('<em>Drag the slider to set the logo height <br/>(ignored if there\'s no uploaded logo).</em>', 'sprout'),
                'id' => 'logo_height',
                'type' => 'slider',
                "default" => 70,
                "min" => 0,
                "step" => 1,
                "max" => 300,
                'display_value' => 'text',
            ),

        )

    ) );

    /*
     *
     * ---> HEADER SECTION
     *
     */
    Redux::setSection( $opt_name, array(
        'title' => esc_html__( 'Header', 'sprout' ),
        'id'    => 'header',
        'desc'             => esc_html__( 'These are really basic fields!', 'sprout' ),
        'customizer_width' => '400px',
        'icon'             => 'fa fa-lg fa-list-alt'
    ) );

    /*
     *
     * ---> HEADER STYLING
     *
     */
    Redux::setSection( $opt_name, array(
        'title'  => esc_html__( 'Header Styling', 'sprout' ),
        'subsection' => true,
        'fields' => array(

            array (
                'id' => 'main_nav_font_options',
                'icon' => true,
                'type' => 'info',
                'raw' => wp_kses_post('<h3 style="margin: 0;"><i class="fa fa-font"></i> Font Settings</h3>', 'sprout'),
            ),


            array(
                'title' => esc_html__('Main Header Font Size', 'sprout'),
                'subtitle' => wp_kses('<em>Drag the slider to set the Main Header Font Size.</em>', 'sprout'),
                'id' => 'main_header_font_size',
                'type' => 'slider',
                "default" => 13,
                "min" => 11,
                "step" => 1,
                "max" => 16,
                'display_value' => 'text'
            ),

            array (
                'title' => esc_html__('Main Header Font Color', 'sprout'),
                'subtitle' => wp_kses('<em>The Main Header Font Color.</em>', 'sprout'),
                'id' => 'main_header_font_color',
                'type' => 'color',
                'default' => '#35373D',
                'transparent' => false
            ),

            array (
                'id' => 'header_size_spacing',
                'icon' => true,
                'type' => 'info',
                'raw' => wp_kses_post('<h3 style="margin: 0;"><i class="fa fa-expand"></i> Spacing and Size</h3>', 'sprout'),
            ),

            array(
                'title' => esc_html__('Spacing Above the Logo', 'sprout'),
                'subtitle' => wp_kses('<em>Drag the slider to set the Spacing Above the Logo.</em>', 'sprout'),
                'id' => 'spacing_above_logo',
                'type' => 'slider',
                "default" => 20,
                "min" => 0,
                "step" => 1,
                "max" => 200,
                'display_value' => 'text'
            ),

            array(
                'title' => esc_html__('Spacing Below the Logo', 'sprout'),
                'subtitle' => wp_kses('<em>Drag the slider to set the Spacing Below the Logo.</em>', 'sprout'),
                'id' => 'spacing_below_logo',
                'type' => 'slider',
                "default" => 20,
                "min" => 0,
                "step" => 1,
                "max" => 200,
                'display_value' => 'text'
            ),

            array(
                'title' => esc_html__('Spacing Left of the Logo', 'sprout'),
                'subtitle' => wp_kses('<em>Drag the slider to set the Spacing Left of the Logo.</em>', 'sprout'),
                'id' => 'spacing_left_logo',
                'type' => 'slider',
                "default" => 15,
                "min" => 0,
                "step" => 1,
                "max" => 200,
                'display_value' => 'text'
            ),

            array (
                'id' => 'header_bg_options',
                'icon' => true,
                'type' => 'info',
                'raw' => wp_kses_post('<h3 style="margin: 0;"><i class="fa fa-eyedropper"></i> Header Background</h3>', 'sprout'),
            ),

            array (
                'title' => esc_html__('Header Background Color', 'sprout'),
                'subtitle' => wp_kses('<em>The Main Header background.</em>', 'sprout'),
                'id' => 'main_header_background_color',
                'type' => 'color',
                'default' => '#78be01',
                'transparent' => false
            ),

        ),

    ) );

    /*
     *
     * ---> HEADER ELEMENTS
     *
     */
    Redux::setSection( $opt_name, array(
        'title'      => esc_html__( 'Header Elements', 'sprout' ),
        'subsection' => true,
        'fields'     => array(

            /*
             * ---> Search
             */
            array (
                'id' => 'search_header_info',
                'icon' => true,
                'type' => 'info',
                'raw' => wp_kses_post('<h3 style="margin: 0;"><i class="fa fa-search"></i> Search Icon</h3>', 'sprout'),
            ),

            array (
                'title' => esc_html__('Main Header Search Button', 'sprout'),
                'subtitle' => wp_kses('<em>Enable / Disable the Search Button in the Header.</em>', 'sprout'),
                'id' => 'search_button',
                'on' => esc_html__('Enabled', 'sprout'),
                'off' => esc_html__('Disabled', 'sprout'),
                'type' => 'switch',
                'default' => 1,
            ),
            /*
             * ---> Phone & Email contact
             */
            array (
                'id' => 'phone_header_info',
                'icon' => true,
                'type' => 'info',
                'raw' => wp_kses_post('<h3 style="margin: 0;"><i class="fa fa-phone"></i> Phone Contact</h3>', 'sprout'),
            ),
            array (
                'title' => esc_html__('Display Phone Number', 'sprout'),
                'subtitle' => wp_kses('<em>Enable / Disable the Phone Number.</em>', 'sprout'),
                'id' => 'header_phone_display',
                'on' => esc_html__('Enabled', 'sprout'),
                'off' => esc_html__('Disabled', 'sprout'),
                'type' => 'switch',
                'default' => 1,
            ),
            array (
                'title' => esc_html__('Phone Number', 'sprout'),
                'subtitle' => wp_kses('<em>Enter your contact number here.</em>', 'sprout'),
                'id' => 'header_phone',
                'type' => 'text',
                'default' => '+123-777-456-7890',
            ),
            array (
                'title' => esc_html__('Email Address', 'sprout'),
                'subtitle' => wp_kses('<em>Enter your contact number here.</em>', 'sprout'),
                'id' => 'header_email',
                'type' => 'text',
                'default' => esc_html__('johndoe@gmail.com', 'sprout'),
            ),
            /*
             * ---> Free Quote Button
             */
            array (
                'id' => 'free_quote_btn',
                'icon' => true,
                'type' => 'info',
                'raw' => wp_kses_post('<h3 style="margin: 0;"><i class="fa fa-bars"></i> Free Quote Button</h3>', 'sprout'),
            ),
            array (
                'title' => esc_html__('Header Free Quote Button', 'sprout'),
                'subtitle' => wp_kses('<em>Enable / Disable the Free Quote Button.</em>', 'sprout'),
                'id' => 'has_free_quote',
                'on' => esc_html__('Enabled', 'sprout'),
                'off' => esc_html__('Disabled', 'sprout'),
                'type' => 'switch',
                'default' => 1,
            ),
            array (
                'title' => esc_html__('Button Text', 'sprout'),
                'subtitle' => wp_kses('<em>Enter the button text here.</em>', 'sprout'),
                'id' => 'main_header_button_text',
                'type' => 'text',
                'required' => array( 'has_free_quote', 'equals', array( 1 ) ),
                'default' => 'Free Quote',
            ),
            array (
                'title' => esc_html__('Button Color', 'sprout'),
                'subtitle' => wp_kses('<em>The color of the free quote button.</em>', 'sprout'),
                'id' => 'freeQuote_btn_color',
                'type' => 'color',
                'transparent' => false,
                'default' => '#53950C',
            ),
            array (
                'title' => esc_html__('Background Color', 'sprout'),
                'subtitle' => wp_kses('<em>Choose a background color on laptop or larger screens.</em>', 'sprout'),
                'id' => 'freeQuote_background_color',
                'type' => 'color',
                'transparent' => false,
                'default' => '#E0E0E0',
            ),

            /*
             * ---> Social Icons in Header
             */

            array (
                'id' => 'header_social_icons',
                'icon' => true,
                'type' => 'info',
                'raw' => wp_kses_post('<h3 style="margin: 0;"><i class="fa fa-share-alt"></i> Show / Hide Social Media Icons </h3>', 'sprout'),
            ),

            array (
                'title' => esc_html__('Header Social Media Icon Display', 'sprout'),
                'subtitle' => wp_kses('<em>Show / Hide Social Icons in the header.</em>', 'sprout'),
                'id' => 'top_bar_social_icons',
                'on' => esc_html__('Show', 'sprout'),
                'off' => esc_html__('Hide', 'sprout'),
                'type' => 'switch',
                'default' => 1
            )

        )

    ) );


/*
     *
     * ---> LAYOUT STYLING
     *
     */
    $layout_wp_kses = array(
        'br' => array()
    );
    Redux::setSection( $opt_name, array(
        'title'  => esc_html__( 'Layout', 'sprout' ),
        'fields' => array(
            array (
                'id' => 'blog_page_options',
                'icon' => true,
                'type' => 'info',
                'raw' => wp_kses_post('<h3 style="margin: 0;"><i class="fa fa-wordpress"></i> Blog Layout</h3>', 'sprout'),
            ),
            array(
                'id'       => 'main_blog_layout',
                'type'     => 'image_select',
                'compiler' => true,
                'subsection' => true,
                'title'    => esc_html__( 'Blog Width Settings', 'sprout' ),
                'subtitle' => wp_kses( '<em>Select the Layout style for Blog posts: Full width or contained with sidebar.</em>', 'sprout' ),
                'options'  => array(
                    '1' => array(
                        'alt' => esc_html__('Layout 1', 'sprout'),
                        'img' => get_template_directory_uri() . '/assets/images/theme_options/icons/blog_sidebar.png'
                    ),
                    '2' => array(
                        'alt' => esc_html__('Layout 2', 'sprout'),
                        'img' => get_template_directory_uri() . '/assets/images/theme_options/icons/blog_no_sidebar.png'
                    )

                ),
                'default'  => '1'
            ),
            array (
                'id' => 'sticky_sidebar_options',
                'icon' => true,
                'type' => 'info',
                'raw' => wp_kses_post('<h3 style="margin: 0;"><i class="fa fa-columns"></i> Page Settings</h3>', 'sprout'),
            ),
            array(
                'id'       => 'main_page_layout',
                'type'     => 'image_select',
                'compiler' => true,
                'subsection' => true,
                'title'    => esc_html__( 'Page Layout', 'sprout' ),
                'subtitle' => wp_kses( '<em>Select the Layout style for pages:</em></br><em>Full Width or Contained</em>', $layout_wp_kses, 'sprout' ),
                'options'  => array(
                    '1' => array(
                        'alt' => esc_html__('Layout 1', 'sprout'),
                        'img' => get_template_directory_uri() . '/assets/images/theme_options/icons/page_full_width.png'
                    ),
                    '2' => array(
                        'alt' => esc_html__('Layout 2', 'sprout'),
                        'img' => get_template_directory_uri() . '/assets/images/theme_options/icons/blog_no_sidebar.png'
                    )

                ),
                'default'  => '1'
            ),
            array(
                'id'       => 'service_sticky_sidebar',
                'type'     => 'button_set',
                'subsection' => true,
                'title'    => esc_html__( 'Sticky Sidebar', 'sprout' ),
                'subtitle' => wp_kses( '<em>Enable the sidebar on service pages to be sticky.</em>', 'sprout' ),
                'options'  => array(
                    'enabled'    => 'Enable',
                    'disabled'   => 'Disable'
                ),
                'default'  => 'enabled',
            ),
            array(
                'id'       => 'gallery_layout',
                'type'     => 'image_select',
                'compiler' => true,
                'subsection' => true,
                'title'    => esc_html__( 'Gallery Layout', 'sprout' ),
                'subtitle' => wp_kses( '<em>Select the Layout style for your gallery:</em></br><em>Full Width or Contained</em>', $layout_wp_kses, 'sprout' ),
                'options'  => array(
                    '1' => array(
                        'alt' => esc_html__('Layout 1', 'sprout'),
                        'img' => get_template_directory_uri() . '/assets/images/theme_options/icons/page_full_width.png'
                    ),
                    '2' => array(
                        'alt' => esc_html__('Layout 2', 'sprout'),
                        'img' => get_template_directory_uri() . '/assets/images/theme_options/icons/blog_no_sidebar.png'
                    )

                ),
                'default'  => '1'
            )

        )

    ) );


    /*
     *
     * ---> FOOTER SECTION
     *
     */
    Redux::setSection( $opt_name, array(
    'icon'    => 'fa fa-anchor',
    'title'   => esc_html__( 'Footer', 'sprout' ),
    'fields'  => array(

            array (
                'title' => esc_html__('Footer Background Color', 'sprout'),
                'subtitle' => wp_kses('<em>The Top Bar background color.</em>', 'sprout'),
                'id' => 'footer_background_color',
                'type' => 'color',
                'default' => '#222228',
            ),

            array (
                'title' => esc_html__('Footer Text', 'sprout'),
                'subtitle' => wp_kses('<em>Specify the Footer Text Color.</em>', 'sprout'),
                'id' => 'footer_texts_color',
                'type' => 'color',
                'transparent' => false,
                'default' => '#868686',
            ),

            array (
                'title' => esc_html__('Footer Links', 'sprout'),
                'subtitle' => wp_kses('<em>Specify the Footer Links Color.</em>', 'sprout'),
                'id' => 'footer_links_color',
                'type' => 'color',
                'transparent' => false,
                'default' => '#333333',
            ),

            array (
                'title' => esc_html__('Social Icons', 'sprout'),
                'subtitle' => wp_kses('<em>Enable / Disable the Social Icons.</em>', 'sprout'),
                'id' => 'footer_social_icons',
                'on' => esc_html__('Enabled', 'sprout'),
                'off' => esc_html__('Disabled', 'sprout'),
                'type' => 'switch',
                'default' => 1,
            ),

            array (
                'title' => esc_html__('Footer Copyright Text', 'sprout'),
                'subtitle' => wp_kses('<em>Enter your copyright information here.</em>', 'sprout'),
                'id' => 'footer_copyright_text',
                'type' => 'text',
                'default' => '&copy; <a href=\'http://www.every-tuesday.com/\'>Every Tuesday</a> - Elite ThemeForest Author.',
            )

        )

    ) );


    /*
     *
     * ---> STYLING SECTION
     *
     */
    Redux::setSection( $opt_name, array(
    'icon'   => 'fa fa-paint-brush',
    'title'  => esc_html__( 'Styling', 'sprout' ),
    'fields' => array(

        array (
            'title' => esc_html__('Body Texts Color', 'sprout'),
            'subtitle' => wp_kses('<em>Body Texts Color of the site.</em>', 'sprout'),
            'id' => 'body_color',
            'type' => 'color',
            'transparent' => false,
            'default' => '#545454',
        ),

        array (
            'title' => esc_html__('Headings Color', 'sprout'),
            'subtitle' => wp_kses('<em>Headings Color of the site.</em>', 'sprout'),
            'id' => 'headings_color',
            'type' => 'color',
            'transparent' => false,
            'default' => '#000000',
        ),

        array (
            'title' => esc_html__('Main Theme Color', 'sprout'),
            'subtitle' => wp_kses('<em>The main color of the site.</em>', 'sprout'),
            'id' => 'main_color',
            'type' => 'color',
            'transparent' => false,
            'default' => '#78be01',
        ),
        array (
            'title' => esc_html__('Nav Item Background Color', 'sprout'),
            'subtitle' => wp_kses('<em>The color of the nav when it pops open.</em>', 'sprout'),
            'id' => 'nav_item_color',
            'type' => 'color',
            'transparent' => false,
            'default' => '#515151',
        ),

        array (
            'title' => esc_html__('Nav Item Hover Color', 'sprout'),
            'subtitle' => wp_kses('<em>The color when a cursor hovers over a dropdown item from the nav.</em>', 'sprout'),
            'id' => 'nav_hover_color',
            'type' => 'color',
            'transparent' => false,
            'default' => '#53950C',
        ),

        array(
            'id'            => 'main_background',
            'type'          => 'background',
            'title'         => esc_html__("Body Background", 'sprout'),
            'subtitle'      => wp_kses("<em>Body background with image, color, etc.</em>", 'sprout'),
            'default'  => array(
                'background-color' => '#fff',
            ),
            'transparent'   => false,
        ),

    )

) );


    /*
     *
     * ---> TYPOGRAPHY SECTION
     *
     */
    Redux::setSection( $opt_name, array(
    'icon'   => 'fa fa-font',
    'title'  => esc_html__( 'Typography', 'sprout' ),
    'fields' => array(

        array (
            'id' => 'source_fonts_info',
            'icon' => true,
            'type' => 'info',
            'raw' => wp_kses_post('<h3 style="margin: 0;"><i class="fa fa-font"></i> Font Sources</h3>', 'sprout'),
        ),

        array(
            'title'    => esc_html__('Font Source', 'sprout'),
            'subtitle' => wp_kses('<em>Choose the Font Source</em>', 'sprout'),
            'id'       => 'font_source',
            'type'     => 'radio',
            'options'  => array(
                '1' => 'Standard + Google Webfonts',
                '2' => 'Google Custom',
                '3' => 'Adobe Typekit'
            ),
            'default' => '1'
        ),

        // Google Code
        array(
            'id'=>'font_google_code',
            'type' => 'text',
            'title' => esc_html__('Google Code', 'sprout'),
            'subtitle' => wp_kses('<em>Paste the provided Google Code</em>', 'sprout'),
            'default' => 'https://fonts.googleapis.com/css?family=Yantramanav|Poppins:400,700',
            'required' => array('font_source','=','2')
        ),

        // Typekit ID
        array(
            'id'=>'font_typekit_kit_id',
            'type' => 'text',
            'title' => esc_html__('Typekit Kit ID', 'sprout'),
            'subtitle' => wp_kses('<em>Paste the provided Typekit Kit ID.</em>', 'sprout'),
            'default' => '',
            'required' => array('font_source','=','3')
        ),

        array (
            'id' => 'main_font_info',
            'icon' => true,
            'type' => 'info',
            'raw' => wp_kses_post('<h3 style="margin: 0;"><i class="fa fa-font"></i> Main Font</h3>', 'sprout'),
        ),

        // Standard + Google Webfonts
        array (
            'title' => esc_html__('Font Face', 'sprout'),
            'subtitle' => wp_kses('<em>Pick the Main Font for your site.</em>', 'sprout'),
            'id' => 'main_font',
            'type' => 'typography',
            'line-height' => false,
            'text-align' => false,
            'font-style' => false,
            'font-weight' => false,
            'all_styles'=> true,
            'font-size' => false,
            'color' => false,
            'default' => array (
                'font-family' => 'Lato',
                'subsets' => '',
            ),
            'required' => array('font_source','=','1')
        ),

        // Google Custom
        array (
            'title' => esc_html__('Google Font Face', 'sprout'),
            'subtitle' => wp_kses('<em>Enter your Google Font Name for the theme\'s Main Typography</em>', 'sprout'),
            'desc' => esc_html__('e.g.: open sans', 'sprout'),
            'id' => 'main_google_font_face',
            'type' => 'text',
            'default' => 'Lato',
            'required' => array('font_source','=','2')
        ),

        // Adobe Typekit
        array (
            'title' => esc_html__('Typekit Font Face', 'sprout'),
            'subtitle' => wp_kses('<em>Enter your Typekit Font Name for the theme\'s Main Typography</em>', 'sprout'),
            'desc' => esc_html__('e.g.: futura-pt', 'sprout'),
            'id' => 'main_typekit_font_face',
            'type' => 'text',
            'default' => '',
            'required' => array('font_source','=','3')
        ),


        array (
            'id' => 'secondary_font_info',
            'icon' => true,
            'type' => 'info',
            'raw' => wp_kses_post('<h3 style="margin: 0;"><i class="fa fa-font"></i> Secondary Font</h3>', 'sprout'),
        ),

        // Standard + Google Webfonts
        array (
            'title' => esc_html__('Font Face', 'sprout'),
            'subtitle' => wp_kses('<em>Pick the Secondary Font for your site.</em>', 'sprout'),
            'id' => 'secondary_font',
            'type' => 'typography',
            'line-height' => false,
            'text-align' => false,
            'font-style' => false,
            'font-weight' => false,
            'all_styles'=> true,
            'font-size' => false,
            'color' => false,
            'default' => array (
                'font-family' => 'Lato',
                'subsets' => '',
            ),
            'required' => array('font_source','=','1')

        ),

        // Google Custom
        array (
            'title' => esc_html__('Google Font Face', 'sprout'),
            'subtitle' => wp_kses('<em>Enter your Google Font Name for the theme\'s Secondary Typography</em>', 'sprout'),
            'desc' => esc_html__('e.g.: open sans', 'sprout'),
            'id' => 'secondary_google_font_face',
            'type' => 'text',
            'default' => 'Yantramanav',
            'required' => array('font_source','=','2')
        ),

        // Adobe Typekit
        array (
            'title' => esc_html__('Typekit Font Face', 'sprout'),
            'subtitle' => wp_kses('<em>Enter your Typekit Font Name for the theme\'s Secondary Typography</em>', 'sprout'),
            'desc' => esc_html__('e.g.: futura-pt', 'sprout'),
            'id' => 'secondary_typekit_font_face',
            'type' => 'text',
            'default' => '',
            'required' => array('font_source','=','3')
        )


    )

) );


    /*
     *
     * ---> SOCIAL MEDIA SECTION
     *
     */
    Redux::setSection( $opt_name, array(
    'icon'   => 'fa fa-share-alt-square',
    'title'  => esc_html__( 'Social Media', 'sprout' ),
    'fields' => array(

            array (
                'title' => wp_kses('<i class="fa fa-facebook"></i> Facebook', array(
                    'i' => array('class' => array())
                )),
                'subtitle' => wp_kses('<em>Type your Facebook profile URL here.</em>', 'sprout'),
                'id' => 'facebook_link',
                'type' => 'text',
                'default' => 'https://www.facebook.com/GetBowtied',
            ),

            array (
                'title' => wp_kses('<i class="fa fa-twitter"></i> Twitter', array(
                    'i' => array('class' => array())
                )),
                'subtitle' => wp_kses('<em>Type your Twitter profile URL here.</em>', 'sprout'),
                'id' => 'twitter_link',
                'type' => 'text',
                'default' => 'http://twitter.com/GetBowtied',
            ),

            array (
                'title' => wp_kses('<i class="fa fa-pinterest"></i> Pinterest', array(
                    'i' => array('class' => array())
                )),
                'subtitle' => wp_kses('<em>Type your Pinterest profile URL here.</em>', 'sprout'),
                'id' => 'pinterest_link',
                'type' => 'text',
                'default' => 'http://www.pinterest.com/',
            ),

            array (
                'title' => wp_kses('<i class="fa fa-linkedin"></i> LinkedIn', array(
                    'i' => array('class' => array())
                )),
                'subtitle' => wp_kses('<em>Type your LinkedIn profile URL here.</em>', 'sprout'),
                'id' => 'linkedin_link',
                'type' => 'text',
            ),

            array (
                'title' => wp_kses('<i class="fa fa-google-plus"></i> Google+', array(
                    'i' => array('class' => array())
                )),
                'subtitle' => wp_kses('<em>Type your Google+ profile URL here.</em>', 'sprout'),
                'id' => 'googleplus_link',
                'type' => 'text',
            ),

            array (
                'title' => wp_kses('<i class="fa fa-rss"></i> RSS', array(
                    'i' => array('class' => array())
                )),
                'subtitle' => wp_kses('<em>Type your RSS Feed URL here.</em>', 'sprout'),
                'id' => 'rss_link',
                'type' => 'text',
            ),

            array (
                'title' => wp_kses('<i class="fa fa-tumblr"></i> Tumblr', array(
                    'i' => array('class' => array())
                )),
                'subtitle' => wp_kses('<em>Type your Tumblr URL here.</em>', 'sprout'),
                'id' => 'tumblr_link',
                'type' => 'text',
            ),

            array (
                'title' => wp_kses('<i class="fa fa-instagram"></i> Instagram', array(
                    'i' => array('class' => array())
                )),
                'subtitle' => wp_kses('<em>Type your Instagram profile URL here.</em>', 'sprout'),
                'id' => 'instagram_link',
                'type' => 'text',
                'default' => 'http://instagram.com/getbowtied',
            ),

            array (
                'title' => wp_kses('<i class="fa fa-youtube-play"></i> Youtube', array(
                    'i' => array('class' => array())
                )),
                'subtitle' => wp_kses('<em>Type your Youtube profile URL here.</em>', 'sprout'),
                'id' => 'youtube_link',
                'type' => 'text',
                'default' => 'https://www.youtube.com/channel/UC88KP4HSF-TnVhPCJLe9P-g',
            ),

            array (
                'title' => wp_kses('<i class="fa fa-vimeo-square"></i> Vimeo', array(
                    'i' => array('class' => array())
                )),
                'subtitle' => wp_kses('<em>Type your Vimeo profile URL here.</em>', 'sprout'),
                'id' => 'vimeo_link',
                'type' => 'text',
            ),

        )

    ) );


    /*
     *
     * ---> CUSTOM SECTION
     *
     */
    Redux::setSection( $opt_name, array(
        'icon'   => 'fa fa-code',
        'title'  => esc_html__( 'Custom Code', 'sprout' ),
        'fields' => array(

            array (
                'title' => esc_html__('Custom CSS', 'sprout'),
                'subtitle' => wp_kses('<em>Paste your custom CSS code here.</em>', 'sprout'),
                'id' => 'custom_css',
                'type' => 'ace_editor',
                'mode' => 'css',
            ),

            array (
                'title' => esc_html__('Header JavaScript Code', 'sprout'),
                'subtitle' => wp_kses('<em>Paste your custom JS code here. The code will be added to the header of your site.</em>', 'sprout'),
                'id' => 'header_js',
                'type' => 'ace_editor',
                'mode' => 'javascript',
            ),

            array (
                'title' => esc_html__('Footer JavaScript Code', 'sprout'),
                'subtitle' => wp_kses('<em>Here is the place to paste your Google Analytics code or any other JS code you might want to add to be loaded in the footer of your website.</em>', 'sprout'),
                'id' => 'footer_js',
                'type' => 'ace_editor',
                'mode' => 'javascript',
            ),

        )

    ) );

    /*
     * <--- END SECTIONS
     */
