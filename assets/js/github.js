jQuery.extend({
  getGithubFile: function(options, callback) {
    var url;

    options = options || {}

    options.startLineNum = (options.startLineNum === undefined) ? 1 : options.startLineNum
    options.endLineNum = (options.endLineNum === undefined) ? 0 : options.endLineNum

    if(options.sha) {
      url = "https://api.github.com/repos/" + options.user + "/" + options.repo + "/git/blobs/" + options.sha
    }
    else if(options.path) {
      url = "https://api.github.com/repos/" + options.user + "/" + options.repo + "/contents/" + options.path
    }
    else {
      throw 'Github API call failed: Need a sha or path';
    }
  
    $.ajax({
      type: "GET",
      url: url,
      dataType: "jsonp",
      success: function(data) {

        if (typeof data.data.content != "undefined") {
          if (data.data.encoding == "base64") {
            var startLineNum
              , endLineNum
              , content
              , contentArray
              , base64EncodedContent = data.data.content
            
            base64EncodedContent = base64EncodedContent.replace(/\n/g, "")
  
            content = window.atob(base64EncodedContent)
  
            contentArray = content.split("\n")

            startLineNum = (options.startLineNum === undefined) && 1 || options.startLineNum
            endLineNum = (options.endLineNum === undefined || options.endLineNum == 0) && contentArray.length || options.endLineNum

            if(typeof callback == 'function') callback(contentArray.slice(startLineNum - 1, endLineNum).join("\n"), data.data.path, data.data.html_url)
          }
        }
        else {
          throw 'Github API call failed: '+data.data.message;
        }
      },
      error: function() {
        throw 'Github API call failed';
      }
    })
  }
})