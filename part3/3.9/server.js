const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');


const app = express();
const filePath = path.join(__dirname, 'db.json');
app.use(cors());

morgan.token('body', (req) => JSON.stringify(req.body));
const logger = morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req, res)
  ].join(' ')
});

app.use(express.json());
app.use(express.urlencoded());
app.use(logger);

app.get('/api/persons', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, raw) => {
        if (err) return res.status(500);
        res.json(JSON.parse(raw));
    });
});

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile(filePath, 'utf8', (err, raw) => {
        if (err) {
            return res.sendStatus(500);
        }
        let book;
        try {book = JSON.parse(raw);}
        catch (err) {return res.sendStatus(500);}
        const key = Object.keys(book).find(x => book[x].id === id);
        if (!key) {
            return res.sendStatus(404);
        }
        delete book[key];
        fs.writeFile(filePath, JSON.stringify(book, null, 2), err => {
            if (err) return res.sendStatus(500);
            res.sendStatus(200);
        });
    });
});

app.post('/api/persons', (req,res) => {
    var name = req.body.name;
    var number = req.body.number;
    if (!name || !number) return res.status(500).send("Name or number empty.");
    var id = String(Math.round(Math.random() * 1000000));
    fs.readFile(filePath, 'utf8', (err, raw) => {
        if (err) return res.sendStatus(500);
        let book;
        try {book = JSON.parse(raw);}
        catch (err) {return res.sendStatus(500);}
        const nameExists = Object.keys(book).find(x => book[x].name === name);
        if (nameExists) return res.status(500).send("Name already exists");
        const numberExists = Object.keys(book).find(x => book[x].number === number);
        if (numberExists) return res.status(500).send("Number already in use");
        book.push({'id' : id, 'name': name, 'number' : number});
        fs.writeFile(filePath, JSON.stringify(book, null, 2), err => {
            if (err) return res.sendStatus(500);
            res.sendStatus(200);
        });
    });
});

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile(filePath, 'utf-8', (err, raw) => {
        if (err) return res.sendStatus(500);
        let book;
        try {book = JSON.parse(raw);}
        catch (err) {return res.sendStatus(500);}
        let ret = null;
        Object.keys(book).forEach(x => {
            if (book[x].id === id) {
                ret = book[x];
            }
        });
        if (!ret) return res.sendStatus(404);
        res.json(ret);
    });
});

app.get('/info', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, raw) => {
        if (err) {
            return res.sendStatus(500);
        }
        const count = Object.keys(JSON.parse(raw)).length;
        res.set('Content-Type', 'text/html');
        res.send(`
            Phonebook has ${count} people
            ${Date().toString()}
        `);
    });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));