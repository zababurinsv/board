import Waves from '/static/html/components/component_modules/waves/waves.mjs'
import actions from '/static/html/components/component_modules/relation/waves.mjs'
import emoji from '/static/html/components/component_modules/emoji/emoji.mjs';
import events from '/static/html/components/component_modules/CustomEvent/index.mjs'
let waves =  Waves()
let testObject = {}
testObject.staticProperty = {}
testObject.staticProperty.wallet = []
testObject.staticProperty.bank ={}
testObject.staticProperty.bank ={
    '/':'3N8n4Lc8BMsPPyVHJXTivQWs7ER61bB7wQn',
    testnodes: 'https://testnodes.wavesnodes.com',
    seed:"zone tower six sound oblige horn false blue enroll flash pact all",
    clients: [],
}
testObject.staticProperty.bank.clients.push({
    '/':'client',
    name:'alice',
    wallets:{
        waves:{
            address:'3MsSxnyAwzfi8jsT2ua3Vt8m4BSvYs4YSpw',
            seed:"convince bubble claim case tube domain grief eyebrow decline witness bachelor mansion",
        }
    }
})

testObject.staticProperty.bank.clients.push({
    '/':'client',
    name:'bob',
    wallets:{
        waves:{
            address:'3MvegjWphvbYgEgQmqJiJhYWXnqPNTpieVc',
            seed:"kitten tooth maze behave purity dance differ stereo faint immune century peace"
        }
    }
})
testObject.staticProperty.bank.clients.push({
    '/':'client',
    name:'cooper',
    wallets:{
        waves:{
            address:"3Mr6qVieFjKZfE8Z2hxLSS1HBZCFMdB4zmy",
            seed:"discover swim emerge demise dwarf inmate utility cycle hospital pistol sugar emotion",
        }
    }
})

waves.then((waves)=>{
    const wvs = 10 ** 8;
    describe('Faucet for wallet(перевод средств на кошелёк)', async function () {
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
                                testObject.staticProperty.bank.dAppData = event.detail.dAppData
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
        it('Bank views(заполнение полей формы)', function () {
            return new Promise(async function (resolve, reject) {
                try{
                    testObject.staticProperty.bank.balance = await waves.balance(testObject.staticProperty.bank['/'])
                    document.addEventListener('bank-form-end',async (event)=>{
                        if(event.detail.data){
                            resolve(true)
                        }else{
                            reject(true)
                        }
                    })
                    customEvents('bank-form', testObject.staticProperty.bank)
                }catch (e) {
                    reject(e)
                }

            })
        })
        it('input wallet(ввод кошелька)', function () {
            return new Promise(async (resolve, reject)=>{
                try{
                testObject.staticProperty.bank.clients[0].balance = await waves.balance(testObject.staticProperty.bank.clients[0].wallets.waves.address)
                document.addEventListener('input-wallet-end',async (event)=>{
                    if(event.detail.data.status){
                        resolve(true)
                    }else{
                        reject( event.detail )
                    }

                })
                customEvents('input-wallet', testObject.staticProperty.bank.clients[0].balance)
            }catch (e) {
                reject(e)
            }
            })
        })
        it('Send money(перевод средств)', function () {
            return new Promise(async (resolve, reject)=>{
                actions['transfer'][0].substrate.recipient = '3MvegjWphvbYgEgQmqJiJhYWXnqPNTpieVc'
                waves.transfer(true, testObject.staticProperty.bank,'3', actions,'transfer')
                document.addEventListener('transfer-end',async (event)=>{
                    if(event.detail.data.status){
                        console.log(event.detail.data.tx)
                        resolve(true)
                    }else{
                        reject( event.detail )
                    }

                })
            })
        })
    })
})