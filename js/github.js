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
