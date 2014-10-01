WordPress Starter Theme

Based off of Automattic's _s (underscores), with a few additions.

# Getting up and running
You'll need grunt, which would require node and npm. Grunt will get setup a livereload server, run compass to compile scss on change of scss files, run jshint on change of javascript files.

There's a few other tasks:
- imagemin to optimize all the images, 
- deploy task (not complete)
- uglify to minimize the JS (not used yet)
- modernizr (not used yet) - this will parse the js files for all modernizr uses and builds a custom modernizr with only the properties used.

## Update Package JSON
Change the the repository field and the name

## Update all the strings
- Search for '_z' (inside single quotations) to capture the text domain.
- Search for _z_ to capture all the function names.
- Search for Text Domain: _z in style.css.
- Search for  _z (with a space before it) to capture DocBlocks.
- Search for _z- to capture prefixed handles.

## Termainal Commands

Once you have those installed do an
```bash
git clone https://github.com/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress.git inc/cmb
npm link grunt-wordpress-setup
npm install
grunt
```

## Server Setup
- create host,
- create db

After all of the the dependencies are installed you can do a:
```bash
grunt
```