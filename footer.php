<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package _s
 */
?>
	</div>
</div><!-- #content -->

<footer id="colophon" class="site-footer" role="contentinfo">
	<div class="inner-wrap">
		<div class="site-info">
			<a href="<?php echo esc_url( __( 'http://wordpress.org/', '_z' ) ); ?>"><?php printf( __( 'Proudly powered by %s', '_z' ), 'WordPress' ); ?></a>
			<span class="sep"> | </span>
			<?php printf( __( 'Theme: %1$s by %2$s.', '_z' ), '_z', '<a href="http://automattic.com/" rel="designer">Automattic</a>' ); ?>
		</div>
	</div>
</footer><!-- #colophon -->

<?php wp_footer(); ?>

</body>
</html>
