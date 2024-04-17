let pokemonAmount = 20;
let allPokemon = [];
let pokemonNames = [];
let matchingPokemonNames = [];
let pokemonStats = [];
let isLoadingResults = false;
let currentPokemons
let id = 1;
let searchedPokemonName = pokemonNames;
let originalPokemonCards = [];
let dialogOpened = false;
let speciesColors = {
    grass: 'linear-gradient(90deg, rgba(37,37,37,1) 0%, rgba(98,219,55,1) 68%)',
    fire: 'linear-gradient(90deg, rgb(36, 0, 0) 0%, rgb(219, 55, 55) 68%)',
    water: 'linear-gradient(90deg, rgba(37,37,37,1) 0%, rgba(55,173,219,1) 68%)',
    bug: 'linear-gradient(90deg, rgba(37,37,37,1) 0%, rgba(219,130,55,1) 68%)',
    normal: 'linear-gradient(90deg, rgba(37,37,37,1) 0%, rgba(172,55,219,1) 68%)',
    poison: 'linear-gradient(90deg, rgba(36, 0, 0, 1) 0%, rgba(55, 219, 128, 1) 68%)',
    electric: 'linear-gradient(90deg, rgba(37,37,37,1) 0%, rgba(217,219,55,1) 68%)',
    ground: 'linear-gradient(90deg, rgba(37,37,37,1) 0%, rgba(121,111,90,1) 68%)',
    fairy: 'linear-gradient(90deg, rgba(37,37,37,1) 0%, rgba(246,0,203,1) 68%)',
    fighting: 'linear-gradient(90deg, rgba(37,37,37,1) 0%, rgba(175,63,69,1) 68%)',
    psychic: 'linear-gradient(90deg, rgba(37,37,37,1) 0%, rgba(180,233,252,1) 68%)',
    rock: 'linear-gradient(90deg, rgba(37,37,37,1) 0%, rgba(191,189,189,1) 68%)',
    flying: 'linear-gradient(90deg, rgba(37,37,37,1) 0%, rgba(55,173,219,1) 68%)',
    ice: 'linear-gradient(90deg, rgba(37,37,37,1) 0%, rgba(55,173,219,1) 68%)',
    dragon: 'linear-gradient(90deg, rgba(37,37,37,1) 0%, rgba(175,0,0,1) 68%)',
};

function openDialog() {
    document.getElementById('dialog').classList.remove('d_none');
    dialogOpened = true;

    document.getElementById('body').classList.add("modal-open");
}

function closeDialog() {
    document.getElementById('dialog').classList.add('d_none');
    dialogOpened = false;
    document.getElementById('body').classList.remove("modal-open");
}

async function init() {
    for (let i = 0; i < pokemonAmount; i++) {
        await loadPokemons(id);
        id += 1;
    }
};

async function loadPokemons(id) {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    let response = await fetch(url);
    currentPokemons = await response.json();
    allPokemon.push(currentPokemons);
    pokemonNames.push(currentPokemons['name']);
    console.log('Loaded pokemons', currentPokemons);
    let cardHTML = createPokemonCard(currentPokemons);
    originalPokemonCards.push(cardHTML);
    renderPokemonInfoContent(currentPokemons);
    loadPokemon(id);

};

function renderPokemonInfoContent(currentPokemons) {
    let card = document.getElementById('pokemonList');
    card.innerHTML += createPokemonCard(currentPokemons);
};

function getPokemonSpecies(currentPokemons) {
    let species1 = currentPokemons['types']['0']['type']['name'];
    let species2 = '\u00A0';
    if (currentPokemons['types'].length > 1) {
        species2 = currentPokemons['types']['1']['type']['name'];
    }
    return { species1, species2 };
};

function createPokemonCard(currentPokemons) {
    let { species1, species2 } = getPokemonSpecies(currentPokemons);
    let backgroundColor = getBackgroundColor(species1);
    let backgroundColor2 = getBackgroundColor(species2);
    let pokemonImageHTML = createPokemonImageHTML(currentPokemons);
    let pokemonNameHTML = createPokemonNameHTML(currentPokemons);
    let pokemonSpeciesIdHTML = createPokemonSpeciesIdHTML(backgroundColor, backgroundColor2, species1, species2, currentPokemons);
    return createPokemonCardHTML(currentPokemons, species1, species2, backgroundColor, pokemonImageHTML, pokemonNameHTML, pokemonSpeciesIdHTML);
};

function createPokemonImageHTML(currentPokemons) {
    return `
    <img id="pokemonImage" src="${currentPokemons['sprites']['other']['home']['front_default']}"></img>
    `;
};

function createPokemonNameHTML(currentPokemons) {
    return `
    <h5 id="pokemonName">${currentPokemons['name']}</h5>
    `;
};

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
};

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
    return speciesColors[species1] || speciesColors[species2] || '';
};

async function loadMorePokemons() {
    pokemonAmount += 20;
    let startingIndex = allPokemon.length + 1;

    for (let i = startingIndex; i <= pokemonAmount; i++) {
        await loadPokemons(i);
    }

    if (dialogOpened) {
        await nextPokemon();
    }
};

async function previousPokemon() {
    let currentWrapperId = `pokedexWrapper(${currentPokemons.id})`;
    let currentWrapper = document.getElementById(currentWrapperId);

    let previousWrapper = currentWrapper.previousElementSibling;
    if (previousWrapper) {
        let previousId = previousWrapper.id.match(/\d+/)[0];
        let previousPokemonIndex = parseInt(previousId) - 1;

        if (previousPokemonIndex >= 0 && previousPokemonIndex < allPokemon.length) {
            currentPokemons = allPokemon[previousPokemonIndex];
            console.log('Loaded previous pokemon', currentPokemons);
            renderPokemonInfo();
            loadPokemonSpecies(currentPokemons.name);
        }
    }
};

async function previousPokemonAndUpdate() {
    await previousPokemon();
    if (document.getElementById('baseStats').classList.contains("active")) {
        generateBaseStatsHTML();
    } else if (document.getElementById('evolution').classList.contains("active")) {
        clearPreviousEvolution1()
        clearPreviousEvolution2();
        clearPreviousEvolution3();
        generateEvolution1HTML();
        generateEvolution2HTML();
        generateEvolution3HTML();
    }
}

async function nextPokemon() {
    let currentWrapperId = `pokedexWrapper(${currentPokemons.id})`;
    let currentWrapper = document.getElementById(currentWrapperId);

    let nextWrapper = currentWrapper.nextElementSibling;
    if (nextWrapper) {
        let nextId = nextWrapper.id.match(/\d+/)[0];
        let nextPokemonIndex = parseInt(nextId) - 1;

        if (nextPokemonIndex >= 0 && nextPokemonIndex < allPokemon.length) {
            currentPokemons = allPokemon[nextPokemonIndex];
            console.log('Loaded next pokemon', currentPokemons);
            renderPokemonInfo();
            loadPokemonSpecies(currentPokemons.name);
        } else {
            console.log('No next pokemon available');
        }
    }
};

async function nextPokemonAndUpdate() {
    await nextPokemon();
    if (document.getElementById('baseStats').classList.contains("active")) {
        generateBaseStatsHTML();
    } else if (document.getElementById('evolution').classList.contains("active")) {
        clearPreviousEvolution1()
        clearPreviousEvolution2();
        clearPreviousEvolution3();
        generateEvolution1HTML();
        generateEvolution2HTML();
        generateEvolution3HTML();
    }
};

async function filterPokemon() {
    let search = document.getElementById('search').value.trim().toLowerCase();
    console.log(search);
    findMatchingPokemon(search);
    showMatchingPokemon();
};
function search(ele) {
    if (event.key === 'Enter') {
        alert(ele.value);
    }
};

function keyCode(event) {
    var x = event.keyCode;
    if (x == 27) {
        clearSearchbar();
    }
};

function findMatchingPokemon(search) {
    matchingPokemonNames = [];
    for (let i = 0; i < allPokemon.length; i++) {
        let searchedPokemonName = allPokemon[i]['name'];
        if (searchedPokemonName.includes(search)) {
            matchingPokemonNames.push(searchedPokemonName);
        }
    }
};

function showMatchingPokemon() {
    let card = document.getElementById('pokemonList');
    card.innerHTML = '';
    if (matchingPokemonNames.length > 0) {
        displayMatchingPokemon(card);
    } else {
        displayNoResultHTML(card);
    }
};

function removeDuplicates(array) {
    let uniquePokemonNames = [];
    array.forEach(pokemonName => {
        if (!uniquePokemonNames.includes(pokemonName)) {
            uniquePokemonNames.push(pokemonName);
        }
    });
    return uniquePokemonNames;
};

function displayMatchingPokemon(card) {
    card.innerHTML = '';
    if (matchingPokemonNames.length > 0) {
        let uniquePokemonNames = removeDuplicates(matchingPokemonNames);
        uniquePokemonNames.forEach(pokemonName => {
            let pokemonIndex = allPokemon.findIndex(pokemon => pokemon.name === pokemonName);
            if (pokemonIndex >= 0) {
                loadPokemons(pokemonIndex + 1);
            }
        });
    } else {
        displayNoResultHTML(card);
    }
};

function displayNoResultHTML(card) {
    card.innerHTML = `<div class="no-result-div">No matching Pokemon found</div>`;
};

function clearSearchbar() {
    let card = document.getElementById('pokemonList');
    card.innerHTML = '';
    allPokemon = [];
    pokemonNames = [];
    id = 1;
    document.getElementById('search').value = '';
    init();
};