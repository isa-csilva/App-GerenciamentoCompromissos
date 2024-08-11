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
            res.send({msg: "Já existe um usuário cadastrado com esse e-mail."})
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
                    res.status(202).send({msg: "A senha está incorreta."});
                }
            });
        } else {
            res.status(202).send({msg: "E-mail não encontrado. Verifique novamente ou cadastre-se."});
        }
    });
})


app.listen(3001, () => {
    console.log('Rodando na 3001')
});

