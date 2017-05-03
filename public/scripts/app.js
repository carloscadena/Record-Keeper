'use strict';

let fetchPlayers = function(group_name){
  $.get(`/players/${group_name}/2`)
  .then(results => {
    console.log(results);
    $('#players').empty()
    results.map(function(obj){
      let $div = $('<div>').text(`${obj.user_name} Wins:${obj.wins} Losses:${obj.losses}`)
      $('#players').append($div);
    })
  })
}

function fetchGroups(callback){
  $.get('/groups/2')
  .then(results => {
    results.map(function(obj){
      let $li = $('<li>').text(obj.group_name).click(
        function(){
          fetchPlayers(obj.group_name);
        });
      $('#groups').append($li);
    });
  })
}

fetchGroups();
