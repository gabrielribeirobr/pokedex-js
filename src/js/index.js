const showName = document.querySelector('.showName');
const namePokemon = document.getElementById('namePokemon').value.toString();

const getPoke = async (pokemon) =>{

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const data = await response.json();
  console.log(data)

  return data;
}

const showPokemon = async (pokemon) =>{
  const data = await getPoke(pokemon);

  showName.innerHTML = data.name;
}

showPokemon(namePokemon);

