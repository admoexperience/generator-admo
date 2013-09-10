#!/bin/bash -e
echo "Installing bower components"
bower install

echo "Copying them over to the template dir"
# Copy them over the to the "git repo"
cp "bower_components/angular/angular.min.js" "templates/bower/"
cp "bower_components/bugsnag/dist/bugsnag.min.js" "templates/bower/"
cp "bower_components/jquery/jquery.min.js" "templates/bower/"
cp "bower_components/jquery/jquery.min.map" "templates/bower/"
cp "bower_components/jquery.transit/jquery.transit.js" "templates/bower/"
cp "bower_components/underscore/underscore-min.js" "templates/bower/"
cp "bower_components/speakingurl/speakingurl.min.js" "templates/bower/"
