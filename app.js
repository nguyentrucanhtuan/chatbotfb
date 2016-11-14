
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

let bot = new FBBotFramework({
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
	
	if (payload == "DEVELOPER_DEFINED_PAYLOAD_FOR_SHOW_COLLECTION"){
		showShopCollection(userId);
		console.log("Enter postback show collection");
	}

    // Other postback callbacks here
    // ...

});


function getStarted(userId){

    // Get started process 
}


function showShopCollection(userId){
	var elements = [
		{
			"title": "Classic White T-Shirt",
			"image_url": "http://petersapparel.parseapp.com/img/item100-thumb.png",
			"subtitle": "Soft white cotton t-shirt is back in style",
			"buttons": [
				{
					"type": "web_url",
					"url": "https://petersapparel.parseapp.com/view_item?item_id=100",
					"title": "View Item"
				},
				{
					"type": "web_url",
					"url": "https://petersapparel.parseapp.com/buy_item?item_id=100",
					"title": "Buy Item"
				},
				{
					"type": "postback",
					"title": "Bookmark Item",
					"payload": "USER_DEFINED_PAYLOAD_FOR_ITEM100"
				}
			]
		},
		{
			"title": "Classic Grey T-Shirt",
			"image_url": "http://petersapparel.parseapp.com/img/item101-thumb.png",
			"subtitle": "Soft gray cotton t-shirt is back in style",
			"buttons": [
				{
					"type": "web_url",
					"url": "https://petersapparel.parseapp.com/view_item?item_id=101",
					"title": "View Item"
				},
				{
					"type": "web_url",
					"url": "https://petersapparel.parseapp.com/buy_item?item_id=101",
					"title": "Buy Item"
				},
				{
					"type": "postback",
					"title": "Bookmark Item",
					"payload": "USER_DEFINED_PAYLOAD_FOR_ITEM101"
				}
			]
		}
	];

	bot.sendGenericMessage(userID, elements);

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
        "title": "Shop Collection",
        "payload": "DEVELOPER_DEFINED_PAYLOAD_FOR_SHOW_COLLECTION"
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
