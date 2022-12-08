"use strict"
const { segment } = require("oicq")
const { bot } = require("./index")

/* 
 * 机器人指令
 * 机器人指令以 / 开头
 * 机器人指令格式：/指令 内容
 * 机器人指令示例：/chatgpt 你好
 * 计划实现的指令：
 * - /chatgpt: 调用 ChatGPT 进行聊天
 * - /hole: 爬取某条树洞
 * - /anonymous: 在某个群聊中匿名发言
 * - /translate: 翻译
 * - /weather: 查询天气
 * - /help: 显示帮助
 * - 其他...
 */

// 所有消息
bot.on("message", function (msg) {
	if (msg.raw_message[0] == "/") {
		let cmd = msg.raw_message.split(" ")[0].slice(1)
		let content = msg.raw_message.split(" ").slice(1).join(" ")
		// console.log("cmd: " + cmd)
		// console.log("content: " + content)
		switch (cmd) {
			case "chatgpt": {
				let command = "python3 chat.py " + content
				const { exec } = require("child_process")
				exec(command, (error, stdout, stderr) => {
					if (error) {
						console.log(`error: ${error.message}`)
						return
					}
					if (stderr) {
						console.log(`stderr: ${stderr}`)
						return
					}
					msg.reply(stdout)
				})
				break
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
