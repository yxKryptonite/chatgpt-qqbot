"use strict"
const { segment } = require("oicq")
const { bot } = require("../index")

/* 
 * 机器人指令
 * 机器人指令以 / 开头
 * 机器人指令格式：/指令 内容
 * 机器人指令示例：/chatgpt 你好
 * * 已实现的指令：
 * - /chatgpt: 调用 ChatGPT 进行聊天 (可用 py 和 js 接口) e.g. /chatgpt 你好
 * - /chatgpt-reset: 重置 ChatGPT 对话 e.g. /chatgpt-reset
 * 
 * * 计划实现的指令：
 * - /anonymous: 在某个群聊中匿名发言 e.g. /anonymous 1234567890 这是一条匿名消息
 * - /translate: 翻译 e.g. /translate en 你好
 * - /help: 显示帮助
 * - 多模态信息，如
 * 		- /image: 发送图片
 * 		- /video: 发送视频
 * 		- /diffusion: 调用 Stable Diffusion 文本生成图片
 * 		- 根据图片生成文本 (CNN/ViT + GPT)
 * - 其他...
 */

// 所有消息
bot.on("message", function (msg) {
	if (msg.raw_message[0] == "/") {
		let cmd = msg.raw_message.split(" ")[0].slice(1)
		let content = msg.raw_message.split(" ").slice(1).join(" ")
		switch (cmd) {
			case "chatgpt": {
				async function getAnswer(question) {
					let answer = await bot.chatbot.ask(question);
					msg.reply(answer);
				}
				getAnswer(content);
				break
			}
			case "chatgpt-reset": {
				bot.chatbot.resetThread()
				msg.reply("已重置 ChatGPT 对话")
				break
			}
			case "translate": {
				// e.g. /translate en 你好
				let tgt = content.split(" ")[0]
				let text = content.split(" ").slice(1).join(" ")
				// bing-translate-api
				const { translate } = require('bing-translate-api');
				
				async function getAnswer(tgt, text) {
					let answer = await translate(text, null, tgt, true)
					msg.reply(answer.translation);
				}
				getAnswer(tgt, text);
				break
			}
			default: {
				// 群消息
				if (msg.message_type == "group") {
					msg.reply("未知指令")
				}
			}
		}
	}
})


// 私聊消息
bot.on("message.private", function (msg) {
	if (msg.raw_message[0] == "/") {
		let cmd = msg.raw_message.split(" ")[0].slice(1)
		let content = msg.raw_message.split(" ").slice(1).join(" ")
		switch (cmd) {
			case "anonymous": {
				// console.log("anonymous")
				// e.g. /anonymous 123456789 你好
				let group_id = content.split(" ")[0]
				let text = content.split(" ").slice(1).join(" ")
				console.log(group_id, text)
				async function send(group_id, text) {
					let group = await bot.pickGroup(group_id)
					group.sendMsg(text)
				}
				send(group_id, text)
			}
		}
	}
})


// 群聊消息
bot.on("message.group", function (msg) {
	if (msg.raw_message[0] == "/") {
		let cmd = msg.raw_message.split(" ")[0].slice(1)
		let content = msg.raw_message.split(" ").slice(1).join(" ")
		// TODO
	}
})
