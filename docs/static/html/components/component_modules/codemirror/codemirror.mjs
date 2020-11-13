import loader from '/static/html/components/component_modules/loader/loader.mjs'
let object = {}
export default (obj = {_:'codemirror'})=>{
    return new Promise( async (resolve, reject) =>{
        let CodeMirror = await loader('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/codemirror.js','CodeMirror')
        await loader('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/addon/search/search.js','plugin')
        await loader('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/addon/search/searchcursor.js','plugin')
        await loader('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/addon/search/match-highlighter.js','plugin')
        await loader('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/addon/search/jump-to-line.js','plugin')
        await loader('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/addon/dialog/dialog.js','plugin')
        await loader('https://codemirror.net/addon/runmode/runmode.js')
        object['CodeMirror'] = CodeMirror
        let out = (obj) => {
            // console.log('~~~ out  ~~~', obj['input'])
            resolve(obj)
        }
        let err = (error) => {
            console.log('~~~ err ~~~', error)
            reject(error)
        }

        object['class'] = class Codemirror {
            constructor(self) {
                this.init = this.init.bind(this)
            }
            init(obj ={_:'default'}){
                    return new Promise(async function (resolve, reject) {
                        let out = (obj) => {
                            resolve(obj)
                        }
                        let err = (error) => {
                            reject(error)
                        }
                        try{
                            switch (obj['_']) {
                                case'default':
                                    console.log('menu.mjs модуль класса монополии')
                                    break
                                case'init':
                                    try {
                                        let editor = CodeMirror.fromTextArea(obj.this, {
                                            mode:  `${obj.mode}`,
                                            theme: 'one-dark',
                                            lineNumbers: true,
                                            smartIndent: true,
                                            searchMode: 'popup',
                                            lineWrapping: true
                                        });
                                        obj['editor'] = editor
                                        out(obj)
                                    }catch (e) {
                                        err({
                                            _:'error menu',
                                            error: e
                                        })
                                    }
                                    break
                                case'listener':
                                    try {




                                        out(obj)
                                    }catch (e) {
                                        err({
                                            _:'error menu',
                                            error: e
                                        })
                                    }
                                    break
                                default:
                                    console.warn('необрабатывается',obj['_'],'--->', obj)
                                    break
                            }
                        }catch (e) {
                            err({
                                _:'error menu',
                                error: e
                            })
                        }
                    })
            }
            get self() {
                return object
            }
        }
        out(object)
        // switch (obj['_']) {
        //     case'init':
        //
        //         break
        //     default:
        //         console.warn('неизвестный тип обработки', obj['_'],'---->', obj)
        //         break
        // }
    })
}
