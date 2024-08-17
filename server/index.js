const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'usersDB'
});

app.use(express.json());
app.use(cors());

/* SignIn e LogIn */
app.post('/signin', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
        if (err) {
            res.send(err);
        }

        if (result.length == 0) {
            bcrypt.hash(password, saltRounds, (error, hash) => {
                 db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hash], (err, response) => {
                    if(err) {
                        res.send(err);
                    }
                    res.send({msg: "Cadastro feito com sucesso!"});
                });
            });

        } else {
            res.status(202).send({msg: "Já existe um usuário cadastrado com esse e-mail."})
        }
    });
});

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
        if (err) {
            res.send(err);
        } 
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, result) => {
                if (result) {
                    res.send({msg: "Usuário efetuou LogIn com sucesso!"});
                } else {
                    res.status(202).send({msg: "E-mail ou senha incorretos. Verifique e tente novamente."});
                }
            });
        } else {
            res.status(202).send({msg: "E-mail não encontrado. Verifique novamente ou cadastre-se."});
        }
    });
})
/* */

/* Compromissos */
app.post('/add', (req, res) => {
    const { title } = req.body;
    const { description } = req.body;
    const { date } = req.body;
    let q = 'INSERT INTO compromissos (title, description, date) VALUES (?,?,?)';

    db.query(q, [title, description, date], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

app.get('/getCards', (req, res) => {
    let q = 'SELECT * FROM compromissos';
    db.query(q, (err, result) => {
        if (err) {
            console.log(err);
        } else res.send(result);
    })
})

app.post('/search', (req, res) => {
    const { title } = req.body;
    const { description } = req.body;
    const { date } = req.body;

    let q = 'SELECT * FROM compromissos WHERE title = ? OR description = ? OR date = ?';

    db.query(q, [title, description, date], (err, result) => {
        if (err) {
            console.log(err);
        } else res.send(result);
    })
})

app.put('/edit', (req, res) => {
    const { id } = req.body;
    const { title } = req.body;
    const { description } = req.body;
    const { date } = req.body;

    let q = 'UPDATE compromissos SET title = ?, description = ?, date = ? WHERE idcompromissos = ?';
    db.query(q, [title, description, date, id], (err, result) => {
        if (err) {
            console.log(err)
        } else res.send(result);
    })
})

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    let q = 'DELETE FROM compromissos WHERE idcompromissos = ?';

    db.query(q, [id], (err, result) => {
        if (err) {
            console.log(err);
        } else res.send(result);
    })
})
/* */

app.listen(3001, () => {
});

