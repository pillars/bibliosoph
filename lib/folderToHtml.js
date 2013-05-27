var fs = require('fs')
  , util = require('util')
  , jade = require('jade')
  , menu = []
  , menuHTML = ''
  , sectionsHTML = ''
  , directory
  , title = ''
  , setTitle = function(value) {title = value}
  , subsections = []
  , setSubsections = function(value) {subsections = value}
  , renderHTML;


renderHTML = function(section, skipFileRendering) {
    var filename = (util.isArray(section)) ? section[0] : section
      , children = (util.isArray(section)) ? section[1] : null
      , template;

    if(!skipFileRendering) {
        template = jade.compile(fs.readFileSync(directory+filename+'.jade', 'utf8'));
        sectionsHTML += '<section><a id="'+filename+'" name="'+filename+'" class="anchor">&nbsp;</a>'+template({title: setTitle, subsections: setSubsections});
    }

    menuHTML += '<li><a href="#'+filename+'">'+(title || filename)+'</a>';

    renderChildren(subsections, true);
    renderChildren(children);

    sectionsHTML += '</section>';
    menuHTML += '</li>';
}

renderChildren = function(children, skipFileRendering) {
    title = '';         // reset title
    subsections = [];   // reset subsections

    if(children && children.length) {
        menuHTML += '<ul>';
        children.forEach(function(child) {
            renderHTML(child, skipFileRendering);
        });
        menuHTML += '</ul>';
    }
}


exports.getMenuHTML = function() { return menuHTML; };
exports.getSectionsHTML = function() { return sectionsHTML; };



exports.render = function(dir) {
    directory = dir;
    menuHTML = ''
    sectionsHTML = ''
    menu = JSON.parse( fs.readFileSync(directory+'menu.json') );

    menu.forEach(function(item) {
        
        if(item.isArray) {
            renderHTML(item);
        } else {
            if(item.title) menuHTML += '<h2>'+item.title+'</h2>';
            renderChildren(item.children);
        }
    });

}