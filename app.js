var express       = require('express')
  , nib           = require('nib')
  , jade          = require('jade')
  , marked        = require('marked')
  , hljs          = require('highlight.js')
  , fs            = require('fs')
  , assets        = require('connect-assets')
  , config        = require('./config')
  , app           = express();


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
app.use( express.static(__dirname + '/public') )
app.use( function(req, res, next) { res.locals.site = config.site; next(); } )
app.use( assets({buildDir: 'public'}) )


// App routes
// ----------
require('./routes').init(app)


// Start server
// ------------
app.listen(process.env.PORT || 5000)