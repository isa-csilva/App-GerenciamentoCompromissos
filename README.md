# Gerenciamento de Compromissos 📝

## Sobre o projeto
A aplicação de Gerenciamento de Compromissos permite que você crie e gerencie seus compromissos.
Para acessá-la você deve realizar um **login**, e caso não tenha uma conta é possível realizar seu **cadastro**.
Após entrar com sua conta, você pode começar a **criar seus compromissos**, e **clicando neles**, pode **editá-los e excluí-los como desejar**.

### Tecnologias utilizadas
- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
- ![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)

## 💻 Instalação do projeto
- Realize um clone do projeto: `$ git clone https://github.com/isa-csilva/App-GerenciamentoAgendas.git`
- Abra a pasta em seu editor de código-fonte de preferência (neste projeto eu utilizei o [VSCode](https://code.visualstudio.com/))

### Client
```
$ cd client
$ npm install
$ npm start
```

### Server
```
$ cd server
$ npm install
$ npm run devstart
```

### MySQL
- Será necessário configurar o Banco de Dados com as seguintes configurações:
`user: 'root', password: 'password', database: 'usersDB'`
- O databse `usersDB` deve possuir duas tabelas:
```
Table: compromissos
Columns:
idcompromissos int AI PK 
title varchar(45) 
description varchar(255) 
date date
```
```
Table: users
Columns:
idusers int AI PK 
email varchar(45) 
password varchar(200)
```
- Mais detalhes sobre o banco de dados podem ser encontrados no arquivo `server/index.js`


## 🛠️ Funcionalidades do projeto
- `Funcionalidade 1`: Realizar login
- `Funcionalidade 2`: Criar uma nova conta
- `Funcionalidade 3`: Adicionar compromissos
- `Funcionalidade 4`: Editar compromissos
- `Funcionalidade 4`: Listar compromissos
- `Funcionalidade 5`: Excluir compromissos
- `Funcionalidade 6`: Pesquisar em seus compromissos
  

