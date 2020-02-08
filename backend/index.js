const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const DATABASE_NAME = "WorkHub";
const cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');
var ObjectID = require('mongodb').ObjectID;
require('dotenv').config();

var database, collection, ticketCollection;

app.listen(8081, () => {
    console.log("server running on 8081")
    MongoClient.connect(process.env.DB_LOGIN, {useNewUrlParser: true}, (err, client) =>{
        if (err) throw err;
        database = client.db(DATABASE_NAME);
        collection = database.collection("users");
        ticketCollection = database.collection("tickets");
        console.log("Mongo connection established")
    })

})
app.use(cookieParser())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
    );
    next();
  });

app.use(cors({credentials: true, origin: 'http://localhost:3000'})); 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/addticket', (req, res) => {
    const ticketInfo = {name: req.body.name, description: req.body.description}
    ticketCollection.count().then((count) => {
        if(count >= 5){
            res.send("You can not open more than 5 tickets right now.");
            console.log("nope");
        }
        else{
            ticketCollection.insertOne(ticketInfo, (err, res) => {
            })
            res.send(ticketInfo);
        }
    })
})
app.get('/', (req, res) => {
    getTickets();
    async function getTickets(){ //async so that res.send doesn't return an empty array
        const tickets = []
        await ticketCollection.find().forEach(function(item){
            tickets.push(item)
        });
        res.send(tickets);
    }
})


app.post('/loginrequest', (req, res) =>{
    const info = {username: req.body.username, password: req.body.password};    
    collection.findOne({username: info.username}, (err, user) =>{
        if (err) throw err;
        if(!user){
            res.send("user not found");
        }
        if(user){

            if(user.password == info.password){
                var token = jwt.sign({username: info.username}, process.env.JWT_SECRET);
                res.cookie('jwt', token, {maxAge: 1000000})
                res.status(200).send("Cookie gen");
            }
            else if(user.password !== info.password){
                console.log("password does nto match")
            }
        }
    })
})


app.get('/authentication', (req, res) => {
   jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, (err, verified) => {
       if(verified){
           console.log(verified);
           res.status(200).send(verified);
       }
       if(!verified){
           res.status(500).send(false);
       }
   });

})

app.post('/delete', (req, res) => {
    var postId = new ObjectID(req.body.id);
    ticketCollection.deleteOne({"_id": postId}, (err, obj) => {
        if(err) console.log(err);
        res.send("deleted");
    })
})
