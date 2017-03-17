(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey="dd535d8f593414f1d174380c34f5ec85ef5be3ff"

},{}],2:[function(require,module,exports){
var apiKey = require('./../.env').apiKey;

repositories = function(){

}

repositories.prototype.getrepo = function(username, displayFunction){
  $.get('https://api.github.com/users/' + username + '/repos?access_token='+apiKey).then(function(response){
    displayFunction(username, response[1].name);
    // console.log(response[1].name);
    // return response[1].name;
  }).fail(function(error){
    $('#repositorys').text(error.responseJSON.message);

  });
}

exports.repoModule = repositories;

},{"./../.env":1}],3:[function(require,module,exports){
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

},{"./../js/github.js":2}]},{},[3]);
