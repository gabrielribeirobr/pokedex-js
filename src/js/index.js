const url = "https://pokeapi.co/api/v2/pokemon/pikachu";

async function getPoke() {
  const response = await fetch(url);

  const data = await response.json();

  console.log(data);

  console.log(response);
  
}

getPoke();