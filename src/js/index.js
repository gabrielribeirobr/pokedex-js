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
const nextPokemon = () => {
  const nextId = currentId + 1;

  if (nextId <= 1025) {
    showPokemon(nextId);
    statsPokemon(nextId);
  } else {
    alert("Esse é o último Pokémon disponível.");
  }
};

const prevPokemon = () => {
  const prevId = currentId - 1;

  if (prevId > 0) {
    showPokemon(prevId);
    statsPokemon(prevId);
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
