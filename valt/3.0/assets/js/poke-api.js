function formatNumber(number) {
    return String(number).padStart(3, '0');
}

const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = formatNumber(pokeDetail.id)
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other['official-artwork'].front_default
    pokemon.photoSh = pokeDetail.sprites.other['official-artwork'].front_shiny
    pokemon.photo3DMale = pokeDetail.sprites.other.home.front_default
    pokemon.photo3DMaleSh = pokeDetail.sprites.other.home.front_shiny
    pokemon.photo3DFemale = pokeDetail.sprites.other.home.front_female
    pokemon.photo3DFemale = pokeDetail.sprites.other.home.front_shiny_female
    pokemon.photoShowdownM = pokeDetail.sprites.other.showdown.front_default
    pokemon.photoShowdownF = pokeDetail.sprites.other.showdown.front_female
    pokemon.photoShowdownMSH = pokeDetail.sprites.other.showdown.front_shiny
    pokemon.photoShowdownFSH = pokeDetail.sprites.other.showdown.front_shiny_female

    pokemon.cries = pokeDetail.cries.latest

    return pokemon
}

pokeApi.getPokemonsDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)

}



pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails)

}



