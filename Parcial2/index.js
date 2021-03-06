((Utils) => {
  const App = {
    htmlElements: {
      pokemonFinderForm: document.querySelector("#pokemon-finder-form"),
      pokemonFinderSearchType: document.querySelector("#pokemon-finder-search-type"),
      pokemonFinderInput: document.querySelector("#pokemon-finder-query"),
      pokemonFinderOutput: document.querySelector("#pokemon-finder-response"),
    },
    init: () => {
      App.htmlElements.pokemonFinderForm.addEventListener(
        "submit",
        App.handlers.pokemonFinderFormOnSubmit
      );
    },
    templates: {
      render: ({ searchType, response }) => {
        const renderMap = {
          ability: App.templates.abilityCard,
          pokemon: App.templates.pokemonCard,
        };
        return renderMap[searchType]
          ? renderMap[searchType](response)
          : App.templates.errorCard();
      },
      errorCard:  () => `<h1>There was an error</h1>`,
      pokemonCard: ({ id, name, weight, height,abilities, sprites, types,chain_evolves }) => {

        const evoList = chain_evolves.map(
          ({name, is_baby}) =>
          `<li class="li-icons">${name} ${is_baby?'<img class="list-icon" src="./assets/baby.svg" height="15px">':""}</li>`
          )

        const typeList = types.map(
          ({type}) => 
          
          `<span class="${type.name}">${type.name}</span>`
        )
        const abilitiesList = abilities.map(
          ({ability}) => 
          
          `<li class="">${ability.name}</li>`
        )
        return `<div class="card"> <div class="card-header" style="background-image: url(${sprites.other.home.front_default})"></div><div class="card-body"><h2 class="name">${name}</h2><div class="sprites"><img id="first-sprite" src="${sprites.front_default}" alt="front-sprite"><img id="second-sprite" src="${sprites.back_default}" alt="back-sprite"></div> </div><div class="card-footer"><div class="stats"><div class="stat"><span class="label">Height</span><span class="value">${height}</span></div><div class="stat"><span class="label">Weight</span><span class="value">${weight}</span></div><div class="stat"><span class="label">ID#</span><span class="value">${id}</span></div></div><div class="stats"><div class="stat"><span class="label">Type</span>${typeList.join("")}</div><div class="stat"><span class="label">Abilities</span><ul>${abilitiesList.join("")}</ul></div><div class="stat"><span class="label">Evolution chain</span><ul>${evoList.join("")}<ul></div></div></div></div> </div>`;
      },
      abilityCard: ({ id, name, pokemon }) => {
        const pokemonList = pokemon.map(
          ({ pokemon, is_hidden }) =>
            `<li><a>${pokemon.name}${
              is_hidden ? `<img class="list-icon" src="./assets/eye.svg" height="15px">` : ""
            }</a></li>`
        );
        return ` <div class="card"><div class="card-body"><h1>${name} (${id})</h1><ul>${pokemonList.join("")}</ul></div></div>`;
      },
    },
    handlers: {
      pokemonFinderFormOnSubmit: async (e) => {
        e.preventDefault();
        
        const queryForm = App.htmlElements.pokemonFinderInput.value;
        const searchType = App.htmlElements.pokemonFinderSearchType.value;
        
        let query = queryForm.toLowerCase();
        
        try {
          const response = await Utils.getPokemon({
            query,
            searchType,
          });
          if(searchType === "pokemon"){
          const evolution = await Utils.getEvolution(response.species.url);
          const evoChain = await Utils.getEvolution(evolution.evolution_chain.url);
          const evoManda = evoChain.chain;
          const { species } = response;
          if (species) {
            response['chain_evolves'] = await Utils.getEvolutionChain(evoManda)
          };
        }
        

          const renderedTemplate = App.templates.render({
            searchType,
            response
          });
          App.htmlElements.pokemonFinderOutput.innerHTML = renderedTemplate;
        } catch (error) {
          App.htmlElements.pokemonFinderOutput.innerHTML = `<h1>${error}</h1>`;
        }
      },
    },
  };
  App.init();
})(document.Utils);