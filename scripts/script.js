let currentPokemonSpecies;

async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/charmander';
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log('Loaded pokemon', currentPokemon);

    renderPokemonInfo();
    renderPokemonTypes();
    renderPokemonAbilities();
    renderPokemonEggGroups();

};

async function loadPokemonSpecies() {
    let url = 'https://pokeapi.co/api/v2/pokemon-species/charmander';
    let responseSpecies = await fetch(url);
    currentPokemonSpecies = await responseSpecies.json();
    console.log('Loaded pokemon Species', currentPokemonSpecies);
    renderPokemonSpeciesInfo()
    renderPokemonEggGroups()
};

function renderPokemonInfo() {
    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
    document.getElementById('pokedexNumber').innerHTML = '#' + currentPokemon['id'].toString().padStart(4, '0');
    document.getElementById('pokemonImage').src = currentPokemon['sprites']['other']['home']['front_default'];
    document.getElementById('height').innerHTML = (currentPokemon['height'] / 10).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' m';
    document.getElementById('weight').innerHTML = (currentPokemon['weight'] / 10).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' Kg';
};

async function renderPokemonAbilities() {
    if (!currentPokemon || !currentPokemon.abilities) {
        return;
    }

    let abilitiesText = '';
    for (let i = 0; i < currentPokemon.abilities.length; i++) {
        let abilitiesObj = currentPokemon.abilities[i];
        abilitiesText += abilitiesObj.ability.name;
        if (i < currentPokemon.abilities.length - 1) {
            abilitiesText += ', ';
        }
    }

    let abilitiesElement = document.getElementById('abilities');
    if (abilitiesElement) {
        abilitiesElement.innerText = abilitiesText;
    }
};

async function renderPokemonEggGroups() {
    if (!currentPokemonSpecies || !currentPokemonSpecies.egg_groups) {
        return;
    }

    let eggGroupsText = '';
    for (let i = 0; i < currentPokemonSpecies.egg_groups.length; i++) {
        let groupObj = currentPokemonSpecies.egg_groups[i];
        eggGroupsText += groupObj.name;
        if (i < currentPokemonSpecies.egg_groups.length - 1) {
            eggGroupsText += ', ';
        }
    }

    let eggGroupsElement = document.getElementById('eggGroups');
    if (eggGroupsElement) {
        eggGroupsElement.innerText = eggGroupsText;
    }
}

function renderPokemonSpeciesInfo() {
    document.getElementById('species').innerHTML = currentPokemonSpecies['genera']['7']['genus'];
    document.getElementById('habitat').innerHTML = currentPokemonSpecies['habitat']['name'];
};

async function renderPokemonTypes() {
    if (!currentPokemon || !currentPokemon.types) {
        return;
    }

    let typeHTML = '';
    for (let i = 0; i < currentPokemon.types.length; i++) {
        let typeObj = currentPokemon.types[i];
        typeHTML += `<div class="pokemonType""><h5 class="types${i}">${typeObj.type.name}</h5></div>`;
    }

    document.getElementById('pokemonType').innerHTML = typeHTML;
    if (currentPokemon.types.length > 0) {
        updatePokedexBackground(currentPokemon.types[0].type.name);
    }
};

function updatePokedexBackground(type) {
    let pokedexElement = document.getElementById('pokedex');
    if (type === 'grass' || type === 'bug') {
        pokedexElement.style.background = 'rgb(36, 0, 0)';
        pokedexElement.style.background = 'linear-gradient(90deg, rgba(36, 0, 0, 1) 0%, rgba(55, 219, 128, 1) 68%)';
    } else if (type === 'fire') {
        pokedexElement.style.background = 'rgb(36, 0, 0)';
        pokedexElement.style.background = 'linear-gradient(90deg, rgba(36, 0, 0, 1) 0%, rgba(219, 55, 55, 1) 68%)';
    } else if (type === 'water' || type === 'ice') {
        pokedexElement.style.background = 'rgb(36, 0, 0)';
        pokedexElement.style.background = 'background: linear-gradient(90deg, rgba(36, 0, 0, 1) 0%, rgba(55, 192, 219, 1) 68%)';
    } else if (type === 'electric') {
        pokedexElement.style.background = 'rgb(36, 0, 0)';
        pokedexElement.style.background = 'linear-gradient(90deg, rgba(36, 0, 0, 1) 0%, rgba(219, 213, 55, 1) 68%)';
    } else {
        pokedexElement.style.background = '';
    }
};




