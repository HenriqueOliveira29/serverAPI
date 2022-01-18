const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

// todas as adivinhas
router.get('/', (req, res, next)=>{
    
   mysql.getConnection((error, conn) =>{
        if(error){ return res.status(500).send({error: error})}
       conn.query('SELECT * FROM adivinhas', 
       (error, resultado, fields) =>{
        if(error){ return res.status(500).send({error: error})}
        return res.status(200).send({response: resultado})
       })
   })
});

//inserir uma adivinha
router.post('/insereAdivinha', (req, res, next) =>{

    mysql.getConnection((error, conn) =>{
        if(error){
            return res.status(500).send({
                error: error
            })
        }
        conn.query("INSERT INTO adivinhas (adivinha, resposta, pontosXp, moedasGanhas, id_nivel) VALUES (?,?,?,?,?)",
        [req.body.adivinha, req.body.resposta, req.body.pontosXp, req.body.moedasGanhas, req.body.id_nivel],
        (error, resultado, field) =>{
            conn.release();
            if (error){
                return res.status(500).send({
                    error: error,
                    response: null
                });
            }
            res.status(201).send({
                mensagem: "Adivinha Inserida",
                id_adivinha : resultado.insertId
            })
            res.end();
        })
    })
});

//retorna uma adivinha com o id id_adivinha
router.get('/getadivinha', (req, res, next)=>{
    

    mysql.getConnection((error, conn) =>{
        if(error){ return res.status(500).send({error: error})}
       conn.query('SELECT * FROM adivinhas  ORDER BY RAND() LIMIT 1',
        
       (error, resultado, fields) =>{
        if(error){ return res.status(500).send({error: error})}
        return res.status(200).send({response: resultado})
       })
   })
   
})

router.get('/:id_adivinha', (req, res, next)=>{
    const id = req.params.id_adivinha

    mysql.getConnection((error, conn) =>{
        if(error){ return res.status(500).send({error: error})}
       conn.query('SELECT * FROM adivinhas  where id_adivinha = ?',[id],
        
       (error, resultado, fields) =>{
        if(error){ return res.status(500).send({error: error})}
        return res.status(200).send({response: resultado})
       })
   })
   
})



router.patch('/updateAdivinha', (req, res, next)=>{
    mysql.getConnection((error, conn) =>{
        if(error){
            return res.status(500).send({
                error: error
            })
        }
        conn.query(`UPDATE adivinhas 
            SET adivinha = ?,
                resposta = ?,
                pontosXp = ?,
                moedasGanhas = ?,
                id_nivel = ?
            WHERE id_adivinha = ?`,
        [req.body.adivinha, req.body.resposta, req.body.pontosXp, req.body.moedasGanhas, req.body.id_nivel, req.body.id_adivinha],
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
});

router.delete('/:id_adivinha', (req, res, next)=>{
    const id = req.params.id_adivinha

    mysql.getConnection((error, conn) =>{
        if(error){ return res.status(500).send({error: error})}
       conn.query('DELETE FROM adivinhas where id_adivinha = ?',
       [id], 
       (error, resultado, fields) =>{
        if(error){ return res.status(500).send({error: error})}
        return res.status(202).send({message: "Adivinha eliminada com sucesso"})
       })
   })
});


module.exports = router;