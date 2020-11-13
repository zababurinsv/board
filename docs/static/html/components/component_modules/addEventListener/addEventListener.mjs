import action from '/static/html/components/component_modules/action/action.mjs'
import staticProperty from '/static/html/components/component_modules/staticProperty/staticProperty.mjs'
import utils from '/static/html/components/component_modules/utils/utils.mjs'
import template from '/static/html/components/component_modules/template/template.mjs'
import request from '/static/html/components/component_modules/request/request.mjs'
import matcher from '/static/html/components/component_modules/matcher/matcher.mjs'
import isEmpty from '/static/html/components/component_modules/isEmpty/isEmpty.mjs'
let node = (obj, target)=>{

    if(obj.tagName === 'VARAN-EDITOR'){
        return true
    }else {
        return false
    }
}
let triger = []
triger.staticProperty = []
triger.staticProperty['auth'] = []
triger.staticProperty['auth'] = false
triger.staticProperty['reg'] = []
triger.staticProperty['reg'] = false
export default  (obj, func, ...args)=>{
    return new Promise( function (resolve, reject) {
            let out = (obj) => {
                console.log('~~~ out  ~~~')
                resolve(obj)
            }
            let err = (error) => {
                console.log('~~~ err  ~~~', error)
                reject(error)
            }
            switch (func) {
                case 'add':
                    (async (obj, props,data) => {
                        try {
                            // console.log(`app(${func}[(${obj['input']})${obj[props]}]property)`)
                            switch (obj[props]) {
                                case 'lacerta-moderator':
                                    (async (obj, props,data) => {
                                        try {

                                            obj['delete'].addEventListener('click', async (event) => {
                                                let target = event.target
                                                let verify = false
                                                while (!verify) {
                                                    if(target.tagName === 'DETAILS' && target.className.indexOf('item') > -1){
                                                        verify = true
                                                    }else{
                                                        target = target.parentNode
                                                    }
                                                }

                                                let dateVery =  target.querySelector('.timestamp').innerText
                                                dateVery = +dateVery
                                                await action({
                                                    input:'lacerta-moderator',
                                                    this: obj['this'],
                                                    date:dateVery,
                                                    remove:target,
                                                    type:'moderator'
                                                }, 'delete', 'type')
                                                target.remove()
                                            })

                                            obj['change'].addEventListener('click', async (event) => {
                                                let target = event.target
                                                let verify = false
                                                while (!verify) {
                                                    if(target.tagName === 'DETAILS' && target.className.indexOf('item') > -1){
                                                        verify = true
                                                    }else{
                                                        target = target.parentNode
                                                    }
                                                }
                                                let dateVery =  target.querySelector('.timestamp').innerText
                                                dateVery = +dateVery

                                                // console.assert(false, target.querySelector('.moderator').src)
                                                // console.assert(false, target.querySelector('h2').innerText)
                                                // console.assert(false, target.querySelector('.preview').innerHTML)
                                                // console.assert(false, target.querySelector('.content').innerHTML)
                                                // console.assert(false,dateVery )
                                                let editor =  await staticProperty({
                                                    input:'action',
                                                    type: 'all'
                                                }, 'get', 'type')
                                                // console.assert(false, editor)
                                                for(let i = 0; i < editor['varan-editor'].length; i++){
                                                    switch (editor['varan-editor'][i].slot) {
                                                        case 'moderator':
                                                            // console.assert(false, target.querySelector('.preview').innerHTML)
                                                            editor['varan-editor'][i]['obj']['this'].querySelector('.wall').innerHTML =''
                                                            editor['varan-editor'][i]['obj']['this'].querySelector('.wall').insertAdjacentHTML('afterbegin', target.querySelector('.preview').innerHTML);
                                                            editor['varan-editor'][i]['editor']['quill'].root.innerHTML = ''


                                                            let menu = editor['varan-editor'][i]['obj']['this'].querySelector('varan-menu')

                                                            if( menu.shadowRoot === undefined || menu.shadowRoot === null){

                                                            }else{
                                                                menu =menu.shadowRoot
                                                            }


                                                            editor['varan-editor'][i]['editor']['quill'].root.innerHTML = target.querySelector('.preview').innerHTML
                                                            if(menu.querySelector('.update') !== null){
                                                                menu.querySelector('.update').remove()
                                                            }
                                                            editor['varan-editor'][i]['obj']['this'].querySelector('.menu-convert').insertAdjacentHTML('afterend', `<button class="update" type="button">update</button>`)

                                                           await action({
                                                                input:'addEventListener',
                                                                type:'menu-update',
                                                                data: menu.querySelector('.update')
                                                            }, 'add', 'type')

                                                            break
                                                        case 'moderatorContent':
                                                            let menu_t = editor['varan-editor'][i]['obj']['this'].querySelector('varan-menu')

                                                            if( menu_t.shadowRoot === undefined || menu_t.shadowRoot === null){

                                                            }else{
                                                                menu_t =menu_t.shadowRoot
                                                            }
                                                            editor['varan-editor'][i]['obj']['this'].querySelector('.wall').innerHTML = ''
                                                            editor['varan-editor'][i]['obj']['this'].querySelector('.wall').insertAdjacentHTML('afterbegin',  target.querySelector('.content').innerHTML);
                                                            // editor['varan-editor'][i]['editor']['quill'].root.innerHTML = ''
                                                            editor['varan-editor'][i]['obj']['this'].querySelector('.ql-editor').innerHTML =  target.querySelector('.content').innerHTML
                                                            // editor['varan-editor'][i]['editor']['quill'].root.innerHTML = target.querySelector('.content').innerHTML
                                                            menu_t.querySelector('.menu-convert').insertAdjacentHTML('afterend', `<button class="update" type="button">update</button>`)

                                                            await action({
                                                                input:'addEventListener',
                                                                type:'menu-update',
                                                                data: menu_t.querySelector('.update')
                                                            }, 'add', 'type')
                                                            break
                                                        default:
                                                            break

                                                    }
                                                }
                                                for(let i = 0; i < editor['lacerta-moderator'].length; i++){
                                                    switch (editor['lacerta-moderator'][i].slot) {
                                                        case 'moderator-admin':
                                                            editor['lacerta-moderator'][i]['obj']['this'].shadowRoot.querySelector('.timestamp').innerText = target.querySelector('.timestamp').innerText
                                                            editor['lacerta-moderator'][i]['obj']['this'].shadowRoot.querySelector('#titleItem').value =  target.querySelector('h2').innerText
                                                            editor['lacerta-moderator'][i]['obj']['this'].shadowRoot.querySelector('.moderator').src = target.querySelector('.moderator').src
                                                            break
                                                        case 'moderatorContent':

                                                            break
                                                        default:
                                                            break

                                                    }
                                                }
                                            })
                                            resolve(true)
                                        }catch (e) {
                                            err(e)
                                        }
                                    })(obj, args[0], args[1], args[2], args[3])
                                    break
                                case 'news':
                                    (async (obj, props,data) => {
                                        try {
                                            obj['data'].querySelector('.delete').addEventListener('click', (event) => {
                                                let target = event.target
                                                let verify = false
                                                while (!verify) {
                                                    if(target.tagName === 'DETAILS' && target.className.indexOf('item') > -1){
                                                        verify = true
                                                    }else{
                                                        target = target.parentNode
                                                    }
                                                }
                                                let veryDate = target.querySelector('.date').innerText
                                                veryDate = veryDate.split(' ')
                                                let dateVery =  veryDate[1].split(':')
                                                for(let i = 0; i < dateVery.length;i++){
                                                    if(dateVery[i].length === 1){
                                                        dateVery[i] = `0${dateVery[i]}`
                                                    }
                                                }
                                                dateVery = `${veryDate[0]} ${dateVery[0]}:${dateVery[1]}:${dateVery[2]}`
                                                action({
                                                    input:'lacerta-news',
                                                    this: obj['this'],
                                                    date:dateVery,
                                                    remove:target,
                                                    type:'news'
                                                }, 'delete', 'type')
                                            })

                                            obj['data'].querySelector('.change').addEventListener('click', (event) => {
                                                let target = event.target
                                                let verify = false
                                                while (!verify) {
                                                    if(target.tagName === 'DETAILS' && target.className.indexOf('item') > -1){
                                                        verify = true
                                                    }else{
                                                        target = target.parentNode
                                                    }
                                                }
                                                let veryDate = target.querySelector('.date').innerText
                                                veryDate = veryDate.split(' ')
                                                let dateVery =  veryDate[1].split(':')
                                                for(let i = 0; i < dateVery.length;i++){
                                                    if(dateVery[i].length === 1){
                                                        dateVery[i] = `0${dateVery[i]}`
                                                    }
                                                }
                                                dateVery = `${veryDate[0]} ${dateVery[0]}:${dateVery[1]}:${dateVery[2]}`
                                                action({
                                                    input:'lacerta-news',
                                                    this: obj['this'],
                                                    date:dateVery,
                                                    type:'news'
                                                }, 'update', 'type')

                                            })
                                            out(obj)
                                        } catch (e) { err(e) }
                                    })(obj, args[0], args[1], args[2], args[3])
                                    break
                                case 'menu-update':
                                    (async (obj, props,data) => {
                                        try {


                                            obj['data'].addEventListener('click', async (event) => {

                                                event.target.disable = 'true'
                                                event.target.style.backgroundColor = '#62bcd7'
                                                let target = event.target
                                                let verify = false
                                                while (!verify) {
                                                    target = target.parentNode
                                                    if(target.tagName === undefined || obj.tagName === 'undefined'){
                                                        target =  target.getRootNode().host

                                                    }
                                                    verify = node(target, 'varan-editor')
                                                }
                                                let store =  await staticProperty({
                                                    input:'action',
                                                    type: 'all'
                                                }, 'get', 'type')

                                                let content = {}
                                                let data = {}
                                                let newsUpdate = {}

                                                for(let i = 0; i < store['varan-editor'].length; i ++){
                                                    switch (store['varan-editor'][i].slot) {
                                                        case 'cardDescription':
                                                            newsUpdate['cardDescription'] = store['varan-editor'][i]['editor']['quill'].root.innerHTML
                                                            content['cardDescription'] = await   utils({
                                                                input:'varan-menu',
                                                                data: store['varan-editor'][i]['editor']['quill'].root.innerHTML,
                                                                type:'html2string'
                                                            },'convert', 'type')
                                                            store['varan-editor'][i]['obj']['this'].querySelector('.wall').innerHTML = ''
                                                            store['varan-editor'][i]['editor']['quill'].root.innerHTML = ''
                                                            break
                                                        case 'cardContent':
                                                            newsUpdate['cardContent'] =  store['varan-editor'][i]['editor']['quill'].root.innerHTML
                                                            content['cardContent'] =  await  utils({
                                                                input:'varan-menu',
                                                                data: store['varan-editor'][i]['editor']['quill'].root.innerHTML,
                                                                type:'html2string'
                                                            },'convert', 'type')
                                                            store['varan-editor'][i]['obj']['this'].querySelector('.wall').innerHTML = ''
                                                            store['varan-editor'][i]['editor']['quill'].root.innerHTML = ''
                                                            break
                                                        case 'description':
                                                            newsUpdate['description'] = store['varan-editor'][i]['editor']['quill'].root.innerHTML
                                                            content['description'] = await   utils({
                                                                input:'varan-menu',
                                                                data: store['varan-editor'][i]['editor']['quill'].root.innerHTML,
                                                                type:'html2string'
                                                            },'convert', 'type')
                                                            store['varan-editor'][i]['obj']['this'].querySelector('.wall').innerHTML = ''
                                                            store['varan-editor'][i]['editor']['quill'].root.innerHTML = ''
                                                            break
                                                        case 'content':
                                                            newsUpdate['content'] =  store['varan-editor'][i]['editor']['quill'].root.innerHTML
                                                            content['content'] =  await  utils({
                                                                input:'varan-menu',
                                                                data: store['varan-editor'][i]['editor']['quill'].root.innerHTML,
                                                                type:'html2string'
                                                            },'convert', 'type')
                                                            store['varan-editor'][i]['obj']['this'].querySelector('.wall').innerHTML = ''
                                                            store['varan-editor'][i]['editor']['quill'].root.innerHTML = ''
                                                            break
                                                        case 'about':
                                                            content['about'] =  await  utils({
                                                                input:'varan-menu',
                                                                data: store['varan-editor'][i]['editor']['quill'].root.innerHTML,
                                                                type:'html2string'
                                                            },'convert', 'type')
                                                            data = store['varan-editor'][i]['editor']['quill'].root.innerHTML
                                                            break
                                                        default:
                                                            console.warn('~~~~~~~~~', 'На этот объект нет действия ',store['varan-editor'][i].slot )
                                                            break
                                                    }
                                                }

                                                let slotCase ={}
                                                if(target.slot === 'moderator' || target.slot === 'moderatorContent'){
                                                    slotCase = 'moderator'
                                                }else if(target.slot === 'cardContent' || target.slot === 'cardDescription'){
                                                    slotCase = 'card'

                                                }else{
                                                    switch (target.slot) {
                                                        case 'about':

                                                            let objectAdmin = await utils({
                                                                input: 'varan-menu',
                                                                target: 'about-admin',
                                                                type: 'object',
                                                                source: store['varan-about'],
                                                                get: '.about'
                                                            }, 'get', 'type')

                                                            let object = await utils({
                                                                input: 'varan-menu',
                                                                target: 'varan-about',
                                                                type: 'object',
                                                                source: store['varan-about'],
                                                                get: '.about'
                                                            }, 'get', 'type')
                                                            objectAdmin.innerHTML = ''
                                                            objectAdmin.insertAdjacentHTML('beforeend', data);
                                                            break
                                                        default:
                                                            let lacertaNews = store['varan-editor-admin'][0]['this'].querySelector('lacerta-news')
                                                            let title = lacertaNews.shadowRoot.querySelector('#titleItem').value
                                                            let img = lacertaNews.shadowRoot.querySelector('.gallery').src
                                                            let date = lacertaNews.shadowRoot.querySelector('.date').innerText
                                                            let name = 'news'
                                                            date = +date
                                                                let news = {}

                                                                news['image'] = {}
                                                                news['image']['data'] = img
                                                                news['image']['name'] = name
                                                                news['title'] = title
                                                                news['date'] = date
                                                                news['content'] = content['content']
                                                                news['short_content'] = content['description']
                                                                news['url'] = `https://universitykids.ru`
                                                                news['rss'] = `https://universitykids.ru/rss`

                                                                for(let i = 0; i < store['lacerta-news'].length; i ++){
                                                                    switch (store['lacerta-news'][i].slot) {
                                                                        case 'news-admin':
                                                                            store['lacerta-news'][i]['obj']['this'].shadowRoot.querySelector('#titleItem').value = ''
                                                                            store['lacerta-news'][i]['obj']['this'].shadowRoot.querySelector('.date').innerHTML = 'date'
                                                                            store['lacerta-news'][i]['obj']['this'].shadowRoot.querySelector('.gallery').src = '/static/html/components/lacerta-news/icons/no_image.jpg'
                                                                           // console.assert(false, store['lacerta-news'][i]['obj']['this'])
                                                                            break
                                                                        default:
                                                                            console.warn('~~~~~~~~~', 'На этот объект нет действия ',store['lacerta-news'][i].slot )
                                                                            break
                                                                    }
                                                                }
                                                            let convert = {}
                                                            let update = {}
                                                            let save = {}
                                                            for(let i = 0; i < store['varan-editor'].length; i ++){
                                                                if(store['varan-editor'][i]['obj']['this'].querySelector('.menu-convert') === null){
                                                                    convert = store['varan-editor'][i]['obj']['this'].querySelector('varan-menu')
                                                                    convert = convert.shadowRoot.querySelector('.menu-convert')
                                                                }else{
                                                                    convert = store['varan-editor'][i]['obj']['this'].querySelector('.menu-convert')
                                                                }
                                                                if(store['varan-editor'][i]['obj']['this'].querySelector('.update') === null){
                                                                    update = store['varan-editor'][i]['obj']['this'].querySelector('varan-menu')
                                                                    update = update.shadowRoot.querySelector('.update')
                                                                }else{
                                                                    update = store['varan-editor'][i]['obj']['this'].querySelector('.update')
                                                                }
                                                                if(store['varan-editor'][i]['obj']['this'].querySelector('.menu-save')=== null){
                                                                    save = store['varan-editor'][i]['obj']['this'].querySelector('varan-menu')
                                                                    save = save.shadowRoot.querySelector('.menu-save')
                                                                }else{
                                                                    save = store['varan-editor'][i]['obj']['this'].querySelector('.menu-save')
                                                                }
                                                                switch (store['varan-editor'][i].slot) {
                                                                    case 'description':
                                                                        convert.disabled = true;
                                                                        convert.style.backgroundColor = 'blue';
                                                                        update.innerText = 'Идёт обновление новости. Кнопка изчезнет после обновления'
                                                                        update.style.backgroundColor = 'red'
                                                                        update.disabled = true;
                                                                        save.disabled = true;
                                                                        save.style.backgroundColor = 'blue';
                                                                        break
                                                                    case 'content':
                                                                        convert.disabled = true;
                                                                        convert.style.backgroundColor = 'blue';
                                                                        update.innerText = 'Идёт обновление новости. Кнопка изчезнет после обновления'
                                                                        update.style.backgroundColor = 'red'
                                                                        update.disabled = true;
                                                                        save.disabled = true;
                                                                        save.style.backgroundColor = 'blue';
                                                                        break
                                                                    default:
                                                                        // console.warn('~~~~~~~~~', 'На этот объект нет действия ',store['lacerta-news'][i].slot )
                                                                        break
                                                                }
                                                            }
                                                                staticProperty({
                                                                    type:'task',
                                                                    task: {
                                                                        type:'updateAction',
                                                                        date:{
                                                                            timestamp:date,
                                                                            utc:new Date(date).toUTCString(),
                                                                            iso:new Date(date).toISOString()
                                                                        },
                                                                        update:news
                                                                    }
                                                                },'task', 'type')

                                                            break
                                                    }

                                                }
                                                switch (slotCase) {
                                                    case 'card':
                                                        let card = {}
                                                        card['image'] = {}
                                                        let verifyUpdate = false

                                                        for(let i = 0; i < store['varan-card-news'].length; i ++){
                                                            switch (store['varan-card-news'][i].slot) {
                                                                case "card-admin":
                                                                    let admin = store['varan-card-news'][i]['this'].shadowRoot.querySelectorAll('.section')[1]

                                                                    card['title'] =  admin.querySelector('.nameBid').value
                                                                    card['time'] = admin.querySelector('.timerValue').value
                                                                    card['price'] =admin.querySelector('.priceValue').value
                                                                    card['content'] =content['cardContent']
                                                                    card['image']['data'] = admin.querySelector('.imgBidAdmin').src
                                                                    card['image']['name'] = admin.querySelector('.nameBid').value
                                                                    card['short_content'] = content['cardDescription']
                                                                    card['url'] = `https://universitykids.ru`
                                                                    card['rss'] = `https://universitykids.ru/rss`

                                                                    let className = +admin.querySelector('.item').className.split('_')[1]

                                                                    card['date'] = className

                                                                    let verifyAuction = await matcher['server']({
                                                                        path:`/timer/${card['date']}`,
                                                                        type:'timer'
                                                                    },'get', 'type')

                                                                    if(verifyAuction['mongo']['time'] === -2){
                                                                        verifyUpdate = true

                                                                    }else{

                                                                    }

                                                                    admin.querySelector('.item').className = admin.querySelector('.item').className.split('_')[0]
                                                                    admin.querySelector('.nameBid').value = 'Наименование товара'
                                                                    admin.querySelector('.imgBidAdmin').src = './static/html/components/varan-card-news/icons/no_image.jpg'
                                                                    admin.querySelector('.timerValue').value = 10
                                                                    admin.querySelector('.priceValue').value = 1
                                                                    break
                                                                default:
                                                                    console.warn('~~~~~~~~~', 'На этот объект нет действия ',store['lacerta-news'][i].slot )
                                                                    break
                                                            }
                                                        }
                                                        if(verifyUpdate ===false){
                                                            alert('Проходит аукцион, редактирование невозможно')
                                                        }else{

                                                            let convert = {}
                                                            let update = {}
                                                            let save = {}
                                                            for(let i = 0; i < store['varan-editor'].length; i ++){
                                                                if(store['varan-editor'][i]['obj']['this'].querySelector('.menu-convert') === null){
                                                                    convert = store['varan-editor'][i]['obj']['this'].querySelector('varan-menu')
                                                                    convert = convert.shadowRoot.querySelector('.menu-convert')
                                                                }else{
                                                                    convert = store['varan-editor'][i]['obj']['this'].querySelector('.menu-convert')
                                                                }
                                                                if(store['varan-editor'][i]['obj']['this'].querySelector('.update') === null){
                                                                    update = store['varan-editor'][i]['obj']['this'].querySelector('varan-menu')
                                                                    update = update.shadowRoot.querySelector('.update')
                                                                }else{
                                                                    update = store['varan-editor'][i]['obj']['this'].querySelector('.update')
                                                                }
                                                                if(store['varan-editor'][i]['obj']['this'].querySelector('.menu-save')=== null){
                                                                    save = store['varan-editor'][i]['obj']['this'].querySelector('varan-menu')
                                                                    save = save.shadowRoot.querySelector('.menu-save')
                                                                }else{
                                                                    save = store['varan-editor'][i]['obj']['this'].querySelector('.menu-save')
                                                                }
                                                                switch (store['varan-editor'][i].slot) {
                                                                    case 'cardDescription':
                                                                        convert.disabled = true;
                                                                        convert.style.backgroundColor = 'blue';
                                                                        update.innerText = 'Идёт обновление. Кнопка изчезнет после обновления'
                                                                        update.style.backgroundColor = 'red'
                                                                        update.disabled = true;
                                                                        save.disabled = true;
                                                                        save.style.backgroundColor = 'blue';
                                                                        break
                                                                    case 'cardContent':
                                                                        convert.disabled = true;
                                                                        convert.style.backgroundColor = 'blue';
                                                                        update.innerText = 'Идёт обновление. Кнопка изчезнет после обновления'
                                                                        update.style.backgroundColor = 'red'
                                                                        update.disabled = true;
                                                                        save.disabled = true;
                                                                        save.style.backgroundColor = 'blue';
                                                                        break
                                                                    default:
                                                                        // console.warn('~~~~~~~~~', 'На этот объект нет действия ',store['lacerta-news'][i].slot )
                                                                        break
                                                                }
                                                            }

                                                            staticProperty({
                                                                type:'task',
                                                                task: {
                                                                    type:'updateAction',
                                                                    date:{
                                                                        timestamp:card['date'],
                                                                        utc:new Date(card['date']).toUTCString(),
                                                                        iso:new Date(card['date']).toISOString()
                                                                    },
                                                                    update:card
                                                                },
                                                                name:'bid'
                                                            },'task', 'type')

                                                        }

                                                        break
                                                    case 'moderator':
                                                        let outObjectModerator = {}
                                                        let editor =  await staticProperty({
                                                            input:'action',
                                                            type: 'all'
                                                        }, 'get', 'type')

                                                        for(let i = 0; i < editor['varan-editor'].length; i++){
                                                            switch (editor['varan-editor'][i].slot) {
                                                                case 'moderator':
                                                                    outObjectModerator['decription'] = editor['varan-editor'][i]['obj']['this'].querySelector('.wall').innerHTML
                                                                    editor['varan-editor'][i]['editor']['quill'].root.innerHTML = ''
                                                                    editor['varan-editor'][i]['obj']['this'].querySelector('.wall').innerHTML = ''


                                                                    let update = {}

                                                                    if( editor['varan-editor'][i]['obj']['this'].querySelector('.update')=== null){
                                                                        update = store['varan-editor'][i]['obj']['this'].querySelector('varan-menu')
                                                                        update = update.shadowRoot.querySelector('.update')
                                                                    }else{
                                                                        update =  editor['varan-editor'][i]['obj']['this'].querySelector('.update')
                                                                    }
                                                                    update.remove()
                                                                    break
                                                                case 'moderatorContent':
                                                                    let update_t = {}

                                                                    if( editor['varan-editor'][i]['obj']['this'].querySelector('.update')=== null){
                                                                        update_t = store['varan-editor'][i]['obj']['this'].querySelector('varan-menu')
                                                                        update_t = update_t.shadowRoot.querySelector('.update')
                                                                    }else{
                                                                        update_t =  editor['varan-editor'][i]['obj']['this'].querySelector('.update')
                                                                    }
                                                                    outObjectModerator['content'] = editor['varan-editor'][i]['obj']['this'].querySelector('.wall').innerHTML
                                                                    editor['varan-editor'][i]['editor']['quill'].root.innerHTML = ''
                                                                    editor['varan-editor'][i]['obj']['this'].querySelector('.wall').innerHTML = ''
                                                                    update_t.remove()
                                                                    break
                                                                default:
                                                                    break

                                                            }
                                                        }
                                                        for(let i = 0; i < editor['lacerta-moderator'].length; i++){
                                                            switch (editor['lacerta-moderator'][i].slot) {
                                                                case 'moderator-admin':
                                                                    outObjectModerator['timestamp'] =  editor['lacerta-moderator'][i]['obj']['this'].shadowRoot.querySelector('.timestamp').innerText
                                                                    editor['lacerta-moderator'][i]['obj']['this'].shadowRoot.querySelector('.timestamp').innerText = ''
                                                                    outObjectModerator['img'] =  editor['lacerta-moderator'][i]['obj']['this'].shadowRoot.querySelector('.moderator').src
                                                                    editor['lacerta-moderator'][i]['obj']['this'].shadowRoot.querySelector('.moderator').src = '/static/html/components/lacerta-moderator/icons/no_image.jpg'
                                                                    outObjectModerator['title'] =    editor['lacerta-moderator'][i]['obj']['this'].shadowRoot.querySelector('#titleItem').value
                                                                    editor['lacerta-moderator'][i]['obj']['this'].shadowRoot.querySelector('#titleItem').value = ''
                                                                        break
                                                                default:
                                                                    break

                                                            }
                                                        }
                                                        let outObject = {}
                                                        outObject['positionImg'] = confirm("Фотографию раcположить слева ?");
                                                        for(let i = 0; i < editor['lacerta-moderator'].length; i++){
                                                            switch (editor['lacerta-moderator'][i].slot) {
                                                                case 'lacerta-moderator':
                                                                    let main =  editor['lacerta-moderator'][i]['obj']['this'].shadowRoot.querySelector('.main')

                                                                    // console.assert(false,main.children )
                                                                    for(let i =0; i < main.children.length;i++){
                                                                        let temTime =  main.children[i].querySelector('.timestamp').innerText
                                                                        if(temTime ===  outObjectModerator['timestamp'] ){
                                                                            // console.log(outObjectModerator)
                                                                            let source =  main.children[i]
                                                                            if(outObject['positionImg']){
                                                                                source.querySelector('.item').prepend( source.querySelector('.hexagon'))

                                                                            }else{
                                                                                source.querySelector('.item').appendChild( source.querySelector('.hexagon'))

                                                                            }
                                                                            source.querySelector('h2').innerText = outObjectModerator['title']
                                                                            source.querySelector('.preview').innerHTML = ''
                                                                            source.querySelector('.preview').innerHTML = outObjectModerator['decription']
                                                                            source.querySelector('.content').innerHTML = ''
                                                                            source.querySelector('.content').innerHTML = outObjectModerator['content']
                                                                            source.querySelector('.moderator').src =     outObjectModerator['img']
                                                                        }

                                                                    }
                                                                    break
                                                                default:
                                                                    break

                                                            }
                                                        }
                                                        let descr = await   utils({
                                                            input:'template',
                                                            data:outObjectModerator['decription'],
                                                            type:'html2string'
                                                        },'convert', 'type')
                                                        let con = await   utils({
                                                            input:'template',
                                                            data:outObjectModerator['content'],
                                                            type:'html2string'
                                                        },'convert', 'type')

                                                        outObject['timestamp'] = outObjectModerator['timestamp']
                                                        outObject['title'] = outObjectModerator['title']
                                                        outObject['img'] = outObjectModerator['img']
                                                        outObject['description'] = descr
                                                        outObject['content'] = con
                                                        outObject['dir'] =  'moderator'

                                                       let  template = await matcher['webdav']({
                                                            input:'varan-menu',
                                                            data: outObject,
                                                            type:'components',
                                                            name:'moderator',
                                                            path:`/moderator/${outObject['timestamp']}`
                                                        },'update', 'type' )
                                                        break
                                                    default:
                                                        break

                                                }
                                            })
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
                case 'set':
                    (async (obj, props,data) => {
                        try {
                            // console.log(`app(${func}[(${obj['input']})${obj[props]}]property)`)
                            switch (obj[props]) {
                                case 'reg':
                                    (async (obj, props,data) => {
                                        try {
                                            let reg = false
                                            obj['data'].addEventListener('click', async (event) => {
                                                let verify = true
                                                let target = event.target.parentNode
                                                while(verify){


                                                    if(target.id === 'authSite'){

                                                        verify = false

                                                    }else{
                                                        target = target.parentNode
                                                    }

                                                }

                                                if(triger.staticProperty['reg'] === false){

                                                    let html = await template({
                                                        input:'addEventListener',
                                                        type:'auth'
                                                    }, 'get', 'type')

                                                    target.querySelector('#auth').innerHTML = ''
                                                    target.querySelector('#auth').insertAdjacentHTML('afterbegin', html)
                                                    triger.staticProperty['reg'] = true
                                                    triger.staticProperty['auth'] = false
                                                    target.querySelector('.btn').addEventListener('click', async (event) => {

                                                        event.preventDefault()
                                                        let target = event.target.parentNode
                                                        let out = {}
                                                        out['password'] = {}
                                                        let j = 0
                                                        for(let i = 0; i < target.children.length; i++){
                                                            if(target.children[i].querySelector('input') === null){

                                                            }else{
                                                                switch (target.children[i].querySelector('input').type) {
                                                                    case 'text':

                                                                        out['text'] = target.children[i].querySelector('input').value
                                                                        break
                                                                    case 'email':
                                                                        out['email'] = target.children[i].querySelector('input').value
                                                                        break
                                                                    case 'password':
                                                                        out['password'][j] = target.children[i].querySelector('input').value
                                                                        j++
                                                                        break
                                                                    default:
                                                                        break

                                                                }
                                                            }
                                                        }
                                                        const newUser = {
                                                            name: out['text'],
                                                            email: out['email'],
                                                            password: out['password'][0],
                                                            password2: out['password'][1]
                                                        };

                                                        alert('IN PROGRESS')
                                                        // let user = await  config['axios'].post('http://localhost:3000/api/users/register', newUser)


                                                    })
                                                }else{
                                                    target.querySelector('#auth').innerHTML = ''
                                                    triger.staticProperty['reg'] = false
                                                    triger.staticProperty['auth'] = false
                                                }

                                            })

                                            out({register:'ok'})
                                        } catch (e) { err(e) }
                                    })(obj, args[0], args[1], args[2], args[3])

                                    break
                                case 'auth':
                                    (async (obj, props,data) => {
                                        try {

                                            obj['data'].addEventListener('click', async (event) => {
                                                let verify = true
                                                let target = event.target.parentNode
                                                while(verify){


                                                    if(target.id === 'authSite'){

                                                        verify = false

                                                    }else{
                                                        target = target.parentNode
                                                    }

                                                }
                                                if(  triger.staticProperty['auth'] === false){

                                                    let html = await template({
                                                        input:'addEventListener',
                                                        type:'login'
                                                    }, 'get', 'type')


                                                    target.querySelector('#auth').innerHTML = ''
                                                    target.querySelector('#auth').insertAdjacentHTML('afterbegin', html)
                                                    triger.staticProperty['reg'] = false
                                                    triger.staticProperty['auth'] = true


                                                    target.querySelector('.btn').addEventListener('click', async (event) => {

                                                        event.preventDefault()
                                                        let target = event.target.parentNode
                                                        let out = {}
                                                        out['password'] = {}
                                                        let j = 0
                                                        for(let i = 0; i < target.children.length; i++){
                                                            if(target.children[i].querySelector('input') === null){
                                                            }else{
                                                                switch (target.children[i].querySelector('input').type) {
                                                                    case 'text':
                                                                        out['text'] = target.children[i].querySelector('input').value
                                                                        break
                                                                    case 'email':
                                                                        out['email'] = target.children[i].querySelector('input').value
                                                                        break
                                                                    case 'password':
                                                                        out['password'][j] = target.children[i].querySelector('input').value
                                                                        j++
                                                                        break
                                                                    default:
                                                                        break
                                                                }
                                                            }
                                                        }
                                                        const userData = {
                                                            email: out['text'] ,
                                                            password: out['password'][0]
                                                        };
                                                        alert('IN PROGRESS')
                                                        // let user = await  config['axios'].post('http://localhost:3000/api/users/login', userData)
                                                    })
                                                }else{
                                                    target.querySelector('#auth').innerHTML = ''
                                                    triger.staticProperty['reg'] = false
                                                    triger.staticProperty['auth'] = false
                                                }

                                            })


                                        } catch (e) { err(e) }
                                    })(obj, args[0], args[1], args[2], args[3])
                                    break
                                case 'varan-about':
                                    (async (obj, props,data) => {
                                        try {
                                            obj['data'].addEventListener('click', async (event) => {

                                                let video = await template({
                                                    input:'addListener',
                                                    type:'video'
                                                },'get', 'type')
                                                // console.assert(false, video)
                                                event.target.parentNode.insertAdjacentHTML('beforeend', video)
                                                event.target.remove()

                                                // console.assert(false, event.target)
                                                // .src = "&autoplay=1"
                                                // console.assert(false, event.target.parentNode)

                                            })


                                        } catch (e) { err(e) }
                                    })(obj, args[0], args[1], args[2], args[3])
                                    break
                                case 'payLot':
                                    (async (obj, props,data) => {
                                        try {

                                            obj['data'].addEventListener('click', async (event) => {
                                                let object = event.target.className.split(' ')[1]
                                                event.target.innerText = 'Процесс оплаты'
                                                event.target.disabled = true
                                                let tx = await matcher['server']({
                                                    input:'addEventListener',
                                                    path:`/winnerPay/${event.target.className.split(' ')[1]}`,
                                                    type:'winner'
                                                },'get', 'type')
                                                try {
                                                    event.target.innerText = 'оплата'
                                                    event.target.disabled = true
                                                    let request = {
                                                        type: 16,
                                                        data: {
                                                            fee: {
                                                                "tokens": "0.05",
                                                                "assetId": "WAVES"
                                                            },
                                                            dApp: window['wt']['dappaddress'],
                                                            call: tx['mongo'][0]['winner']['call'],
                                                            payment:  tx['mongo'][0]['winner']['payment']
                                                        }
                                                    }
                                                    let payWin = await   WavesKeeper.signAndPublishTransaction(request)
                                                    payWin = JSON.parse(payWin)
                                                    let deleteWin = await matcher['server']({
                                                        input:'addEventListener',
                                                        path:`/winner/${object}`,
                                                        type:'winner'
                                                    },'delete', 'type')
                                                    await window['wt']['nodeInteraction']['waitForTx'](payWin.id,{
                                                        apiBase:'https://nodes-testnet.wavesnodes.com'
                                                    })
                                                }catch (e) {
                                                    if(e.code === "15"){
                                                        alert('У вас недостаточно средств для оплаты')
                                                    }else if(e.code === "10"){


                                                    }
                                                    else{
                                                        // console.assert(false, e)
                                                    }
                                                }
                                            })
                                            out({addEventListener:'ok'})
                                        } catch (e) { err(e) }
                                    })(obj, args[0], args[1], args[2], args[3])
                                    break
                                case 'varan-gallery':
                                    (async (obj, props,data) => {
                                        try {
                                            obj['data'].addEventListener('click', async (event) => {

                                                let video = await template({
                                                    input:'addListener',
                                                    type:'video'
                                                },'get', 'type')
                                                // console.assert(false, video)
                                                event.target.parentNode.insertAdjacentHTML('beforeend', video)
                                                event.target.remove()

                                                // console.assert(false, event.target)
                                                // .src = "&autoplay=1"
                                                // console.assert(false, event.target.parentNode)

                                            })


                                        } catch (e) { err(e) }
                                    })(obj, args[0], args[1], args[2], args[3])
                                    break
                                case 'lacerta-request':
                                    (async (obj, props,data) => {
                                        try {

                                            obj['data'].querySelector('#file').addEventListener('change', async (event) => {
                                                event.target.parentNode.querySelector('.file').innerText = event.target.files[0]['name']

                                            })

                                            obj['data'].addEventListener('submit', async (event) => {
                                                var elems = event.target.elements;
                                                let verify = false
                                                let oldPlaceholder
                                                let submitVerify = 0
                                                let outForm = {}
                                                let outText = {}
                                                for(let i =0; i < elems.length; i ++){
                                                    switch (elems[i].id) {
                                                        case 'fio-parent':
                                                            console.log('', elems[i].value)
                                                            if(isEmpty(elems[i].value)){

                                                                oldPlaceholder =  elems[i].placeholder
                                                                elems[i].placeholder = 'Введите Ф.И.О родителя'
                                                                elems[i].style.borderColor = 'red'
                                                                outForm['parent'] = ''
                                                            }else{
                                                                submitVerify++
                                                                outForm['parent'] = elems[i].value
                                                                elems[i].style.borderColor = 'green'
                                                            }
                                                            break
                                                        case 'fio-children':
                                                            if(isEmpty(elems[i].value)){
                                                                oldPlaceholder =  elems[i].placeholder
                                                                elems[i].placeholder = `Введите  ${oldPlaceholder}`
                                                                elems[i].style.borderColor = 'red'
                                                                outForm['children'] = ''
                                                            }else{
                                                                outForm['children'] = elems[i].value
                                                                submitVerify++
                                                                elems[i].style.borderColor = 'green'
                                                            }

                                                            console.log('', elems[i].value)
                                                            break
                                                        case 'school':
                                                            if(isEmpty(elems[i].value)){
                                                                oldPlaceholder =  elems[i].placeholder
                                                                elems[i].placeholder = `Введите учебное заведение и класс`
                                                                elems[i].style.borderColor = 'red'
                                                                outForm['school'] = ''
                                                            }else{
                                                                outForm['school'] = elems[i].value
                                                                submitVerify++
                                                                elems[i].style.borderColor = 'green'
                                                            }
                                                            break
                                                        case 'email':
                                                            if(isEmpty(elems[i].value)){
                                                                oldPlaceholder =  elems[i].placeholder
                                                                elems[i].placeholder = `Введите электронную почту`
                                                                elems[i].style.borderColor = 'red'
                                                                outForm['email'] = ''
                                                            }else{
                                                                if(config['validator'].isEmail(elems[i].value)){
                                                                    elems[i].style.borderColor = 'green'
                                                                    submitVerify++
                                                                    outForm['email'] = elems[i].value
                                                                }else{
                                                                    elems[i].placeholder = `Введите правильно электронную почту`
                                                                    elems[i].style.borderColor = 'red'
                                                                    outForm['email'] = ''
                                                                }
                                                            }
                                                            console.log('', elems[i].value)
                                                            break
                                                        case 'vk':
                                                            outForm['vk'] = elems[i].value
                                                            // if(isEmpty(elems[i].value)){
                                                            //     oldPlaceholder =  elems[i].placeholder
                                                            //     elems[i].placeholder = `Введите  ${oldPlaceholder}`
                                                            //     elems[i].style.borderColor = 'red'
                                                            // }else{
                                                            //     elems[i].style.borderColor = 'green'
                                                            // }
                                                            // console.log('', elems[i].value)
                                                            break
                                                        case 'phone':
                                                            if(isEmpty(elems[i].value)){
                                                                oldPlaceholder =  elems[i].placeholder
                                                                elems[i].placeholder = `Введите номер телефона родителя`
                                                                elems[i].style.borderColor = 'red'
                                                                outForm['phone'] = ''
                                                            }else{
                                                                outForm['phone'] = elems[i].value
                                                                submitVerify++
                                                                elems[i].style.borderColor = 'green'
                                                            }
                                                            break
                                                        case 'politics':
                                                            if(elems[i].checked){

                                                            submitVerify++
                                                            }else{
                                                            let  result = confirm('Согласие на обработку данных и использование фото/видео для сайта');
                                                            if(result === true){
                                                                submitVerify++
                                                            }else{
                                                                elems[i].parentNode.querySelector('p').style.color = 'red'
                                                            }

                                                            }
                                                            console.log('', elems[i].value)
                                                            break
                                                        case 'file':
                                                            outText =   elems[i].parentNode.querySelector('.file')
                                                            let verify = false
                                                            if(isEmpty(elems[i].value)){
                                                                outForm['file'] = ''
                                                                elems[i].parentNode.style.borderColor = 'red'
                                                                elems[i].parentNode.querySelector('.file').innerText = 'Прикрепите файл'

                                                            }else{
                                                                switch(elems[i].files[0].type){
                                                                    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                                                                        verify = true
                                                                        break
                                                                    case "application/pdf":
                                                                        verify = true
                                                                        break
                                                                    case  "application/msword":
                                                                        verify = true
                                                                        break
                                                                    default:
                                                                        break
                                                                }
                                                                if(verify){
                                                                    elems[i].parentNode.querySelector('.file').innerText = elems[i].files[0]['name']
                                                                    outForm['file'] = elems[i].files[0]
                                                                    submitVerify++
                                                                }else{
                                                                    outForm['file'] = ''
                                                                    elems[i].parentNode.querySelector('.file').innerText = 'Прикрепите файл формата *.doc, *.docx или *.pdf'
                                                                }
                                                            }
                                                            break
                                                        default:
                                                            console.log('необработанное поле', elems[i].id)
                                                            break

                                                    }
                                                }
                                                if(submitVerify >= 7){
                                                    for(let i =0; i < elems.length; i ++){
                                                        for(let i =0; i < elems.length; i ++){
                                                            switch (elems[i].id) {
                                                                case 'fio-parent':
                                                                    elems[i].placeholder = 'Введите Ф.И.О родителя'
                                                                    elems[i].value = ''
                                                                    break
                                                                case 'fio-children':
                                                                    elems[i].placeholder = "Ф.И.О ребёнка"
                                                                    elems[i].value = ''
                                                                    break
                                                                case 'school':
                                                                    elems[i].placeholder = "Учебное заведение и класс"
                                                                    elems[i].value = ''
                                                                    break
                                                                case 'email':
                                                                        elems[i].value = ''
                                                                        elems[i].placeholder = `Введите электронную почту`
                                                                    break
                                                                case 'vk':
                                                                        elems[i].value = ''
                                                                        elems[i].placeholder = "Ссылка на страницу Вконтакте (родителя)"
                                                                    break
                                                                case 'phone':
                                                                    elems[i].value = ''
                                                                    elems[i].placeholder = `Введите номер телефона родителя`
                                                                    break
                                                                case 'politics':
                                                                    break
                                                                default:
                                                                    console.log('необработанное поле', elems[i].id)
                                                                    break

                                                            }
                                                        }
                                                    }
                                                    outText.innerText = 'Ваша заявка отправленна'
                                                    let req =  await request({
                                                        input:'addEventListener',
                                                        type:'form',
                                                        data: outForm
                                                    },'post', 'type')
                                                }else{

                                                }
                                                event.preventDefault()
                                            })
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
