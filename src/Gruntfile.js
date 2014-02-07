module.exports = function(grunt) {

  var jadedebug = {
    compileDebug: false,
    pretty: true,

    data:{
      partial: function(templatePath, dataObj){
        var template = grunt.file.read(templatePath);

        if(typeof(dataObj) === String){
          dataObj = grunt.file.readJSON(dataObj);
        }

        if(templatePath.match(/.jade/g)){
          return require('grunt-contrib-jade/node_modules/jade').compile(template, {filename: templatePath, pretty: true})(dataObj);
        }else{
          return template;
        }
      },
      data: function(path){
        return grunt.file.readJSON(path);
      },
      locals:{
        getConfigFile:function(path){
          return grunt.file.readJSON(path);
        },
        demos:function(){
          return grunt.file.expand('modules/**/demo/*.jade').map(function(a){
            return a.split('/').pop().replace(/.jade/g, '.html')
          }).filter(function(a){
            return a.match(/-demo.html/g)});
        },
        data: function(path){
          return jadedebug.data.data(path);
        },
        partial: function(templatePath, dataObj){
          return jadedebug.data.partial(templatePath, dataObj);
        }

      }
    }
  }



  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // clear output directories
    clean: {
      debug: {
        cwd: '../',
        src: ['../build/debug'],
        force: true
      }
    },

    // compile SASS files
    compass: {
      build: {
        options: {
          sassDir: 'style',
          cssDir: '../build/debug/style',
          outputStyle: 'expanded',
          noLineComments: true,
          force: true,
          relativeAssets: true,
          images: '../build/debug/img',
          environment: 'development'
        }
      },
      debug_modules: {
        options: {
          cssDir: '../build/debug/style/modules',
          outputStyle: 'expanded',
          noLineComments: true,
          force: true,
          relativeAssets: true,
          images: '../build/debug/img',
          environment: 'development'
        }
      },
      docs:{
        options:{
          sassDir: 'docs/style',
          cssDir: '../docs/style',
          outputStyle: 'compressed',
          noLineComments: true,
          force: true,
          relativeAssets: true,
          images: '../docs/img',
          environment: 'production'
        }
      }
    },


    // copy files (font, img, js)
    copy: {
      font: {
        files: [{expand: true, cwd: 'style/fonts', src:['**'], dest: '../build/debug/style/fonts'}]
      },
      img: {
        files : [{expand: true, cwd: 'img', src: ['**'], dest: '../build/debug/img'}]
      },
      js: {
        files : [{expand: true, cwd: 'js', src: ['**'], dest: '../build/debug/js'}]
      },
      module_js: {
        files: [{expand: true, cwd: 'modules', src: ['**/js/*.js'], dest: '../build/debug/js/modules/'}]
      },
      debug_modules : {
       // go through every module folder
        files : function() {
          var module, array = [];

          // copy all imgs
          grunt.file.expand('modules/**/img/').forEach(function(path) {
            module = path.split('/')[2];
            array.push({expand: true, cwd: path, src: ['**'], dest: '../build/debug/img/'+module+'/'});
          });

          // copy all js
          grunt.file.expand('modules/**/js/').forEach(function(path) {
            module = path.split('/')[2];
            array.push({expand: true, cwd: path, src: ['**'], dest: '../build/debug/js/modules/'});
          });
          return array;
        }
      },
      deploy : {
        files : function() {
          var module, array = [];

          array.push({expand: true, cwd: 'style/fonts', src:['**'], dest: '../build/deploy/style/fonts'});
          array.push({expand: true, cwd: 'img', src: ['**'], dest: '../build/deploy/img'});
          array.push({expand: true, cwd: 'js', src: ['**'], dest: '../build/deploy/js'});

          // copy imgs // JS is handled elsewhere
          grunt.file.expand('modules/**/img/').forEach(function(path) {
            module = path.split('/')[2];
            array.push({expand: true, cwd: path, src: ['**'], dest: '../build/deploy/img/'+module+'/'});
          });

          return array;
        }
      },
      docs : {
        files: [
          {expand: true, cwd: 'docs/img', src: ['**'], dest: '../docs/img'},
          {expand: true, cwd: 'docs/js', src: ['**'], dest: '../docs/js'},
          {expand: true, cwd: 'docs/html', src: ['*.html'], dest: '../docs/'}
        ]
      }
    },


    // compile jade files
    jade: {
      index: {
        options: jadedebug,
        files: [{expand: true, cwd: './', src: ['*.jade'], dest: '../build/debug', ext: '.html', flatten: true }]
      },
      modules: {
        options: jadedebug,
        files: [
          {expand: true, cwd: 'modules', src: '**/demo/*.jade', dest: '../build/debug', ext: '.html', flatten: true }
        ]
      },
      debug_pages: {
        options: jadedebug,
        files: [{expand: true, cwd: 'pages', src: '*.jade', dest: '../build/debug', ext: '.html', flatten: true}]
      },
      docs: {
        options: jadedebug,
        files:[{expand:true, cwd:'docs/', src:['html/*.jade'], dest:'../docs', ext:'.html', flatten:true}]
      }
    },


    // watch file changes
    watch: {
      base_sass: {
        files: ['style/*.scss','style/**/*.scss'],
        tasks: ['compass:build', 'cssmin']
      },
      module_sass: {
        files: ['modules/**/style/*.scss'],
        tasks: ['css', 'cssmin']
      },
      base_jade: {
        files: ['html/*.jade','*.jade'],
        tasks: ['jade:index']
      },
      module_jade: {
        files: ['modules/**/html/*.jade','modules/**/data/*.json'],
        tasks: ['html', 'pages']
      },
      base_img: {
        files: ['img/*.*'],
        tasks: ['copy:img']
      },
      module_img: {
        files: ['modules/**/img/*.*'],
        tasks: ['assets']
      },
      base_js:{
        files: ['js/*.js', 'js/**/*.js'],
        tasks: ['copy:js', 'min']
      },
      module_js:{
        files: ['modules/**/js/*.js'],
        tasks: ['js', 'min']
      },
      docs: {
        files: ['docs/**/*.*'],
        tasks: ['docs']
      },
      pages: {
        files: ['pages/*.jade'],
        tasks: ['pages']
      }
    },


    // yui compression
    min: {
      dist: {
        src: ['../build/debug/js/main.js', '../build/debug/js/modules/*.js'],
        dest: '../build/debug/js/main.min.js'
      }
    },
    cssmin: {
      dist: {
        src: ['../build/debug/style/style.css', '../build/debug/style/modules/*.css'],
        dest: '../build/debug/style/style.min.css'
      }
    }

  });





  // Load the plugins
  // ===================================
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jade');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-yui-compressor');




  // Default task(s)
  // ===================================
  grunt.registerTask('default', ['debug']);

  grunt.registerTask('debug', function() {
    grunt.task.run([
      'clean:debug',
      // css
      'compass:build',
      'css',
      'copy:font',
      'cssmin',
      // 
      'copy:debug_modules',
      'copy:img',
      // js
      'copy:js',
      'js',
      'min',
      'jade:debug_pages',
      'jade:modules',
      'jade:index',
      'docs'
    ]);
  });

  grunt.registerTask('deploy', function() {
    grunt.task.run([
      'django'
    ]);
  });



// // trigger on watch events
// grunt.event.on('watch', function(action, filepath, target) {
//   // if filepath is 'modules/**/style', run as 'css:module-name'

//   if (target === 'module_sass') {
//     console.log('css:'+filepath.split('/')[1]);
//     grunt.config('watch.module_sass.args.0', filepath.split('/')[1]);
//   }

//   // grunt.log.writeln(filepath + ' was indeed ' + action);
//   // var test;
//   // test = filepath.split('/');
//   // if (test[0] === 'modules' && test[2] === 'style') {
//   //   grunt.log.writeln(test);

//   //   console.log(target);
//   //   // grunt.task.run('css:'+test[1]);
//   //   // grunt.config('watch.module_sass.tasks', 'css:'+target);
//   // }
// });













  // compile stuff in 'docs'
  grunt.registerTask('docs', 'update docs/ folder', function() {
    grunt.task.run([
      'compass:docs',
      'copy:docs',
      'jade:docs'
    ]);
  });


  // ----------------------------

  grunt.registerTask('django', function() {
    console.log('the D is silent');
    grunt.config('min.dist.dest', '../build/deploy/ds/static/js/main.min.js');
    grunt.task.run('min');
    grunt.config('cssmin.dist.dest', '../build/deploy/ds/static/style/style.min.css');
    grunt.task.run('cssmin');
  });

  // ----------------------------
  // can be module specfic, ex. grunt html:article-view

  // compile SCSS changes
  grunt.registerTask('css', function(module) {
    module = module || '**';

    console.log(this);
    console.log(module);

    // go through every module, or the one passed
    grunt.file.expand('modules/'+module+'/style').forEach(function(path) {
      grunt.registerTask(path, function() {
        // set the sassDir for each module
        grunt.config('compass.debug_modules.options.sassDir', path);
        grunt.task.run('compass:debug_modules');
      });

      // run it
      grunt.task.run(path);
    });
  });


  // copy module JS
  grunt.registerTask('js', function(module) {
    module = module || '**';
    var mode = grunt.option('deploy') ? 'deploy' : 'debug';
    var modules = [];

    // go through every module, or the one passed
    grunt.file.expand('modules/'+module+'/js').forEach(function(path) {
      mod = path.split('/')[1];
      modules.push({
        expand: true,
        cwd: path,
        src: ['*.js'],
        dest: '../build/'+mode+'/js/modules'
      });
    });

    grunt.config('copy.module_js.files', modules);
    grunt.task.run('copy:module_js');
    
  });


  // compile JADE files in modules
  grunt.registerTask('html', function(module) {
    module = module || '**';
    var env = grunt.option('deploy') ? 'deploy' : 'debug';
    var modules = [];

    // for each file in 'modules/**/demo/'
    grunt.file.expand('modules/'+module+'/demo/').forEach(function(path){
      mod = path.split('/')[2];
      modules.push(
        {expand:true,
        cwd: path,
        src: ['*.jade'],
        dest: '../build/'+ env,
        ext: '.html',
        flatten: true}
      )
    });

    grunt.config('jade.modules.files', modules);
    grunt.task.run('jade:modules');
    grunt.task.run('pages');
  });


  // compile JADE files in pages/
  grunt.registerTask('pages', function() {
    var mode = grunt.option('deploy') ? 'deploy' : 'debug';

    grunt.task.run([
      'jade:'+mode+'_pages'
    ]);
  });

  // copy assets from modules
  grunt.registerTask('assets', 'copy assets from modules', function(module) {
    module = module || '**';
    var mode = grunt.option('deploy') ? 'deploy' : 'debug';

    grunt.file.expand('modules/'+module+'/img').forEach(function(path) {
      mod = path.split('/')[1];
      grunt.registerTask(path, function() {
        // configure
        grunt.config('copy:module_img.files.cwd', path);
        grunt.config('copy:module_img.files.dest', '../build/debug/img/'+mod+'/');

        // run
        grunt.task.run('copy:module_img');
      })
      grunt.task.run(path);
    });
  });


  // ----------------------------
  // watch a specfic module

  // grunt.registerTask('w', function(module) {
  //   module = module || '**';

  //   // tasks
  //   // ----------------------------
  //   // html
  //   var html_task = ['modules/'+module+'/html/*jade' ]
  //   // js
  //   var js_task = ['modules/'+module+'/js/*jade' ]

  //   // scss
  //   var html_task = ['modules/'+module+'/html/*jade' ]

  // //       // check html
  // //   var watch_html = ['modules/'+module+'/html/*.jade', 'modules/'+module+'/html/*.json'],
  // //       // check js
  // //       watch_js = ['modules/'+module+'/js/*.js'],
  // //       // check style
  // //       watch_style = ['modules/'+module+'/style/*.scss'],
  // //       // check imgs
  // //       watch_imgs = ['modules/'+module+'/img/*.*'];

  // //   var html_task = ['html:'+module],
  // //       js_task = ['js:'+module],
  // //       style_task = ['css:'+module],
  // //       img_task = ['assets:'+module];

  // //   // unfinished
  // });
};
