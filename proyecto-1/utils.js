(() => {
    const Utils = {
      settings: {
        backendBaseUrl: "https://pokeapi.co/api/v2",
      },
      getFormattedBackendUrl: ({ query, searchType }) => {
        return `${Utils.settings.backendBaseUrl}/${searchType}/${query}`;
      },
      
      getPokemon: async ({ query, searchType = "pokemon" }) => {
        const pokemon = await Utils.fetch({
          url: Utils.getFormattedBackendUrl({ query, searchType }),
          searchType,
        });
        const species = await Utils.getSpecies(pokemon.species.url);
        const evolutionChain = await Utils.getEvolutionChain({
          url: species.evolution_chain.url,
          query: pokemon.order,
        });
        pokemon.evolutionChain = evolutionChain;
        return pokemon;
      }, 
      getSpecies: async (url, searchType = "pokemon-species") => {
        return await Utils.fetch({ url, searchType });
      },
      getEvolutionChain: async ({ url, searchType = "evolution-chain" }) => {
        return await Utils.fetch({
          url,
          searchType,
        });
      },
      getEvolutionsFromEvolutionChain: (evolutionChain) => {
        const evolutions = [];
        const getEvolutionsRecursive = (evolutionNext) => {
          evolutions.push(evolutionNext.species.name);
          if (evolutionNext.evolves_to[0]) {
            getEvolutionsRecursive(evolutionNext.evolves_to[0]);
          }
        };
        if (evolutionChain.chain) {
          getEvolutionsRecursive(evolutionChain.chain);
        }
  
        return evolutions;
      },
  
      getAbility: async ({ query, searchType = "ability" }) => {
        const ability = await Utils.fetch({
          url: Utils.getFormattedBackendUrl({ query, searchType }),
          searchType,
        });
        return ability;
      },
  
      fetch: async ({ url, searchType }) => {
        try {
          const rawResponse = await fetch(url);
          if (rawResponse.status !== 200) {
            throw new Error(`${searchType} not found`);
          }
          return rawResponse.json();
        } catch (error) {
          throw error;
        }
  
      },
    };
    document.Utils = Utils;
  })();