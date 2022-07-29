//Importa paquete express
const express = require('express')
//invoca a funcion express, crea servidor express
const app = express()
//almacena puerto donde corre
const port = 3000

app.get('/pokemon/ditto', (req, res) => {
  res.send('Hello World!')
})
//pone a correr la app en el puerto 3000


app.listen(port, () => {
  console.log(req);
  const pokemon = {


  };
  res.send(pokemon)
})
