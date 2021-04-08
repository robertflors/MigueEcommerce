
const apiPokemon = "https://pokeapi.co/api/v2/pokedex/2/"
$(document).ready(function () {
    $.get(apiPokemon, function(poke) {
        console.log(poke.pokemon_entries);
        $("#pokedex").empty();
        for (const pokemon of poke.pokemon_entries) {
            $("#pokedex").append(`<option value="${pokemon.pokemon_species.name}">${pokemon.pokemon_species.name}</option>`);            
        }
    });
});

$("#pokedex").change(function (e) { 
    $("#imagenPokemon").empty(); 
    const pokemonElegido = `https://pokeapi.co/api/v2/pokemon/${this.value}`;
    console.log(pokemonElegido); 
    $.get(pokemonElegido, function (poke) {
        $("#imagenPokemon").append(`<img src="${poke.sprites.front_default}">
                                    <img src="${poke.sprites.back_default}">  `);
    });
});
