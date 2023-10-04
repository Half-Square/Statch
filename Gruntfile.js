/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-10-03 18:19:42                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-10-04 10:02:44                               *
 *****************************************************************************/

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    clean: {
      build: ["./dist/"]
    },
    copy: {
      env: {
        files: [{
          expand: true,
          src: ["./src/server/.env.sample"],
          dest: "./src/server/.env"
        }]
      },
      build: {
        files: [
          {expand: true, cwd: "./src/server/dist/", src: ["**"], dest: "./dist/"},
          {expand: true, cwd: "./src/client/dist/", src: ["**"], dest: "./dist/client/"},
          {expand: true, cwd: "./src/server/", src: ["./prisma/**", "./package.json"], dest: "./dist/"},
          {src: ["./src/server/.env.sample"], dest: "./dist/.env"}
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  
  grunt.registerTask("env", ["copy:env"]);
  grunt.registerTask("build", ["clean:build", "copy:build"]);
};
