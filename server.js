const cds = require('@sap/cds')

cds.on('bootstrap', app => {
  // Fake login user (for local dev)
  const cors = require('cors');
  app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  }))
  app.use((req, res, next) => {
    // Mỗi request gán user giả vào
    req.user = new cds.User({
      id: 'test-user',
      roles: ['authenticated-user', 'Admin']
    })
    next()
  })
})

module.exports = cds.server
