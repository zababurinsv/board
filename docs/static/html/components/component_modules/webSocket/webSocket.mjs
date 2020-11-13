let object = {}
object['staticProperty'] = []
object['staticProperty']['socket'] = undefined
object['staticProperty']['verify'] = true
object['staticProperty']['create'] = (url) =>{
    if(object['staticProperty']['socket'] === undefined){
        object['staticProperty']['verify'] = false
        object['staticProperty']['socket'] = new WebSocket(`${url}`);
    }else{
        object['staticProperty']['verify'] = true
    }
    return object['staticProperty']['socket']
}
export default async (obj)=>{
    return new Promise((resolve, reject) => {
        object['socketProtocol'] =  'wss'
        object['class'] = class WebSocket {
            constructor(url) {
                this.socket = object['staticProperty']['create'](`${url}`);
                if( object['staticProperty']['verify'] === true){

                }else{
                    this.socket.onopen = function() {
                        console.log('connect is open')
                        let openConnect = new CustomEvent('openConnect', {
                            detail: {
                                data:'openConnect'
                            }
                        })
                        document.dispatchEvent(openConnect)
                    };
                    this.socket.onclose = function(event) {
                        if (event.wasClean) {
                            // alert('Соединение закрыто чисто');
                            console.log('Соединение закрыто чисто')
                            object['staticProperty']['socket'] = undefined
                        } else {
                            console.log('Обрыв соединения')
                            object['staticProperty']['socket'] = undefined
                        }
                        console.log('Код: ' + event.code )
                        // alert('Код: ' + event.code + ' причина: ' + event.reason);
                    };
                    this.socket.onerror = function(error) {
                       console.warn("Ошибка " + error)
                    };
                    this.socket.addEventListener('message', function (event) {
                        let object = JSON.parse(event['data'])
                        console.log('response~~~~~~~',object['_'],object)
                        switch (object['_']) {
                            case'error':
                                let error = new CustomEvent('error', {
                                    detail: {
                                        data:object
                                    }
                                })
                                document.dispatchEvent(error)
                                break
                            case'authorizationStateWaitRegistration':
                                let authorizationStateWaitRegistration = new CustomEvent('authorizationStateWaitRegistration', {
                                    detail: {
                                        data:'authorizationStateWaitRegistration'
                                    }
                                })
                                document.dispatchEvent(authorizationStateWaitRegistration)
                                break
                            case'updateSupergroupFullInfo':
                                let updateSupergroupFullInfo = new CustomEvent('updateSupergroupFullInfo', {
                                    detail: {
                                        data:object
                                    }
                                })
                                document.dispatchEvent(updateSupergroupFullInfo)
                                break
                            case'updateMessageContent':
                                let updateMessageContent = new CustomEvent('updateMessageContent', {
                                    detail: {
                                        data:object
                                    }
                                })
                                document.dispatchEvent(updateMessageContent)
                                break
                            case'updateDeleteMessages':
                                let updateDeleteMessages = new CustomEvent('updateDeleteMessages', {
                                    detail: {
                                        data:object
                                    }
                                })
                                document.dispatchEvent(updateDeleteMessages)
                                break
                            case 'authorizationStateWaitCode':
                                let authorizationStateWaitCode = new CustomEvent('authorizationStateWaitCode', {
                                    detail: {
                                        data:object
                                    }
                                })
                                document.dispatchEvent(authorizationStateWaitCode)
                                break
                            case'authorizationStateWaitPhoneNumber':
                                let authorizationStateWaitPhoneNumber = new CustomEvent('authorizationStateWaitPhoneNumber', {
                                    detail: {
                                        data:'authorizationStateWaitPhoneNumber'
                                    }
                                })
                                document.dispatchEvent(authorizationStateWaitPhoneNumber)
                                break
                            case'PrivateChat':
                                let PrivateChat = new CustomEvent('PrivateChat', {
                                    detail: {
                                        title:object['PrivateChat']['chat']['title'],
                                        id: object['PrivateChat']['chat']['id'],
                                        data:object
                                    }
                                })
                                document.dispatchEvent(PrivateChat)
                                break
                            case'user':
                                let user = new CustomEvent('user', {
                                    detail: {
                                        first_name:object['first_name'],
                                        id:object['id'],
                                        last_name: object['last_name'],
                                        phone_number:object['phone_number'],
                                        username:object['username'],
                                        data:object,
                                        status:object['status']['_']
                                    }
                                })
                                document.dispatchEvent(user)
                                break
                            case'userProfilePhotos':
                                let userProfilePhotos = new CustomEvent('userProfilePhotos', {
                                    detail: {
                                        data:object
                                    }
                                })
                                document.dispatchEvent(userProfilePhotos)
                                break
                            case'updateUserFullInfo':
                                let updateUserFullInfo = new CustomEvent('updateUserFullInfo', {
                                    detail: {
                                        data:object
                                    }
                                })
                                document.dispatchEvent(updateUserFullInfo)
                                break
                            case'updateNewMessage':
                                let updateNewMessage = new CustomEvent('updateNewMessage', {
                                    detail: {
                                        data:object
                                    }
                                })
                                document.dispatchEvent(updateNewMessage)
                                break
                            case'userFullInfo':
                                let userFullInfo = new CustomEvent('userFullInfo', {
                                    detail: {
                                        data:object
                                    }
                                })
                                document.dispatchEvent(userFullInfo)
                                break
                            case'chat':
                                let chat = new CustomEvent('chat', {
                                    detail: {
                                        data:object
                                    }
                                })
                                document.dispatchEvent(chat)
                                break
                            case'authorizationStateWaitPassword':
                                let authorizationStateWaitPassword = new CustomEvent('authorizationStateWaitPassword', {
                                    detail: {
                                        data: object
                                    }
                                })
                                document.dispatchEvent(authorizationStateWaitPassword)
                                break
                            case'authorizationStateReady':
                                let authorizationStateReady = new CustomEvent('authorizationStateReady', {
                                    detail: {
                                        data: object
                                    }
                                })
                                document.dispatchEvent(authorizationStateReady)
                                break
                            case'updateUserStatus':
                                let updateUserStatus = new CustomEvent('updateUserStatus', {
                                    detail: {
                                        data: object
                                    }
                                })
                                document.dispatchEvent(updateUserStatus)
                                break
                            case 'updateChatLastMessage':
                                let content = {}
                                content['photo'] = undefined
                                content['text'] = undefined
                                let updateChatLastMessage = {}
                                if(object['last_message'] === undefined){
                                    updateChatLastMessage  = new CustomEvent('updateChatLastMessage', {
                                        detail: {
                                            data:object
                                        }
                                    })
                                    document.dispatchEvent(updateChatLastMessage)
                                }else{
                                    switch (object['last_message']['content']['_']) {
                                        case 'messagePhoto':
                                            content['photo'] = object['last_message']['content']['photo']['minithumbnail']['data']
                                            break
                                        case 'messageText':
                                            content['text'] = object['last_message']['content']['text']['text']
                                            break
                                        default:
                                            console.log('!!!!!!!!!!!!!!!!!!!!!!!', object['last_message']['content']['_'])
                                            break
                                    }
                                    updateChatLastMessage = new CustomEvent('updateChatLastMessage', {
                                        detail: {
                                            content:content['text'],
                                            photo:  content['photo'],
                                            chat_id: object['chat_id'],
                                            id:object['last_message']['id'],
                                            sender_user_id:object['last_message']['sender_user_id'],
                                            order: object['order'],
                                            data:object,
                                            date:object['last_message']['date']
                                        }
                                    })
                                    document.dispatchEvent(updateChatLastMessage)
                                }
                                break
                            case 'WebRTC':
                                document.cookie = `webRTC= ${object['id']}`;
                                sessionStorage.setItem('uid',object['id']);
                                break
                            case 'updateNewChat':
                                let updateNewChat = new CustomEvent('updateNewChat', {
                                    detail: {
                                        data:object
                                    }
                                })
                                document.dispatchEvent(updateNewChat)
                                break
                            case 'updateSupergroup':
                                let updateSupergroup = new CustomEvent('updateSupergroup', {
                                    detail: {
                                        data:object
                                    }
                                })
                                document.dispatchEvent(updateSupergroup)
                                break
                            case 'updateUser':
                                let updateUser = new CustomEvent('updateUser', {
                                    detail: {
                                        first_name:object['user']['first_name'],
                                        id:object['user']['id'],
                                        last_name: object['user']['last_name'],
                                        phone_number:object['user']['phone_number'],
                                        username:object['user']['username'],
                                        data:object,
                                        status:object['user']['status']['_']
                                    }
                                })
                                document.dispatchEvent(updateUser)
                                break
                            case 'updateAuthorizationState':
                                switch (object['authorization_state']['_']) {
                                    case 'authorizationStateWaitCode':
                                        let authorizationStateWaitCode = new CustomEvent('authorizationStateWaitCode', {
                                            detail: {
                                                data:object
                                            }
                                        })
                                        document.dispatchEvent(authorizationStateWaitCode)
                                        break
                                    case 'updateMessageContent':
                                        let updateMessageContent = new CustomEvent('updateMessageContent', {
                                            detail: {
                                                data:object
                                            }
                                        })
                                        document.dispatchEvent(updateMessageContent)
                                        break
                                    case 'authorizationStateWaitEncryptionKey':
                                        let authorizationStateWaitEncryptionKey = new CustomEvent('authorizationStateWaitEncryptionKey', {
                                            detail: {
                                                data:object
                                            }
                                        })
                                        document.dispatchEvent(authorizationStateWaitEncryptionKey)
                                        break
                                    case 'authorizationStateWaitTdlibParameters':
                                        let authorizationStateWaitTdlibParameters = new CustomEvent('authorizationStateWaitTdlibParameters', {
                                            detail: {
                                                data:object
                                            }
                                        })
                                        document.dispatchEvent(authorizationStateWaitTdlibParameters)
                                        break
                                    case 'authorizationStateWaitPassword':
                                        let authorizationStateWaitPassword = new CustomEvent('authorizationStateWaitPassword', {
                                            detail: {
                                                data:object
                                            }
                                        })
                                        document.dispatchEvent(authorizationStateWaitPassword)
                                        break
                                    case 'authorizationStateReady':
                                        let authorizationStateReady = new CustomEvent('authorizationStateReady', {
                                            detail: {
                                                data:object
                                            }
                                        })
                                        document.dispatchEvent(authorizationStateReady)
                                        break
                                    case 'authorizationStateWaitRegistration':
                                        let authorizationStateWaitRegistration = new CustomEvent('authorizationStateWaitRegistration', {
                                            detail: {
                                                data:object
                                            }
                                        })
                                        document.dispatchEvent(authorizationStateWaitRegistration)
                                        break
                                    case 'authorizationStateLoggingOut':
                                        let authorizationStateLoggingOut = new CustomEvent('authorizationStateLoggingOut', {
                                            detail: {
                                                data:object
                                            }
                                        })
                                        document.dispatchEvent(authorizationStateLoggingOut)
                                        break
                                    case 'authorizationStateWaitPhoneNumber':
                                        let authorizationStateWaitPhoneNumber = new CustomEvent('authorizationStateWaitPhoneNumber', {
                                            detail: {
                                                data:object
                                            }
                                        })
                                        document.dispatchEvent(authorizationStateWaitPhoneNumber)
                                        break
                                    case 'authorizationStateClosed':
                                        let authorizationStateClosed = new CustomEvent('authorizationStateClosed', {
                                            detail: {
                                                data:object
                                            }
                                        })
                                        document.dispatchEvent(authorizationStateClosed)
                                        break
                                    default:
                                        console.warn('необрабатывается', object)
                                        break
                                }
                                break
                            default:
                                console.warn('необрабатывается', object)
                                break
                        }
                    });
                }
            }

            self() {
                return object
            }
        }
        resolve(object)
    })
}