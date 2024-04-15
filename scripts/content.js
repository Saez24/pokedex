let pokemonAmount = 3;
let allPokemon = [];
let pokemonNames = [];
let matchingPokemonNames = [];
let pokemonStats = [];
let currentPokemonIndex = 0;
let isLoadingResults = false;
let id = 0;

function openDialog() {
    document.getElementById('dialog').classList.remove('d_none');
}

function closeDialog() {
    document.getElementById('dialog').classList.add('d_none');
};

async function init() {
    let id = 1;
    for (let i = 0; i < pokemonAmount; i++) {
        await loadPokemons(id);
        id += 3;
    }
}

async function loadPokemons(id) {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    let response = await fetch(url);
    let currentPokemons = await response.json();
    console.log('Loaded pokemon', currentPokemons);
    allPokemon.push(currentPokemons);
    renderPokemonInfoContent(currentPokemons);
}

function renderPokemonInfoContent(currentPokemons) {
    let card = document.getElementById('pokemonList');
    card.innerHTML += createPokemonCard(currentPokemons);
}

function getPokemonSpecies(currentPokemons) {
    let species1 = currentPokemons['types']['0']['type']['name'];
    let species2 = '';
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
    <div class="pokedex-wrapper class="modal-dialog modal-dialog-centered modal-dialog-scrollable"" id="pokedexWrapper" onclick="openDialog(), loadPokemon(${id})">
        <div id="pokedex" style="background: ${backgroundColor}">
            ${pokemonImageHTML}
        </div>
        <div class="info-container">
            ${pokemonNameHTML}
            ${pokemonSpeciesIdHTML}
        </div>
    </div>
    `;
}

function getBackgroundColor(species1, species2) {
    let speciesArray = [species1, species2];

    for (let i = 0; i < speciesArray.length; i++) {
        switch (speciesArray[i]) {
            case 'grass':
                return 'linear-gradient(90deg, rgba(37,37,37,1) 0%, rgba(98,219,55,1) 68%);';
            case 'fire':
                return 'linear-gradient(90deg, rgb(36, 0, 0) 0%, rgb(219, 55, 55) 68%)';
            case 'water':
                return 'linear-gradient(90deg, rgba(37,37,37,1) 0%, rgba(55,173,219,1) 68%);';
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
                return '#c423c4';
            case 'fighting':
                return '#af3f45';
            case 'psychic':
                return '#b4e9fc';
            case 'rock':
                return '#bfbdbd';
            case 'flying':
                return 'linear-gradient(90deg, rgba(37,37,37,1) 0%, rgba(55,173,219,1) 68%);';
        }
    }
    return '';
}