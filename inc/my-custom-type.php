<?php

if(!class_exists('EmailCampaignPostType')) {

    if (!class_exists('CustomType')) {
        require_once(sprintf("%s/../inc/custom-type/custom-type.php", dirname(__FILE__))); 
    }

	/**
	 * A PostTypeTemplate class that provides 3 additional meta fields
	 */
	class MyCustomType extends CustomType {
		public $_POST_TYPE	= "custom-type";
		public $_meta	= array();

        private $settings = array();

        public function init() {
            $this->settings = array(
                'rewrite'   => array( 'slug' => 'custom-type', 'with_front' => false ), /* you can specify its url slug */
                'has_archive' => 'custom-type', /* you can rename the slug here */
            );

            $this->defaultSettings = $this->settings + $this->defaultSettings;
            parent::init();
        }
		
    	/**
    	 * hook into WP's add_meta_boxes action hook
    	 */
    	public function custom_metaboxes(array $meta_boxes) {
            $prefix = '_custom_type_';
    		$meta_boxes[$prefix.'test_metabox'] = array(
                'id'         => $prefix.'test_metabox',
                'title'      => __( 'Test Meta Box', '_z' ),
                'pages'      => array( 'custom-type', ), // Post type
                'context'    => 'normal',
                'priority'   => 'high',
                'show_names' => true, // Show field names on the left
                // 'cmb_styles' => true, // Enqueue the CMB stylesheet on the frontend
                'fields'     => array(
                    array(
                        'name'       => __( 'Test 1', '_z' ),
                        'desc'       => __( 'Test 1', '_z' ),
                        'id'         => $prefix . 'test1',
                        'type'       => 'text'
                        // 'sanitization_cb' => 'my_custom_sanitization', // custom sanitization callback parameter
                        // 'escape_cb'       => 'my_custom_escaping',  // custom escaping callback parameter
                        // 'on_front'        => false, // Optionally designate a field to wp-admin only
                        // 'repeatable'      => true,
                    ),
                    array(
                        'name'       => __( 'Test 2', '_z' ),
                        'desc'       => __( 'Test 2', '_z' ),
                        'id'         => $prefix . 'test1',
                        'type'       => 'text'
                        // 'sanitization_cb' => 'my_custom_sanitization', // custom sanitization callback parameter
                        // 'escape_cb'       => 'my_custom_escaping',  // custom escaping callback parameter
                        // 'on_front'        => false, // Optionally designate a field to wp-admin only
                        // 'repeatable'      => true,
                    ),
                    array(
                        'name'       => __( 'Test 3', '_z' ),
                        'desc'       => __( 'Test 3', '_z' ),
                        'id'         => $prefix . 'test1',
                        'type'       => 'text'
                        // 'sanitization_cb' => 'my_custom_sanitization', // custom sanitization callback parameter
                        // 'escape_cb'       => 'my_custom_escaping',  // custom escaping callback parameter
                        // 'on_front'        => false, // Optionally designate a field to wp-admin only
                        // 'repeatable'      => true,
                    )
                )
            );

            return $meta_boxes;
    	}
	}

    $customType = new MyCustomType();
}
