
const apiPokemon = "https://pokeapi.co/api/v2/pokedex/2/"
$(document).ready(function () {
    console.log("dom listo");
    $.get(apiPokemon, function(poke) {
        console.log(poke.pokemon_entries);
        $("#pokedex").empty();
        for (const pokemon of poke.pokemon_entries) {
            $("#pokedex").append(`<option>${pokemon.pokemon_species.name}</option>`);            
        }
    });
});

$("#pokedex").change(function (e) { 
    console.log(this.value); 
    
});