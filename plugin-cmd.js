"use strict"
const { segment } = require("oicq")
const { bot } = require("./index")

// 私聊
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


// 群聊
// bot.on("message.group", function (msg) {
// 	if (msg.raw_message[0] == "/") {
// 		let cmd = msg.raw_message.split(" ")[0].slice(1)
// 		let content = msg.raw_message.split(" ").slice(1).join(" ")
// 		// console.log("cmd: " + cmd)
// 		// console.log("content: " + content)
// 		switch (cmd) {
// 			case "chatgpt": {
// 				let command = "python3 chat.py " + content
// 				const { exec } = require("child_process")
// 				exec(command, (error, stdout, stderr) => {
// 					if (error) {
// 						console.log(`error: ${error.message}`)
// 						return
// 					}
// 					if (stderr) {
// 						console.log(`stderr: ${stderr}`)
// 						return
// 					}
// 					msg.reply(stdout)
// 				})
// 				break
// 			}
// 			default: {
// 				msg.reply("未知指令")
// 			}
// 		}
// 	}
// })
