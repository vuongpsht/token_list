import tokens from './tokens.json' assert { type: "json" };

import fs from 'fs'
const time = performance.now()

const INCLUDES_CHAIN = [
    "Ethereum",
    "BNB Smart Chain (BEP20)",
    "Solana",
    "Polygon",
    "Base",
    "Polygon zkEVM",
    "Avalanche C-Chain",
    "Arbitrum",
    "Optimism"
]
const chainSymbolByName = {
    "Ethereum": "ETH",
    "Viction": "VIC",
    "BNB Smart Chain (BEP20)": "BNB",
    "Solana": "SOL",
    "HECO": "HT",
    "KAIA": "KAI",
    "Avalanche C-Chain": "AVAX",
    "Tezos": "XTZ",
    "Sora": "XOR",
    "Near": "NEAR",
    "RSK RBTC": "RBTC",
    "Velas": "VLX",
    "Osmosis": "OSMO",
    "EthereumPoW": "ETHW",
    "zkSync Era": "ZKS",
    "Starknet": "STRK",
    "Algorand": "ALGO",
    "Gnosis Chain": "GNO",
    "Terra Classic": "LUNC",
    "Waves": "WAVES",
    "Fantom": "FTM",
    "Polygon": "POL",
    "OKExChain": "OKT",
    "Celo": "CELO",
    "Bitcoin Cash": "BCH",
    "Conflux": "CFX",
    "Optimism": "OP",
    "KCC": "KCS",
    "Tron20": "TRX",
    "Harmony": "ONE",
    "Zilliqa": "ZIL",
    "Moonbeam": "GLMR",
    "Arbitrum": "ARB",
    "KardiaChain": "KAI",
    "Moonriver": "MOVR",
    "IoTex": "IOTX",
    "Telos": "TLOS",
    "Cronos": "CRO",
    "Boba Network": "BOBA",
    "Fusion Network": "FSN",
    "Hoo Smart Chain": "HOO",
    "Oasis Network": "ROSE",
    "Secret": "SCRT",
    "Aurora": "AURORA",
    "Metis Andromeda": "METIS",
    "Meter": "MTRG",
    "Fuse": "FUSE",
    "Syscoin": "SYS",
    "Milkomeda": "MILK",
    "Bitgert": "BRISE",
    "Astar": "ASTR",
    "Everscale": "EVER",
    "Cube network": "CUBE",
    "ThunderCore": "TT",
    "Dogechain (EVM)": "DC",
    "Canto": "CANTO",
    "Aptos": "APT",
    "XDC Network": "XDC",
    "Redlight Chain": "REDLC",
    "TON": "TON",
    "Sui Network": "SUI",
    "Injective": "INJ",
    "Core": "CORE",
    "Polygon zkEVM": "zkMATIC",
    "EOS EVM": "EOS",
    "PulseChain": "PLS",
    "Mantle": "MNT",
    "Neon EVM": "NEON",
    "Manta Pacific": "MANTA",
    "Scroll": "SCRL",
    "X Layer": "XL",
    "Sei v2": "SEI",
    "ONUS": "ONUS",
    "DuckChain": "DUCK",
    "XRP Ledger": "XRP",
    "Wanchain": "WAN",
    "MultiversX": "EGLD",
    "Ronin": "RON",
    "Kava": "KAVA",
    "Hedera Hashgraph": "HBAR",
    "Elastos": "ELA",
    "Evmos": "EVMOS",
    "Tomb Chain": "TOMB",
    "Wemix": "WEMIX",
    "SX Network": "SX",
    "Godwoken": "GOD",
    "Energi": "NRG",
    "Base": "BASE",
    "Shido Network": "SHIDO",
    "Unichain": "UNI",
    "Cardano": "ADA",
    "Hyperliquid": "HYD",
    "Linea": "LINA",
    "Ethereum Classic": "ETC",
    "ICP": "ICP",
    "BNB Beacon Chain (BEP2)": "BNB",
    "Cosmos": "ATOM",
    "World Chain Mainnet": "WRC",
    "Sei Network": "SEI",
    "Flow": "FLOW",
    "opBNB": "BNB",
    "Klaytn": "KLAY",
    "VeChain": "VET",
    "Ordinals - BRC20": "BRC",
    "Neo": "NEO",
    "Blast": "BLAST",
    "Mode": "MODE",
    "Taiko": "TKO",
    "Stacks": "STX",
    "Merlin": "MER",
    "EOS": "EOS",
    "Tron10": "TRX",
    "Runes": "RUNES",
    "Stellar": "XLM",
    "ONT": "ONT",
    "Kadena Chain": "KDA",
    "Sonic": "SONIC",
    "Haqq": "HAQQ",
    "Metal": "MTL",
    "MAP": "MAP",
    "CYBER": "CYBER",
    "IOTA EVM": "IOTA",
    "Chiliz Legacy Chain": "CHZ",
    "Chiliz Chain": "CHZ",
    "Shibarium": "SHIB",
    "WAX": "WAXP"
}

console.log(tokens[0].cmcId);
const reduces = tokens.reduce((acc, curr) => {
    if (!curr?.cmcId) {
        return acc
    }
    return [
        ...acc,
        ...curr['contractAddress'].map(e => ({
            ...e,
            name: curr.name,
            cmcId: curr.cmcId,
            symbol: curr.symbol,
            logo: curr.logo
        }))
    ]
}, [])
const reduces2 = reduces.reduce((acc, curr) => {
    if (!INCLUDES_CHAIN.includes(curr.platform.name)) {
        return acc
    }
    return {
        ...acc,
        [chainSymbolByName[curr.platform.name]]: {
            ...acc[chainSymbolByName[curr.platform.name]],
            [curr.contractAddress.toLowerCase()]: {
                contractAddress: curr.contractAddress,
                decimals: curr.decimals,
                name: curr.name,
                cmcId: curr.cmcId,
                symbol: curr.symbol,
                logo: curr.logo
            }
        }
    }
}, {})
// console.log('reduces', reduces, reduces.length);
// console.log('reduces2', reduces2,);
// console.log('reduces2 keys', JSON.stringify(Object.keys(reduces2), null, 2),);
fs.writeFileSync('./formated.json', JSON.stringify(reduces2))
// console.log(`take ${performance.now() - time}`)

console.log(tokens[0])