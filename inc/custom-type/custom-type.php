<?php

if(!class_exists('CustomType')) {
    /**
     * Utility Class that creates a Custom Type
     */
    class CustomType
    {   
        public $defaultSettings = array();
        /**
         * The Constructor
         */
        public function __construct() {

            add_filter('cmb_meta_boxes', array(&$this, 'custom_metaboxes' ));

            $this->defaultSettings = array(
                'labels' => array(
                    'name' => __(sprintf('%ss', ucwords(str_replace("-", " ", $this->_POST_TYPE)))),
                    'singular_name' => __(ucwords(str_replace("-", " ", $this->_POST_TYPE)))
                ),
                'public' => true,
                'has_archive' => true,
                'description' => __("This is a sample post type meant only to illustrate a preferred structure of plugin development"),
                'supports' => array(
                    'title', 'editor', 'excerpt', 
                )
            );
        
            // register actions
            add_action('init', array(&$this, 'init'));
            add_action('admin_init', array(&$this, 'admin_init'));
        } // END public function __construct()

        /**
         * hook into WP's init action hook
         */
        public function init() {
            // Initialize Post Type
            $this->create_post_type();

            if ( ! class_exists( 'cmb_Meta_Box' ) ) {
                require_once(sprintf("%s/../../inc/cmb/init.php", dirname(__FILE__)));
            }

            add_action('save_post', array(&$this, 'save_post'));
        } // END public function init()

        /**
         * Create the post type
         */
        public function create_post_type()
        {
            register_post_type($this->_POST_TYPE, $this->defaultSettings);
        }
    
        /**
         * Save the metaboxes for this custom post type
         */
        public function save_post($post_id)
        {
            // verify if this is an auto save routine. 
            // If it is our form has not been submitted, so we dont want to do anything
            if(defined('DOING_AUTOSAVE') && DOING_AUTOSAVE)
            {
                return;
            }
            
            if(isset($_POST['post_type']) && $_POST['post_type'] == $this->_POST_TYPE && current_user_can('edit_post', $post_id))
            {
                foreach($this->_meta as $field_name)
                {
                    // Update the post's meta field
                    if (gettype($_POST[$field_name])==='array') {
                        update_post_meta($post_id, $field_name, serialize($_POST[$field_name]));    
                    } else {
                        update_post_meta($post_id, $field_name, $_POST[$field_name]);    
                    }
                    
                }
            }
            else
            {
                return;
            } // if($_POST['post_type'] == self::POST_TYPE && current_user_can('edit_post', $post_id))
        } // END public function save_post($post_id)

        /**
         * hook into WP's admin_init action hook
         */
        public function admin_init() {          
            // Add metaboxes
            add_action('add_meta_boxes', array(&$this, 'add_meta_boxes'));


        } // END public function admin_init()
            
        /**
         * hook into WP's add_meta_boxes action hook
         */
        public function add_meta_boxes() {
            
        } // END public function add_meta_boxes()

        /**
         * noop
         * @param  array  $meta_boxes all the meta boxes
         * @return void             nothing
         */
        public function custom_metaboxes(array $meta_boxes) {}

        /**
         * called off of the add meta box
         */     
        public function add_inner_meta_boxes($post) {       
            
        }
    } 
}