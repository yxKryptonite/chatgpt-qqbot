from chatgpt.api import ChatGPT
import sys, os
import json
msg = sys.argv[1]
with open("config.json", "r") as f:
    cfg = json.load(f)


with ChatGPT(session_token=cfg["SessionToken"]) as chat:
    response = chat.send_message(msg)
    print(response.content)