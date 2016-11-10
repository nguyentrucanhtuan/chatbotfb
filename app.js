
'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const http = require('http')
const MBot = require('messenger-bot')
const Config = require('./const.js');
let mbot = new MBot({
  token: Config.FB_PAGE_TOKEN,
  verify: Config.FB_VERIFY_TOKEN,
  app_secret: Config.FB_APP_SECRECT
})


mbot.on('error', (err) => {
  console.log(err.message)
})


mbot.setGetStartedButton("GET_STARTED");

bot.on('postback', (payload, reply, actions) => {
	let 
	
	if (payload.postback.payload == "GET_STARTED") {
        getStarted(payload.sender.id);
    }
	
});

function getStarted(userId){

    // Get started process 
	Console.log('getstart for userID'+userId);
}

mbot.on('message', (payload, reply) => {
  let text = payload.message.text
  
  mbot.getProfile(payload.sender.id, (err, profile) => {
    if (err) throw err

	
	/*switch (text){
		case 'say hi':
		
			break;
		case 'Danh sach san pham':
		
			break;
			
		case ''
	}*/
    reply({ text }, (err) => {
      if (err) throw err

      console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`)
    })
  })
})
let app = express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/webhook/', (req, res) => {
  return mbot._verify(req, res)
})

app.post('/webhook/', (req, res) => {
  mbot._handleMessage(req.body)
  res.end(JSON.stringify({status: 'ok'}))
})



http.createServer(app).listen((process.env.PORT || 5000))
