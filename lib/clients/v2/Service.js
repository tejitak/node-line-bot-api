'use strict'
const requestUtil = require('../../utils/requestUtil')

const API_BASE = 'https://api.line.me/v2'

module.exports = class Client {

  /**
   * @param {String} accessToken
   * @param {String} channelSecret opitonal for webhook
   */

  constructor (options) {
    this._options = options || {}
  }

  /**
   * replyMessage
   * @param {Object} replyMessage
   */

   replyMessage (replyMessage) {
    return requestUtil.post(Object.assign(this._options, {
      url: `${API_BASE}/bot/message/reply`,
      body: replyMessage
    }))
   }

  /**
   * pushMessage
   * @param {Object} pushMessage
   */

   pushMessage (pushMessage) {
    return requestUtil.post(Object.assign(this._options, {
      url: `${API_BASE}/bot/message/push`,
      body: pushMessage
    }))
   }

  /**
   * getMessageContent
   * @param {String} messageId
   */

   getMessageContent (messageId) {
    return requestUtil.get(Object.assign(this._options, {
      url: `${API_BASE}/bot/message/${messageId}/content`
    }))
  }

  /**
   * getProfile
   * @param {String} userId
   */

   getProfile (userId) {
    return requestUtil.get(Object.assign(this._options, {
      url: `${API_BASE}/bot/profile/${userId}`
    }))
   }

  /**
   * leaveGroup
   * @param {String} groupId
   */

   leaveGroup (groupId) {
    return requestUtil.post(Object.assign(this._options, {
      url: `${API_BASE}/bot/group/${groupId}/leave`
    }))
   }

  /**
   * leaveRoom
   * @param {String} roomId
   */

   leaveRoom (roomId) {
    return requestUtil.post(Object.assign(this._options, {
      url: `${API_BASE}/bot/room/${roomId}/leave`
    }))
   }
}
