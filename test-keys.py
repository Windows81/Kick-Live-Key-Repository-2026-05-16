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
    if '/' not in link:
        # Assuming that the CSV header is the only line not to match.
        print(text)
        continue
    lines[link] = text

for (link, text) in lines.items():
    try:
        output = subprocess.run(
            f'ffmpeg -f lavfi -i color=black -c copy -f flv {link}',
            stderr=subprocess.PIPE,
            timeout=3,
        ).stderr
    except subprocess.TimeoutExpired:
        continue

    if b'Function not implemented' not in output:
        print('-', file=sys.stderr)
        continue

    print(text, file=sys.stderr)
    print(text)
