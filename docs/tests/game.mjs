import Waves from '/static/html/components/component_modules/waves/waves.mjs'
import actions from '/static/html/components/component_modules/relation/waves.mjs'
import emoji from '/static/html/components/component_modules/emoji/emoji.mjs';
import events from '/static/html/components/component_modules/CustomEvent/index.mjs'
let waves =  Waves()
let testObject = {}
testObject.staticProperty = {}
testObject.staticProperty.wallet = []
waves.then((waves)=>{
    const wvs = 10 ** 8;
    let object = {}
    object.dapp = '3N8n4Lc8BMsPPyVHJXTivQWs7ER61bB7wQn'
    object.testnodes = 'http://testnodes.wavesnodes.com'
    object.client = []
    object.client.alice = '3MvegjWphvbYgEgQmqJiJhYWXnqPNTpieVc'

    describe('Post office test suite', async function () {
        this.timeout(10000);

        before(async function () {
            console.log('emoji', emoji('all'))
            console.thinking('(((~~~))) waves (((~~~)))',emoji('thinking'), waves)
        });

        it('Connect bank(подключение банка)', function () {
            return new Promise(function (resolve, reject) {
                waves.bank(true, `${emoji('thinking')} какие то свойства`,'3', actions,'bank')
                document.addEventListener('connected-bank',async (event)=>{
                    switch (event['detail']['/']) {
                        case 'bank':
                            if (event.detail.dAppData) {
                                console.log("dApp Account data:");
                                console.log(event.detail.dAppData);
                            }
                            break
                        default:
                            console.warn(`${emoji('thinking')}результат не обрабатывается${emoji('thinking')}`, event['detail']['/'], event['detail'])
                            break
                    }
                    resolve(event.detail.dAppData)
                })
            })
        })

        it('Create ID(создание ID)', function () {
            return new Promise(async (resolve, reject) => {
                // let gameObject = await customEvents(true,'получить параметры игры','3', {
                //     'gameName':[
                //         {
                //             '/':'waves',
                //             get:'name',
                //         },
                //         {
                //             '/':'waves',
                //             description:'it is test token for monopoly',
                //         }
                //     ]
                // },'gameName')
                //
                // listener(true, 'ждём ответа от запроса', '3', '', 'create-nft').then(async (nft)=>{
                //     await waves.waitForTx(nft.data.id,nft.apiBase)
                //     console.log(`${emoji('beer')} game.mjs`,nft.data)
                //     await customEvents(true, 'отобразить данные на странице','3',JSON.stringify(nft.data,null,4),'nft-game-params')
                    resolve(true)
                // })
                // await waves.nft(true, callback,'3', {'create-nft':[
                //         {
                //         '/':'create-nft',
                //          name:gameObject.data,
                //          description:'it is test token for monopoly',
                //          dapp:'zone tower six sound oblige horn false blue enroll flash pact all',
                //          proofs:[
                //              'convince bubble claim case tube domain grief eyebrow decline witness bachelor mansion',
                //              'kitten tooth maze behave purity dance differ stereo faint immune century peace',
                //              'discover swim emerge demise dwarf inmate utility cycle hospital pistol sugar emotion'
                //          ],
                //          node:'http://testnodes.wavesnodes.com'
                //         }
                //     ]},'create-nft')

                resolve(true)
            })
        })
        it('get token(получить токены)', function () {
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
        })
    })
})