// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class restaurants extends Model {
  static get tableName() {
    return 'restaurants';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        name: {
          type: 'string',
        },
      },
    };
  }

  $beforeInsert() {
    this.createdAt = this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = function(app) {
  const db = app.get('knex');

  db.schema
    .hasTable('restaurants')
    .then(exists => {
      if (!exists) {
        db.schema
          .createTable('restaurants', table => {
            table.increments('id');
            table.string('name');
            table.timestamp('createdAt');
            table.timestamp('updatedAt');
          })
          .then(() => console.log('Created restaurants table')) // eslint-disable-line no-console
          .catch(e => console.error('Error creating restaurants table', e)); // eslint-disable-line no-console
      }
    })
    .catch(e => console.error('Error creating restaurants table', e)); // eslint-disable-line no-console

  return restaurants;
};
