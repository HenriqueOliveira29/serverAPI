const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.post('/', (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if(error){
            return res.status(500).send({
                error: error
            })
        }
        conn.query("INSERT INTO jogador (Email, xp, moedas, nickname, role) VALUES (?,?,?,?,?)",
        [req.body.email, 0, 0, req.body.nickname, "user"],
        (error, resultado, field) =>{
            conn.release();
            if (error){
                return res.status(500).send({
                    error: error,
                    response: null
                });
            }
            res.status(201).send({
                mensagem: "jogador inserido",
            })
            res.end();
        })
    })
})

router.get('/', (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if(error){ return res.status(500).send({error: error})}
       conn.query('SELECT * FROM jogador', 
       (error, resultado, fields) =>{
        if(error){ return res.status(500).send({error: error})}
        return res.status(200).send({response: resultado})
       })
   })
});



router.get('/:email', (req, res, next) =>{

    const email = req.params.email

    mysql.getConnection((error, conn) =>{
        if(error){ return res.status(500).send({error: error})}
       conn.query('SELECT * FROM jogador where Email = ? ', [email],
       (error, resultado, fields) =>{
        if(error){ return res.status(500).send({error: error})}
        return res.status(200).send({response: resultado})
       })
   })
});

router.get('/showrole/:email', (req, res, next) =>{

    const email = req.params.email

    mysql.getConnection((error, conn) =>{
        if(error){ return res.status(500).send({error: error})}
       conn.query('SELECT role FROM jogador where Email = ? ', [email],
       (error, resultado, fields) =>{
        if(error){ return res.status(500).send({error: error})}
        return res.status(200).send({response: resultado})
       })
   })
});

router.patch('/changerole', (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if(error){
            return res.status(500).send({
                error: error
            })
        }
        conn.query(`UPDATE jogador SET role = ? WHERE Email = ?`,
        [req.body.role, req.body.Email],
        (error, resultado, field) =>{
            conn.release();
            if (error){
                return res.status(500).send({
                    error: error,
                    response: null
                });
            }
            res.status(202).send({
                mensagem: "role atualizado com sucesso",
            })
            res.end();
        })
    })
})

//Inserir moedas e xp

router.patch('/addcoins', (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if(error){
            return res.status(500).send({
                error: error
            })
        }
        conn.query(`UPDATE jogador SET xp = xp + ?, moedas = moedas + ? WHERE Email = ?`,
        [req.body.xp, req.body.moedas, req.body.Email],
        (error, resultado, field) =>{
            conn.release();
            if (error){
                return res.status(500).send({
                    error: error,
                    response: null
                });
            }
            res.status(202).send({
                mensagem: "adecionado coins e xp",
            })
            res.end();
        })
    })
})


module.exports = router