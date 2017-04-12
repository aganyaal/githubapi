//requires the github.js file
var repositories = require('./../js/github.js').repoModule;


$(document).ready(function () {
	//displays the current time on the page
  function update() {
    $('#time').text(moment().format('H:mm:ss'));
  }
  //refreshes the function every second thus allowing the seconds to 'tick'
  setInterval(update, 1000);

// Each new name entered creates a new repositories constructor
var currentUserObject = new repositories();

// Actions that occur when the button is clicked
$("#getuserrepo").click(function () {
  $(".output").show();//Shows the hidden jumbotron//
  var name = $("#username").val();//the username input in the input section is passed into the variable//
  $("#username").val("");
  $("#nameof").text(name);//the name goes into the empty span//
currentUserObject.getrepo(name);//calls the getrepo function on the username//
});
});
