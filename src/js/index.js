const showName = document.querySelector(".showName");
const namePokemon = document.getElementById("namePokemon");
const boxImage = document.querySelector(".boxImage");
const BASE_URL = "https://pokeapi.co/api/v2";
const btnNext = document.querySelector(".nextBtn");
const btnPrev = document.querySelector(".prevBtn");

let currentId = 1;

const getPokeApi = async (pokemon) => {
  const response = await fetch(`${BASE_URL}/pokemon/${pokemon}`);

  if (!response.ok) {
    alert("Pokémon inválido");
    return null;
  } else {
    const data = await response.json();
    return data;
  }
};

const showPokemon = async (pokemon) => {
  const data = await getPokeApi(pokemon);

  if (!data) return;

  currentId = data.id;

  showName.innerHTML = data.name;

  const showId = document.querySelector(".showId");
  showId.innerHTML = `${currentId} - `;

  const imagePokemon = document.querySelector(".imagePokemon");
  const {
    other: {
      home: { front_default },
    },
  } = await data.sprites;
  imagePokemon.src = front_default;
};
showPokemon("1");
statsPokemon("1");
bgColor("1")
const nextPokemon = () => {
  const nextId = currentId + 1;

  if (nextId <= 1025) {
    showPokemon(nextId);
    statsPokemon(nextId);
    bgColor(nextId);
  } else {
    alert("Esse é o último Pokémon disponível.");
  }
};

const prevPokemon = () => {
  const prevId = currentId - 1;

  if (prevId > 0) {
    showPokemon(prevId);
    statsPokemon(prevId);
    bgColor(prevId)
  } else {
    alert("Esse é o último Pokémon disponível.");
  }
};

btnNext.addEventListener("click", nextPokemon);
btnPrev.addEventListener("click", prevPokemon);

const btnSearch = document.querySelector(".btnSearch");
btnSearch.addEventListener("click", async (e) => {
  e.preventDefault();
  const pokemon = namePokemon.value.toLowerCase().trim();

  const isNumber = !isNaN(pokemon);
  const num = Number(pokemon);

  if ((isNumber && (num <= 0 || num > 1025)) || pokemon === "") {
    alert("Insira um nome ou número válido de Pokémon.");
    return;
  }
  try {
    await showPokemon(pokemon)
    statsPokemon(pokemon);
    bgColor(pokemon);
  } catch (error) {
    alert("Pokémon não encontrado.");
  }
});

async function statsPokemon(pokemon) {
  const data = await getPokeApi(pokemon);
  const baseStats = data.stats.map(({ base_stat }) => base_stat);
  const [hp, attack, defense, special_attack, special_defense, speed] =
    baseStats;

  const baseHp = document.querySelector(".hp");
  baseHp.innerHTML = hp;

  const baseAttack = document.querySelector(".attack");
  baseAttack.innerHTML = attack;

  const baseDefense = document.querySelector(".defense");
  baseDefense.innerHTML = defense;

  const baseSpecialAttack = document.querySelector(".specialattack");
  baseSpecialAttack.innerHTML = special_attack;

  const baseSpecialDefense = document.querySelector(".specialdefense");
  baseSpecialDefense.innerHTML = special_defense;

  const baseSpeed = document.querySelector(".speed");
  baseSpeed.innerHTML = speed;
}

async function bgColor(pokemon){
  const data = await getPokeApi(pokemon);
  const [{type: {name: nameColor}}] = data.types;
  
  const colors = {
    fire: '#ff7402',
    grass: '#33a165',
    steel: '#00858a',
    water: '#0050ac',
    psychic: '#c90086',
    ground: '#c90086',
    ice: '#70deff',
    flying: '#5d4e75',
    ghost: '#4d5b64',
    normal: '#753845',
    poison: '#7e0058',
    rock: '#6e1a00',
    fighting: '#634136',
    dark: '#272625',
    bug: '#6e1a00',
    dragon: '#00c431',
    electric: '#bba909',
    fairy: '#d31c81',
    unknow: '#757575',
    shadow: '#29292c'
}

document.querySelector(".container").style.backgroundColor = colors[nameColor];
}