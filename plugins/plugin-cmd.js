"use strict"
import { segment } from "oicq"
import { bot } from "../index.js"
import { translate } from 'bing-translate-api';

/* 
 * 机器人指令
 * 机器人指令以 / 开头
 * 机器人指令格式：/指令 内容
 * 机器人指令示例：/chatgpt 你好
 * * 已实现的指令：
 * - /chatgpt: 调用 ChatGPT 进行聊天 (可用 py 和 js 接口) e.g. /chatgpt 你好
 * - /chatgpt-reset: 重置 ChatGPT 对话 e.g. /chatgpt-reset
 * - /anonymous: 私聊 Bot 实现在群聊中匿名发言 e.g. /anonymous 1234567890 这是一条匿名消息
 * - /translate: 自动识别源语言，翻译到指定语言 e.g. /translate en 你好
 * - /draw: 调用 DALL·E 2 文本生成图片 e.g. /draw A teddy bear playing soccer at Time Square
 * - /help: 显示帮助信息
 * - /quit: 退出
 * 
 * * 计划实现的指令：
 * - 多模态信息，如
 * 		- /image: 发送图片
 * 		- /video: 发送视频
 * 		- 根据图片生成文本 (CNN/ViT + GPT)
 * - 其他...
 */

function cmd() {
	// 所有消息
	bot.on("message", function (msg) {
		if (msg.raw_message[0] == "/") {
			let cmd = msg.raw_message.split(" ")[0].slice(1)
			let content = msg.raw_message.split(" ").slice(1).join(" ")
			switch (cmd) {
				case "chatgpt": {
					if (content == "") {
						msg.reply("请按照指定格式输入指令", true)
						break
					}
					async function getAnswer(question) {
						let answer;
						try {
							if (bot.conversation == null) {
								answer = await bot.chatbot.sendMessage(question);
							}
							else {
								answer = await bot.chatbot.sendMessage(question, {
									conversationId: bot.conversation.conversationId,
  									parentMessageId: bot.conversation.messageId
								});
							}
							bot.conversation = answer;
							msg.reply(answer.response, true);
						} catch (e) {
							msg.reply("服务出现问题，请稍后再试", true);
							console.error(e);
						}
					}
					getAnswer(content);
					break
				}
				case "chatgpt-reset": {
					bot.conversation = null;
					msg.reply("已重置 ChatGPT 对话", true)
					break
				}
				case "translate": {
					if (content.split(" ").length < 2) {
						msg.reply("请按照指定格式输入指令", true)
						break
					}
					// e.g. /translate en 你好
					let tgt = content.split(" ")[0]
					let text = content.split(" ").slice(1).join(" ")
					// bing-translate-api
					
					async function getTranslation(tgt, text) {
						let answer = await translate(text, null, tgt, true)
						msg.reply(answer.translation, true);
					}
					getTranslation(tgt, text);
					break
				}
				case "help": {
					let res = "我是一个 QQ 机器人，你可以使用以下的命令来与我交互：\n\n"
							+ "👉 /chatgpt: 调用 ChatGPT 进行聊天 e.g. /chatgpt 你好\n"
							+ "👉 /chatgpt-reset: 重置 ChatGPT 对话 e.g. /chatgpt-reset\n"
							+ "👉 /anonymous: 私聊 Bot 实现在群聊中匿名发言 e.g. /anonymous 1234567890 这是一条匿名消息\n"
							+ "👉 /translate: 自动识别源语言，翻译到指定语言 e.g. /translate en 你好\n"
							+ "👉 /draw: 调用 DALL·E 2 文本生成图片 e.g. /draw A teddy bear playing soccer at Time Square\n"
							+ "👉 /help: 显示帮助\n"
							+ "👉 /quit: 退出\n\n"
							+ "更多功能正在开发中...敬请期待！"
					msg.reply(res)
					break
				}
				case "quit": {
					// 退出
					async function Quit() {
						await msg.reply("已退出")
						await bot.logout()
					}
					Quit()
					break
				}
				case "draw": {
					if (content == "") {
						msg.reply("请输入文本", true)
						break
					}
					// DALL·E 2 文本生成图片
					const getDalle2Images = async (caption) => {
						// Call the Dall-e 2 API
						let response = null;
						try {
							response = await bot.dalle.generate(caption); 
						} catch (e) {
							msg.reply("服务出现问题，请稍后再试", true)
							console.error(e)
							return null
						}

						// If Dall-e 2 couldn't generate images from the given caption
						if (!response) {
							console.error(
								"Dall-e 2 couldn't generate images based upon the given caption."
							);
							return null;
						}

						// Get the image array from the response object
						const { data } = response;

						// Return the image array
						return data;
					};
					async function diffusion() {
						const data = await getDalle2Images(content);
						if (data) {
							// console.log(data[0].generation.image_path)
							msg.reply(segment.image(data[0].generation.image_path))
						}
					}
					diffusion()
					break
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
}

export { cmd }