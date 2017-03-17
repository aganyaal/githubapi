var repositories = require('./../js/github.js').repoModule;

var displayRepository = function(username, repositoryData){
  $("h3#repositorys").text("The first repository of " + username + " is " + repositoryData );
}

$(document).ready(function () {
  function update() {
    $('#time').text(moment().format('H:mm:ss'));
  }
  setInterval(update, 1000);


var currentUserObject = new repositories();
$("#getuserrepo").click(function () {
  $(".output").show();
  var username = $("#username").val();
  $("#username").val("");
  $("#nameof").text(username);
currentUserObject.getrepo(username, displayRepository);
});
});
