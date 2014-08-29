WordPress Starter Theme

Based off of Automattic's _s (underscores), with a few additions.

# Getting up and running
You'll need grunt, which would require node and npm. Grunt will get setup a livereload server, run compass to compile scss on change of scss files, run jshint on change of javascript files.

There's a few other tasks:
- imagemin to optimize all the images, 
- deploy task (not complete)
- uglify to minimize the JS (not used yet)
- modernizr (not used yet) - this will parse the js files for all modernizr uses and builds a custom modernizr with only the properties used.

Once you have those installed do an
```bash
npm install
```

After all of the the dependencies are installed you can do a:
```bash
grunt
```

- Added a custom type class that allows for easy creation of custom types
	- Custom Types use CMB