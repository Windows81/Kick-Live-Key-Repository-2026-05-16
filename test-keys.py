import subprocess
import sys
import re

lines = {}
while True:
    try:
        text = input()
    except EOFError:
        break
    if not text:
        break
    match = re.search(
        r'sk_[A-Za-z0-9_-]+', text)
    if not match:
        print(text)  # Assuming that the CSV header is the only line not to match.
        continue
    token = match.group(0)
    lines[token] = text

for (token, text) in lines.items():
    output = subprocess.run(
        f'ffmpeg -f lavfi -i color=black -c copy -f flv rtmps://fa723fc1b171.global-contribute.live-video.net/app/{token}',
        stderr=subprocess.PIPE,
    ).stderr

    if b'Function not implemented' not in output:
        print('-', file=sys.stderr)
        continue

    print(text, file=sys.stderr)
    print(text)
