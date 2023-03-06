"use strict"
import { createClient } from "icqq"
import config from "./config.json" assert {type: 'json'};
import proxy from "https-proxy-agent";
import nodeFetch from "node-fetch";

const account = config.Account
const bot = createClient()

import { ChatGPTAPI } from 'chatgpt'
const api = new ChatGPTAPI({
    apiKey: config.API_KEY,
    fetch: (url, options = {}) => {
        const defaultOptions = {
          agent: proxy(config.Proxy),
        };
  
        const mergedOptions = {
          ...defaultOptions,
          ...options,
        };
  
        return nodeFetch(url, mergedOptions);
    },
})

import { Dalle } from "node-dalle2"
const dalle = new Dalle({ apiKey: config.Dalle2Token });

bot.chatbot = api
bot.conversation = null
bot.dalle = dalle

bot.on('system.login.slider', (e) => {
    console.log('输入滑块地址获取的ticket后继续: ' + e.url)
    process.stdin.once('data', (data) => {
        bot.submitSlider(data.toString().trim())
    })
})
bot.on('system.login.qrcode', (e) => {
    console.log('扫码完成后回车继续:    ')
    process.stdin.once('data', () => {
        bot.login()
    })
})
bot.on('system.login.device', (e) => {
    console.log('请选择验证方式:(1：短信验证   其他：扫码验证)')
    process.stdin.once('data', (data) => {
        if (data.toString().trim() === '1') {
            bot.sendSmsCode()
            console.log('请输入手机收到的短信验证码:')
            process.stdin.once('data', (res) => {
                bot.submitSmsCode(res.toString().trim())
            })
        } else {
            console.log('扫码完成后回车继续：' + e.url)
            process.stdin.once('data', () => {
                bot.login()
            })
        }
    })
})
bot.login(account, config.Password)

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
