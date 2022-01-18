const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/', (req, res, next)=>{
    
    mysql.getConnection((error, conn) =>{
         if(error){ return res.status(500).send({error: error})}
        conn.query('SELECT * FROM nivel', 
        (error, resultado, fields) =>{
         if(error){ return res.status(500).send({error: error})}
         return res.status(200).send({response: resultado})
        })
    })
 });

 router.get('/:id_nivel', (req, res, next)=>{
    const id = req.params.id_nivel
    mysql.getConnection((error, conn) =>{
         if(error){ return res.status(500).send({error: error})}
        conn.query('SELECT * FROM nivel where id_nivel = ?', [id],
        (error, resultado, fields) =>{
         if(error){ return res.status(500).send({error: error})}
         return res.status(200).send({response: resultado})
        })
    })
 });

 module.exports = router

