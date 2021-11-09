# TempleDAO EchoingWhispers 3-3 Auto Solver

Simple node script that will ensure you're doing your part to help fellow templars through. Take the `.env.example` and rename it to `.env` and populate with the following values:

```
COOKIE= Copy the Cookie value from https://echoingwhispers.link so you can auth against the API
ENCLAVE=Structure | Chaos | Logic | Order | Mystery -- pick one of these only, your own enclave
WAIT=30000 -- this is the time in MS between runs of the script, defaults to 30 seconds
WALLET=0xWALLET -- your wallet address, this is used to look up how many completions you've done
```

Simply run with either `node .` or `npm run start` and leave it to do its thing!

Tested with npm 6.14.15 and node v14.17.6 - your milage may vary ;) 