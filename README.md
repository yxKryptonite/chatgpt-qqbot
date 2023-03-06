# ChatGPT QQBot

一个基于 [icqq](https://github.com/icqqjs/icqq) 和 [ChatGPT](https://chat.openai.com/) 的 QQ 聊天机器人。

## Usage

0. 挂上非大陆香港地区的 🪜 
1. 安装 [Node.js](https://nodejs.org/) 14以上版本。
2. clone 到本地并安装依赖
    ```bash
    git clone git@github.com:yxKryptonite/chatgpt-qqbot.git
    cd chatgpt-qqbot
    sh setup.sh
    ```
3. 在创建的 `config.json` 中填入你的 QQ 账密、代理服务器端口和 OPENAI API KEY。
4. 执行 `npm run dev` 启动程序。
5. 向你的机器人发送 `/help` 可查看所有功能。

## Credits

<!-- > 如果你是初学者，建议通过下面的资料提升自己：  
[JavaScript语言基础](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript) / [现代JavaScript教程](https://zh.javascript.info)  
[Node.js入门教程](http://nodejs.cn/learn)  
[5分钟上手TypeScript](https://www.tslang.cn/docs/handbook/typescript-in-5-minutes.html)  
[优秀npm三方库集合](https://github.com/sindresorhus/awesome-nodejs)  -->

Thanks for [oicq template](https://github.com/takayama-lily/oicq-template), [icqq](https://github.com/icqqjs/icqq) and [chatgpt-api](https://github.com/transitive-bullshit/chatgpt-api).
