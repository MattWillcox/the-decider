// Initializes the `restaurants` service on path `/restaurants`
const createService = require('feathers-objection');
const createModel = require('../../models/restaurants.model');
const hooks = require('./restaurants.hooks');

module.exports = function(app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
  };

  // Initialize our service with any options it requires
  app.use('api/v1/restaurants', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/v1/restaurants');

  service.hooks(hooks);
};
