const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 100
let offset = 0;



function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => {
            const typeClasses = pokemon.types.join(' ');
            const background = getBackgroundGradient(pokemon.types);
            return `          
                <li class="pokemon ${typeClasses}" style="${background}" data-number="${pokemon.number}">
                    <span class="number">
                    <div class="badge-number-container">
                    <button class="badge-heart-button" data-state="inactive">
                        <img class="badge-heart" src="/old/assets/img/heartEmpty.svg" alt="Favorite">
                    </button>
                    <button class="badge-shiny-button" data-state="inactive">
                        <img class="badge-shiny" src="/old/assets/img/ShinyMarkEmpty.svg" alt="Shiny">
                    </button>
                    <button class="badge-pokeball-button" data-state="inactive">
                        <img class="badge-pokeball" src="/old/assets/img/PokeballEmpty.svg" alt="Caught">
                    </button>
                    <button class="badge-trade-button" data-state="inactive">
                        <img class="badge-trade" src="/old/assets/img/TradeV2Empty.svg" alt="Tradeable">
                    </button>
                </div>
                        #${pokemon.number}
                    </span>
                    <span class="name">${pokemon.name}</span>
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <div class="pokeContainer">
                            <img class="back-img" src="/old/assets/img/PokeTextBackTilt.png">
                            <img class="poke-photo" src="${pokemon.photo}" alt="${pokemon.name}">
                        </div>
                    </div>
                </li>`;
        }).join(''); 

        document.getElementById('pokemonList').innerHTML += newHtml;
    });
}

function getBackgroundGradient(types, gradientDirection = 'to top right') {
    if (types.length === 1) {
        return `background-color: var(--${types[0]});`;
    } else if (types.length === 2) {
        return `background: linear-gradient(${gradientDirection}, var(--${types[0]}) 35%, var(--${types[1]}) 90%);`;
    }
    return ''; // Caso não tenha nenhum tipo ou mais de dois tipos
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;

    const qtdRecordWithNextPage = offset + limit;

    if (qtdRecordWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});


