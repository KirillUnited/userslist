const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient,
    format = require('util').format;
const objectId = require("mongodb").ObjectID;

const app = express();
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: false
// }));
const url = 'mongodb://list-item-user:user1234@ds135413.mlab.com:35413/list-item';

app.use(express.static(__dirname + "/public"));

var Schema = mongoose.Schema;
// для работы с promise
mongoose.Promise = global.Promise;

// установка схемы
var userScheme = new Schema({
    name: String,
    age: Number
});

// создаем модель пользователя:
var User = mongoose.model("User", userScheme);

// Далее мы можем создавать объекты этой модели:
var user = new User({
    name: "Bill",
    age: 41
});
//Сохранение объекта
user.save()
    .then(function (doc) {
        console.log("Сохранен объект", doc);
        mongoose.disconnect(); // отключение от базы данных
    })
    .catch(function (err) {
        console.log(err);
        mongoose.disconnect();
    });
User.find({}, function (err, docs) {
    mongoose.disconnect();

    if (err) return console.log(err);

    console.log(docs);
});

app.get('/api/users', (req, res) => {
    mongoose.connect(url, function (err, db) {
        if (err) throw err;
        console.log('connected successfully');
        const collection = db.collection("users");
        collection.find({}).toArray((err, users) => {
            res.send(users);
            db.close();
        });
    });
});

app.get("/api/users/:id", function(req, res){
       
    var id = new objectId(req.params.id);
    mongoose.connect(url, function(err, db){
        const collection = db.collection("users");
        collection.findOne({_id: id}, function(err, user){
              
            if(err) return res.status(400).send();
              
            res.send(user);
            db.close();
        });
    });
});

app.post("/api/users", function (req, res) {

    if (!req.body) return res.sendStatus(400);

    var userName = req.body.name;
    var userAge = req.body.age;
    var user = {
        name: userName,
        age: userAge
    };

    mongoose.connect(url, function (err, db) {
        const collection = db.collection("users");
        collection.insertOne(user, function (err, result) {

            if (err) return res.status(400).send();

            res.send(user);
            db.close();
        });
    });
});
app.delete("/api/users/:id", function (req, res) {
    var id = new objectId(req.params.id);
    mongoose.connect(url, function (err, db) {
        const collection = db.collection("users");
        collection.findOneAndDelete({
            _id: id
        }, function (err, result) {

            if (err) return res.status(400).send();

            var user = result.value;
            res.send(user);
            db.close();
        });
    });
});
app.put("/api/users", function (req, res) {

    if (!req.body) return res.sendStatus(400);
    var id = new objectId(req.body.id);
    var userName = req.body.name;
    var userAge = req.body.age;

    mongoose.connect(url, function (err, db) {
        const collection = db.collection("users");
        collection.findOneAndUpdate({
            _id: id
        }, {
            $set: {
                age: userAge,
                name: userName
            }
        }, {
            returnOriginal: false
        }, function (err, result) {

            if (err) return res.status(400).send();

            var user = result.value;
            res.send(user);
            db.close();
        });
    });
});
app.listen(3000, () => console.log('blog server running!'));