var express = require("express");
var app = express();
var jwt = require('jsonwebtoken')
var mysql = require("mysql");
var bodyParser = require('body-parser')
var session = require('express-session')



app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

var conn = {
    host:'localhost',
    user:'root',
    password:'12345678',
    database:'postlike'
 }

var knex = require('knex')({client:'mysql',connection:conn});

knex.schema.hasTable('users').then(function(exists) {
    if (!exists) {
      knex.schema.createTable('users', function(t) {
        t.increments('Id').primary();
      t.string('Name').notNullable();
        t.string('Email').unique().notNullable();
        t.string('Password')
      //   return res.send('table has been created')
      })
      .catch((err)=>{console.log(err.message)})
    }
   
  });


  knex.schema.hasTable('postcreate').then(function(exists){
      if (!exists){
          knex.schema.createTable('postcreate', function(m){
              m.increments('Id').primary();
              m.integer('User_id').notNullable();
              m.dateTime('Date');
              m.string('Text').notNullable();
              m.string('Description').notNullable();
              console.log('table has been created')
          })
          .catch((err)=>{return res.send(err.message)})
      }
      
  });

  knex.schema.hasTable('likedislike').then(function(exists){
    if (!exists){
        knex.schema.createTable('likedislike', function(n){
            n.increments('Post_id').primary();
            n.integer('User_id').notNullable();
            n.integer('Like').notNullable();
            n.dateTime('Date');
            n.string('Dislike').notNullable();
            console.log('table has been created')
        })
        .catch((err)=>{return res.send(err.message)})
    }
    
});

const users = express.Router();
app.use('/', users)
require("./Routes/users")(users, knex, jwt)

const postcreate = express.Router();
app.use('/', postcreate)
require("./Routes/postcreate")(postcreate, knex, jwt)

const likedislike = express.Router();
app.use('/', likedislike)
require("./Routes/likedislike")(likedislike, knex, jwt)
  

app.listen(3080,()=>{
	console.log('Port is working...')
})