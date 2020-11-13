import Waves from '/static/html/components/component_modules/waves/waves.mjs'
import actions from '/static/html/components/component_modules/relation/waves.mjs'
import emoji from '/static/html/components/component_modules/emoji/emoji.mjs';
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

        it('Create wallet(создание кошелька)', function () {
            return new Promise(function (resolve, reject) {
                waves.wallet(true, `${emoji('thinking')} какие то свойства`, '3', actions, 'wallet')
                document.addEventListener('created-wallet', async (event) => {
                    switch (event['detail']['/']) {
                        case 'wallet':
                            testObject.staticProperty.wallet = event.detail
                            console.log(`${emoji(`dancer`)}`, event.detail, `${emoji(`dancer`)}`)
                            break
                        default:
                            console.warn(`${emoji('thinking')}результат не обрабатывается${emoji('thinking')}`, event['detail']['/'], event['detail'])
                            break
                    }
                    resolve(event.detail.wallet)
                })
            })
        })
        describe('Save wallet', async function () {

            it('Send wallet(сохранение кошелька)', function () {
                return new Promise(async (resolve, reject)=>{
                    let scrollWidth = Math.max(
                        document.body.scrollWidth, document.documentElement.scrollWidth,
                        document.body.offsetWidth, document.documentElement.offsetWidth,
                        document.body.clientWidth, document.documentElement.clientWidth
                    );
                    window.open(`http://localhost:5401`,'github',`height=${scrollWidth/3},width=${scrollWidth/1.5},scrollbars=no,toolbar=no,menubar=no,status=no,resizable=no,scrollbars=no,location=no,top=${scrollWidth/2-((scrollWidth/1.5)/2)},left=${scrollWidth/2-((scrollWidth/1.8)/2)}`);
                    window.addEventListener("message", (event) => {
                        console.log('connect', event.data)
                        if(event.data.file === 'true'){
                            resolve(true)
                        }else{
                            event.source.postMessage({key:'value'},'http://localhost:5401')
                        }
                    });

                })
            })

            it('Faucet for wallet(перевод средств на кошелёк)', function () {
                return new Promise(async (resolve, reject)=>{
                    waves.faucet(true, `${emoji('thinking')} какие то свойства`, '3', actions, 'faucet')




                })
            })

        })
    })
})