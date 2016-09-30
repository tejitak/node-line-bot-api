'use strict'
const crypto = require('crypto')

const SIGNATURE_HEADER = 'x-line-signature'
const HASH_ALGORITHM = 'sha256'

module.exports = class SignatureValidator {

  /**
   * @param {String} accessToken
   * @param {String} channelSecret opitonal for webhook
   */

  constructor (options) {
    this._options = options || {}
  }

  validateSignature () {
    return (req, res, next) => {
      const channelSecret = this._options.channelSecret
      if (!channelSecret) {
        throw new Error('A channel secret is required')
      }
      if (!req.headers[SIGNATURE_HEADER]) {
        throw new Error('A signature header is required')
      }
      // generate & validate signature from request header
      if (req.headers[SIGNATURE_HEADER] === this.generateSignature(channelSecret, req.rawBody)) {
        next()
      } else {
        next(new Error('Signature validation is faild'))
      }
    }
  }

  generateSignature (key, body) {
    let hmac = crypto.createHmac(HASH_ALGORITHM, key)
    hmac = hmac.update(body)
    return hmac.digest('base64')
  }
}
