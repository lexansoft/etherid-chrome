#!/bin/sh

#browserify /src/js/bg.js | uglifyjs > plugn/js/bg_bundle.js
browserify src/js/bg.js > ext/js/bg_bundle.js
