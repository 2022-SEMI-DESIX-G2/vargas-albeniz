const axios = require('axios').default;


const main = async () =>{
    const {data} = await axios('https://pokeapi.co/api/v2/pokemon/eevee');
    evolve(data.species.url);
    console.log("Nombre: ",data.name);
    console.log("ID: ",data.id);
    console.log("Evo: ");
    console.log("Altura: ",data.height, "Peso: ",data.weight);

}

const evolve = async (url) =>{
    const {data} = await axios(url);
    
    //console.log(data.evolution_chain.url);
    evolveChain(data.evolution_chain.url);
}
const evolveChain = async (url) =>{
    const {data} = await axios(url);

    getEvolutionChain(data);
    
    
}
const getEvolutionChain = ({data}) => {

    console.log(data.chain.species);
    /*let evoArray = [];
    evoArray.push({ name: species.name, is_baby: is_baby });

    while (evolves_to.length > 0) {
      evolves_to.forEach(({ species, is_baby }) => {
        evoArray.push({ name: species.name, is_baby: is_baby });
      });
      evolves_to = evolves_to[0].evolves_to
    }
    return evoArray;*/
}


main();
