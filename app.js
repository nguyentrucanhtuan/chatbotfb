
'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const http = require('http')
const MBot = require('messenger-bot')
const Config = require('./const.js');

let FBBotFramework = require('fb-bot-framework');
/*
let mbot = new MBot({
  token: Config.FB_PAGE_TOKEN,
  verify: Config.FB_VERIFY_TOKEN,
  app_secret: Config.FB_APP_SECRECT
})


mbot.on('error', (err) => {
  console.log(err.message)
})


mbot.setGetStartedButton([{"payload":"GET_STARTED"}]);

mbot.on('postback', (payload, reply, actions) => {
	let postback = payload.postback;
	console.log(postback);
	
	if (payload.postback.payload == "GET_STARTED") {
        getStarted(payload.sender.id);
    }
	
	if (postback.payload == "FEEDBACK_AND_HELP"){
		reply({ text: 'Khong giup thi sao!'}, (err, info) => {})
	}
	
	if (postback.payload == "PRODUCT_LIST"){
		reply({ text: 'Khong list thi sao!'}, (err, info) => {})
	}
	
	if (postback.payload == "SHARE"){
		reply({ text: 'Khong share thi sao!'}, (err, info) => {})
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

	
	switch (text){
		case 'say hi':
		
			break;
		case 'Danh sach san pham':
		
			break;
			
		case ''
	}
    reply({ text }, (err) => {
      if (err) throw err

      console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`)
    })
  })
})
*/

var bot = new FBBotFramework({
    page_token: Config.FB_PAGE_TOKEN,
    verify_token: Config.FB_VERIFY_TOKEN
});


let app = express()

//app.use(bodyParser.json())
app.use('/webhook', bot.middleware());

//app.use(bodyParser.urlencoded({
//  extended: true
//}))

//app.get('/webhook/', (req, res) => {
//  return mbot._verify(req, res)
//})

//app.post('/webhook/', (req, res) => {
 // mbot._handleMessage(req.body)
 // res.end(JSON.stringify({status: 'ok'}))
//})

bot.on('message', function(userId, message){
    bot.sendTextMessage(userId, "Echo Message:" + message);
});


bot.setGetStartedButton("GET_STARTED");
bot.on('postback', function(userId, payload){

    if (payload == "GET_STARTED") {
        getStarted(userId);
    }

    // Other postback callbacks here
    // ...

});


function getStarted(userId){

    // Get started process 
}

// Setup listener for attachment
bot.on('attachment', function(userId, attachment){

    // Echo the audio attachment
    if (attachment[0].type == "audio") {
        bot.sendAudioAttachment(userId, attachment[0].payload.url);
    }

});



var menuButtons = [
    {
        "type": "postback",
        "title": "Help",
        "payload": "DEVELOPER_DEFINED_PAYLOAD_FOR_HELP"
    },
    {
        "type": "postback",
        "title": "Start a New Order",
        "payload": "DEVELOPER_DEFINED_PAYLOAD_FOR_START_ORDER"
    },
    {
        "type": "web_url",
        "title": "View Website",
        "url": "http://nguyenlieuphache.com.vn"
    }
];
bot.setPersistentMenu(menuButtons);


http.createServer(app).listen((process.env.PORT || 5000))
