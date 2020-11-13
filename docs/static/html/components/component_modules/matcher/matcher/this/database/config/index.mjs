let config = {}






config['now'] = {}
config['local'] = {}
config['local']['1.0'] = 'http://localhost:3002'
config['now']['0.6'] = 'https://soundlane-b2b652bpi.now.sh'

config['mongo'] = {}
// config['mongo']['local'] = 'http://localhost:3003'
config['mongo']['web'] = 'https://server-mongo.zababurinsv.now.sh'
// config['mongo']['web'] = 'http://localhost:3003'
// config['mongo']['web'] = 'http://localhost:3003'

config['waves'] = {}
// config['waves']['local'] = 'http://localhost:3005'
config['waves']['web'] = 'https://waves.zababurinsv.now.sh'
// config['waves']['web'] = 'http://localhost:3000'


config['store'] = {}
config['store']['local'] = 'http://localhost:4000'
config['store']['localNow'] = 'http://localhost:3000'
config['store']['web'] = 'https://server-webdav.now.sh'

config['email'] = {}
config['email']['local'] = 'http://localhost:3007'
config['email']['localNow'] = 'http://localhost:3000'
config['email']['web'] = 'https://email.zababurinsv.now.sh'


config['account'] = {}
config['account']['local'] = 'http://localhost:3009'
config['account']['web'] = 'https://account-git-master.szababurinv.now.sh'
// config['account']['web'] = 'http://localhost:3009'

config['account']['dappaddress'] = '3N8n4Lc8BMsPPyVHJXTivQWs7ER61bB7wQn'
config['account']['this'] = `${config['account']['dappaddress']}?matches=`
config['account']['testnodes'] = 'https://pool.testnet.wavesnodes.com'
// config['account']['sse'] = 'http://localhost:3009/stream'
config['account']['sse'] = 'https://account.zababurinsv.now.sh/stream'


export default{
  local: config['local'],
  now: config['now'],
  feed: config['school'],
  feedWebSchool: config['feedWebSchool'],
  store: config['store'],
  waves:config['waves'],
  email:config['email'],
  mongo:config['mongo'],
  account:config['account'],

}
