import colorlog from '/static/html/components/component_modules/colorLog/colorLog.mjs'
import queue from '/static/html/components/component_modules/queue/queue.mjs'
let object = {}
object['amount'] = 10 ** 8;
object['price'] = 10 ** 6;
object['fee'] = 0.003;

let Class = class Waves {
    constructor() {
        this.fix = this.fix.bind(this)
        this.buy = this.buy.bind(this)
        this.sell = this.sell.bind(this)
        this.denormalize = this.denormalize.bind(this)
        this.end = this.end.bind(this)
        document.addEventListener('typeScript-end-dex', this.end)
    }
    denormalize(price, priceAssetDecimals, amountAssetDecimals){
        let wvsPrice = 10 ** (priceAssetDecimals - amountAssetDecimals + 8)
        return price/wvsPrice
    }
    buy(pair,amount, obj,name){
        return new Promise( (resolve, reject)=>{
            let verify = true
            let count = 0
            let outAmount = undefined
            switch (name) {
                case 'wavesEuro':
                    while(verify){
                        if(count >= 10){
                            verify = false
                            obj['buy(wavesEuro)'] = undefined
                        }else{
                            let bidAmount = {}
                            let bidPrice = {}
                            let askAmount = {}
                            let askPrice = {}
                            if(pair['asks'][count] === undefined){
                                obj['buy(wavesEuro)'] = undefined
                                verify = false

                            }else{
                                if(pair['asks'][count] !== undefined){
                                    askAmount = pair['asks'][count]['amount']/(10**obj['decimals'][`${ pair['pair']['amountAsset'] }`])
                                    askPrice = this.denormalize(pair['asks'][count]['price'],obj['decimals'][`${ pair['pair']['priceAsset'] }`],obj['decimals'][`${ pair['pair']['amountAsset'] }`])
                                }
                                bidAmount = pair['bids'][count]['amount']/(10**obj['decimals'][`${ pair['pair']['priceAsset'] }`])
                                bidPrice = this.denormalize(pair['bids'][count]['price'],obj['decimals'][`${ pair['pair']['priceAsset'] }`],obj['decimals'][`${ pair['pair']['amountAsset'] }`])
                                outAmount = amount/askPrice -object['fee']
                                // console.log('result1 --->', amount*askPrice -object['fee'], '----->', count)
                                // console.log('result2 --->', amount*bidPrice -object['fee'], '----->', count)
                                // console.log('bidAmount --->', bidAmount,'askAmount --->',askAmount, 'count--->',count)
                                // console.log('----->', askAmount, outAmount)
                                if((bidAmount - amount) <= 0){
                                    console.warn('невозможно купить wavesEuro','askAmount:',askAmount,'outAmount:',outAmount, 'count:', count )
                                    count++
                                }else{
                                    obj['buy(wavesEuro)'] = amount*bidPrice -object['fee']
                                    obj['buy(wavesEuro)'] = this.fix(obj['buy(wavesEuro)'])
                                    verify = false
                                }

                            }
                        }
                    }
                    resolve(obj)
                    break
                case 'wavesUsd':
                    while(verify){
                        if(count >= 10){
                            verify = false
                            obj['buy(wavesUsd)'] = undefined
                        }else{
                            let bidAmount = {}
                            let bidPrice = {}
                            let askAmount = {}
                            let askPrice = {}
                            if(pair['asks'][count] === undefined){
                                obj['buy(wavesUsd)'] = undefined
                                verify = false

                            }else{
                                if(pair['bids'][count] !== undefined){
                                    bidAmount = pair['bids'][count]['amount']/(10**obj['decimals'][`${ pair['pair']['amountAsset'] }`])
                                    bidPrice = this.denormalize(pair['bids'][count]['price'],obj['decimals'][`${ pair['pair']['priceAsset'] }`],obj['decimals'][`${ pair['pair']['amountAsset'] }`])
                                }
                                askAmount = pair['asks'][count]['amount']/(10**obj['decimals'][`${ pair['pair']['amountAsset'] }`])
                                askPrice = this.denormalize(pair['asks'][count]['price'],obj['decimals'][`${ pair['pair']['priceAsset'] }`],obj['decimals'][`${ pair['pair']['amountAsset'] }`])
                                outAmount = amount/askPrice
                                // console.log('result1 --->', amount/askPrice -object['fee'], '----->', count)
                                // console.log('result2 --->', amount/bidPrice -object['fee'], '----->', count)
                                // console.log('askAmount --->', askAmount,'-','bidAmount --->',bidAmount, 'count--->',count)
                                if((askAmount - outAmount) <= 0){
                                    console.warn('невозможно купить wavesUsd','askAmount:',askAmount,'-', 'outAmount:', outAmount, 'count-->', count)
                                    count++
                                }else{
                                    obj['buy(wavesUsd)'] = amount/askPrice - object['fee']
                                    obj['buy(wavesUsd)'] = this.fix(obj['buy(wavesUsd)'])
                                    verify = false
                                }

                            }
                        }
                    }
                    resolve(obj)
                    break
                case 'usdWaves':
                    while(verify){
                        if(count >= 10){
                            verify = false
                            obj['buy(usdWaves)'] = undefined
                        }else{
                            let bidAmount = {}
                            let bidPrice = {}
                            let askAmount = {}
                            let askPrice = {}
                            if(pair['bids'][count] === undefined){
                                obj['buy(usdWaves)'] = undefined
                                verify = false
                            }else{
                                if(pair['asks'][count] !== undefined){
                                    askAmount = pair['asks'][count]['amount']/(10**obj['decimals'][`${ pair['pair']['amountAsset'] }`])
                                    askPrice = this.denormalize(pair['asks'][count]['price'],obj['decimals'][`${ pair['pair']['priceAsset'] }`],obj['decimals'][`${ pair['pair']['amountAsset'] }`])
                                }
                                
                                bidAmount = pair['bids'][count]['amount']/(10**obj['decimals'][`${ pair['pair']['amountAsset'] }`])
                                bidPrice = this.denormalize(pair['bids'][count]['price'],obj['decimals'][`${ pair['pair']['priceAsset'] }`],obj['decimals'][`${ pair['pair']['amountAsset'] }`])
                                
                                outAmount = amount*bidPrice
                                // console.log('result1 --->', amount*askPrice, '----->', count)
                                // console.log('result2 --->', amount*bidPrice, '----->', count)
                                // console.log('bidAmount --->', bidAmount,'askAmount --->',askAmount, 'count--->',count)

                                if((bidAmount - outAmount) <= 0){
                                    console.warn('невозможно купить')
                                    count++
                                }else{
                                    obj['buy(usdWaves)'] =(amount - object['fee'])*bidPrice
                                    obj['buy(usdWaves)'] = this.fix(obj['buy(usdWaves)'])
                                    verify = false
                                }
                            }
                        }
                    }
                    resolve(obj)
                    break
                case 'usdEuro':
                    while(verify){
                        if(count >= 10){
                            verify = false
                            obj['buy(usdEuro)'] = undefined
                        }else{
                            let bidAmount = {}
                            let bidPrice = {}
                            let askAmount = {}
                            let askPrice = {}
                            if(pair['bids'][count] === undefined){
                                obj['buy(usdEuro)'] = undefined
                                verify = false
                            }else{
                                if(pair['asks'][count] !== undefined){
                                askAmount = pair['asks'][count]['amount']/(10**obj['decimals'][`${ pair['pair']['amountAsset'] }`])
                                askPrice = this.denormalize(pair['asks'][count]['price'],obj['decimals'][`${ pair['pair']['priceAsset'] }`],obj['decimals'][`${ pair['pair']['amountAsset'] }`])
                                }
                                bidAmount = pair['bids'][count]['amount']/(10**obj['decimals'][`${ pair['pair']['priceAsset'] }`])
                                bidPrice = this.denormalize(pair['bids'][count]['price'],obj['decimals'][`${ pair['pair']['priceAsset'] }`],obj['decimals'][`${ pair['pair']['amountAsset'] }`])
                                
                                outAmount = amount*bidPrice
                                // console.log('result1 --->', amount*askPrice, '----->', count)
                                // console.log('result2 --->', amount*bidPrice, '----->', count)
                                // console.log('bidPrice --->', bidPrice,'askPrice --->',askPrice, 'count--->',count)

                                if((bidAmount - amount) <= 0){
                                    console.warn('невозможно купить')
                                    count++
                                }else{
                                    obj['buy(usdEuro)'] = amount*bidPrice - obj['fee']['usd']
                                    obj['buy(usdEuro)'] = this.fix(obj['buy(usdEuro)'])
                                    verify = false
                                }
                            }

                        }
                    }
                    resolve(obj)
                    break
                case 'euroUsd':
                    while(verify){
                        if(count >= 10){
                            verify = false
                            obj['buy(euroUsd)'] = undefined
                        }else{
                            let bidAmount = undefined
                            let bidPrice = undefined
                            let askAmount = undefined
                            let askPrice = undefined
                            if(pair['asks'][count] === undefined){
                                obj['buy(euroUsd)'] = undefined
                                verify = false
                            }else{
                                if(pair['bids'][count] !== undefined){
                                    bidAmount = pair['bids'][count]['amount']/(10**obj['decimals'][`${ pair['pair']['priceAsset'] }`])
                                    bidPrice = this.denormalize(pair['bids'][count]['price'],obj['decimals'][`${ pair['pair']['priceAsset'] }`],obj['decimals'][`${ pair['pair']['amountAsset'] }`])
    
                                }
                                    askAmount = pair['asks'][count]['amount']/(10**obj['decimals'][`${ pair['pair']['amountAsset'] }`])
                                    askPrice = this.denormalize(pair['asks'][count]['price'],obj['decimals'][`${ pair['pair']['priceAsset'] }`],obj['decimals'][`${ pair['pair']['amountAsset'] }`])

                                    outAmount = amount/askPrice
                                    // console.log('result1 --->', amount/askPrice, '----->', count)
                                    // console.log('result2 --->', amount/bidPrice, '----->', count)
                                    // console.log('askAmount --->', askAmount,'outAmount --->',outAmount, 'count--->',count)

                                // console.assert(false,  pair['asks'][count], askAmount)
                                if((askAmount - outAmount) <= 0){
                                    console.warn('невозможно купить euroUsd', 'askAmount:', askAmount,'outAmount:',outAmount )
                                    count++
                                }else{
                                    obj['buy(euroUsd)'] = amount/askPrice - obj['fee']['euro']
                                    obj['buy(euroUsd)'] = this.fix(obj['buy(euroUsd)'])
                                    verify = false
                                }
                            }

                        }
                    }
                    resolve(obj)
                    break
                case 'euroWaves':
                    while(verify){
                        if(count >= 10){
                            verify = false
                            obj['buy(euroWaves)'] = undefined
                        }else{
                            let bidAmount = undefined
                            let bidPrice = undefined
                            let askAmount = undefined
                            let askPrice = undefined
                            if(pair['asks'][count] === undefined){
                                obj['buy(euroWaves)'] = undefined
                                verify = false
                            }else{
                                if(pair['bids'][count] !== undefined){
                                    bidAmount = pair['bids'][count]['amount']/(10**obj['decimals'][`${ pair['pair']['priceAsset'] }`])
                                    bidPrice = this.denormalize(pair['bids'][count]['price'],obj['decimals'][`${ pair['pair']['priceAsset'] }`],obj['decimals'][`${ pair['pair']['amountAsset'] }`])
                                }
                                askAmount = pair['asks'][count]['amount']/(10**obj['decimals'][`${ pair['pair']['amountAsset'] }`])
                                askPrice = this.denormalize(pair['asks'][count]['price'],obj['decimals'][`${ pair['pair']['priceAsset'] }`],obj['decimals'][`${ pair['pair']['amountAsset'] }`])
                    
                                outAmount = amount/askPrice
                                // console.log('result1 --->', (amount)/askPrice, '----->', count)
                                // console.log('result2 --->', (amount)/bidPrice, '----->', count)
                                // console.log('askAmount --->', askAmount,'outAmount --->',outAmount, 'count--->',count)
                                // console.assert(false,  pair['asks'][count], askAmount)
                                if((askAmount - outAmount) <= 0){
                                    // console.warn('невозможно купить euroWaves', 'askAmount:', askAmount,'outAmount:',outAmount )
                                    count++
                                }else{
                                    obj['buy(euroWaves)'] = (amount-0.003)/askPrice
                                    obj['buy(euroWaves)'] = this.fix(obj['buy(euroWaves)'])
                                    verify = false
                                }
                            }
                
                        }
                    }
                    resolve(obj)
                    break
                default:
                    console.warn('имя не обрабатывается --->', name)
                    break

            }


            resolve(obj)
        })
    }
    sell(pair,amount, obj,name){
        return new Promise( (resolve, reject)=>{
            let verify = true
            let count = 0
            let outAmount = undefined
            switch (name) {
                case 'wavesUsd':
                    while(verify){
                        if(count >= 10){
                            verify = false
                            obj['sell(wavesUsd)'] = undefined
                        }else{
                            let bidAmount = {}
                            let bidPrice = {}
                            let askAmount = {}
                            let askPrice = {}
                            if(pair['bids'][count] === undefined){
                                verify = false
                                obj['sell(wavesUsd)'] = undefined
                            }else{
                                if(pair['asks'][count] !== undefined){
                                    askAmount = pair['asks'][count]['amount']/(10**obj['decimals'][`${ pair['pair']['amountAsset'] }`])
                                    askPrice = this.denormalize(pair['asks'][count]['price'],obj['decimals'][`${ pair['pair']['priceAsset'] }`],obj['decimals'][`${ pair['pair']['amountAsset'] }`])
                                }
                                bidAmount = pair['bids'][count]['amount']/(10**obj['decimals'][`${ pair['pair']['priceAsset'] }`])
                                bidPrice = this.denormalize(pair['bids'][count]['price'],obj['decimals'][`${ pair['pair']['priceAsset'] }`],obj['decimals'][`${ pair['pair']['amountAsset'] }`])
                           
                                outAmount = amount*bidPrice
                                // console.log('result1 --->',amount*bidPrice, '----->', count)
                                // console.log('result2 --->',amount*askPrice, '----->', count)
                                // console.log('bidAmount --->', bidAmount,'amount --->',amount, 'count--->',count)

                                if((bidAmount - amount) <= 0){
                                    console.warn('невозможно купить', 'bidAmount:',bidAmount,'- amount:',amount,'count:',count)
                                    count++
                                }else{
                                    obj['sell(wavesUsd)'] = (amount- object['fee'])*bidPrice
                                    obj['sell(wavesUsd)'] = this.fix(obj['sell(wavesUsd)'])
                                    verify = false
                                }

                            }
                        }
                    }
                    resolve(obj)
                    break
                case 'usdWaves':
                    while(verify){
                        if(count >= 10){
                            verify = false
                            obj['sell(wavesUsd)'] = undefined
                        }else{
                            let bidAmount = {}
                            let bidPrice = {}
                            let askAmount = {}
                            let askPrice = {}
                            if(pair['asks'][count] === undefined){
                                obj['sell(usdWaves)'] = undefined
                                verify = false
                            }else{
                                if(pair['bids'][count] !== undefined){
                                bidAmount = pair['bids'][count]['amount']/(10**obj['decimals'][`${ pair['pair']['priceAsset'] }`])
                                bidPrice = this.denormalize(pair['bids'][count]['price'],obj['decimals'][`${ pair['pair']['priceAsset'] }`],obj['decimals'][`${ pair['pair']['amountAsset'] }`])
                                }
                                askAmount = pair['asks'][count]['amount']/(10**obj['decimals'][`${ pair['pair']['amountAsset'] }`])
                                askPrice = this.denormalize(pair['asks'][count]['price'],obj['decimals'][`${ pair['pair']['priceAsset'] }`],obj['decimals'][`${ pair['pair']['amountAsset'] }`])
    
                                outAmount = amount/askPrice

                                // console.log('result1 --->', amount/askPrice - object['fee'], '----->', count)
                                // console.log('result2 --->', amount/bidPrice - object['fee'], '----->', count)
                                // console.log('bidPrice --->', bidPrice,'askPrice --->',askPrice, 'count--->',count)
                                // console.log(amount/bidPrice -object['fee'], 'bidAmount --->', bidAmount)
                                // console.log(amount/askPrice -object['fee'])
                                // console.log('$$$$$$$$$$$$', askAmount, outAmount)
                                if((askAmount - outAmount) <= 0){
                                    console.warn('невозможно купить')
                                    count++
                                }else{
                                    obj['sell(usdWaves)'] = amount/askPrice - object['fee']
                                    obj['sell(usdWaves)'] = this.fix(obj['sell(usdWaves)'])
                                    verify = false
                                }

                            }
                        }
                    }
                    resolve(obj)
                    break
                case'wavesEuro':
                    while(verify){
                        if(count >= 10){
                            verify = false
                            obj['sell(wavesEuro)'] = undefined
                        }else{
                            let bidAmount = {}
                            let bidPrice = {}
                            let askAmount = {}
                            let askPrice = {}
                            if(pair['bids'][count] === undefined){
                                obj['sell(wavesEuro)'] = undefined
                                verify = false
                            }else{
                                if(pair['asks'][count] !== undefined){
                                askAmount = pair['asks'][count]['amount']/(10**obj['decimals'][`${ pair['pair']['amountAsset'] }`])
                                askPrice = this.denormalize(pair['asks'][count]['price'],obj['decimals'][`${ pair['pair']['priceAsset'] }`],obj['decimals'][`${ pair['pair']['amountAsset'] }`])
                                }
                                bidAmount = pair['bids'][count]['amount']/(10**obj['decimals'][`${ pair['pair']['priceAsset'] }`])
                                bidPrice = this.denormalize(pair['bids'][count]['price'],obj['decimals'][`${ pair['pair']['priceAsset'] }`],obj['decimals'][`${ pair['pair']['amountAsset'] }`])
                                
                                outAmount = amount/bidPrice
                                // console.log('result1 --->', amount/askPrice, '----->', count)
                                // console.log('result2 --->', amount/bidPrice, '----->', count)
                                // console.log('askAmount --->', askAmount,'-','outAmount --->',outAmount,'bidAmount--->',bidAmount, 'count--->', count)
                                // console.log('bidAmount --->', bidAmount,'askAmount --->',askAmount, 'count--->',count)
                                if((bidAmount - outAmount) <= 0){
                                    // console.warn('wavesEuro невозможно купить','bidAmount:',bidAmount,'-', 'outAmount:',outAmount, 'count-->', count)
                                    count++
                                }else{
                                    obj['sell(wavesEuro)'] = (amount - object['fee'])/askPrice
                                    obj['sell(wavesEuro)'] = this.fix(obj['sell(wavesEuro)'])
                                    verify = false
                                }
                            }
                        }
                    }
                    resolve(obj)
                    break
                case'euroUsd':
                    while(verify){
                        if(count >= 10){
                            verify = false
                            obj['sell(euroUsd)'] = undefined
                        }else{
                            let bidAmount = {}
                            let bidPrice = {}
                            let askAmount = {}
                            let askPrice = {}
                            if(pair['bids'][count] === undefined){
                                obj['sell(euroUsd)'] = undefined
                                verify = false
                            }else{
                                if(pair['asks'][count] !== undefined){
                                    askAmount = pair['asks'][count]['amount']/(10**obj['decimals'][`${ pair['pair']['amountAsset'] }`])
                                    askPrice = this.denormalize(pair['asks'][count]['price'],obj['decimals'][`${ pair['pair']['priceAsset'] }`],obj['decimals'][`${ pair['pair']['amountAsset'] }`])
                                }
                                bidAmount = pair['bids'][count]['amount']/(10**obj['decimals'][`${ pair['pair']['amountAsset'] }`])
                                bidPrice = this.denormalize(pair['bids'][count]['price'],obj['decimals'][`${ pair['pair']['priceAsset'] }`],obj['decimals'][`${ pair['pair']['amountAsset'] }`])
                                
                                outAmount = amount*bidPrice
                                console.log('result1 --->', amount*askPrice, '----->', count)
                                console.log('result2 --->', amount*bidPrice, '----->', count, obj['fee']['euro'])
                                // console.log('askAmount --->', askAmount,'-','outAmount --->',outAmount,'bidAmount--->',bidAmount, 'count--->', count)
                                console.log('bidAmount --->', bidAmount,'askAmount --->',askAmount, 'count--->',count)
                                if((bidAmount - amount) <= 0){
                                    console.warn('невозможно купить euroUsd','bidAmount:',bidAmount,'-', 'outAmount:',outAmount, 'count-->', count)
                                    count++
                                }else{
                                    obj['sell(euroUsd)'] = (amount - obj['fee']['euro'])*bidPrice
                                    obj['sell(euroUsd)'] = this.fix(obj['sell(euroUsd)'])
                                    verify = false
                                }
                            }
                        }
                    }
                    resolve(obj)
                    break
                case'usdEuro':
                    while(verify){
                        if(count >= 10){
                            verify = false
                            obj['sell(usdEuro)'] = undefined
                        }else{
                            let bidAmount = {}
                            let bidPrice = {}
                            let askAmount = {}
                            let askPrice = {}
                            if(pair['asks'][count] === undefined){
                                obj['sell(usdEuro)'] = undefined
                                verify = false
                            }else{
                                if(pair['bids'][count] !== undefined){
                                    bidAmount = pair['bids'][count]['amount']/(10**obj['decimals'][`${ pair['pair']['amountAsset'] }`])
                                    bidPrice = this.denormalize(pair['bids'][count]['price'],obj['decimals'][`${ pair['pair']['priceAsset'] }`],obj['decimals'][`${ pair['pair']['amountAsset'] }`])
                                }
                                askAmount = pair['asks'][count]['amount']/(10**obj['decimals'][`${ pair['pair']['amountAsset'] }`])
                                askPrice = this.denormalize(pair['asks'][count]['price'],obj['decimals'][`${ pair['pair']['priceAsset'] }`],obj['decimals'][`${ pair['pair']['amountAsset'] }`])
    
                                
                                outAmount = amount/bidPrice
                                // console.log('result1 --->', amount/askPrice, '----->', count)
                                // console.log('result2 --->', amount/bidPrice, '----->', count)
                                // console.log('askAmount --->', askAmount,'-','outAmount --->',outAmount,'bidAmount--->',bidAmount, 'count--->', count)
                                // console.log('bidAmount --->', bidAmount,'askAmount --->',askAmount, 'count--->',count)
                                if((bidAmount - outAmount) <= 0){
                                    console.warn('невозможно купить usdEuro','bidAmount:',bidAmount,'-', 'outAmount:',outAmount, 'count-->', count)
                                    count++
                                }else{
                                    obj['sell(usdEuro)'] = (amount - obj['fee']['usd'])/askPrice
                                    obj['sell(usdEuro)'] = this.fix(obj['sell(usdEuro)'])
                                    verify = false
                                }
                            }
                        }
                    }
                    resolve(obj)
                    break
                default:
                    console.warn('имя не обрабатывается --->', name)
                    break

            }


            resolve(obj)
        })
    }
    fix(number){
        return parseFloat(number.toFixed(2))
    }
    end(event){
        queue(event['detail']['console'], '~end',event['detail']['color'],event['detail']['substrate'],event['detail']['relation']).then((data)=>{

            colorlog(true, 'stat','stat',data, 'статистика')

        })
    }
    get self() {
        return object
    }
}


export default Class