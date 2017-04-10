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
