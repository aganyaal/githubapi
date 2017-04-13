(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey="dd535d8f593414f1d174380c34f5ec85ef5be3ff"

},{}],2:[function(require,module,exports){
var apiKey = require('./../.env').apiKey;

function Git(){
}

Git.prototype.getRepos = function(username, displayFunction){
  $.get('https://api.github.com/users/' + username + '?access_token=' + apiKey).then(function(response){
    displayFunction(username, response.login);
    console.log(response);
      $("#image").append("<img src='"+response.avatar_url+"' width='100' height='100' class='img-circle'>"); //this appends their github avatars
        $("#name").append('<a href="'+response.html_url+'">'+response.name+'</a>'); //this appends their name as a link to their github account
  }).fail(function(error){
    $('#repos').text(error.responseJSON.message);
  });
  $.get('https://api.github.com/users/' + username + '/repos?access_token=' + apiKey).then(function(response){
    console.log(response);
    for(gitApi=0; gitApi < response.length; gitApi++)
    $("#repos").append("<li><h2>Repo name:" + response[gitApi].name + "</h2></li>" + "<p id='description'>Description:" + response[gitApi].description) + "</p>" + "<br>"
  });
}

exports.gitModule = Git;
},{"./../.env":1}],3:[function(require,module,exports){
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

},{"./../js/github.js":2}]},{},[3]);
