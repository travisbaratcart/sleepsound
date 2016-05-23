module.exports = function (grunt) {
   grunt.initConfig({
      browserify: {
         dist: {
            options: {
               transform: [
               ["babelify", {presets: ["es2015", "react"]}]
               ]
            },
            files: {
               "./client/dist/bundle.js": ["./client/components/App.js"]
            }
         }
      },
      watch: {
         scripts: {
            files: ["./client/components/*.js"],
            tasks: ["browserify"]
         }
      },
      nodemon: {
         dev: {
            script: "./server/app.js"
         }
      },
      concurrent: {
         dev: ["nodemon", "watch"],
         options: {logConcurrentOutput: true}
      },
      uglify: {
         build: {
            src: 'client/dist/bundle.js',
            dest: 'client/dist/bundle.min.js'
         },
      }
   });

   grunt.loadNpmTasks("grunt-browserify");
   grunt.loadNpmTasks("grunt-contrib-watch");
   grunt.loadNpmTasks("grunt-nodemon");
   grunt.loadNpmTasks("grunt-concurrent");
   grunt.loadNpmTasks("grunt-contrib-uglify");

   grunt.registerTask("default", ["concurrent"]);
   grunt.registerTask("build", ["browserify"]);
   grunt.registerTask("deploy", ["browserify", "uglify"]);
};
