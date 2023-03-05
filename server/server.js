const fs = require('node:fs/promises')
const express = require('express')
const hbs = require('express-handlebars')
const res = require('express/lib/response')

const server = express()

// Server configuration
const publicFolder = __dirname + '/public'
server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
server.set('views', __dirname + '/views')

// Your routes/router(s) should go here

server.get('/', (req, res) => {
  dataObj = {
    title: 'The Wisdom of Zoltash',
  }
  res.render('home', dataObj)
})

// Q1 route
server.get('/q1', (req, res) => {
  let dataObj = {
    title: 'Question One',
  }
  res.render('q1', dataObj) //<----- Change to 'q1'
})



server.post('/q1', (req, res) => {
  const formStuff = req.body
  const answerOne = formStuff.a1;
  console.log(answerOne)
  res.redirect('q1')
})


// Server.get for the Question two
server.get('/q2', (request, response) => {
  let dataObj = {
    title: 'the Wisdom of Zoltash',
  }
  response.render('q2', dataObj) //Make sure to change this to Question Two when we have page
})


server.get('/fortune', (req, res) => {
  fs.readFile(__dirname + '/data/data.json', 'utf-8')
  .then((answer) => {
    let thing = JSON.parse(answer)
    let randomIndex = Math.floor(Math.random() * thing.fortunes.length)
    let fortuneAnswer = {
      title: 'Here is your fortune',
      fortune: thing.fortunes[randomIndex] 
    }
    res.render('fortune', fortuneAnswer)
  })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

module.exports = server
