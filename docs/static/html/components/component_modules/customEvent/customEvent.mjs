import colorLog from '/static/html/components/component_modules/colorLog/colorLog.mjs'
// import varanPictures from '/static/html/components/component_modules/varan-pictures/varan-pictures.mjs'
import staticProperty from '/static/html/components/component_modules/staticProperty/staticProperty.mjs'
import Parser from '/static/html/components/component_modules/parser/parser.mjs'
import action from '/static/html/components/component_modules/action/action.mjs'
async function uploadEvent (event) {

    console.assert(false)
    // varanPictures({
    //     input:'customEvents',
    //     createPicture:event['detail']['obj']
    // }, 'action', `createPicture`, `${event['detail']}`)
    // colorLog('[<>]   CustomEvents','orange' ,event['detail'])

}

async function saveEditor (events) {
    await action({
        input:'customEvent',
        id: event['detail']['id'],
        type: 'editor'
    }, `save`, 'type')
}

async function sideBarUpload (events) {
    console.assert(false)
    await action({
        input:'(customEvent)[saveEditor]',
        id: events['detail']['id'],
        file: events['detail']['file']
    }, `${events['detail']['id']}-background`, 'varan-editor')
}

async function sideBarCrop (event) {
    await action({
        input:'(customEvent)[sideBarCrop]',
        id: event['detail']['id'],
        slot: event['detail']['slot'],
        file: event['detail']['file'],
        type:'crop'
    }, `action`, 'type')
}
async function universe (event) {
    await action({
        input:'(customEvent)[avatar]',
        id: event['detail']['id'],
        slot: event['detail']['slot'],
        file: event['detail']['file'],
        type:'crop'
    }, `action`, 'type')
}

async function convertAction (events) {
    console.assert(false)
    if(events['detail']['data']['rss'] === null || events['detail']['data']['rss'] === undefined){
        events['detail']['data']['rss'] = 'default'
    }
    switch (events['detail']['data']['rss']) {
        case 'bid':
            await action({
                input:'(customEvent)[create Item -> bid ]',
                id: events['detail']['id'],
                data: events['detail']['data'],
                type: 'itemBid'
            }, `create`, 'type')
        break
        default:
            await action({
                input:'(customEvent)[create Item -> Feed ]',
                id: events['detail']['id'],
                data: events['detail']['data'],
                type: 'itemFeed'
            }, `create`, 'type')
        break
    }
}

async function createChannel(events) {
    console.assert(false)
    await action({
        input:'(customEvent)[saveEditor]',
        id: 'test',
        type: 'channel'
    }, `create`, 'type')
}
async function updateAction(events) {
    console.assert(false)
    if(events['detail']['name'] === 'bid'){
        await action({
            input:'(customEvent)[saveEditor]',
            date: events['detail']['date'],
            data: events['detail']['data'],
            type: 'bid-item'
        }, `update`, 'type')
    }else{
        await action({
            input:'(customEvent)[saveEditor]',
            date: events['detail']['date'],
            data: events['detail']['data'],
            type: 'news-item'
        }, `update`, 'type')
    }

}
document.addEventListener('uploadEvent', uploadEvent, false)
document.addEventListener('saveEditor', saveEditor, false)
document.addEventListener('sideBarUpload', sideBarUpload, false)
document.addEventListener('sideBarCrop', sideBarCrop, false)
document.addEventListener('convertAction', convertAction, false)
document.addEventListener('createChannel', createChannel, false)
document.addEventListener('updateAction', updateAction, false)
document.addEventListener('universe', universe, false)
// document.addEventListener('sliderPage', sliderPage, false)
// document.addEventListener('activeItem', activeItem, false)
// document.addEventListener('addItems', addItems, false)
// document.addEventListener('delItems', delItems, false)
// document.addEventListener('feed', feed, false)

export default  () =>{


    return {customEvents:'active'}
}
