var folderToHTML  = require('./lib/folderToHtml')

exports.init = function(app) {

    var documentation = function(layout) {
        return function (req, res) {

          folderToHTML.render(__dirname+'/views/home/');

          res.render(layout, {
              title: "Documentation template"
            , active: 'home'
            , menu: folderToHTML.getMenuHTML()
            , html: folderToHTML.getSectionsHTML()
          })
        }
    }

    app.get('/', documentation('two_col_nav'));

    app.get('/layout/one-col', documentation('one_col'));
    app.get('/layout/one-col-nav', documentation('one_col_nav'));
    app.get('/layout/two-col', documentation('two_col'));


}