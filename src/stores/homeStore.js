import { create } from 'zustand'
import axios from 'axios'
import debounce from '../helpers/debounce'

const homeStore = create((set) => ({
    coins: [],
    trending: [],
    query: '',
    setQuery: (e) => {
        set({query: e.target.value})
        homeStore.getState().searchCoins()
    },
    searchCoins: debounce( async () => {
        const {query, trending} = homeStore.getState() 
        if (query.length > 2) {
            const res = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`)
            console.log(res)
            const coins = res.data.coins.map(coin => {
                return {
                    id: coin.id,
                    name: coin.name,
                    image: coin.large,
                    symbol: coin.symbol
                }
            })
            console.log(coins.symbol)
            set({coins: coins.slice(0, 10)})
        } else {
            set({coins: []})
        }
    }, 500),

    fetchCoins: async () => {
        const [res, btcRes] = await Promise.all([
            axios.get("https://api.coingecko.com/api/v3/search/trending"),
            axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"),
        ])

        const btcPrice = btcRes.data.bitcoin.usd;

        const trendingCoins = res.data.coins.map(coin => {
            return {
                name: coin.item.name,
                image: coin.item.large,
                id: coin.item.id,
                priceBTC: (coin.item.price_btc).toFixed(10),
                priceUSD: (coin.item.price_btc * btcPrice).toFixed(10)
            }
        })

        console.log(trendingCoins)
        set({trendingCoins})
    }
}))

export default homeStore;