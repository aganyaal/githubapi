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