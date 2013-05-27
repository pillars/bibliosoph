var folderToHTML  = require('./lib/folderToHtml')

exports.init = function(app) {


    app.get('/', function (req, res) {

      folderToHTML.render(__dirname+'/views/home/');

      res.render('two_col_nav', {
          title: "Documentation template"
        , menu: folderToHTML.getMenuHTML()
        , html: folderToHTML.getSectionsHTML()
      })
    });


}