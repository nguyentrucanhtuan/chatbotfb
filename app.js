/*var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World COffeetree!');
});

var port = process.env.PORT || 8080;

app.listen(port, function () {
  console.log('Example app listening on port!' + port);
});*/
'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()


const FB = require('./facebook.js');

app.set('port', (process.env.PORT || 5000))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

// index
app.get('/', function (req, res) {
	res.send('hello world i am a secret bot')
})

// for facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'anhtuandeptrailaday') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

// to post data
app.post('/webhook/', function (req, res) {
	
	const messaging = FB.getFirstMessagingEntry(req.body);
	if (messaging && messaging.message) {
		const sender = messaging.sender.id;
		const msg = messaging.message.text;
		const atts = messaging.message.attachments;
		console(msg);
		if (atts) {
		  // We received an attachment

		  // Let's reply with an automatic message
		  FB.fbMessage(
			sender,
			'Sorry I can only process text messages for now.'
		  );
		} else if (msg) {
			FB.fbMessage(
			sender,
			'You said: '+msg
			);
		}
	}
	
	res.sendStatus(200);
	/*addGreeting();
	addPersistentMenu();

	let messaging_events = req.body.entry[0].messaging
	for (let i = 0; i < messaging_events.length; i++) {
		let event = req.body.entry[0].messaging[i]
		let sender = event.sender.id
		if (event.message && event.message.text) {
			let text = event.message.text
			if (text === 'Generic') {
				sendGenericMessage(sender)
				continue
			}
			if (text === 'Image') {
				sendImage(sender)
				continue
			}
			sendTextMessage(sender, "Bạn vừa nói là: " + text.substring(0, 200))
		}
		if (event.postback) {
			let text = JSON.stringify(event.postback)
			sendTextMessage(sender, "Postback received: "+text.substring(0, 200), token)
			continue
		}
	}
	res.sendStatus(200)*/
})


// recommended to inject access tokens as environmental variables, e.g.
// const token = process.env.PAGE_ACCESS_TOKEN
const token = "EAAHwsu50wLoBAPsGNwYnC3XLRZBja7HVFEh9jZAbZBZA34ZAQg5rMxA8kfACA2GbgwpJKA0M45obaRFFPHIcDaG01VQxS0Ssk0UvBYbfpDPASt9izjJmhxQ4TT8awmNPKL33mgq0a0ienhwW0fpKDysPigqGaK8gfe0xmSh9tiAZDZD"

function sendTextMessage(sender, text) {
	let messageData = { text:text }
	
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

function sendImage(sender) {
	let messageData = {
      attachment: {
        type: "image",
        payload: {
          url: "http://nguyenlieuphache.com/catalog/view/theme/nlpc2/images/cong-thuc-soda.png"
        }
      }
    }
	
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

function sendVideo(sender) {
	let messageData = {
      attachment: {
        type: "video",
        payload: {
          url: "https://petersapparel.com/bin/clip.mp4"
        }
      }
    }
	
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

function addPersistentMenu(){
	request({
		url: 'https://graph.facebook.com/v2.6/me/thread_settings',
		qs: {access_token:token},
		method: 'POST',
		json:{
			setting_type : "call_to_actions",
			thread_state : "existing_thread",
			call_to_actions:[
				{
					type:"postback",
					title:"Danh sách sản phẩm",
					payload:"PRODUCT_LIST"
				},
				{
					type:"postback",
					title:"Phản hồi và hỗ trợ",
					payload:"FEEDBACK_AND_HELP"
				},
				{
					type:"postback",
					title:"Chia sẻ",
					payload:"SHARE"
				}
			]
		}
	}, function(error, response, body) {
		console.log(response)
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

function addGreeting(){
	request({
		url: 'https://graph.facebook.com/v2.6/me/thread_settings',
		qs: {access_token:token},
		method: 'POST',
		json:{
			setting_type: "greeting",
			greeting: {
				text: "Xin chào {{user_first_name}} đã đến với trang cung cấp nguyên liệu pha chế TNT, Tôi sẽ giúp bạn tìm thấy thứ bạn cần và hãy bắt đầu mua sắm nào!!!"
			}
			
		}
	}, function(error, response, body) {
		console.log(response)
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

function sendAction(sender, action){
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json:{
			recipient: {id:sender},
			sender_action: action,
		}
	}, function(error, response, body) {
		console.log(response)
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

function sendGenericMessage(sender) {
	let messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [{
					"title": "First card",
					"subtitle": "Element #1 of an hscroll",
					"image_url": "http://messengerdemo.parseapp.com/img/rift.png",
					"buttons": [{
						"type": "web_url",
						"url": "https://www.messenger.com",
						"title": "web url"
					}, {
						"type": "postback",
						"title": "Postback",
						"payload": "Payload for first element in a generic bubble",
					}],
				}, {
					"title": "Second card",
					"subtitle": "Element #2 of an hscroll",
					"image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
					"buttons": [{
						"type": "postback",
						"title": "Postback",
						"payload": "Payload for second element in a generic bubble",
					}],
				}]
			}
		}
	}
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

// spin spin sugar
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})