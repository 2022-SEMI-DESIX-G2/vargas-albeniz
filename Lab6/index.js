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
    templates:{

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
          App.htmlElements.pokemonFinderOutput.innerHTML = `            <div class="card"> 
          <div class="card-header" >
              <h2 class="name">${information.name} (${information.id})</h2>
          </div>
          <div class="card-body">
              <div class="first-column">
                  <h1>Sprites</h1>
                  <div class="sprites">
                      <img src="${information.sprites.front_default}" alt="front-sprite">
                      <img id="second-sprite" src="${information.sprites.back_default}" alt="back-sprite">
                  </div>
              </div>
              <div class="second-column">
                  <h1>Weight/Height</h1>
                  <div class="column-content">
                      <p>${information.weight}/${information.height}</p>
                  </div>
              </div>
          </div>
          <div class="card-footer">
              <div class="first-column">
                  <h1>Evolution chain</h1>
                  <div id="lists" class="column-content">
                      <ul>
                          <li>Pichu</li>
                          <li>Pikachu</li>
                          <li>Raichu</li>
                      </ul>
                  </div>
              </div>
              <div class="second-column">
                  <h1>Abilities</h1>
                  <div id="lists" class="column-content">
                      <ul>
                          <li>Pichu</li>
                          <li>Pikachu</li>
                          <li>Raichu</li>
                      </ul>
                  </div>
              </div>
          </div>
      </div>`;
        } catch (error) {
          App.htmlElements.pokemonFinderOutput.innerHTML = `<h1>${error}</h1>`;
        }
      },
    },
  };
  App.init();
})(document.Utils);