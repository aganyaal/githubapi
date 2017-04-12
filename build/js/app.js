(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey="dd535d8f593414f1d174380c34f5ec85ef5be3ff"

},{}],2:[function(require,module,exports){
// Requires the API key from .env file(to keep it private when pushing)
var apiKey = require('./../.env').apiKey;


//Blank constructor called repositories.
repositories = function(){

}


//a method called getrepo that fetches the repository names.
repositories.prototype.getrepo = function(username, displayFunction){
  $.get('https://api.github.com/users/' + username + '/repos?access_token='+apiKey).then(function(response){
    // calls the displayFunction function
    var repositorie = '';
    for (i = 0; i <response.length; i++) {
    repositorie += response[i].name;
    }
        displayFunction(username, repositorie);
// Displays the error message when an error occurs
  }).fail(function(error){
    $('#repositorys').text(error.responseJSON.message);

  });
}

// allows this file to be used by another through the require action
exports.repoModule = repositories;

},{"./../.env":1}],3:[function(require,module,exports){
//requires the github.js file
var repositories = require('./../js/github.js').repoModule;

//Displays the repositories in the empty h3 element
var displayRepository = function(username, repositoryData){
  $("h3#repositorys").text("https://github.com/"+username);
}

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
  var username = $("#username").val();//the username input in the input section is passed into the variable//
  $("#username").val("");
  $("#nameof").text(username);//the name goes into the empty span//
currentUserObject.getrepo(username, displayRepository);//calls the getrepo function on the username//
});
});

},{"./../js/github.js":2}]},{},[3]);
