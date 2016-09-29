# Node LINE Bot API
node-line-bot-api is a node client wrapper for LINE Bot API.

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
  // (Optional) need webhook signature validation
  channelSecret: '{YOUR_CHANNEL_SECRET}'
})
```

## Sample push message

```JavaScript
'use strict'
const line = require('node-line-bot-api')

// init with auth
line.init({
  accessToken: '{YOUR_ACCESS_TOKEN}',
  // (Optional) need webhook signature validation
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
const line = require('./index')
const express = require('express')
const bodyParser = require('body-parser')
const lineClient = line.client
const lineValidator = line.validator
const app = express()
app.use(bodyParser.json())

// init with auth
line.init({
  accessToken: 'YOUR_ACCESS_TOKEN',
  // (Optional) need webhook signature validation
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

## Supported Node Version

Recommended node version is above v4.0.0 because this module is implemented with ES6.

## How to create a PR

Fork the repository and create a PR to 'develop' branch.
