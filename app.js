var express       = require('express')
  , stylus        = require('stylus')
  , nib           = require('nib')
  , jade          = require('jade')
  , marked        = require('marked')
  , hljs          = require('highlight.js')
  , fs            = require('fs')
  , config        = require('./config')
  , app           = express();



// Stylus compiler using nib
// -------------------------
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}


// Marked configuration
// --------------------
marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  langPrefix: 'language-',
  highlight: function(code, lang) {
    console.log(lang, code);
    if(lang === 'none') {
      return code;
    }
    else if(lang === undefined) {
      return hljs.highlightAuto(code).value;
    } 
    else {
      return hljs.highlight(lang, code).value;
    }


  }
});


// App configuration
// -----------------
app.set( 'views', __dirname + '/views' )
app.set( 'view engine', 'jade' )
app.use( express.logger('dev') )
app.use( stylus.middleware({ src: __dirname + '/public', compile: compile }) )
app.use( express.static(__dirname + '/public') )
app.use(function(req, res, next) {
   res.locals.site = config.site;
   next();
});


// App routes
// ----------
require('./routes').init(app)


// Start server
// ------------
app.listen(3000)