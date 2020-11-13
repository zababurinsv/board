import conf from '/static/html/components/component_modules/matcher/matcher/this/database/config/index.mjs'
import loader from '/static/html/components/component_modules/loader/loader.mjs'
function server(obj, path,node, method) {
    return new Promise(async (resolve, reject) => {
        let axios = await loader('https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js','axios')
            function setData( data) {
                return new Promise((resolve, reject) => {
                    let formData  = new FormData();
                    for(let name in data) {
                        formData.append(name, data[name]);
                    }
                    resolve(formData)
                })
            }
            switch (method) {
                case 'GET':
                    // console.log('~~~~~~~~~~~~GET~~~~~~~~~~~~~~~~',`${node}${path}`)
                    axios.get(`${node}${path}`)
                        .then(function (response) {
                            obj = {}
                            obj['get_n'] = []
                            obj['mongo'] = response['data']
                            obj['get_n'].push(response['data'])
                            resolve(obj)
                        })
                        .catch(function (error) {
                            // handle error
                            console.log(error);
                        })
                        .finally(function () {
                            // always executed
                        });

                    break
                case 'POST':
                    console.log('~~~~~~~~~~~~POST~~~~~~~~~~~~~~~~',`${node}${path}`)
                    let formData = await setData(obj)
                    fetch(`${node}${path}`, {
                        method: method,
                        body: formData
                    }).then(function (response) {
                        if (!response.ok) {
                            throw new Error('HTTP error, status = ' + response.status)
                        } else {
                            return response.json()
                        }
                    })
                        .then(function (json) {
                            obj = []
                            obj['get_n'] = []
                            obj['mongo'] = json
                            obj['get_n'].push(json)
                            resolve(obj)
                        })
                        .catch(function (error) {
                            console.assert(false, 'webDav', error, `${node}${path}`)
                        })
                    break
                case 'PUT':
                    console.log('~~~~~~~~~~~~PUT~~~~~~~~~~~~~~~~',`${node}${path}`)
                    let update = await setData(obj)
                    // console.assert(false, obj, `${node}${path}`)
                    fetch(`${node}${path}`, {
                        method: method,
                        body: update
                    }).then(function (response) {
                        if (!response.ok) {
                            throw new Error('HTTP error, status = ' + response.status)
                        } else {
                            return response.json()
                        }
                    })
                        .then(function (json) {
                            obj = {}
                            obj['get_n'] = []
                            obj['mongo'] = json
                            obj['get_n'].push(json)
                            resolve(obj)
                        })
                        .catch(function (error) {
                            console.assert(false, 'mongoDb', error)
                        })
                    break
                case 'DELETE':
                    console.log('~~~~~~~~~~~~DELETE~~~~~~~~~~~~~~~~',`${node}${path}`)
                    fetch(`${node}${path}`, {
                        method: method,
                        headers: {
                            'mode': 'no-cors'
                        },
                    }).then(function (response) {
                        if (!response.ok) {
                            throw new Error('HTTP error, status = ' + response.status)
                        } else {
                            return response.json()
                        }
                    })
                        .then(function (json) {

                            resolve({delete:'ok'})
                        })
                        .catch(function (error) {
                            console.error('ошибка в запросе mongo', error)
                            resolve({mongo:'null'})
                        })
                    break
                default:
                    console.warn(`необрабатываемый тип запроса`, obj[props])
                    break
            }
    })
}

export default  (obj, func, ...args)=>{
    return new Promise( function (resolve, reject) {
        let out = (obj) => {
            // console.log('~~~ out  ~~~')
            resolve(obj)
        }
        let err = (error) => {
            console.log('~~~ err  ~~~', error)
            reject(error)
        }
        switch (func) {
            case 'set':
                (async (obj, props,data) => {
                    try {
                        // console.log(`app(${func}[(${obj['input']})${obj[props]}]property)`)
                        switch (obj[props]) {
                            case 'auction':
                                (async (obj, props,data) => {
                                    try {
                                        if(!obj['path']){
                                            console.assert(false, 'Должно бытьсвойтсво obj["path""]')
                                        }
                                        let object = await server(obj['data'], obj['path'], conf['account']['web'], 'POST')
                                        out(object)
                                    } catch (e) { err(e) }
                                })(obj, args[0], args[1], args[2], args[3])
                                break
                            case 'winner':
                                if(!obj['path']){
                                    console.assert(false, 'Должно бытьсвойтсво obj["path""]')
                                }
                                let account = await server(obj['data'],obj['path'], conf['account']['web'], 'POST')
                                out(account)
                                break
                            default:
                                err(`new type [(${func})${obj[props]}]`)
                                break
                        }
                    } catch (e) { err(e) }
                })(obj, args[0], args[1], args[2], args[3])
                break
            case 'post':
                    (async (obj, props,data) => {
                        try {
                            // console.log(`app(${func}[(${obj['input']})${obj[props]}]property)`)
                            switch (obj[props]) {
                                case 'account':
                                    (async (obj, props,data) => {
                                        try {
                                            out(obj)
                                        } catch (e) { err(e) }
                                    })(obj, args[0], args[1], args[2], args[3])
                                    break
                                default:
                                    err(`new type [(${func})${obj[props]}]`)
                                    break
                            }

                        } catch (e) { err(e) }
                    })(obj, args[0], args[1], args[2], args[3])
                break
            case 'get':
                (async (obj, props,data) => {
                    try {
                        // console.log(`app(${func}[(${obj['input']})${obj[props]}]property)`)
                        switch (obj[props]) {
                            case 'auctions':
                                (async (obj, props,data) => {
                                    try {
                                        if(!obj['path']){
                                            console.assert(false, 'Должно бытьсвойтсво obj["path""]')
                                        }
                                        let account = await server(null,obj['path'], conf['account']['web'], 'GET')
                                        out(account)
                                    } catch (e) { err(e) }
                                })(obj, args[0], args[1], args[2], args[3])
                                break
                            case 'winner':
                                (async (obj, props,data) => {
                                    try {
                                        if(!obj['path']){
                                            console.assert(false, 'Должно бытьсвойтсво obj["path""]')
                                        }
                                        let account = await server(null,obj['path'], conf['account']['web'], 'GET')
                                        out(account)
                                    } catch (e) { err(e) }
                                })(obj, args[0], args[1], args[2], args[3])
                                break
                            case 'timer':
                                (async (obj, props,data) => {
                                    try {
                                        if(!obj['path']){
                                            console.assert(false, 'Должно бытьсвойтсво obj["path""]')
                                        }
                                        let account = await server(null,obj['path'], conf['account']['web'], 'GET')
                                        out(account)
                                    } catch (e) { err(e) }
                                })(obj, args[0], args[1], args[2], args[3])
                                break
                            case 'nft':
                                (async (obj, props,data) => {
                                    try {
                                        if(!obj['path']){
                                            console.assert(false, 'Должно бытьсвойтсво obj["path""]')
                                        }
                                        let account = await server(obj['data'],obj['path'], conf['account']['web'], 'POST')
                                        out(account)
                                    } catch (e) { err(e) }
                                })(obj, args[0], args[1], args[2], args[3])
                                break
                            default:
                                err(`new type [(${func})${obj[props]}]`)
                                break
                        }
                    } catch (e) { err(e) }
                })(obj, args[0], args[1], args[2], args[3])
                break
            case 'update':
                (async (obj, props,data) => {
                    try {
                        // console.log(`app(${func}[(${obj['input']})${obj[props]}]property)`)
                        switch (obj[props]) {
                            case 'account':
                                if(!obj['path']){
                                    console.assert(false, 'Должно бытьсвойтсво obj["path""]')
                                }
                                let account = await server(obj['data'],obj['path'], conf['account']['web'], 'PUT')
                                out(account)
                                break
                            default:
                                err(`new type [(${func})${obj[props]}]`)
                                break
                        }
                    } catch (e) { err(e) }
                })(obj, args[0], args[1], args[2], args[3])
                break
            case 'checked':
                (async (obj, props,data) => {
                    try {
                        // console.log(`app(${func}[(${obj['input']})${obj[props]}]property)`)
                        switch (obj[props]) {
                            case 'account':
                                if(!obj['path']){
                                    console.assert(false, 'Должно бытьсвойтсво obj["path""]')
                                }
                                let account = await server(obj['data'],obj['path'], conf['account']['web'], 'POST')
                                out(account)
                                break
                            default:
                                err(`new type [(${func})${obj[props]}]`)
                                break
                        }
                    } catch (e) { err(e) }
                })(obj, args[0], args[1], args[2], args[3])
                break
            case 'delete':
                (async (obj, props,data) => {
                    try {
                        // console.log(`app(${func}[(${obj['input']})${obj[props]}]property)`)
                        switch (obj[props]) {
                            case 'item':
                                if(!obj['path']){
                                    console.assert(false, 'Должно быть свойтсво obj["path""]')
                                }
                                let account = await server(null,obj['path'], conf['account']['web'], 'DELETE')
                                out(account)
                                break
                            case 'winner':
                                (async (obj, props,data) => {
                                    try {
                                        if(!obj['path']){
                                            console.assert(false, 'Должно бытьсвойтсво obj["path""]')
                                        }
                                        let account = await server(null,obj['path'], conf['account']['web'], 'DELETE')
                                        out(account)
                                    } catch (e) { err(e) }
                                })(obj, args[0], args[1], args[2], args[3])
                                break
                            default:
                                err(`new type [(${func})${obj[props]}]`)
                                break
                        }
                    } catch (e) { err(e) }
                })(obj, args[0], args[1], args[2], args[3])
                break
            default:
                err(`new function ${func}`)
                break
        }
    })
}
