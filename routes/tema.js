const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/', (req, res, next)=>{
    
    mysql.getConnection((error, conn) =>{
         if(error){ return res.status(500).send({error: error})}
        conn.query('SELECT * FROM tema', 
        (error, resultado, fields) =>{
         if(error){ return res.status(500).send({error: error})}
         return res.status(200).send( resultado)
        })
    })
 });

 router.get('/:id_tema', (req, res, next)=>{
    const id = req.params.id_tema
    mysql.getConnection((error, conn) =>{
         if(error){ return res.status(500).send({error: error})}
        conn.query('SELECT * FROM tema where id_tema = ?', [id],
        (error, resultado, fields) =>{
         if(error){ return res.status(500).send({error: error})}
         return res.status(200).send(resultado)
        })
    })
 });

 module.exports = router