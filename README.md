# Generator-admo

A [AdmoApplication](https://github.com/admoexperience) generator for [Yeoman](http://yeoman.io).

## Initial dev setup

### Tools

Install [nvm](https://github.com/creationix/nvm) the Node Version Manager which is similar to `rbenv`.

    nvm install 0.10 # downloads, compiles and installs latest v0.8.x release
    nvm use 0.10    # use the installed version in current shell
    nvm alias default 0.10   # so that you don't have to execute  `nvm use 0.8` everytime  

####Install `Yeoman`:

    npm install -g yo grunt-cli bower
    npm install -g "git+ssh://git@bitbucket.org:fireid/admo-generator.git#master"

####Install `Compass`:

This *will* require a working version of ruby. we are currently using `2.0.0-p*` Make sure you add `$rubyInstall/bin/` to your path (this might be possible during installation).

**Windows:** [Ruby Installer](http://rubyinstaller.org/downloads/)

**Mac:** [RBENV](https://github.com/sstephenson/rbenv) for a guide

**Both:** Run the following from a ruby enabled console

    gem install sass
    gem install compass

### IDE setup

The project has a `.editorconfig` file which allows different developers to share their editor settings like indentation styles. If you are using Sublime Text, install the plugin [EditorConfig](https://github.com/sindresorhus/editorconfig-sublime#readme) and it will automatically load the project settings from the config file. This ensures your settings are correct whenever you are working on the project.


## Working with Admo

### Creating a new app
  
    mkdir $appName
    cd $appName
    yo admo #when prompted for an app name PLEASE enter $appName
    git init 
    git add .
    git commit -m "First commit empty admo project"
    
    
### Using an exsisting app

    cd $appName
    npm install
    grunt server


### Creating components
Run this command from the project root.

    yo admo:component $component

This will create required js + sass files. They should automatically be added to `_include.html` and `main.scss`


### Running and Building

    grunt server     # preview it in the emulator
    grunt build      # Compiles it and creates a ziped "pod"

#### Notes

`package.json` lists dependencies that are required for building, testing, etc. and are installed
through `npm install`.

`bower.json` lists JS dependencies that are required by the app and are
installed through `bower install`.

### Docs 
* ![Architecture overview](docs/structure.md)
* ![Components js](docs/components.md)
