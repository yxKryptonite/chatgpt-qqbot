from chatgpt.api import ChatGPT
import sys, os
import yaml
msg = sys.argv[1]
with open("config.yml", "r") as f:
    cfg = yaml.safe_load(f)


with ChatGPT(session_token=cfg["session_token"]) as chat:
    response = chat.send_message(msg)
    print(response.content)