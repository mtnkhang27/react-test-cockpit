const cds = require('@sap/cds')
const cors = require('cors')

cds.on('bootstrap', app => {

  app.use(cors({
    origin: [
                    "https://cnma-test-guest-frontend.cfapps.eu10.hana.ondemand.com",

      'http://localhost:3006', // local dev
      'https://port3006-workspaces-ws-k6m30.ap11.applicationstudio.cloud.sap' // Cloud FE
    ],
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
  }))

  // Fake login
  // app.use((req, res, next) => {
  //   req.user = new cds.User({
  //     id: 'test-user',
  //     roles: ['authenticated-user', 'Admin']
  //   })
  //   next()
  // })
})

module.exports = cds.server
