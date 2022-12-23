# ChatGPT QQBot

一个基于 [oicq](https://github.com/takayama-lily/oicq) 和 [ChatGPT](https://chat.openai.com/) 的 QQ 聊天机器人。

## Usage

1. 安装 [Node.js](https://nodejs.org/) 14以上版本  
2. clone 到本地并安装依赖
    ```bash
    git clone git@github.com:yxKryptonite/chatgpt-qqbot.git
    cd chatgpt-qqbot
    sh setup.sh
    ```
3. 在创建的 `config.json` 中填入你的 QQ 号、OpenAI 账号和密码。如需使用 `DALL·E 2` 服务，则还需要 [DALL·E 2 bearer token](https://github.com/1998code/DALLE-2-App/issues/13) 。形如：

    ```json
    {
        "Account": 1234567890, // QQ号
        "Email": "12345678@gmail.com", // OpenAI账号
        "Password": "12345678", // OpenAI密码
        "Dalle2Token": "example_dalle2_token" // DALL·E 2 bearer token
    }
    ```

4. 执行 `npm run dev` 启动程序后，需要进行扫码登录 QQ，然后在弹出的浏览器中进行人机验证。注意人机验证时，最好使用美国地区的 VPN。
5. 当弹出的浏览器进入 ChatGPT 页面时，就大功告成了！向你的机器人发送 `/help` 可查看所有功能。

## Credits

<!-- > 如果你是初学者，建议通过下面的资料提升自己：  
[JavaScript语言基础](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript) / [现代JavaScript教程](https://zh.javascript.info)  
[Node.js入门教程](http://nodejs.cn/learn)  
[5分钟上手TypeScript](https://www.tslang.cn/docs/handbook/typescript-in-5-minutes.html)  
[优秀npm三方库集合](https://github.com/sindresorhus/awesome-nodejs)  -->

Thanks for [oicq template](https://github.com/takayama-lily/oicq-template) and [chatgpt-api](https://github.com/transitive-bullshit/chatgpt-api).
