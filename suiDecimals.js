import tokens from './formated.json' assert { type: "json" };
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client'
import fs from 'fs'

const rpcUrl = getFullnodeUrl('mainnet')

export const AppSuiClient = new SuiClient({ url: rpcUrl })


async function getTokenInfo(token) {
    try {
        const tokenInfo = await AppSuiClient.getCoinMetadata({ coinType: token.contractAddress })
        console.log('tokenInfo', tokenInfo);

        if (!tokenInfo) {
            console.log(token);
            return token
        }

        return { ...token, decimals: tokenInfo.decimals }

    } catch (error) {
        return null
    }
}

async function main() {
    const suiList = {}
    const oldSUI = tokens.SUI
    const promises = await Promise.all(Object.values(oldSUI).map(e => getTokenInfo(e)))
    console.log('promises', promises);
    promises.filter(e => !!e).forEach(e => {
        suiList[e.contractAddress.toLowerCase()] = e
    })
    tokens.SUI = suiList
    fs.writeFileSync('./formated.json', JSON.stringify(tokens))
}
main()