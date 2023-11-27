/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-10-03 18:19:42                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-11-27 14:46:21                               *
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
          expand: false,
          src: ["./src/server/.env.sample"],
          dest: "./src/server/.env"
        }]
      },
      build: {
        files: [
          {expand: true, cwd: "./src/server/dist/", src: ["**"], dest: "./dist/"},
          {expand: true, cwd: "./src/client/dist/", src: ["**"], dest: "./dist/client/"},
          {src: ["./src/server/.env.sample"], dest: "./dist/.env"},
          {src: ["./src/server/config.json.sample"], dest: "./dist/config.json"},
          {expand: true, cwd: "./src/server/", src: ["upload/"], dest: "./dist/"},
          {
            expand: true, cwd: "./src/server/",
            src: [
              "./prisma/**", 
              "./package.json", 
              "!./prisma/databases/**"
            ],
            dest: "./dist/"
          },
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  
  grunt.registerTask("env", ["copy:env"]);
  grunt.registerTask("build", ["clean:build", "copy:build"]);
};
