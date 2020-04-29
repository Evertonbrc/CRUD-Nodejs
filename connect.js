const mysql = require('mysql');

//Configuração de conexão com o banco
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456789',
    database: 'myapi',
});

//Função para criar tabela, caso não exista
function createTable(conn){
    const sql = "CREATE TABLE IF NOT EXISTS Clientes (\n" +
                "ID int NOT NULL AUTO_INCREMENT,\n" +
                "Nome varchar(150) NOT NULL,\n" +
                "CPF char(11) NOT NULL, \n" +
                "PRIMARY KEY(ID)\n" +
                ");";
    
    conn.query(sql, function(error, results, fields){
        if(error){
            return console.log(error);
        }

        console.log('Criou a tabela!');
        addRows(connection);
  
    });
}

function addRows(conn){
    const sql = "INSERT INTO Clientes(Nome, CPF) VALUES ?";
    const values = [
            ['teste1', '12345678901'],
            ['teste2', '11122233344'],
            ['teste3', '12312312312']
        ];

    conn.query(sql, [values], function(error, results, fields){
        if(error){
            return console.log(error);
        }

        console.log('Adicionou registros!');
        conn.end();
    });

};

//Cria conexão e chama a função de criar tabela
connection.connect(function(err){
    if(err){
        return console.log(err);
    }

    console.log("Conectou");
    createTable(connection);
})