
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
	
	console.log(message);
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
	
	if (payload == "DEVELOPER_DEFINED_PAYLOAD_FOR_START_SHOPPING"){
		getStartShoppingPostBack(userId);
	}
	
	
	if (payload == "DEVELOPER_DEFINED_PAYLOAD_FOR_SHARE_BOT"){
		getSharePostBack(userId);
	}
	
	if (payload == "DEVELOPER_DEFINED_PAYLOAD_FOR_FEEDBACK_HELP_LEGAL"){
		getFHLPostBack(userId);
	}
	
	if (payload == "DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_USED_SHOP"){
		showShopCollection(userId);
	}
	
	if (payload == "DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_NEW_SHOP"){
		showShopCollection(userId);
	}


    // Other postback callbacks here
    // ...

});

function getStartShoppingPostBack(userId){
	var text = "Quý khách cần tìm sản phẩm cho:";
	var replies = [
	  {
        "content_type":"text",
        "title":"Quán đang hoạt động",
        "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_USED_SHOP"
      },
	  {
        "content_type":"text",
        "title":"Quán mới mở",
        "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_NEW_SHOP"
      },
     
	  
    ];
	console.log("enter quick replies start shopping");
	bot.sendQuickReplies(userId,text,replies,"REGULAR", function(err,result){
		console.log(result);
		//if(result.quick_reply.payload == "DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_USED_SHOP"){
			
		//}
		
		//if(result.quick_reply.payload == "DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_NEW_SHOP"){
			
		//}
		
	});
}

function getSharePostBack(userId){
	var elements = [
		{
			"title": "Mua sắm mọi thứ dành cho quán cafe tại TNTDrink",
			"image_url": "https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-9/12986925_1705723756336966_8557111046595659161_n.jpg?oh=08b611f25742ea7bebce3e661bd88311&oe=58D2919D",
			"subtitle": "Mua nguyên liệu, dụng cụ pha chế. Cafe nguyên chất, máy pha - xay cafe giá tốt. Thử ngay!",
			"item_url":"http://m.me/nguyenlieuphachecom",
			"buttons": [
				{
					"type": "element_share",
				}
			]
		},
	
	];
	bot.sendGenericMessage(userId, elements);
}


function getFHLPostBack(userId){
	
}

function getStarted(userId){
	
	bot.getUserProfile(userId, function (err, profile) {
		console.log(profile);
		var text = "Xin chào "+profile.first_name+" "+profile.last_name+", Cảm ơn quý bạn đã ghé thăm trang Nguyên liệu pha chế, tôi là \"Trợ lý mua sắm\" của bạn. Hãy xem qua hướng dẫn và bắt đầu mua sắm nhé. Cảm ơn ^^!";
		var buttons = [
			{
				"type": "web_url",
				"url": "http://nguyenlieuphache.com.vn",
				"title": "Ghé thăm trang web"
			},
			{
				"type": "postback",
				"title": "Bắt đầu mua hàng",
				"payload": "DEVELOPER_DEFINED_PAYLOAD_FOR_START_SHOPPING"
			}
		];
		// Get started process 
		bot.sendButtonMessage(userId, text, buttons);
	});
	
}


function showShopCollection(userId){
	var elements = [
		{
			"title": "Máy xay cà phê",
			"image_url": "http://nguyenlieuphache.com/catalog/view/theme/nlpc2/images/may-xay-ca-phe.png",
			"subtitle": "Máy xay cà phê dành cho quán",
			"buttons": [
				{
					"type": "postback",
					"title": "Xem sản phẩm",
					"payload": "VIEW_PRODUCT_1"
				}
			]
		},
		{
			"title": "Máy xay sinh tố",
			"image_url": "http://nguyenlieuphache.com/catalog/view/theme/nlpc2/images/may-xay-sinh-to.png",
			"subtitle": "Máy sinh tố chuyên nghiệp dành cho quán",
			"buttons": [
				{
					"type": "postback",
					"title": "Xem sản phẩm",
					"payload": "VIEW_PRODUCT_2"
				}
			]
		},
		{
			"title": "Mứt trái cây",
			"image_url": "http://nguyenlieuphache.com/catalog/view/theme/nlpc2/images/mut-trai-cay01.png",
			"subtitle": "Mứt trái cây dùng cho thay thế trái cây tươi và làm được nhiều món hấp dẫn",
			"buttons": [
				{
					"type": "postback",
					"title": "Xem sản phẩm",
					"payload": "VIEW_PRODUCT_3"
				}
			]
		},
		{
			"title": "Syrup pha chế",
			"image_url": "http://nguyenlieuphache.com/catalog/view/theme/nlpc2/images/syrup-pha-che.png",
			"subtitle": "Syrup dùng trong các loại thức uống soda, smoothie,... mát lạnh",
			"buttons": [
				{
					"type": "postback",
					"title": "Xem sản phẩm",
					"payload": "VIEW_PRODUCT_3"
				}
			]
		}
	];

	bot.sendGenericMessage(userId, elements);

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
        "title": "Top selling tại TNTDrink",
        "payload": "DEVELOPER_DEFINED_PAYLOAD_FOR_SHOW_COLLECTION"
    },
    {
        "type": "postback",
        "title": "Bắt đầu mua sắm",
        "payload": "DEVELOPER_DEFINED_PAYLOAD_FOR_START_SHOPPING"
    },
    {
        "type": "web_url",
        "title": "View Website",
        "url": "http://nguyenlieuphache.com.vn"
    },
	{
        "type": "postback",
        "title": "Chia sẻ",
        "payload": "DEVELOPER_DEFINED_PAYLOAD_FOR_SHARE_BOT"
    },
	
	{
        "type": "postback",
        "title": "Feedback, help & legal",
        "payload": "DEVELOPER_DEFINED_PAYLOAD_FOR_FEEDBACK_HELP_LEGAL"
    }
];
bot.setPersistentMenu(menuButtons);


http.createServer(app).listen((process.env.PORT || 5000))
