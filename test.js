import fetch from 'node-fetch'
const time = performance.now()
fetch(`https://raw.githubusercontent.com/vuongpsht/token_list/refs/heads/main/formated.json?tick=${new Date().getTime()}`, { cache: "no-store" })
    .then((res) => {
        res.json().then(res2 => {
            console.log(res2);
            console.log('take ', performance.now() - time);
        })
    })