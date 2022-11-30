var grunt = require('grunt');

grunt.config.init({
    pkg: grunt.file.readJSON('./package.json'),
    'create-windows-installer': {
        ia32: {
            appDirectory: './Diaglog-Note/Diaglog-Note-win32-x64',
            outputDirectory: './Diaglog-Note/installer64',
            authors: 'Remon',
            title: 'Diaglog-Note',
            exe: 'Diaglog-Note.exe',
            description: 'alarm clock',
            noMsi: true,
            loadingGif: 'clock.ico',
            setupIcon: 'clock.ico',
            icon: 'clock.ico',
        }
    }
})

grunt.loadNpmTasks('grunt-electron-installer');
grunt.registerTask('default', ['create-windows-installer']);