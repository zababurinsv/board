import Waves from '/static/html/components/component_modules/waves/waves.mjs'
let waves = Waves()
export default {
    get:(obj, payload, ...rest)=>{
            return  new Promise((resolve, reject) => {
                function out(obj) {
                    resolve(obj)
                }
                function err(obj) {
                    reject(obj)
                }
                switch (obj['type']) {
                    case 'wavesUsd':
                        (async (obj, payload, rest)=>{
                            let url = `https://matcher.waves.exchange/matcher/orderbook/${obj['pair']['amountAsset']}/${obj['pair']['priceAsset']}?depth=10`
                            await fetch(url, {
                                method: `GET`,
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }).then(function (response) {
                                if (!response.ok) {
                                    throw new Error('HTTP error, status = ' + response.status)
                                } else {
                                    return response.json()
                                }
                            })
                                .then(function (json) {
                                    out(json)
                                })
                                .catch(function (error) {
                                    console.assert(false, 'auth', error)
                                })
                        })(obj,payload,  rest)
                        break
                    case 'eurUsd':
                        (async (obj, payload, rest)=>{
                            let url = `https://matcher.waves.exchange/matcher/orderbook/${obj['pair']['amountAsset']}/${obj['pair']['priceAsset']}?depth=10`
                            await fetch(url, {
                                method: `GET`,
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }).then(function (response) {
                                if (!response.ok) {
                                    throw new Error('HTTP error, status = ' + response.status)
                                } else {
                                    return response.json()
                                }
                            })
                                .then(function (json) {
                                    out(json)
                                })
                                .catch(function (error) {
                                    console.assert(false, 'auth', error)
                                })


                        })(obj,payload,  rest)
                        break
                    case 'tidex':
                        (async (obj, payload, rest)=>{

                            let url = 'https://api.tidex.com/api/3/depth/waves_usdt'
                            await fetch(url, {
                                method: `GET`,
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }).then(function (response) {
                                if (!response.ok) {
                                    throw new Error('HTTP error, status = ' + response.status)
                                } else {
                                    return response.json()
                                }
                            })
                                .then(function (json) {
                                    out(json)
                                })
                                .catch(function (error) {
                                    console.assert(false, 'auth', error)
                                })


                        })(obj,payload,  rest)
                        break
                    case 'wavesEuro':
                        (async (obj, payload, rest)=>{

                            let url = `https://matcher.waves.exchange/matcher/orderbook/${obj['pair']['amountAsset']}/${obj['pair']['priceAsset']}?depth=10`
                           await fetch(url, {
                                method: `GET`,
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }).then(function (response) {
                                if (!response.ok) {
                                    throw new Error('HTTP error, status = ' + response.status)
                                } else {
                                    return response.json()
                                }
                            })
                            .then(function (json) {
                                  out(json)
                            })
                            .catch(function (error) {
                                    console.assert(false, 'auth', error)
                            })

                        })(obj,payload,  rest)
                        break
                    case 'tickSize':
                        (async (obj, payload, rest)=>{
                            let url = `https://matcher.waves.exchange/matcher/orderbook/${obj['pair']['amountAsset']}/${obj['pair']['priceAsset']}/info`
                            await fetch(url, {
                                method: `GET`,
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }).then(function (response) {
                                if (!response.ok) {
                                    throw new Error('HTTP error, status = ' + response.status)
                                } else {
                                    return response.json()
                                }
                            })
                            .then(function (json) {
                                obj['pair']['tickSize'] = json['matchingRules']['tickSize']
                                out(json)
                                })
                                .catch(function (error) {
                                    console.assert(false, 'auth', error)
                                })

                        })(obj,payload,  rest)
                        break
                    default:
                        console.assert(false, `новая функция ${obj['type']}`)
                        break
                }
        })
    }
}
