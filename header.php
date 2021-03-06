<?php
/**
 * The header for our theme.
 *
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>

	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />

	<!-- ******************************************************************** -->
	<!-- * Custom Favicon *************************************************** -->
	<!-- ******************************************************************** -->

	<?php

	$favicon = get_redux_options('favicon', 'url');
	//write function where global is not in the header
	if ( (isset($favicon)) && (trim($favicon) != "" ) ) {

		if (is_ssl()) {
			$favicon_image_img = str_replace("http://", "https://", $favicon);
		} else {
			$favicon_image_img = $favicon;
		}
		?>

		<link rel="shortcut icon" href="<?php echo esc_url($favicon_image_img) ?>" />
	<?php } ?>

	<?php $header_js = get_redux_options('header_js'); ?>
	<?php if ( (isset($header_js)) && ($header_js != "") ) : ?>
		<!-- ******************************************************************** -->
		<!-- * Custom Header JavaScript Code ************************************ -->
		<!-- ******************************************************************** -->
		<script><?php echo html_entity_decode($header_js); ?></script>
	<?php endif; ?>

	<?php wp_head(); ?>

</head>
<?php
$header_search_show = get_redux_options('search_button');
$header_logo = get_redux_options('site_logo', 'url');
$header_logo_alt = get_redux_options('alt_header_logo', 'url');
$topbar_show_social = get_redux_options('top_bar_social_icons');
$header_phone_display = get_redux_options('header_phone_display');
$header_phone = get_redux_options('header_phone');
?>
<body <?php body_class(); ?>>

<div id="content" class="m-scene">

	<header id="header" class="m-mobile-nav m-header scene_element scene_element--fadein <?php echo esc_attr( sprout_admin_class_checks() ); ?>">

		<!-- Main Nav -->
			<div class="uppercontainer">

				<div class="sprout-nav-meta">

					<div class="meta-wrapper">

						<div class="meta-blog__desc">
							<?php bloginfo('description'); ?>
						</div>

						<?php if($header_search_show === "1" || $header_search_show === 1): ?>
							<div class="meta-search">
								<a href="#" class="meta-search-trigger"><i class="fa fa-search" aria-hidden="true"></i></a>
							</div>
						<?php endif; ?>


						<?php
						/*
                         * ---> Social Header Icons
                         */
						

						if($topbar_show_social){
							$redux_facebook = get_redux_options('facebook_link');
							$redux_twitter = get_redux_options('twitter_link');
							$redux_pinterest = get_redux_options('pinterest_link');
							$redux_linkedin = get_redux_options('linkedin_link');
							$redux_googleplus = get_redux_options('googleplus_link');
							$redux_rss = get_redux_options('rss_link');
							$redux_tumblr = get_redux_options('tumblr_link');
							$redux_instagram = get_redux_options('instagram_link');
							$redux_youtube = get_redux_options('youtube_link');
							$redux_vimeo = get_redux_options('vimeo_link');
						}
						?>
						<?php if ($topbar_show_social): ?>
							<div class="meta meta-top meta-spacer hidden-xs">
								|
							</div>
							<div class="nav-social-widget">
								<?php if ((isset($redux_facebook)) && $redux_facebook !== "" ): ?>
									<a href="<?php echo esc_url($redux_facebook) ?>" target="_blank"><i class="fa fa-facebook"></i></a>
								<?php endif; ?>

								<?php if ((isset($redux_twitter)) && $redux_twitter !== "" ):?>
									<a href="<?php echo esc_url($redux_twitter) ?>" target="_blank"><i class="fa fa-twitter"></i></a>
								<?php endif; ?>

								<?php if ((isset($redux_pinterest)) && $redux_pinterest !== "" ):?>
									<a href="<?php echo esc_url($redux_pinterest) ?>" target="_blank"><i class="fa fa-pinterest"></i></a>
								<?php endif; ?>

								<?php if ((isset($redux_linkedin)) && $redux_linkedin !== "" ):?>
									<a href="<?php echo esc_url($redux_linkedin) ?>" target="_blank"><i class="fa fa-linkedin"></i></a>
								<?php endif; ?>

								<?php if ((isset($redux_googleplus)) && $redux_googleplus !== "" ):?>
									<a href="<?php echo esc_url($redux_googleplus) ?>" target="_blank"><i class="fa fa-google-plus"></i></a>
								<?php endif; ?>

								<?php if ((isset($redux_rss)) && $redux_rss !== "" ):?>
									<a href="<?php echo esc_url($redux_rss) ?>" target="_blank"><i class="fa fa-rss"></i></a>
								<?php endif; ?>

								<?php if ((isset($redux_tumblr)) && $redux_tumblr !== "" ):?>
									<a href="<?php echo esc_url($redux_tumblr) ?>" target="_blank"><i class="fa fa-tumblr"></i></a>
								<?php endif; ?>

								<?php if ((isset($redux_instagram)) && $redux_instagram !== "" ):?>
									<a href="<?php echo esc_url($redux_instagram) ?>" target="_blank"><i class="fa fa-instagram"></i></a>
								<?php endif; ?>

								<?php if ((isset($redux_youtube)) && $redux_youtube !== "" ):?>
									<a href="<?php echo esc_url($redux_youtube) ?>" target="_blank"><i class="fa fa-youtube-play"></i></a>
								<?php endif; ?>

								<?php if ((isset($redux_vimeo)) && $redux_vimeo !== "" ):?>
									<a href="<?php echo esc_url($redux_vimeo) ?>" target="_blank"><i class="fa fa-vimeo"></i></a>
								<?php endif; ?>

							</div>

						<?php endif; ?>


						<?php
						/*
						 * ---> PHONE
						 */
						
						?>
						<?php if($header_phone_display === "1"): ?>
							<div class="meta meta-top meta-spacer hidden-xs">
								|
							</div>
							<div class="meta-phone meta-top <?php if($topbar_show_social === "0"): echo esc_attr( 'no-social' ); endif; ?>">
								<a href="tel:<?php echo esc_attr($header_phone) ?>"><i class="fa fa-phone fa-h-icon" aria-hidden="true"></i><?php echo wp_kses($header_phone, 'sprout') ?></a>
							</div>
						<?php endif; ?>


					</div>

				</div>

			</div>

			<div class="sprout-dropdown-wrapper shadow-medium">
				<a class="navbar-brand visible-xs visible-sm" href="<?php echo esc_url(get_home_url('/')); ?>">
					<?php if ( (isset($header_logo)) ) : ?>
						<img src="<?php echo esc_url($header_logo)?>" alt="<?php echo get_bloginfo('description') ?>">
					<?php else: ?>
						<?php bloginfo( 'name' ); ?>
					<?php endif; ?>
				</a>
				<a href="#" id="nav-trigger" class="sprout-nav-trigger"><?php echo esc_html__('Menu', 'sprout') ?></a>
			</div>

		<?php
		// Check for sticky nav
		$is_nav_sticky = get_redux_options('navigation_sticky');
		?>

			<nav id="sprout-dropdown-trigger" class="sprout-dropdown" data-sticky="<?php echo esc_attr($is_nav_sticky) ?>">

				<a class="navbar-brand navbar-dropdown visible-xs visible-sm" href="<?php echo esc_url(get_home_url('/')); ?>">
					<?php if ( (isset($header_logo_alt)) ) : ?>
						<img src="<?php echo esc_url($header_logo_alt)?>" alt="<?php echo get_bloginfo('description') ?>">
					<?php else: ?>
						<?php bloginfo( 'name' ); ?>
					<?php endif; ?>
				</a>

				<a id="nav-close" href="#" class="sprout-close"><?php echo esc_html__('Close', 'sprout') ?></a>

				<div class="nav-main__container">
					<a class="navbar-brand hidden-xs hidden-sm" href="<?php echo esc_url(get_home_url('/')); ?>">
						<?php if ( (isset($header_logo)) ) : ?>
							<img src="<?php echo esc_url($header_logo)?>" alt="<?php echo get_bloginfo('description') ?>">
						<?php else: ?>
							<?php bloginfo( 'name' ); ?>
						<?php endif; ?>
					</a>
					<?php if(has_nav_menu( 'primary' )):

						$args = array(
							'menu' => 'primary-menu',
							'theme_location' => 'primary',
							'menu_class' => 'sprout-dropdown-content',
							'container' => 'false',
							'items_wrap'      => '
					<ul id="%1$s" class="%2$s">%3$s</ul>',
							'walker' => new Sv_Walker_Nav_Menu
						);

						wp_nav_menu( $args );

					endif
					?>
				</div>


			</nav>

			<!-- /nav -->
	</header>
	<div class="super-search">
		<div class="super-search-close">
			<a href="#"><?php echo esc_html__('Close', 'sprout') ?></a>
		</div>
		<?php echo get_search_form(false); ?>
	</div>
	<!-- /.super search -->
