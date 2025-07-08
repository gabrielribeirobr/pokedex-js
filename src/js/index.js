const showName = document.querySelector(".showName");
const namePokemon = document.getElementById("namePokemon").value.toString();
const boxImage = document.querySelector('.boxImage');

const getPokeApi = async (pokemon) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const data = await response.json();
  console.log(data);

  return data;
};

const showPokemon = async (pokemon) => {
  const data = await getPokeApi(pokemon);
  showName.innerHTML = data.name;

  const imagePokemon = document.createElement("img");
  const {
    other: {
    home: { front_default },
    },
  } = await data.sprites;
  imagePokemon.src = front_default;
  boxImage.appendChild(imagePokemon);

  const showId = document.querySelector('.showId');
  showId.innerHTML = `${data.id} - `;
};

showPokemon("97");
