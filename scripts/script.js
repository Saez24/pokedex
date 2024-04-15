let currentPokemonSpecies;
let aboutSection;
let baseStatsContent;
let currentPokemon;
let currentPokemonEvolution;
let nextPokemon

async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/4/';
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log('Loaded pokemon', currentPokemon);
    renderPokemonInfo();
    loadPokemonSpecies()
};

async function loadPokemonSpecies() {
    let url = currentPokemon['species']['url'];
    let responseSpecies = await fetch(url);
    currentPokemonSpecies = await responseSpecies.json();
    console.log('Loaded pokemon Species', currentPokemonSpecies);
    renderPokemonSpeciesInfo()
    renderPokemonEggGroups()
    loadPokemonEvolution()
};

async function loadPokemonEvolution() {
    let url = currentPokemonSpecies['evolution_chain']['url'];
    let responseEvolution = await fetch(url);
    currentPokemonEvolution = await responseEvolution.json();
    console.log('Loaded pokemon Evolution', currentPokemonEvolution);
};

function renderPokemonInfo() {
    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
    document.getElementById('pokedexNumber').innerHTML = '#' + currentPokemon['id'].toString().padStart(4, '0');
    document.getElementById('pokemonImage').src = currentPokemon['sprites']['other']['home']['front_default'];
    renderAboutSection()
};

function renderAboutSection() {
    document.getElementById('height').innerHTML = (currentPokemon['height'] / 10).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' m';
    document.getElementById('weight').innerHTML = (currentPokemon['weight'] / 10).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' Kg';
    renderPokemonAbilities();
    renderPokemonTypes();
};

async function renderPokemonAbilities() {
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
    return abilitiesText;
};

async function renderPokemonEggGroups() {
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
    return eggGroupsText;
};

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
    }
};

function updateHPProgress(hpBaseStat) {
    let hpColor = hpBaseStat < 50 ? 'rgb(219, 55, 55)' : '';
    let hpProgress = document.getElementById('hpProgress');
    let hpProgressBar = document.getElementById('hp');
    hpProgress.style.width = `${hpBaseStat}%`;
    hpProgress.style.backgroundColor = hpColor;
    hpProgressBar.setAttribute('aria-valuenow', hpBaseStat);
};

function updateAttackProgress(attackBaseStat) {
    let attackColor = attackBaseStat < 50 ? 'rgb(219, 55, 55)' : '';
    let attackProgress = document.getElementById('attackProgress');
    let attackProgressBar = document.getElementById('attack');
    attackProgress.style.width = `${attackBaseStat}%`;
    attackProgress.style.backgroundColor = attackColor;
    attackProgressBar.setAttribute('aria-valuenow', attackBaseStat);
};

function updateDefenseProgress(defenseBaseStat) {
    let defenseColor = defenseBaseStat < 50 ? 'rgb(219, 55, 55)' : '';
    let defenseProgress = document.getElementById('defenseProgress');
    let defenseProgressBar = document.getElementById('defense');
    defenseProgress.style.width = `${defenseBaseStat}%`;
    defenseProgress.style.backgroundColor = defenseColor;
    defenseProgressBar.setAttribute('aria-valuenow', defenseBaseStat);
};

function updateSpeedProgress(speedBaseStat) {
    let speedColor = speedBaseStat < 50 ? 'rgb(219, 55, 55)' : '';
    let speedProgress = document.getElementById('speedProgress');
    let speedProgressBar = document.getElementById('speed');
    speedProgress.style.width = `${speedBaseStat}%`;
    speedProgress.style.backgroundColor = speedColor;
    speedProgressBar.setAttribute('aria-valuenow', speedBaseStat);
};

function generateBaseStatsHTML() {
    let hpBaseStat = currentPokemon['stats'][0]['base_stat'];
    let attackBaseStat = currentPokemon['stats'][1]['base_stat'];
    let defenseBaseStat = currentPokemon['stats'][2]['base_stat'];
    let speedBaseStat = currentPokemon['stats'][5]['base_stat'];
    document.getElementById('hpProgress').innerHTML = currentPokemon['stats'][0]['base_stat'];
    document.getElementById('attackProgress').innerHTML = attackBaseStat;
    document.getElementById('defenseProgress').innerHTML = defenseBaseStat;
    document.getElementById('speedProgress').innerHTML = speedBaseStat;
    updateHPProgress(hpBaseStat);
    updateAttackProgress(attackBaseStat);
    updateDefenseProgress(defenseBaseStat);
    updateSpeedProgress(speedBaseStat);
};

function renderBaseStats() {
    document.getElementById('baseStatsContent').style.display = 'block';
    document.getElementById('evolutionContent').style.display = 'none';
    document.getElementById('aboutcontainer').style.display = 'none';
    document.getElementById('baseStats').classList.add("active");
    document.getElementById('about').classList.remove("active");
    generateBaseStatsHTML();
};

async function generateAboutHTML() {
    let species = currentPokemonSpecies['genera'][7]['genus'];
    let height = (currentPokemon['height'] / 10).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' m';
    let weight = (currentPokemon['weight'] / 10).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' Kg';
    let abilities = await renderPokemonAbilities();
    let habitat = currentPokemonSpecies['habitat']['name'];
    let eggGroups = await renderPokemonEggGroups();
    document.getElementById('species').innerHTML = species;
    document.getElementById('height').innerHTML = height;
    document.getElementById('weight').innerHTML = weight;
    document.getElementById('abilities').innerHTML = abilities;
    document.getElementById('habitat').innerHTML = habitat;
    document.getElementById('eggGroups').innerHTML = eggGroups;
};

function renderAbout() {
    document.getElementById('evolutionContent').style.display = 'none';
    document.getElementById('baseStatsContent').style.display = 'none';
    document.getElementById('aboutcontainer').style.display = 'block';
    document.getElementById('baseStats').classList.remove("active");
    document.getElementById('about').classList.add("active");
};

function renderEvolutionContent() {
    document.getElementById('evolutionContent').style.display = 'flex';
    document.getElementById('aboutcontainer').style.display = 'none';
    document.getElementById('baseStatsContent').style.display = 'none';
    document.getElementById('baseStats').classList.remove("active");
    document.getElementById('about').classList.remove("active");
    document.getElementById('evolution').classList.add("active");

    generateEvolutionHTML();
};

async function generateEvolutionHTML() {
    let pokemonName = currentPokemonEvolution.chain.evolves_to[0].species.name;
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    let response = await fetch(url);
    nextPokemon = await response.json();
    console.log('Loaded pokemon new', nextPokemon);
    renderNextEvoPokemon();
};

function renderNextEvoPokemon() {
    document.getElementById('evolutionName').innerHTML = nextPokemon['name'];
    document.getElementById('pokedexEvoNumber').innerHTML = '#' + nextPokemon['id'].toString().padStart(4, '0');
    document.getElementById('pokemonEvoImage').src = nextPokemon['sprites']['other']['home']['front_default'];
};

