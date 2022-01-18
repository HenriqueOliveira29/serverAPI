const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const routeAdivinhas = require('./routes/adivinhas');
const routePerguntas = require('./routes/perguntas');
const routeForca = require('./routes/forca');
const routeNivel = require('./routes/nivel');
const routeTema = require('./routes/tema');
const routeJogador = require('./routes/jogador');
const routeHistoricoPergunta = require('./routes/historicopergunta');
const routeHistoricoAdivinha = require('./routes/historicoAdivinha');
const routeHistoricoForca = require('./routes/historicoForca');


app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 
    'Origin, X-Requested-With, Content-type, Accept, Authorization');

    if(req.method ==="OPTIONS"){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({

        })
    }

    next();

})

app.use('/adivinhas', routeAdivinhas);
app.use('/perguntas', routePerguntas);
app.use('/forcas', routeForca);
app.use('/nivel', routeNivel);
app.use('/tema', routeTema);
app.use('/jogador', routeJogador);
app.use('/historicopergunta', routeHistoricoPergunta);
app.use('/historicoadivinha', routeHistoricoAdivinha);
app.use('/historicoforca', routeHistoricoForca);

app.use('/teste', (req, res, next ) => {
    res.status(200).send({
        mensagem: 'Ok, deu certo'
    })
});

module.exports = app;

