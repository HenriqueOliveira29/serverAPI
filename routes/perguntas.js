const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//select de todas as perguntas
router.get('/', (req, res, next)=>{
    
    mysql.getConnection((error, conn) =>{
         if(error){ return res.status(500).send({error: error})}
        conn.query('SELECT * FROM perguntas', 
        (error, resultado, fields) =>{
         if(error){ return res.status(500).send({error: error})}
         return res.status(200).send({response: resultado})
        })
    })
 });

 //select 10 perguntas 

 //Inserir perguntas
 router.post('/', (req, res, next) =>{

    mysql.getConnection((error, conn) =>{
        if(error){
            return res.status(500).send({
                error: error
            })
        }
        conn.query("INSERT INTO perguntas (pergunta, opcao1, opcao2, opcao3, opca4, opcaoCerta, id_nivel) VALUES (?,?,?,?,?,?,?)",
        [req.body.pergunta, req.body.opcao1, req.body.opcao2, req.body.opcao3, req.body.opca4,req.body.opcaoCerta, req.body.id_nivel],
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

//Selecionar uma pergunta
router.get('/randompergunta', (req, res, next)=>{
    
    mysql.getConnection((error, conn) =>{
        if(error){ return res.status(500).send({error: error})}
       conn.query('SELECT * FROM perguntas ORDER BY RAND() LIMIT 10', 
       (error, resultado, fields) =>{
        if(error){ return res.status(500).send({error: error})}
        return res.status(200).send(resultado)
       })
   })
   
})

router.get('/:id_pergunta', (req, res, next)=>{
    const id = req.params.id_pergunta

    mysql.getConnection((error, conn) =>{
        if(error){ return res.status(500).send({error: error})}
       conn.query('SELECT * FROM perguntas where id_pergunta = ?',
       [id], 
       (error, resultado, fields) =>{
        if(error){ return res.status(500).send({error: error})}
        return res.status(200).send({response: resultado})
       })
   })
   
})

//atualizar pergunta
router.patch('/', (req, res, next)=>{
    mysql.getConnection((error, conn) =>{
        if(error){
            return res.status(500).send({
                error: error
            })
        }
        conn.query(`UPDATE perguntas
            SET pergunta = ?,
                opcao1 = ?,
                opcao2 = ?,
                opcao3 = ?,
                opca4 = ?,
                opcaoCerta = ?,
                id_nivel = ?
            WHERE id_pergunta = ?`,
        [req.body.pergunta, req.body.opcao1, req.body.opcao2, req.body.opcao3, req.body.opca4,req.body.opcaoCerta, req.body.id_nivel, req.body.id_pergunta],
        (error, resultado, field) =>{
            conn.release();
            if (error){
                return res.status(500).send({
                    error: error,
                    response: null
                });
            }
            res.status(202).send({
                mensagem: "Pergunta alterada com sucesso",
            })
            res.end();
        })
    })
})

//delete pergunta
router.delete('/:id_pergunta', (req, res, next)=>{
    const id = req.params.id_pergunta

    mysql.getConnection((error, conn) =>{
        if(error){ return res.status(500).send({error: error})}
       conn.query('DELETE FROM perguntas where id_pergunta = ?',
       [id], 
       (error, resultado, fields) =>{
        if(error){ return res.status(500).send({error: error})}
        return res.status(202).send({message: "Adivinha eliminada com sucesso"})
       })
   })
});
 

 module.exports = router;