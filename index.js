
const axios = require('axios');
require('dotenv').config()

const cookie = process.env.COOKIE
const enclave = process.env.ENCLAVE
let secret = 'hacking'
let logicFlipped = false
let chaosFlipped = false
let structureFlipped = false
let mysteryFlipped = false
let orderFlipped = false

function checkFlipped(count, limit, flipped, name) { 
    if (count >= limit) logicFlipped = true 
    else console.log(`Waiting on ${limit - count} ${name}`)
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

async function run() {
    while (true) {
        axios.get(`https://echoingwhispers.link/api/oc/quest/${process.env.WALLET}`, {
            headers: {
                'cookie' : cookie
            }
        }).then(res => {
            console.log(`Completed: ${res.data.completed}`)
        })
        
        axios.get("https://echoingwhispers.link/api/oc/verify/enclave-puzzle", {
            headers: {
                'cookie' : cookie
            }
        }).then(res => {
            console.log('Puzzle update')
            const data = res.data;
            secret = Object.keys(data.praySecrets).find(k => {
                return data.praySecrets[k] === enclave
            })
            
            let {Logic: logicCount, Chaos: chaosCount, Structure: structureCount, Mystery: mysteryCount, Order: orderCount} = data.activeTemplarsPerEnclave
            let {Logic: logicLimit, Chaos: chaosLimit, Structure: structureLimit, Mystery: mysteryLimit, Order: orderLimit} = data.templarsPerEnclaveThreshold
            
            checkFlipped(logicCount, logicLimit, logicFlipped, 'logic')
            checkFlipped(chaosCount, chaosLimit, chaosFlipped, 'chaos')
            checkFlipped(structureCount, structureLimit, structureFlipped, 'structure')
            checkFlipped(mysteryCount, mysteryLimit, mysteryFlipped, 'mystery')
            checkFlipped(orderCount, orderLimit, orderFlipped, 'order')
        
            if (data.canPray === true) {
                console.log('flip it!')
                const payload = `{"pray": "${secret}"}`
                axios.post("https://echoingwhispers.link/api/oc/verify/enclave-puzzle", payload, {
                    headers: {
                        "content-type" : "text/plain;charset=UTF-8",
                        "cookie" : cookie
                    }
                }).then(res => {
                    console.log(res.status);
                })
            } else if (data.currentPuzzleCompleted === true) {
                console.log('completing puzzle')
                axios.post("https://echoingwhispers.link/api/oc/quest/complete", {}, {
                    headers : {
                        "cookie" : cookie
                    }
                }).then(res => {
                    console.log(res.status)
                })
            }
        })   
        await delay(process.env.WAIT);
    }
}

run()
