# generator-admo

A generator for [Yeoman](http://yeoman.io).

## Initial dev setup

### Tools

Install [nvm](https://github.com/creationix/nvm) the Node Version Manager which is similar to `rbenv`.

    nvm install 0.10 # downloads, compiles and installs latest v0.8.x release
    nvm use 0.10    # use the installed version in current shell
    nvm alias default 0.10   # so that you don't have to execute  `nvm use 0.8` everytime  

####Install `Yeoman`:

    npm install -g yo grunt-cli bower
    npm install -g git@bitbucket.org:fireid/admo-generator.git 

####Install `Compass`:

This *will* require a working version of ruby. we are currently using `2.0.0-p247`

**Windows:** [Ruby Installer](http://rubyinstaller.org/downloads/)

**Mac:** [RBENV](https://github.com/sstephenson/rbenv) for a guide

Make sure you add `$rubyInstall/bin/` to your path, this might be possible during installation

Run the following from a ruby enabled console:

    gem install sass
    gem install compass


The project has an `.editorconfig` file which allows all devs to share/use the same identation
settings and such. You need to install a [Sublime plugin](https://github.com/sindresorhus/editorconfig-sublime#readme)
that automatically reads the config file and ensures your settings are correct whenever you are
working on the project.


## Day-to-day

Working with Admo:

admo
  
  mkdir admo-app-$app-name
  yo admo #when prompted for an appname PLEASE enter $app-name

  git init 
  git add .
  git commit -m "First commit empty admo project"

components
`yo admo:component $component-name`  this will create required js + scss files, You will manually need to add them to
`_include.html` and `main.scss`


grunt

    grunt server     # preview it
    grunt test       # test it
    grunt build      # build it

bower

    bower search <dep>          # search online JS registry
    bower install <dep>         # installs the JS dependency locally
    bower install --save <dep>  # installs the JS dependency and adds it to `bower.json`
    bower install               # installs all JS dependencies listed in `bower.json`


#### Notes

`package.json` lists dependencies that are required for building, testing, etc. and are installed
through `npm install`.

`bower.json` lists JS dependencies that are required by the app, eg. `angular`, and are
installed through `bower install`.

Working with SASS in Windows
    Add Ruby to your PATH (possible to do that in install sequence)
    Install Compass => "gem install compass"
