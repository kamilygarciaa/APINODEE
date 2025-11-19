const express = require("express");
const conexao = require("./db")
//Método que contém GET, POST, PUT, DELETE
const routers = express.Router(); //armazena métodos http

//ROTA RAIZ
routers.get("/", (req, res) => {
    //API devolve a resposta
    res.json({ msg: "API ONLINE" })
});

//Rota para cadastrar objeto no db
routers.post("/cadastrar", (req, res) => {
    //POST o obj da req vem pelo corpo
    const { NOME, CIDADE, ESTADO, ENDERECO, CEP, NUMERO, IDADE } = req.body;

    try {
        //Realizar a query no db
        conexao.query("INSERT INTO cadastrar_usuarios (NOME, CIDADE, ESTADO, ENDERECO, CEP, NUMERO, IDADE) VALUES (?,?,?,?,?,?,?)",
            [NOME, CIDADE, ESTADO, ENDERECO, CEP, NUMERO, IDADE], (erro) => {
                if (erro) {
                    res.json({ msg: "Erro ao cadastrar o usuário" });
                }
                else {
                    res.json({ msg: "Cadastro realizado com sucesso" })
                }
            });
    }

    catch (erro) {
        res.json({ mgs: "Erro no servidor" })
    }
});

//rota para listar objetos

routers.get("/listar", (req, res) => {
    try {
        const sql = "SELECT NOME, CIDADE, ESTADO, ENDERECO, CEP, NUMERO, IDADE, DATA_CADASTRO numero FROM CADASTRAR_USUARIOS";

        conexao.query(sql, (erro, resultado) => {
            if (erro) {
                res.json({ msg: "Erro ao obter a lista de usuario" });
            }
            else {
                res.json(resultado);
            }
        })
    }
    catch (erro) {
        res.json({ msg: "Erro no servidor" });
    }
});

//Rota listar obj por id
routers.get("/listar/:id", (req, res) => {
    const sql = "SELECT * FROM CADASTRAR_USUARIOS WHERE ID = ?"

    conexao.query(sql, [req.params.id] , (erro, resultado) => { //[req.params.id] para recuperar id pelo parâmetro de requisição
        if(erro){
            res.json({msg:"Erro ao buscar usuário por id"});
        }
        else{
            res.json(resultado)
        }
    });
});

module.exports = routers; 