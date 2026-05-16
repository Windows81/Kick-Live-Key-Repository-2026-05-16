# Kick Live Key Repository 2026-05-16

I've amassed a collection of publicly available Kick livestream keys.

**None of them work so far.**

## How to Reproduce
Navigate to GitHub, then use your browser's DevTools to run [`get-test-keys.js`](./get-test-keys.js).

Then, once `"Finished!"` is printed, copy the result.

```js
copy('repo_nwo,stream_key\n'+Array.from(Object.keys(resultDump)).join('\n'))
```
