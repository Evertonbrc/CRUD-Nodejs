const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const mysql = require('mysql');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const router = express.Router();
router.get('/', (req, res) => res.json({message: 'Funcionando'}));

app.use('/', router);

app.listen(port);
console.log('API Funcionando');

function execSQLQuery(sqlQuery, res){
    const connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '123456789',
        database: 'myapi',
    });

    connection.query(sqlQuery, function(error, results, fields){
        if(error){
            res.json(error);
        }
        else{
            res.json(results);
        }

        connection.end();
        console.log('Conectou!');
    });
}

router.get('/clientes/:id?', (req, res) => {
    let filter = '';
    if(req.params.id){
        filter = ' WHERE ID=' + parseInt(req.params.id);
    }

    execSQLQuery('SELECT * FROM Clientes' + filter, res);
});

router.delete('/clientes/:id', (req, res) => {
    execSQLQuery('DELETE FROM Clientes WHERE ID=' + parseInt(req.params.id), res);
});

router.post('/clientes', (req, res) =>{
    const nome = req.body.nome.substring(0,150);
    const cpf = req.body.cpf.substring(0,11);

    execSQLQuery(`INSERT INTO Clientes(nome, cpf) VALUES('${nome}', '${cpf}')`, res);
});

router.patch('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const nome = req.body.nome.substring(0,150);
    const cpf = req.body.cpf.substring(0,11);

    execSQLQuery(`UPDATE Clientes SET Nome='${nome}', CPF='${cpf}' WHERE ID=${id}`, res);
});