const express = require('express');
const port = 3000;
const app = express();
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb',
    multipleStatements: true
};
const mysql = require('mysql');
const cn = mysql.createConnection(config);

const sql = `create table if not exists People(id int not null auto_increment, name varchar(255), primary key(id)); insert into people(name) values ('Ronaldo has been here!')`;
cn.query(sql);

app.get('/', async (req, res) => {
    const sql = `select * from people`;
    await cn.query(sql, (err, result, afields) => {
        if (err) console.log(err);
        let regs = "<table><thread><tr><th>#Id</th><th>Nome</th></tr></thead><tbody>"
        for(var i=0; i < result.length; i++){
            regs = regs + '<tr><td>' + result[i].id + '</td><td>' + result[i].name + '</td></tr>';
        }
        regs = regs + '</tbody></table>'
        res.send('<h1>Hello from Docker FullCycle</h1><hr>' + regs.toString() );
     });
});

app.listen(port, ()=> {
    console.log('Running on port ' + port);
});