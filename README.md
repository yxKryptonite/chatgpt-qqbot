# ChatGPT QQBot

## Usage

1. 安装 [Node.js](https://nodejs.org/) 14以上版本  
2. clone 到本地并安装依赖
    ```bash
    npm i
    pip install -r requirements.txt
    ```
3. 创建 `config.json` ，填入你的 QQ 号和 session token 。形如：

    ```json
    {
        "Account": 1234567890,
        "SessionToken": "example_session_token"
    }
    ```

    关于 session token 的获取，详见[此处](https://github.com/mbroton/chatgpt-api#how-to-acquire-session-key)。

4. 执行 `npm run dev` 启动程序

**注意**：该 Bot 无法长时间运行

----

> 如果你是初学者，建议通过下面的资料提升自己：  
[JavaScript语言基础](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript) / [现代JavaScript教程](https://zh.javascript.info)  
[Node.js入门教程](http://nodejs.cn/learn)  
[5分钟上手TypeScript](https://www.tslang.cn/docs/handbook/typescript-in-5-minutes.html)  
[优秀npm三方库集合](https://github.com/sindresorhus/awesome-nodejs) 

Thanks for the [oicq template](https://github.com/takayama-lily/oicq-template) and [@rawandahmad698](https://github.com/rawandahmad698) for the original [ChatGPT python dependency](https://github.com/rawandahmad698/PyChatGPT).
