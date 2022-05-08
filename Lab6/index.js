((Utils) => {
  const App = {
    htmlElements: {
      pokemonFinderForm: document.querySelector("#pokemon-finder-form"),
      pokemonFinderSearchType: document.querySelector(
        "#pokemon-finder-search-type"
      ),
      pokemonFinderInput: document.querySelector("#pokemon-finder-query"),
      pokemonFinderOutput: document.querySelector("#pokemon-finder-response"),
    },
    init: () => {
      App.htmlElements.pokemonFinderForm.addEventListener(
        "submit",
        App.handlers.pokemonFinderFormOnSubmit
      );
    },
    handlers: {
      pokemonFinderFormOnSubmit: async (e) => {
        e.preventDefault();

        const query = App.htmlElements.pokemonFinderInput.value;
        const searchType = App.htmlElements.pokemonFinderSearchType.value;
        try {
          const information = await Utils.getPokemon({
            query,
            searchType,
          });
          App.htmlElements.pokemonFinderOutput.innerHTML = `<div class="card"> <div class="card-header" <div class="card-body"><h2 class="name">${information.name}(${information.id})</h2><h4 class="type-title">Type:${information.types[0].type.name}</h4></div><div class="card-footer"><div class="stats"><div class="stat"><span class="label">Height</span><span class="value">${information.height}</span></div><div class="stat"><span class="label">Weight</span><span class="value">${information.weight}</span></div><div class="stat"><span class="label">ID#</span><span class="value">${information.id}</span></div></div></div></div>`;
        } catch (error) {
          App.htmlElements.pokemonFinderOutput.innerHTML = `<h1>${error}</h1>`;
        }
      },
    },
  };
  App.init();
})(document.Utils);