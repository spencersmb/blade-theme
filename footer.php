<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package Neat
 */
?>

<footer class="neat_footer">

		<?php
		if(is_active_sidebar('neat_footer')): ?>
		<div class="footer-top">
			<div class="container no-padding">
				<?php dynamic_sidebar('neat_footer'); ?>
			</div>
		</div>
		<?php endif; ?>

	<div class="footer-bottom">
		<div class="container">
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-9">
					<div class="footer-container">
						<div class="footer-logo">
							<a class="navbar-brand" href="<?php echo esc_url(get_home_url('/')); ?>">
								<?php
								//if light scheme selected - choose alt logo
								$header_logo_alt = get_redux_options('alt_header_logo', 'url');
								//else choose dark logo
								?>
								<?php if ( (isset($header_logo_alt)) ) : ?>
									<img src="<?php echo esc_url($header_logo_alt)?>" alt="<?php echo get_bloginfo('description') ?>">
								<?php else: ?>
									<?php bloginfo( 'name' ); ?>
								<?php endif; ?>
							</a>
						</div>
						<?php if(has_nav_menu( 'primary' )): ?>
							<div class="footer-nav">
								<?php wp_nav_menu( array(
										'menu' => 'primary-menu',
										'theme_location' => 'primary',
										'container' => 'false',
										'depth' => 1
									)
								); ?>
							</div>
						<?php endif; ?>
					</div>
				</div>
				<!-- social media -->
				<div class="col-xs-12 col-sm-12 col-md-3">
					<div class="footer-social">
						<ul>
							<?php
							$redux_show_social = get_redux_options('footer_social_icons');
							$redux_footer_copywrite = get_redux_options('footer_copyright_text');

							if($redux_show_social){
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
							<?php if ($redux_show_social): ?>

								<?php if ((isset($redux_facebook)) && $redux_facebook !== "" ): ?>
									<li><a href="<?php echo esc_url($redux_facebook) ?>" target="_blank"><i class="fa fa-facebook"></i></a></li>
								<?php endif; ?>

								<?php if ((isset($redux_twitter)) && $redux_twitter !== "" ):?>
									<li><a href="<?php echo esc_url($redux_twitter) ?>" target="_blank"><i class="fa fa-twitter"></i></a></li>
								<?php endif; ?>

								<?php if ((isset($redux_pinterest)) && $redux_pinterest !== "" ):?>
									<li><a href="<?php echo esc_url($redux_pinterest) ?>" target="_blank"><i class="fa fa-pinterest"></i></a></li>
								<?php endif; ?>

								<?php if ((isset($redux_linkedin)) && $redux_linkedin !== "" ):?>
									<li><a href="<?php echo esc_url($redux_linkedin) ?>" target="_blank"><i class="fa fa-linkedin"></i></a></li>
								<?php endif; ?>

								<?php if ((isset($redux_googleplus)) && $redux_googleplus !== "" ):?>
									<li><a href="<?php echo esc_url($redux_googleplus) ?>" target="_blank"><i class="fa fa-google-plus"></i></a></li>
								<?php endif; ?>

								<?php if ((isset($redux_rss)) && $redux_rss !== "" ):?>
									<li><a href="<?php echo esc_url($redux_rss) ?>" target="_blank"><i class="fa fa-rss"></i></a></li>
								<?php endif; ?>

								<?php if ((isset($redux_tumblr)) && $redux_tumblr !== "" ):?>
									<li><a href="<?php echo esc_url($redux_tumblr) ?>" target="_blank"><i class="fa fa-tumblr"></i></a></li>
								<?php endif; ?>

								<?php if ((isset($redux_instagram)) && $redux_instagram !== "" ):?>
									<li><a href="<?php echo esc_url($redux_instagram) ?>" target="_blank"><i class="fa fa-instagram"></i></a></li>
								<?php endif; ?>

								<?php if ((isset($redux_youtube)) && $redux_youtube !== "" ):?>
									<li><a href="<?php echo esc_url($redux_youtube) ?>" target="_blank"><i class="fa fa-youtube-play"></i></a></li>
								<?php endif; ?>

								<?php if ((isset($redux_vimeo)) && $redux_vimeo !== "" ):?>
									<li><a href="<?php echo esc_url($redux_vimeo) ?>" target="_blank"><i class="fa fa-vimeo"></i></a></li>
								<?php endif; ?>

								<?php if ((isset($redux_flickr)) && $redux_flickr !== "" ):?>
									<li><a href="<?php echo esc_url($redux_flickr) ?>" target="_blank"><i class="fa fa-flickr"></i></a></li>
								<?php endif; ?>

								<?php if ((isset($redux_foursquare)) && $redux_foursquare !== "" ):?>
									<li><a href="<?php echo esc_url($redux_foursquare) ?>" target="_blank"><i class="fa fa-foursquare"></i></a></li>
								<?php endif; ?>

							<?php endif; ?>

						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Copyright -->
	<?php if( isset($redux_footer_copywrite)  && $redux_footer_copywrite !== ''): ?>
	<div class="footer-copyright">
		<div class="copyright">
			<p><?php echo wp_kses_post($redux_footer_copywrite, 'neat')?></p>
		</div>
	</div>
	<?php endif; ?>



</footer>
<!-- /footer -->
</div>
<!-- /#content -->


	<!-- ******************************************************************** -->
	<!-- * WP Footer() ****************************************************** -->
	<!-- ******************************************************************** -->
	<?php wp_footer(); ?>

<?php $footer_js = get_redux_options('footer_js'); ?>
<?php if ( (isset($footer_js)) && ($footer_js != "") ) : ?>
	<!-- ******************************************************************** -->
	<!-- * Custom Footer JavaScript Code ************************************ -->
	<!-- ******************************************************************** -->
	<script><?php echo html_entity_decode($footer_js); ?></script>
<?php endif; ?>

</body>
</html>
