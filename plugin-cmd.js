"use strict"
const { segment } = require("oicq")
const { bot } = require("./index")

/* 
 * 机器人指令
 * 机器人指令以 / 开头
 * 机器人指令格式：/指令 内容
 * 机器人指令示例：/chatgpt 你好
 * * 已实现的指令：
 * - /chatgpt: 调用 ChatGPT 进行聊天 (可用 py 和 js 接口)
 * - /chatgpt-reset: 重置 ChatGPT 对话
 * 
 * * 计划实现的指令：
 * - /anonymous: 在某个群聊中匿名发言
 * - /translate: 翻译
 * - /weather: 查询天气
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
			}
			case "translate": {
				let src_lgg = content.split(" ")[0]
				let dst_lgg = content.split(" ")[1]
				let text = content.split(" ").slice(2).join(" ")
				// google-translate-api
				
			}
			default: {
				msg.reply("未知指令")
			}
		}
	}
})


// 私聊消息
bot.on("message.private", function (msg) {
	if (msg.raw_message[0] == "/") {
		let cmd = msg.raw_message.split(" ")[0].slice(1)
		let content = msg.raw_message.split(" ").slice(1).join(" ")
		// TODO
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
