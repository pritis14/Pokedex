fetch("https://pokeapi.co/api/v2/pokemon/")
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    myJson.results.forEach(pokeDetails => {
      fetch(pokeDetails.url)
        .then(function(pokeDetails1) {
          return pokeDetails1.json();
        })
        .then(function(myJson1) {
          var imgSrc = myJson1.sprites.front_default;
          var i = 0;
          let pokeContainer = `<div class = 'pokedetail' id='pokedetail${i}' onclick="getDetails('${
            pokeDetails.url
          }')">
                    <img src = '${imgSrc}' alt='${pokeDetails.name}' />
                    <div><h3>${pokeDetails.name}</h3></div>
                </div>`;
          $("#pok1").append(pokeContainer);
          i++;
        });
    });
  });
function getDetails(url) {
  fetch(url)
    .then(function(pokeDetails1) {
      return pokeDetails1.json();
    })
    .then(function(myJson1) {
      var id = myJson1.id;
      var order = myJson1.order;
      var height = myJson1.height;
      var weight = myJson1.weight;
      var abilities = myJson1.abilities;
      var moves = myJson1.moves;
      var imgSrc = myJson1.sprites.front_default;
      $("#pokeDetail").empty();
      let pokeContainer = `<div id="pokeData">
            <img src = '${imgSrc}' />
            <span>ID: <i>${id}</i></span>|
            <span>Order: <i>${order}</i></span>|
            <span>Height: <i>${height}</i></span>|
            <span>Weight: <i>${weight}</i></span>
            <div class="abilities"><b>Abilities:</b> </div>
            <div class="moves">Moves: </div>
            </div>`;
      $("#pokeDetail").append(pokeContainer);
      for (var i = 0; i < abilities.length; i++) {
        var ability = `<i class="ability">  ${
          abilities[i].ability.name
        }&nbsp; </i>`;
        $(".abilities").append(ability);
      }
      for (var j = 0; j < 3; j++) {
        var move = `<i class="move">  ${moves[j].move.name}&nbsp; </i>`;
        $(".moves").append(move);
      }
    });
}
function myFunction() {
  var input, filter, div, pokeDiv, i, txtValue;
  input = document.getElementById("myInput");
  if (input.value) {
    document.getElementById("pokeData").style.opacity = 0;
  } else {
    document.getElementById("pokeData").style.opacity = 1;
  }
  filter = input.value.toUpperCase();
  div = document.getElementById("pok1");
  pokeDiv = div.getElementsByClassName("pokedetail");
  for (i = 0; i < pokeDiv.length; i++) {
    txtValue = pokeDiv[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      pokeDiv[i].style.display = "";
    } else {
      pokeDiv[i].style.display = "none";
    }
  }
}
