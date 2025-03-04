import fetch from 'node-fetch'
const time = performance.now()
fetch(`https://raw.githubusercontent.com/vuongpsht/token_list/refs/heads/main/formated.json?tick=${new Date().getTime()}`, { cache: "no-store" })
    .then((res) => {
        res.json().then(res2 => {
            const keys = Object.keys(res2)
            keys.map(e => {
                console.log(e, Object.keys(res2[e]).length);
            })

            console.log('take ', performance.now() - time);
        })
    })