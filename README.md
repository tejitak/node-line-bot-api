# Node LINE Bot API
node-line-bot-api is a node.js SDK for LINE Bot API.

LINE Bot API Docs
https://devdocs.line.me/


## Setup
### Install
` npm install node-line-bot-api --save`

### Auth
You can setup auth data with the following samples

* Use Server Key
```JavaScript
const line = require('node-line-bot-api')
line.init({
  accessToken: '{YOUR_ACCESS_TOKEN}',
  // (Optional) for webhook signature validation
  channelSecret: '{YOUR_CHANNEL_SECRET}'
})
```

## Push message sample

```JavaScript
'use strict'
const line = require('node-line-bot-api')

// init with auth
line.init({
  accessToken: '{YOUR_ACCESS_TOKEN}',
  // (Optional) for webhook signature validation
  channelSecret: '{YOUR_CHANNEL_SECRET}'
})

// simple push message with user MID
line.client
  .pushMessage({
    to: '{YOUR_MID}',
    messages:[
        {
            "type":"text",
            "text":"Hello, world1"
        },
        {
            "type":"text",
            "text":"Hello, world2"
        }
    ]
  })
```

## Webhook sample with Express

```JavaScript
'use strict'
const line = require('node-line-bot-api')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// need raw buffer for signature validation
app.use(bodyParser.json({
  verify (req, res, buf) {
    req.rawBody = buf
  }
}))

// init with auth
line.init({
  accessToken: 'YOUR_ACCESS_TOKEN',
  // (Optional) for webhook signature validation
  channelSecret: 'YOUR_CHANNEL_SECRET'
})

app.post('/webhook/', line.validator.validateSignature(), (req, res, next) => {
  // get content from request body
  const promises = req.body.events.map(event => {
    // reply message
    return line.client
      .replyMessage({
        replyToken: event.replyToken,
        messages: [
          {
            type: 'text',
            text: event.message.text
          }
        ]
      })
  })
  Promise
    .all(promises)
    .then(() => res.json({success: true}))
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Example app listening on port 3000!')
})

```

## Get a Message Content

```JavaScript
line.client
  .getMessageContent('xxxxxxxxxx' /* messageId */)
  .then((content) => {
    // handle content
  })
```

## Get a Profile

```JavaScript
line.client
  .getProfile('xxxxxxxxxx' /* userId */)
  .then((profile) => {
    // handle profile
    /**
     * {
     *   "displayName": "hoge hoge",
     *   "userId": "xxxxxxxxxx",
     *   "pictureUrl": "http://dl.profile.line-cdn.net/xxxxxxxxxx",
     *   "statusMessage": "fuga"
     * }
     */
  })
```

## Leave a Group

```JavaScript
line.client.leaveGroup('xxxxxxxxxx' /* groupId */)
```

## Leave a Room

```JavaScript
line.client.leaveRoom('xxxxxxxxxx' /* roomId */)
```
## Supported Node Version

Recommended node version is above v4.0.0 because this module is implemented with ES6.

## How to create a PR

Fork the repository and create a PR to 'develop' branch.
