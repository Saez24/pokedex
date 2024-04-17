let currentPokemonSpecies;
let aboutSection;
let baseStatsContent;
let currentPokemon;
let currentPokemonEvolution;
let loadedPokemon = [];


async function loadPokemon(id, pokemonName) {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log('Loaded pokemon', currentPokemon);
    renderPokemonInfo();
    loadPokemonSpecies(pokemonName);
};

async function loadPokemonSpecies() {
    let url = currentPokemon['species']['url'];
    let responseSpecies = await fetch(url);
    currentPokemonSpecies = await responseSpecies.json();
    console.log('Loaded pokemon Species', currentPokemonSpecies);
    renderPokemonSpeciesInfo();
    renderPokemonEggGroups();
    loadPokemonEvolution();
};

async function loadPokemonEvolution() {
    let url = currentPokemonSpecies['evolution_chain']['url'];
    let responseEvolution = await fetch(url);
    currentPokemonEvolution = await responseEvolution.json();
    console.log('Loaded pokemon Evolution', currentPokemonEvolution);
};

function renderPokemonInfo() {
    document.getElementById('pokemonNameDialog').innerHTML = currentPokemon['name'];
    document.getElementById('pokedexNumber').innerHTML = '#' + currentPokemon['id'].toString().padStart(0, '0');
    document.getElementById('pokemonImageDialog').src = currentPokemon['sprites']['other']['home']['front_default'];
    renderAboutSection();
    loadedPokemon.push(currentPokemon['id']);
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
    let pokedexElement = document.getElementById('pokedexDialog');
    if (type === 'grass') {
        pokedexElement.style.background = 'rgb(36, 0, 0)';
        pokedexElement.style.background = 'linear-gradient(90deg, rgba(36, 0, 0, 1) 0%, rgba(55, 219, 128, 1) 68%)';
    } else if (type === 'fire') {
        pokedexElement.style.background = 'rgb(36, 0, 0)';
        pokedexElement.style.background = 'linear-gradient(90deg, rgba(36, 0, 0, 1) 0%, rgba(219, 55, 55, 1) 68%)';
    } else if (type === 'water' || type === 'ice' || type === 'flying') {
        pokedexElement.style.background = 'rgb(36, 0, 0)';
        pokedexElement.style.background = 'linear-gradient(90deg, rgba(37,37,37,1) 0%, rgba(55,173,219,1) 68%)';
    } else if (type === 'electric') {
        pokedexElement.style.background = 'rgb(36, 0, 0)';
        pokedexElement.style.background = 'linear-gradient(90deg, rgba(36, 0, 0, 1) 0%, rgba(219, 213, 55, 1) 68%)';
    } else if (type === 'normal') {
        pokedexElement.style.background = 'rgb(36, 0, 0)';
        pokedexElement.style.background = 'linear-gradient(90deg, rgba(37,37,37,1) 0%, rgba(172,55,219,1) 68%)';
    } else if (type === 'bug') {
        pokedexElement.style.background = 'rgb(36, 0, 0)';
        pokedexElement.style.background = 'linear-gradient(90deg, rgba(37,37,37,1) 0%, rgba(219,130,55,1) 68%)';
    } else if (type === 'fairy') {
        pokedexElement.style.background = 'rgb(36, 0, 0)';
        pokedexElement.style.background = 'linear-gradient(90deg, rgba(37,37,37,1) 0%, rgba(246,0,203,1) 68%)';
    } else if (type === 'ground') {
        pokedexElement.style.background = 'rgb(36, 0, 0)';
        pokedexElement.style.background = 'linear-gradient(90deg, rgba(37,37,37,1) 0%, rgba(121,111,90,1) 68%)';
    } else if (type === 'fighting') {
        pokedexElement.style.background = 'rgb(36, 0, 0)';
        pokedexElement.style.background = 'linear-gradient(90deg, rgba(37,37,37,1) 0%, rgba(175,63,69,1) 68%)';
    } else if (type === 'psychic') {
        pokedexElement.style.background = 'rgb(36, 0, 0)';
        pokedexElement.style.background = 'linear-gradient(90deg, rgba(37,37,37,1) 0%, rgba(180,233,252,1) 68%)';
    } else if (type === 'rock') {
        pokedexElement.style.background = 'rgb(36, 0, 0)';
        pokedexElement.style.background = 'linear-gradient(90deg, rgba(37,37,37,1) 0%, rgba(191,189,189,1) 68%)';
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
    document.getElementById('evolution').classList.remove("active");
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
    document.getElementById('evolution').classList.remove("active");
    document.getElementById('about').classList.add("active");
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

async function generateEvolution1HTML() {
    let pokemonName1 = currentPokemonEvolution.chain.species.name;
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName1}`;
    let response = await fetch(url);
    if (response.ok) {
        nextPokemon = await response.json();
        console.log('Loaded pokemon new', nextPokemon);
        renderNextEvo1Pokemon(nextPokemon);
    } else {
        console.log('Pokemon not found for', pokemonName1);
    }
};

async function generateEvolution2HTML() {
    let pokemonName2 = currentPokemonEvolution.chain.evolves_to[0].species.name;
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName2}`;
    let response = await fetch(url);
    if (response.ok) {
        nextPokemon = await response.json();
        console.log('Loaded pokemon new', nextPokemon);
        renderNextEvo2Pokemon(nextPokemon);
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
            nextPokemon = await response.json();
            console.log('Loaded pokemon new', nextPokemon);
            renderNextEvo3Pokemon(nextPokemon);
        }
    } else {
        clearPreviousEvolution3();
    }
};

function clearPreviousEvolution3() {
    document.getElementById('evolutionName3').innerHTML = '';
    document.getElementById('pokedexEvoNumber3').innerHTML = '';
    document.getElementById('pokemonEvoImage3').src = '';
};

function renderNextEvo1Pokemon() {
    document.getElementById('evolutionName1').innerHTML = nextPokemon['name'];
    document.getElementById('pokedexEvoNumber1').innerHTML = '#' + nextPokemon['id'].toString().padStart(0, '0');
    document.getElementById('pokemonEvoImage1').src = nextPokemon['sprites']['other']['home']['front_default'];
};

function renderNextEvo2Pokemon() {
    document.getElementById('evolutionName2').innerHTML = nextPokemon['name'];
    document.getElementById('pokedexEvoNumber2').innerHTML = '#' + nextPokemon['id'].toString().padStart(0, '0');
    document.getElementById('pokemonEvoImage2').src = nextPokemon['sprites']['other']['home']['front_default'];
};

function renderNextEvo3Pokemon() {
    document.getElementById('evolutionName3').innerHTML = nextPokemon['name'];
    document.getElementById('pokedexEvoNumber3').innerHTML = '#' + nextPokemon['id'].toString().padStart(0, '0');
    document.getElementById('pokemonEvoImage3').src = nextPokemon['sprites']['other']['home']['front_default'];
};


