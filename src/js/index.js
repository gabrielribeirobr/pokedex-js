const showName = document.querySelector(".showName");
const namePokemon = document.getElementById("namePokemon");
const boxImage = document.querySelector(".boxImage");
const BASE_URL = "https://pokeapi.co/api/v2";

const getPokeApi = async (pokemon) => {
  const response = await fetch(`${BASE_URL}/pokemon/${pokemon}`);
  const data = await response.json();
  console.log(data);

  return data;
};

const showPokemon = async (pokemon) => {
  const data = await getPokeApi(pokemon);
  showName.innerHTML = data.name;

  const showId = document.querySelector(".showId");
  showId.innerHTML = `${data.id} - `;

  const imagePokemon = document.querySelector('.imagePokemon')
  const {
    other: {
      home: { front_default },
    },
  } = await data.sprites;
  imagePokemon.src = front_default;

  
};
showPokemon('1');

const btnSearch = document.querySelector(".btnSearch");
btnSearch.addEventListener("click", (e) => {
  e.preventDefault()
  const pokemon = namePokemon.value.toString();
    showPokemon(pokemon);
});




