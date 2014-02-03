# Generator-admo

A [AdmoApplication](https://github.com/admoexperience) generator for [Yeoman](http://yeoman.io).

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
* ![Dev](docs/dev.md)
