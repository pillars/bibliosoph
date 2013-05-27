var express       = require('express')
  , stylus        = require('stylus')
  , nib           = require('nib')
  , marked        = require('marked')
  , fs            = require('fs')
  , folderToHTML  = require('./lib/folderToHtml');

var app = express();

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}

// Marked configuration
marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  langPrefix: 'language-',
  highlight: function(code, lang) {
    if (lang === 'js') {
      // return highlighter.javascript(code);
    }
    return code;
  }
});

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {

  folderToHTML.render(__dirname+'/views/home/');

  res.render('two_col_nav', {
      title: req.params.component
    , menu: folderToHTML.getMenuHTML()
    , html: folderToHTML.getSectionsHTML()
  })
});

app.listen(3000)