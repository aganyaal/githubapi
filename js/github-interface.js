//requires the github.js file

var Git = require('./../js/github.js').gitModule;




var displayGitUserInfo = function(username) {
 
};

$(document).ready(function(){
  var gitSearch = new Git();
  $('#getUserRepo').click(function() {
    var username = $('#username').val();
    gitSearch.getRepos(username, displayGitUserInfo);

      //displays the current time on the page
  function update() {
    $('#time').text(moment().format('H:mm:ss'));
  }
  //refreshes the function every second thus allowing the seconds to 'tick'
  setInterval(update, 1000);
  });
});
