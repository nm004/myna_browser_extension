function on_launchMKPFApp(e) {
  const msg = JSON.parse(e.detail)
  switch (msg.mode) {
  case 'ExistenceDetection':
    check_installation().then(send_response)
  default:
    window[msg.className][msg.methodName](msg).then(send_response)
  }
}

async function check_installation() {
  const d = {
    MKPF: 'exists'
  }
  return {
    extResult: '0',
    resultData: encodeURIComponent(JSON.stringify(d))
  }
}

window['RtMKRA010'] = class {
  static async executeLoginCard({sessionId, token, signatureTarget}) {
  
    const d = {
      sessionId    : sessionId,
      token        : token,
      errorMessage : '',
      mykeyId      : '',
      status       : '',
    }

    const pin = true
    if (!pin) {

      return {
        extResult: '',
        extMessage: '',
        resultData: encodeURIComponent(JSON.stringify(d))
      }
    }

    return {
      extResult: '0',
      resultData: encodeURIComponent(JSON.stringify(d))
    }
  }
}

window['RtMKRB010'] = class {
  static async executeOk (msg) {
    //const pin = PinReader.read_user_auth_pin()
    const d = {
      sessionId    : msg.sessionId,
      token        : msg.token,
      errorMessage : '',
      mykeyId      : '',
      status       : '',
    }

    const pin = true

    if (!pin) {
      
      return {
        extResult: '',
        extMessage: '',
        resultData: encodeURIComponent(JSON.stringify(d))
      }
    }

    return {
      extResult: '0',
      resultData: encodeURIComponent(JSON.stringify(d))
    }
  }
}

async function on_mode01(msg) {
  const mode = msg.mode
  const certificate = await card.fetch_user_auth_cert()
  const signature = await card.sign_with_user_auth(pin, msg.digest)
  const combination_code = await card.fetch_individual_number(pin)
}

function send_response(msg) {
  const detail = JSON.stringify(msg)
  const e = new CustomEvent('recvMKPFMsg', { detail })
  document.dispatchEvent(e)
}
