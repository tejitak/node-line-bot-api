'use strict'
const line = require('./index')

// init with auth token
line.init({
  accessToken: '{YOUR_ACCESS_TOKEN}',
  // (Optional) for webhook signature validation
  channelSecret: '{YOUR_CHANNEL_SECRET}'
})

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
  .then(() => console.log({success: true}))
  .catch(err => console.log(err))
