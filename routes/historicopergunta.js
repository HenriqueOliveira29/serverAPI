const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.post('/', (req, res, next)=>{
    var data1 = new Date();
    var dia = String(data1.getDate()).padStart(2, '0');
    var mes = String(data1.getMonth()).padStart(2, '0');
    var ano = data1.getFullYear();
    dataAtual = dia + '/' + mes + '/' + ano;
    const data = new Date(ano, mes, dia);
    mysql.getConnection((error, conn) =>{
        if(error){
            return res.status(500).send({
                error: error
            })
        }
        conn.query("INSERT INTO historicopergunta (email, id_pergunta, data) VALUES (?,?,?)",
        [req.body.email, req.body.id_pergunta, data],
        (error, resultado, field) =>{
            conn.release();
            if (error){
                return res.status(500).send({
                    error: error,
                    response: null
                });
            }
            res.status(201).send({
                mensagem: "inserido no historico",
            })
            res.end();
        })
    })
})

module.exports = router;