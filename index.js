"use strict"
import { createClient } from "oicq"
import config from "./config.json" assert {type: 'json'};

const account = config.Account
const bot = createClient(account)

import cgpt from 'chatgpt-lib'
import { Dalle } from "node-dalle2"
const chatbot = new cgpt.ChatGPT(config);
const dalle = new Dalle({ apiKey: config.Dalle2Token });
bot.chatbot = chatbot
bot.dalle = dalle

bot
.on("system.login.qrcode", function (e) {
	this.logger.mark("扫码后按Enter完成登录")
	process.stdin.once("data", () => {
		this.login()
	})
})
.login()

export { bot }

// template plugins
import { hello } from "./plugins/plugin-hello.js"   // hello world
import { image } from "./plugins/plugin-image.js"   // 发送图文和表情
import { social } from "./plugins/plugin-social.js" // 加群和好友
import { online } from "./plugins/plugin-online.js" // 监听上线事件
import { cmd } from "./plugins/plugin-cmd.js"       // 命令行

cmd()

process.on("unhandledRejection", (reason, promise) => {
	console.log('Unhandled Rejection at:', promise, 'reason:', reason)
})
