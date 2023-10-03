/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-10-03 18:19:42                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-10-03 18:30:26                               *
 *****************************************************************************/

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    copy: {
      env: {
        files: [{
          src: ["./src/server/.env.sample"],
          dest: "./src/server/.env"
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask("default", ["copy:env"]);
};
