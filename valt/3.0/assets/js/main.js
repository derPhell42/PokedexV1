const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const limit = 100;
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
                            <img class="poke-photo" src="${pokemon.photo}" alt="${pokemon.name}" data-cry="${pokemon.cries}">
                        </div>
                    </div>
                </li>`;
        }).join('');

        document.getElementById('pokemonList').innerHTML += newHtml;

        // Adicionar evento de clique para as imagens de Pokémon
        document.querySelectorAll('.poke-photo').forEach(img => {
            img.addEventListener('click', () => {
                const cryUrl = img.getAttribute('data-cry');
                playPokemonCry(cryUrl);
            });
        });

        // Adicione um ouvinte de evento de clique aos botões de coração
        document.querySelectorAll('.badge-heart-button').forEach(button => {
            button.addEventListener('click', () => {
                // Verifique o estado atual do botão (se é "inactive" ou "active")
                const currentState = button.getAttribute('data-state');

                // Alternar as classes e o atributo src da imagem com base no estado atual
                if (currentState === 'inactive') {
                    button.setAttribute('data-state', 'active');
                    button.querySelector('.badge-heart').src = "/old/assets/img/heartColored.svg";
                } else {
                    button.setAttribute('data-state', 'inactive');
                    button.querySelector('.badge-heart').src = "/old/assets/img/heartEmpty.svg";
                }
            });
        });

        document.querySelectorAll('.badge-shiny-button').forEach(button => {
            button.addEventListener('click', () => {
                // Verifique o estado atual do botão (se é "inactive" ou "active")
                const currentState = button.getAttribute('data-state');

                // Alternar as classes e o atributo src da imagem com base no estado atual
                if (currentState === 'inactive') {
                    button.setAttribute('data-state', 'active');
                    button.querySelector('.badge-shiny').src = "/old/assets/img/ShinyMarkColored.svg";
                } else {
                    button.setAttribute('data-state', 'inactive');
                    button.querySelector('.badge-shiny').src = "/old/assets/img/ShinyMarkEmpty.svg";
                }
            });
        });
        document.querySelectorAll('.badge-pokeball-button').forEach(button => {
            button.addEventListener('click', () => {
                // Verifique o estado atual do botão
                const currentState = button.getAttribute('data-state');
        
                // Alternar as classes e o atributo src da imagem com base no estado atual
                if (currentState === 'inactive') {
                    button.setAttribute('data-state', 'active');
                    button.querySelector('.badge-pokeball').src = "/old/assets/img/PokeballColored.svg";
                } else if (currentState === 'active') {
                    button.setAttribute('data-state', 'active-shiny');
                    button.querySelector('.badge-pokeball').src = "/old/assets/img/PokeballColoredShiny.svg";
                } else if (currentState === 'active-shiny') {
                    button.setAttribute('data-state', 'active-event');
                    button.querySelector('.badge-pokeball').src = "/old/assets/img/PokeballColoredEvent.svg";
                } else if (currentState === 'active-event') {
                    button.setAttribute('data-state', 'active-event-shiny');
                    button.querySelector('.badge-pokeball').src = "/old/assets/img/PokeballColoredEventSh.svg";
                } else {
                    button.setAttribute('data-state', 'inactive');
                    button.querySelector('.badge-pokeball').src = "/old/assets/img/PokeballEmpty.svg";
                }
            });
        });

        document.querySelectorAll('.badge-trade-button').forEach(button => {
            button.addEventListener('click', () => {
                // Verifique o estado atual do botão
                const currentState = button.getAttribute('data-state');
        
                // Alternar os estados e a imagem com base no estado atual
                if (currentState === 'inactive') {
                    button.setAttribute('data-state', 'active');
                    button.querySelector('.badge-trade').src = "/old/assets/img/TradeV2Colored.svg";
                } else if (currentState === 'active') {
                    button.setAttribute('data-state', 'active-shiny');
                    button.querySelector('.badge-trade').src = "/old/assets/img/TradeV2ColoredShiny.svg";
                } else {
                    button.setAttribute('data-state', 'inactive');
                    button.querySelector('.badge-trade').src = "/old/assets/img/TradeV2Empty.svg";
                }
            });
        });
    });
}

function playPokemonCry(cryUrl, volume = 0.1) {
    // Cria um elemento de áudio
    var audio = new Audio(cryUrl);

    // Define o volume do áudio
    audio.volume = volume;

    // Adiciona um evento de carga para garantir que o áudio esteja pronto para reprodução
    audio.addEventListener('canplaythrough', () => {
        // Tenta reproduzir o áudio
        audio.play()
            .then(() => {
                console.log('Áudio do choro reproduzido com sucesso!');
            })
            .catch((error) => {
                console.error('Erro ao reproduzir áudio do choro:', error);
            });
    }, false);
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

