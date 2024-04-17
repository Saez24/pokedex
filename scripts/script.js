let pokemonAmount = 30;
let allPokemon = [];
let pokemonNames = [];
let matchingPokemonNames = [];
let pokemonStats = [];
let isLoadingResults = false;
let currentPokemons
let id = 1;

function openDialog() {
    document.getElementById('dialog').classList.remove('d_none');
}

function closeDialog() {
    document.getElementById('dialog').classList.add('d_none');
};

async function init() {
    for (let i = 0; i < pokemonAmount; i++) {
        await loadPokemons(id);
        id += 1;
    }
}

async function loadPokemons(id) {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    let response = await fetch(url);
    currentPokemons = await response.json();
    allPokemon.push(currentPokemons);
    console.log('Loaded pokemons', currentPokemons);
    renderPokemonInfoContent(currentPokemons);
}

function renderPokemonInfoContent(currentPokemons) {
    let card = document.getElementById('pokemonList');
    card.innerHTML += createPokemonCard(currentPokemons);
}

function getPokemonSpecies(currentPokemons) {
    let species1 = currentPokemons['types']['0']['type']['name'];
    let species2 = '\u00A0';
    if (currentPokemons['types'].length > 1) {
        species2 = currentPokemons['types']['1']['type']['name'];
    }
    return { species1, species2 };
}

function createPokemonCard(currentPokemons) {
    let { species1, species2 } = getPokemonSpecies(currentPokemons);
    let backgroundColor = getBackgroundColor(species1);
    let backgroundColor2 = getBackgroundColor(species2);
    let pokemonImageHTML = createPokemonImageHTML(currentPokemons);
    let pokemonNameHTML = createPokemonNameHTML(currentPokemons);
    let pokemonSpeciesIdHTML = createPokemonSpeciesIdHTML(backgroundColor, backgroundColor2, species1, species2, currentPokemons);
    return createPokemonCardHTML(currentPokemons, species1, species2, backgroundColor, pokemonImageHTML, pokemonNameHTML, pokemonSpeciesIdHTML);
}

function createPokemonImageHTML(currentPokemons) {
    return `
    <img id="pokemonImage" src="${currentPokemons['sprites']['other']['home']['front_default']}"></img>
    `;
}

function createPokemonNameHTML(currentPokemons) {
    return `
    <h5 id="pokemonName">${currentPokemons['name']}</h5>
    `;
}

function createPokemonSpeciesIdHTML(backgroundColor, backgroundColor2, species1, species2, currentPokemons) {
    return `
    <div class="species-id">
        <div class="species">
            <div id="pokemonSpecies1" style="background: ${backgroundColor}">${species1}</div>
            <div id="pokemonSpecies2" style="background: ${backgroundColor2}">${species2}</div>
        </div>
        <div id="pokemonID">#${currentPokemons['id']}</div>
    </div>
    `;
}

function createPokemonCardHTML(currentPokemons, species1, species2, backgroundColor, pokemonImageHTML, pokemonNameHTML, pokemonSpeciesIdHTML) {
    return `
    <div class="pokedex-wrapper class="modal-dialog modal-dialog-centered modal-dialog-scrollable"" id="pokedexWrapper(${currentPokemons['id']})" onclick="openDialog(${currentPokemons['id']}), loadPokemon(${currentPokemons['id']}, '${currentPokemons['name']}', renderAbout(),)">
        <div id="pokedex" style="background: ${backgroundColor}">
            ${pokemonImageHTML}
        </div>
        <div class="info-container">
            ${pokemonNameHTML}
            ${pokemonSpeciesIdHTML}
        </div>
    </div>
    `;
};

function getBackgroundColor(species1, species2) {
    let speciesArray = [species1, species2];

    for (let i = 0; i < speciesArray.length; i++) {
        switch (speciesArray[i]) {
            case 'grass':
                return 'linear-gradient(90deg, rgba(37,37,37,1) 0%, rgba(98,219,55,1) 68%)';
            case 'fire':
                return 'linear-gradient(90deg, rgb(36, 0, 0) 0%, rgb(219, 55, 55) 68%)';
            case 'water':
                return 'linear-gradient(90deg, rgba(37,37,37,1) 0%, rgba(55,173,219,1) 68%)';
            case 'bug':
                return 'linear-gradient(90deg, rgba(37,37,37,1) 0%, rgba(219,130,55,1) 68%)';
            case 'normal':
                return 'linear-gradient(90deg, rgba(37,37,37,1) 0%, rgba(172,55,219,1) 68%)';
            case 'poison':
                return 'linear-gradient(90deg, rgba(36, 0, 0, 1) 0%, rgba(55, 219, 128, 1) 68%)';
            case 'electric':
                return 'linear-gradient(90deg, rgba(37,37,37,1) 0%, rgba(217,219,55,1) 68%)';
            case 'ground':
                return 'linear-gradient(90deg, rgba(37,37,37,1) 0%, rgba(121,111,90,1) 68%)';
            case 'fairy':
                return 'linear-gradient(90deg, rgba(37,37,37,1) 0%, rgba(246,0,203,1) 68%)';
            case 'fighting':
                return 'linear-gradient(90deg, rgba(37,37,37,1) 0%, rgba(175,63,69,1) 68%)';
            case 'psychic':
                return 'linear-gradient(90deg, rgba(37,37,37,1) 0%, rgba(180,233,252,1) 68%)';
            case 'rock':
                return 'linear-gradient(90deg, rgba(37,37,37,1) 0%, rgba(191,189,189,1) 68%)';
            case 'flying':
                return 'linear-gradient(90deg, rgba(37,37,37,1) 0%, rgba(55,173,219,1) 68%);';
        }
    }
    return '';
}
async function loadMorePokemons() {
    pokemonAmount += 20;
    for (let i = pokemonAmount - 20 + 1; i <= pokemonAmount; i++) {
        await loadPokemons(i);
    }
}

function previousPokemon() {
    if (loadedPokemon > 0) {
        loadedPokemon--;
    } else {
        loadedPokemon = allPokemon.length - 1;
    }
    return allPokemon[loadedPokemon];
}

async function nextPokemon() {
    if (loadedPokemon < allPokemon.length - 1) {
        loadedPokemon++;
    } else {
        await loadMorePokemons();
    }
    return allPokemon[loadedPokemon];
}


