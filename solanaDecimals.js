import tokens from './formated.json' assert { type: "json" };
import { Connection, PublicKey } from '@solana/web3.js'
import fs from 'fs'
const connection = new Connection(
    '',
)

async function getTokenInfo(token) {
    if (token.contractAddress ===
        'So11111111111111111111111111111111111111111'
    ) {
        return { ...token, decimals: 9 }
    }
    const tokenParsedInfo = await connection.getParsedAccountInfo(new PublicKey(token.contractAddress))
    try {
        return {
            contractAddress: token.contractAddress,
            decimals: tokenParsedInfo.value.data.parsed.info.decimals,
            name: token.name,
            cmcId: token.cmcId,
            symbol: token.symbol,
            logo: token.logo,
        }

    } catch (error) {
        console.log(error, token);
    }
}

async function main() {
    const newSolList = {}

    const oldSol = tokens.SOL

    const promises = await Promise.all(Object.values(oldSol).map(e => getTokenInfo(e)))
    promises.forEach(e => {
        try {
            newSolList[e.contractAddress.toLowerCase()] = e
        } catch (error) {
            console.log(error, e);

        }
    })
    tokens.SOL = newSolList
    fs.writeFileSync('./formated.json', JSON.stringify(tokens))
}
main()