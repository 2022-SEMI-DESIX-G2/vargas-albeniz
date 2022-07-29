const axios = require("axios").default;

const main = async (pokemon) => {
  const { data } = await axios("https://pokeapi.co/api/v2/pokemon/" + pokemon);
  const { data: species_cadena } = await axios(
    "https://pokeapi.co/api/v2/pokemon-species/" + pokemon
  );
  const { data: evolution_cadena } = await axios(
    species_cadena.evolution_chain.url
  );
  let { evolves_to, is_baby, species } = evolution_cadena.chain;
  const evolutionList = [];

  if (evolves_to.length > 0) {
    evolutionList.push(`${species.name}${is_baby ? "ˇωˇ" : ""}`);
    do {
      if (evolves_to.length > 1) {
        for (i = 0; i < evolves_to.length; i++) {
          evolutionList.push(
            `${evolves_to[i].species.name}${evolves_to[i].is_baby ? "ˇωˇ" : ""}`
          );
        }
      } else {
        evolutionList.push(
          `${evolves_to[0].species.name}${evolves_to[0].is_baby ? "ˇωˇ" : ""}`
        );
      }
      evolves_to = evolves_to[0].evolves_to;
    } while (evolves_to.length > 0);
  } else {
    evolutionList.push(`${species.name}${is_baby ? "ˇωˇ" : ""}`);
  }

  var abilitiesToPrint = [];
  var pokeidToPrint = [];
  data.abilities.map(({ ability, is_hidden }) => {
    `${ability.name} ${is_hidden ? "⊙" : ""}`;
    abilitiesToPrint.push(ability.name + is_hidden ? "⊙" : "");
  });
  species_cadena.pokedex_numbers.map(({ entry_number, pokedex }) => {
    `\n #${entry_number}-${pokedex.name}`;
    pokeidToPrint.push("#" + entry_number + "-" + pokedex.name);
  });

  var toPrint = [
    {
      ID: data.id,
      Order: data.order,
      Name: data.name,
      Weight: data.weight / 10 + " Kg",
      Height: data.height / 10 + " M",
      Evolutions: data.evolutionList,
      Abilities: abilitiesToPrint,
    },
  ];

  console.table(toPrint);
  console.table(pokeidToPrint);
};

main("charizard");
