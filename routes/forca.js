const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//select das forcas todas
router.get('/', (req, res, next)=>{
    
    mysql.getConnection((error, conn) =>{
         if(error){ return res.status(500).send({error: error})}
        conn.query('SELECT * FROM forca', 
        (error, resultado, fields) =>{
         if(error){ return res.status(500).send({error: error})}
         return res.status(200).send({response: resultado})
        })
    })
 });

 router.get('/random', (req, res, next)=>{
    
    mysql.getConnection((error, conn) =>{
         if(error){ return res.status(500).send({error: error})}
        conn.query('SELECT * FROM forca ORDER BY RAND() LIMIT 1', 
        (error, resultado, fields) =>{
         if(error){ return res.status(500).send({error: error})}
         return res.status(200).send({response: resultado})
        })
    })
 });

 

 //selecionar uma forca
router.get('/:id_forca', (req, res, next)=>{
    const id = req.params.id_forca

    mysql.getConnection((error, conn) =>{
        if(error){ return res.status(500).send({error: error})}
       conn.query('SELECT * FROM forca where id_forca = ?',
       [id], 
       (error, resultado, fields) =>{
        if(error){ return res.status(500).send({error: error})}
        return res.status(200).send({response: resultado})
       })
   })
   
})

//inserir uma forca 
router.post('/', (req, res, next) =>{

    mysql.getConnection((error, conn) =>{
        if(error){
            return res.status(500).send({
                error: error
            })
        }
        conn.query("INSERT INTO forca (palavra, pista, pontosXpGanhos, moedasGanhas, id_tema, id_nivel) VALUES (?,?,?,?,?,?)",
        [req.body.palavra, req.body.pista, req.body.pontosXpGanhos, req.body.moedasGanhas, req.body.id_tema, req.body.id_nivel],
        (error, resultado, field) =>{
            conn.release();
            if (error){
                return res.status(500).send({
                    error: error,
                    response: null
                });
            }
            res.status(201).send({
                mensagem: "Forca Inserida",
                id_forca : resultado.insertId
            })
            res.end();
        })
    })
});



//atualizar forca 
router.patch('/', (req, res, next)=>{
    mysql.getConnection((error, conn) =>{
        if(error){
            return res.status(500).send({
                error: error
            })
        }
        conn.query(`UPDATE forca
            SET palavra = ?,
                pista = ?,
                pontosXpGanhos = ?,
                moedasGanhas = ?,
                id_tema = ?,
                id_nivel = ?
            WHERE id_forca = ?`,
        [req.body.palavra, req.body.pista, req.body.pontosXpGanhos, req.body.moedasGanhas, req.body.id_tema, req.body.id_nivel, req.body.id_forca],
        (error, resultado, field) =>{
            conn.release();
            if (error){
                return res.status(500).send({
                    error: error,
                    response: null
                });
            }
            res.status(202).send({
                mensagem: "Adivinha alterada com sucesso",
            })
            res.end();
        })
    })
})

//delete forca
router.delete('/:id_forca', (req, res, next)=>{
    const id = req.params.id_forca

    mysql.getConnection((error, conn) =>{
        if(error){ return res.status(500).send({error: error})}
       conn.query('DELETE FROM forca where id_forca = ?',
       [id], 
       (error, resultado, fields) =>{
        if(error){ return res.status(500).send({error: error})}
        return res.status(202).send({message: "Forca eliminada com sucesso"})
       })
   })
});

module.exports = router;

