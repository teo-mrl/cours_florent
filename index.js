/*console.log("hello word");
const object = {
    name:"toto", 
    age:5,
    parents:[{name:"papa"},{name:"maman",age:46}]
}
const ageMaman = object.parents[1].age;
console.log(ageMaman)
var Tototititata = JSON.stringify(object)
console.log(Tototititata)
var object2 = JSON.parse(Tototititata)
console.log(object2)
*/
const express = require("express");
const serveur = express();
const body_parser = require("body-parser");
var jsonParser = body_parser.json()
const sqlite3 = require('sqlite3').verbose();

serveur.use(express.static('public'));
function sayhelloList(req, res) {
    const db = new sqlite3.Database('C:/Users/morlansb/Desktop/code/chinook.db');

    const list = []
    db.each("select * from Copains",(_,row)=>list.push(row),(_,C) => {
        //console.log(C,list);
        res.send(list);
    }) ;

    db.close();
}




function sayhello(req, res) {
    res.send({text:"hello"})
}   

function sayhello2(req, res) { 
    res.send(`hello ${req.query.name} ${req.query.age}`);
}

function adname(req, res) {
    console.log(req.body);
    const db = new sqlite3.Database('C:/Users/morlansb/Desktop/code/chinook.db');
    const sql = `INSERT INTO Copains (Name, last_name) VALUES (?, ?)`;
    db.run(sql, [req.body.Name, req.body.last_name], function(err) {
        if (err) {
            res.status(500).send("Error");
            return;
        }
        res.status(200).send("ok");
        db.close();
    });
}
serveur.get("/coucou", sayhello);
serveur.get("/coucou2", sayhello2);
serveur.post("/add_copain",jsonParser,adname);
serveur.get("/copain", sayhelloList);


serveur.listen(80, () => {
    console.log(`Example app listening on port ${80}`);
});




