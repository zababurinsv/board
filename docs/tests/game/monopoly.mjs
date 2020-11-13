const wvs = 10 ** 8;
let object = {}
object.dapp = '3N8n4Lc8BMsPPyVHJXTivQWs7ER61bB7wQn'
object.testnodes = ' https://pool.testnet.wavesnodes.com'
object.client = []
object.client.alice = '3MvegjWphvbYgEgQmqJiJhYWXnqPNTpieVc'
describe('test monopoly suite', async function () {
    this.timeout(100000);

    before(async function () {
        console.log()
    });
    describe('Connecting Dapp', async function () {
        this.timeout(100000);

        it('accountData', async function () {
            return false
        })

        it('balanceDetails', async function () {
            return false
        })

        it('accountDataByKey', async function () {
            return false
        })
    })


    it('Launch game', async function () {

       // await monopoly({_:'launch'})
        return true
    })

    it('create player', async function () {
        return false
    })

    it('create ai', async function () {
        return false
    })

    it('сделать ход', async function () {
        return false
    })

    it('получение карточки', async function () {
        return false
    })

    it('переключение меню', async function () {
        return false
    })
})
