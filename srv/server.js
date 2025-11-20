const cds = require('@sap/cds');
const cors = require('cors');

cds.on('bootstrap', (app) => {
  // Enable CORS cho tất cả các domain (dev local)
  app.use(cors());

  // Middleware fake user cho dummy auth (local dev)
  app.use((req, res, next) => {
    req.user = { id: 'alice', roles: ['User'] }; // fake user
    next();
  });
});

module.exports = cds.server;
