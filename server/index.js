// third-party
const express = require('express');

/**
 * Function that instantiates the application
 */
function createInventoryAPI(options) {

  if (!options.mongodbURI) {
    throw new Error('mongodbURI is required');
  }

  if (!options.secret) {
    throw new Error('secret is required');
  }

  // create express app instance
  var app = express();

  // make constants available throughout the application
  app.constants = require('../shared/constants');

  // make the error constructors available throughout the application
  app.errors = require('../shared/errors');

  // setup services
  require('./app/services')(app, options);

  // instantiate controllers
  app.controllers = {};
  app.controllers.organization =
    require('./app/controllers/organization')(app, options);
  app.controllers.organizationContact =
    require('./app/controllers/organization-contact')(app, options);
  app.controllers.productModel =
    require('./app/controllers/product-model')(app, options);
  app.controllers.user =
    require('./app/controllers/user')(app, options);
  app.controllers.auth =
    require('./app/controllers/auth')(app, options);
  app.controllers.operation =
    require('./app/controllers/operation')(app, options);
  app.controllers.shipment =
    require('./app/controllers/shipment')(app, options);
  app.controllers.inventory =
    require('./app/controllers/inventory')(app, options);

  // instantiate middleware for usage in routes
  app.middleware = {};
  app.middleware.authenticate =
    require('./app/middleware/authenticate').bind(null, app);

  // define description route
  app.get('/who', function (req, res) {
    res.json({ name: 'inventory-api' });
  });

  // load routes
  // require('./app/routes/inventory')(app, options);

  // load error-handlers
  require('./app/error-handlers/inventory-api-error')(app, options);

  return app;
}

module.exports = createInventoryAPI;