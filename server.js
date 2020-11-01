const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const budgetModel = require('./models/budget_schema');
const url = 'mongodb://localhost:27017/personal_budget';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/', express.static('public'));

app.get('/budget', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => {
                budgetModel.find({})
                           .then((data)=>{
                                res.json(data);
                                mongoose.connection.close();
                           })
                           .catch((connectionError) => {
                               console.log(connectionError);
                           })
            })
            .catch((connectionError)=>{
                console.log(connectionError);
            })
});

app.post('/budget', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => {
                var newBudget = {
                    title: req.body.title,
                    value: req.body.value,
                    color: req.body.color
                }

                budgetModel.insertMany(newBudget)
                           .then((data)=>{
                                res.json(data);
                                mongoose.connection.close();
                           })
                           .catch((connectionError) => {
                               console.log(connectionError);
                           })
            })
            .catch((connectionError)=>{
                console.log(connectionError);
            })
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

/*
const data = require('./budget-data.json');

app.use('/', express.static('public'));

app.use(cors());

const budget = [
];

app.get('/hello', (req, res) => {
    res.send('Hello, world!');
})

app.get('/budget', (req, res) => {
    res.json(data);
})*/