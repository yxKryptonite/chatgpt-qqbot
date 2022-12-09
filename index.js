"use strict"
const { createClient } = require("oicq")
// open config.json
const config = require("./config.json")

const account = config.Account

const bot = createClient(account)
const cgpt = require('chatgpt-lib');
const chatbot = new cgpt.ChatGPT(config);
bot.chatbot = chatbot

bot
.on("system.login.qrcode", function (e) {
	this.logger.mark("扫码后按Enter完成登录")
	process.stdin.once("data", () => {
		this.login()
	})
})
.login()

exports.bot = bot

// template plugins
require("./plugin-hello") //hello world
require("./plugin-image") //发送图文和表情
require("./plugin-request") //加群和好友
require("./plugin-online") //监听上线事件
require("./plugin-cmd") //命令行

process.on("unhandledRejection", (reason, promise) => {
	console.log('Unhandled Rejection at:', promise, 'reason:', reason)
})
