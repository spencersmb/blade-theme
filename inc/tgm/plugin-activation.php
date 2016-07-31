<?php
add_action( 'neat_register', 'neat_register_required_plugins' );
/**
 * Register the required plugins for this theme.
 *
 * In this example, we register five plugins:
 * - one included with the neat library
 * - two from an external source, one from an arbitrary source, one from a GitHub repository
 * - two from the .org repo, where one demonstrates the use of the `is_callable` argument
 *
 * The variable passed to neat_register_plugins() should be an array of plugin
 * arrays.
 *
 * This function is hooked into neat_init, which is fired within the
 * TGM_Plugin_Activation class constructor.
 */
function neat_register_required_plugins() {
    /*
     * Array of plugin arrays. Required keys are name and slug.
     * If the source is NOT from the .org repo, then source is also required.
     */
    $plugins = array(

        //delivered with the theme
        array(
            'name'                  => 'Neat Custom Post Types / Widgets / Shortcodes', // The plugin name
            'slug'                  => 'neat-extended', // The plugin slug (typically the folder name)
            'source'                => get_template_directory() . '/inc/plugins/neat-extended.zip', // The plugin source
            'required'              => true, // If false, the plugin is only 'recommended' instead of required
            'version'               => '', // E.g. 1.0.0. If set, the active plugin must be this version or higher, otherwise a notice is presented
            'force_activation'      => false, // If true, plugin is activated upon theme activation and cannot be deactivated until theme switch
            'force_deactivation'    => false, // If true, plugin is deactivated upon theme switch, useful for theme-specific plugins
            'external_url'          => '', // If set, overrides default API URL and points to an external URL
            'image_url'             => get_template_directory_uri() . '/assets/images/backend/neat-theme.jpg',
        ),
        array(
            'name'                  => 'DHVC Form : Wordpress Form for Visual Composer', // The plugin name
            'slug'                  => 'dhvc-form', // The plugin slug (typically the folder name)
            'source'                => get_template_directory() . '/inc/plugins/dhvc-form.zip', // The plugin source
            'required'              => true, // If false, the plugin is only 'recommended' instead of required
            'version'               => '1.4.9', // E.g. 1.0.0. If set, the active plugin must be this version or higher, otherwise a notice is presented
            'force_activation'      => false, // If true, plugin is activated upon theme activation and cannot be deactivated until theme switch
            'force_deactivation'    => false, // If true, plugin is deactivated upon theme switch, useful for theme-specific plugins
            'external_url'          => '', // If set, overrides default API URL and points to an external URL
            'image_url'             => get_template_directory_uri() . '/assets/images/backend/visual-composer.jpg',
        ),
        array(
            'name'                  => 'WPBakery Visual Composer', // The plugin name
            'slug'                  => 'js_composer', // The plugin slug (typically the folder name)
            'source'                => get_template_directory() . '/inc/plugins/js_composer.zip', // The plugin source
            'required'              => true, // If false, the plugin is only 'recommended' instead of required
            'version'               => '4.9', // E.g. 1.0.0. If set, the active plugin must be this version or higher, otherwise a notice is presented
            'force_activation'      => false, // If true, plugin is activated upon theme activation and cannot be deactivated until theme switch
            'force_deactivation'    => false, // If true, plugin is deactivated upon theme switch, useful for theme-specific plugins
            'external_url'          => '', // If set, overrides default API URL and points to an external URL
            'image_url'             => get_template_directory_uri() . '/assets/images/backend/visual-composer.jpg',
        ),
        // Contact 7
        array(
            'name'      => 'Contact7',
            'slug'      => 'contact-form-7',
            'required'  => true,
        ),
        // TablePress
        array(
            'name'      => 'TablePress',
            'slug'      => 'tablepress',
            'required'  => true,
        ),
        array(
            'name'                  => 'Redux Settings Framework', // The plugin name
            'slug'                  => 'redux', // The plugin slug (typically the folder name)
            'source'                => get_template_directory() . '/inc/plugins/redux-framework.zip', // The plugin source
            'required'              => true, // If false, the plugin is only 'recommended' instead of required
            'version'               => '', // E.g. 1.0.0. If set, the active plugin must be this version or higher, otherwise a notice is presented
            'force_activation'      => false, // If true, plugin is activated upon theme activation and cannot be deactivated until theme switch
            'force_deactivation'    => false, // If true, plugin is deactivated upon theme switch, useful for theme-specific plugins
            'external_url'          => '', // If set, overrides default API URL and points to an external URL
            'image_url'             => get_template_directory_uri() . '/assets/images/backend/redux.jpg',
        ),
        array(
            'name'                  => 'Slider Revolution', // The plugin name
            'slug'                  => 'revslider', // The plugin slug (typically the folder name)
            'source'                => get_template_directory() . '/inc/plugins/revslider.zip', // The plugin source
            'required'              => true, // If false, the plugin is only 'recommended' instead of required
            'version'               => '', // E.g. 1.0.0. If set, the active plugin must be this version or higher, otherwise a notice is presented
            'force_activation'      => false, // If true, plugin is activated upon theme activation and cannot be deactivated until theme switch
            'force_deactivation'    => false, // If true, plugin is deactivated upon theme switch, useful for theme-specific plugins
            'external_url'          => '', // If set, overrides default API URL and points to an external URL
            'image_url'             => get_template_directory_uri() . '/assets/images/backend/revslider.jpg',
        ),

    );

    /*
     * Array of configuration settings. Amend each line as needed.
     *
     * neat will start providing localized text strings soon. If you already have translations of our standard
     * strings available, please help us make neat even better by giving us access to these translations or by
     * sending in a pull-request with .po file(s) with the translations.
     *
     * Only uncomment the strings in the config array if you want to customize the strings.
     */
    $config = array(
        'id'           => 'neat',                 // Unique ID for hashing notices for multiple instances of neat.
        'default_path' => '',                      // Default absolute path to bundled plugins.
        'menu'         => 'neat-install-plugins', // Menu slug.
        'parent_slug'  => 'themes.php',            // Parent menu slug.
        'capability'   => 'edit_theme_options',    // Capability needed to view plugin install page, should be a capability associated with the parent menu used.
        'has_notices'  => true,                    // Show admin notices or not.
        'dismissable'  => true,                    // If false, a user cannot dismiss the nag message.
        'dismiss_msg'  => '',                      // If 'dismissable' is false, this message will be output at top of nag.
        'is_automatic' => false,                   // Automatically activate plugins after installation or not.
        'message'      => ''                      // Message to output right before the plugins table.
    );

    neat( $plugins, $config );
}