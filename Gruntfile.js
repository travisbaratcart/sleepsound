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
      }
   });

   grunt.loadNpmTasks("grunt-browserify");
   grunt.loadNpmTasks("grunt-contrib-watch");

   grunt.registerTask("default", ["watch"]);
   grunt.registerTask("build", ["browserify"]);
};
