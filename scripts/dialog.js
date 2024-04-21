let currentPokemonSpecies;
let aboutSection;
let baseStatsContent;
let currentPokemonEvolution;
let loadedPokemon = [];

async function loadPokemon(id, pokemonName) {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    let response = await fetch(url);
    currentPokemons = await response.json();
    updatePreviousButtonVisibility();
    renderPokemonInfo();
    loadPokemonSpecies(pokemonName);
    updateNextButtonVisibility();
    updatePreviousButtonVisibility();
};

async function loadPokemonSpecies() {
    let url = currentPokemons['species']['url'];
    let responseSpecies = await fetch(url);
    currentPokemonSpecies = await responseSpecies.json();
    renderPokemonSpeciesInfo();
    renderPokemonEggGroups();
    loadPokemonEvolution();
};

async function loadPokemonEvolution() {
    let url = currentPokemonSpecies['evolution_chain']['url'];
    let responseEvolution = await fetch(url);
    currentPokemonEvolution = await responseEvolution.json();

    if (currentPokemonEvolution && currentPokemonEvolution.chain && currentPokemonEvolution.chain.evolves_to && currentPokemonEvolution.chain.evolves_to.length > 0) {
        document.getElementById('evolution').style.display = 'block';
        generateEvolution1HTML();
        if (currentPokemonEvolution.chain.evolves_to[0].evolves_to.length > 0) {
            generateEvolution2HTML();
            generateEvolution3HTML();
        }
    } else {
        document.getElementById('evolution').style.display = 'none';
        clearPreviousEvolution1()
        clearPreviousEvolution2();
        clearPreviousEvolution3();
    }
}


function renderPokemonInfo() {
    document.getElementById('pokemonNameDialog').innerHTML = currentPokemons['name'];
    document.getElementById('pokedexNumber').innerHTML = '#' + currentPokemons['id'].toString().padStart(0, '0');
    document.getElementById('pokemonImageDialog').src = currentPokemons['sprites']['other']['home']['front_default'];
    renderAboutSection();
    loadedPokemon.push(currentPokemons['id']);
};

function renderAboutSection() {
    document.getElementById('height').innerHTML = (currentPokemons['height'] / 10).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' m';
    document.getElementById('weight').innerHTML = (currentPokemons['weight'] / 10).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' Kg';
    renderPokemonAbilities();
    renderPokemonTypes();
};

async function renderPokemonAbilities() {
    let abilitiesText = '';
    for (let i = 0; i < currentPokemons.abilities.length; i++) {
        let abilitiesObj = currentPokemons.abilities[i];
        abilitiesText += abilitiesObj.ability.name;
        if (i < currentPokemons.abilities.length - 1) {
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
    if (!currentPokemons || !currentPokemons.types) {
        return;
    }

    let typeHTML = '';
    for (let i = 0; i < currentPokemons.types.length; i++) {
        let typeObj = currentPokemons.types[i];
        typeHTML += `<div class="pokemonType""><h5 class="types${i}">${typeObj.type.name}</h5></div>`;
    }

    document.getElementById('pokemonType').innerHTML = typeHTML;
    if (currentPokemons.types.length > 0) {
        updatePokedexBackground(currentPokemons.types[0].type.name);
    }
};

function updatePokedexBackground(type) {
    let pokedexElement = document.getElementById('pokedexDialog');
    let background = 'rgb(36, 0, 0)';
    let selectedGradient = speciesColors[type] || 'none';

    pokedexElement.style.background = background;
    pokedexElement.style.background = selectedGradient;
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

async function generateAboutHTML() {
    let species = currentPokemonSpecies['genera'][7]['genus'];
    let height = (currentPokemons['height'] / 10).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' m';
    let weight = (currentPokemons['weight'] / 10).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' Kg';
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

function generateBaseStatsHTML() {
    let hpBaseStat = currentPokemons['stats'][0]['base_stat'];
    let attackBaseStat = currentPokemons['stats'][1]['base_stat'];
    let defenseBaseStat = currentPokemons['stats'][2]['base_stat'];
    let speedBaseStat = currentPokemons['stats'][5]['base_stat'];
    document.getElementById('hpProgress').innerHTML = currentPokemons['stats'][0]['base_stat'];
    document.getElementById('attackProgress').innerHTML = attackBaseStat;
    document.getElementById('defenseProgress').innerHTML = defenseBaseStat;
    document.getElementById('speedProgress').innerHTML = speedBaseStat;
    updateHPProgress(hpBaseStat);
    updateAttackProgress(attackBaseStat);
    updateDefenseProgress(defenseBaseStat);
    updateSpeedProgress(speedBaseStat);
};

async function generateEvolution1HTML() {
    let pokemonName1 = currentPokemonEvolution.chain.species.name;
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName1}`;
    let response = await fetch(url);
    if (response.ok) {
        let nextPokemon = await response.json();
        renderNextEvo1Pokemon(nextPokemon);
    } else {
        clearPreviousEvolution1();
    }

};

async function generateEvolution2HTML() {
    let pokemonName2 = currentPokemonEvolution.chain.evolves_to[0].species.name;
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName2}`;
    let response = await fetch(url);
    if (response.ok) {
        let nextPokemon = await response.json();
        renderNextEvo2Pokemon(nextPokemon);
    } else {
        clearPreviousEvolution2();
    }
};

async function generateEvolution3HTML() {
    if (currentPokemonEvolution.chain && currentPokemonEvolution.chain.evolves_to &&
        currentPokemonEvolution.chain.evolves_to.length > 0 &&
        currentPokemonEvolution.chain.evolves_to[0].evolves_to &&
        currentPokemonEvolution.chain.evolves_to[0].evolves_to.length > 0 &&
        currentPokemonEvolution.chain.evolves_to[0].evolves_to[0].species) {

        let pokemonName3 = currentPokemonEvolution.chain.evolves_to[0].evolves_to[0].species.name;
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName3}`;
        let response = await fetch(url);
        if (response.ok) {
            let nextPokemon = await response.json();
            renderNextEvo3Pokemon(nextPokemon);
        }
    } else {
        clearPreviousEvolution3();
    }
};

function renderAbout() {
    document.getElementById('evolutionContent').style.display = 'none';
    document.getElementById('baseStatsContent').style.display = 'none';
    document.getElementById('aboutcontainer').style.display = 'block';
    document.getElementById('baseStats').classList.remove("active");
    document.getElementById('evolution').classList.remove("active");
    document.getElementById('about').classList.add("active");
};

function renderBaseStats() {
    document.getElementById('baseStatsContent').style.display = 'block';
    document.getElementById('evolutionContent').style.display = 'none';
    document.getElementById('aboutcontainer').style.display = 'none';
    document.getElementById('baseStats').classList.add("active");
    document.getElementById('about').classList.remove("active");
    document.getElementById('evolution').classList.remove("active");
    generateBaseStatsHTML();
};

function renderEvolutionContent() {
    document.getElementById('evolutionContent').style.display = 'flex';
    document.getElementById('aboutcontainer').style.display = 'none';
    document.getElementById('baseStatsContent').style.display = 'none';
    document.getElementById('baseStats').classList.remove("active");
    document.getElementById('about').classList.remove("active");
    document.getElementById('evolution').classList.add("active");

    generateEvolution1HTML();
    generateEvolution2HTML();
    generateEvolution3HTML();
};

function renderNextEvo1Pokemon(nextPokemon) {
    document.getElementById('evolutionName1').innerHTML = nextPokemon['name'];
    document.getElementById('pokedexEvoNumber1').innerHTML = '#' + nextPokemon['id'].toString().padStart(0, '0');
    document.getElementById('pokemonEvoImage1').src = nextPokemon['sprites']['other']['home']['front_default'];
};

function renderNextEvo2Pokemon(nextPokemon) {
    document.getElementById('evolutionName2').innerHTML = nextPokemon['name'];
    document.getElementById('pokedexEvoNumber2').innerHTML = '#' + nextPokemon['id'].toString().padStart(0, '0');
    document.getElementById('pokemonEvoImage2').src = nextPokemon['sprites']['other']['home']['front_default'];
};

function renderNextEvo3Pokemon(nextPokemon) {
    document.getElementById('evolutionName3').innerHTML = nextPokemon['name'];
    document.getElementById('pokedexEvoNumber3').innerHTML = '#' + nextPokemon['id'].toString().padStart(0, '0');
    document.getElementById('pokemonEvoImage3').src = nextPokemon['sprites']['other']['home']['front_default'];
};

function clearPreviousEvolution1() {
    document.getElementById('evolutionName1').innerHTML = '';
    document.getElementById('pokedexEvoNumber1').innerHTML = '';
    document.getElementById('pokemonEvoImage1').src = '';
};

function clearPreviousEvolution2() {
    document.getElementById('evolutionName2').innerHTML = '';
    document.getElementById('pokedexEvoNumber2').innerHTML = '';
    document.getElementById('pokemonEvoImage2').src = '';
};

function clearPreviousEvolution3() {
    document.getElementById('evolutionName3').innerHTML = '';
    document.getElementById('pokedexEvoNumber3').innerHTML = '';
    document.getElementById('pokemonEvoImage3').src = '';
};