<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package _s
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<title><?php wp_title( '|', true, 'right' ); ?></title>
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

	<meta name="MobileOptimized" content="320">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<a class="skip-link screen-reader-text" href="#content"><?php _e( 'Skip to content', '_z' ); ?></a>

<header id="masthead" class="site-header" role="banner">
	<div class="inner-wrap">
		<div class="site-branding">
			<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
			<h2 class="site-description"><?php bloginfo( 'description' ); ?></h2>
		</div>
	</div>
</header><!-- #masthead -->
	
<nav id="site-navigation" class="main-navigation" role="navigation">
	<div class="inner-wrap">
		
		<?php wp_nav_menu( array( 'theme_location' => 'primary' ) ); ?>
	</div>
	<a href="#" class="menu-toggle icon-menu2"></a>
</nav><!-- #site-navigation -->

<div id="content" class="site-content">
	<div class="inner-wrap">

