var folderToHTML  = require('./lib/folderToHtml')

exports.init = function(app) {

    app.get('/', function (req, res) {

      folderToHTML.render(__dirname+'/views/home/');

      res.render('one_col_nav', {
          title: 'Get started'
        , active: 'home'
        , menu: folderToHTML.getMenuHTML()
        , html: folderToHTML.getSectionsHTML()
      })
    });


    app.get('/docs', function (req, res) {

      folderToHTML.render(__dirname+'/views/docs/');

      res.render('two_col_nav', {
          title: 'Documentation'
        , active: 'docs'
        , menu: folderToHTML.getMenuHTML()
        , html: folderToHTML.getSectionsHTML()
      })
    })


}