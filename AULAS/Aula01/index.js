//Arquivo main que faz a chamada de todas as classes do projeto
const express = require("express"); //importa biblioteca express
const routers = require("./routers"); //importa biblioteca routers

const app = express(); //varialvel que armazena todas as propiedades/funções fornecidas pelo 'express'

app.use(express.json()); //habilita para trabalhar com o objeto json
app.use(routers); //API, utilize as rotas

  app.listen(3001, () => {
    console.log("Servidor execultando na url http://localhost:3001");
  });

