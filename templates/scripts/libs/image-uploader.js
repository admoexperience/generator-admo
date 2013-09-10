// This bit is important.  It detects/adds XMLHttpRequest.sendAsBinary.  Without this
// you cannot send image data as part of a multipart/form-data encoded request from
// Javascript.  This implementation depends on Uint8Array, so if the browser doesn't
// support either XMLHttpRequest.sendAsBinary or Uint8Array, then you will need to
// find yet another way to implement this. (This is left as an exercise for the reader,
// but if you do it, please let me know and I'll integrate it.)

// from: http://stackoverflow.com/a/5303242/945521

if ( XMLHttpRequest.prototype.sendAsBinary === undefined ) {
    XMLHttpRequest.prototype.sendAsBinary = function(string) {
        var bytes = Array.prototype.map.call(string, function(c) {
            return c.charCodeAt(0) & 0xff;
        });
        this.send(new Uint8Array(bytes));
    };
}


AdmoApp.ImageUploader = BaseObject.create({
  filename: 'photo.png',
  mimeType: 'image/png',
  upload: function(sourceData,name,mimeType,tags){
    tags = tags || '';
    name = name || this.filename;
    mimeType = mimeType || this.mimeType;
    console.log('posting photo...');

    // Code borrowed from https://gist.github.com/andyburke/1498758

    var imageData = sourceData.split(",")[1]; // Ignore the initial 'data:image/png;base64,'
    var imageData = Base64Binary.decode(imageData); // Decode the base-64 image
    var message = 'Admo!';

    // this is the multipart/form-data boundary we'll use
    var boundary = 'multipartformboundary' + (new Date).getTime();

    // let's encode our image file, which is contained in the var
    var formData = '--' + boundary + '\r\n'
    formData += 'Content-Disposition: form-data; name="image"; filename="' + name + '"\r\n';
    formData += 'Content-Type: ' + mimeType + '\r\n\r\n';
    for ( var i = 0; i < imageData.length; ++i )
    {
        formData += String.fromCharCode( imageData[ i ] & 0xff );
    }
    formData += '\r\n';
    formData += '--' + boundary + '\r\n';
    formData += 'Content-Disposition: form-data; name="tags"\r\n\r\n';
    formData += tags + '\r\n'
    formData += '--' + boundary + '--\r\n';

    var xhr = new XMLHttpRequest();
    console.log(AdmoConfig.cmsConfig);
    console.log(AdmoConfig.cmsConfig.cmsUri+'image.json?api_key='+AdmoConfig.cmsConfig.apiKey);
    xhr.open( 'POST', AdmoConfig.cmsConfig.cmsUri+'image.json?api_key='+AdmoConfig.cmsConfig.apiKey, true );
    xhr.onload = xhr.onerror = function() {
        console.log( xhr.responseText );
    };
    xhr.setRequestHeader( "Content-Type", "multipart/form-data; boundary=" + boundary );
    xhr.sendAsBinary( formData );
    console.log("photo sent to the cms");
  }
});
