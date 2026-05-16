import subprocess
import sys

lines = {}
while True:
    try:
        text = input()
    except EOFError:
        break
    if not text:
        break
    (repo_nwo, link) = text.split(',', 2)
    if '/' not in repo_nwo:
        # Assuming that the CSV header is the only line not to match.
        print(text)
        continue
    lines[link] = text

for (link, text) in lines.items():
    output = subprocess.run(
        f'ffmpeg -f lavfi -i color=black -c copy -f flv rtmp://fa723fc1b171.global-contribute.live-video.net/app/{link}',
        stderr=subprocess.PIPE,
    ).stderr

    if b'Function not implemented' not in output:
        print('-', file=sys.stderr)
        continue

    print(text, file=sys.stderr)
    print(text)
