'use strict'
const Service = require('./lib/clients/v2/Service')
const SignatureValidator = require('./lib/clients/v2/SignatureValidator')

module.exports = {

  init (options) {
    this.client = new Service(options)
    this.validator = new SignatureValidator(options)
  }

}
