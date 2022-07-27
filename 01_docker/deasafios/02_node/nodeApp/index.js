const express = require('express');
const app = express();
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql');
const cn = mysql.createConnection(config);

const sql = `insert into people(name) values ('Darth Maul has been here!')`;
cn.query(sql);
//cn.end();

app.get('/', async (req, res) => {
    const sql = `select * from people`;
    await cn.query(sql, (err, result, fields) => {
        if (err) console.log(err);
        let regs = "<table><thread><tr><th>#Id</th><th>Nome</th></tr></thead><tbody>"
        for(var i=0; i < result.length; i++){
            regs = regs + '<tr><td>' + result[i].id + '</td><td>' + result[i].name + '</td></tr>';
        }
        regs = regs + '</tbody></table>'
        res.send('<h1>Hello FullCycle from The Docker</h1><hr>' + regs.toString() );
     });
});

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port);
});