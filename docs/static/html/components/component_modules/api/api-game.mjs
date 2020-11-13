import Waves from '/static/html/components/component_modules/waves/waves.mjs'
import actions from '/static/html/components/component_modules/relation/waves.mjs'
import emoji from '/static/html/components/component_modules/emoji/emoji.mjs';
import events from '/static/html/components/component_modules/CustomEvent/index.mjs'
let waves =  Waves()
export default {
    get:{
        tokens:(address='', limit=12, after= undefined)=>{
            return new Promise(async (resolve, reject) => {
                // console.assert(false,await waves)
                let nft = await (await waves).getNft(address, limit, after)
                let items = []
                for(let item of nft){
                    items.push({
                        assetId: item.assetId,
                        name:item.name,
                        description:item.description,
                        timestamp:item.timestamp,
                        sender:item.sender,
                        proofs:JSON.stringify(item.proofs)
                    })
                }
                resolve(items)
            })
        },
        token:(address='', limit=12, after='', search='')=>{
            return new Promise(async (resolve, reject) => {
                let nft = await waves.getNft('3N8n4Lc8BMsPPyVHJXTivQWs7ER61bB7wQn', 12)
                let object = {}
                for(let key in nft){
                    try{

                        let item = JSON.parse(nft[key].description)
                        console.log()
                        if(item.name === 'Olga Gavrilova'){
                            object = nft[key]
                            break
                        }

                    }catch (e) {

                    }
                }
                await customEvents(true, 'отобразить данные на странице','3',object,'objectPlayer')
                resolve(true)
            })
        }
    }
}