var path = require('path');

module.exports = {
  mongo: {
    dbUrl: 'https://api.mongolab.com/api/1',      // The base url of the MongoLab DB server
    apikey: 'dkksdjhfkjs'
  },
  security: {
    dbName: 'ascrum',
    usersCollection: 'users'
  },
  server: {
    listenPort: 3000,
    securePort: 8433,
    distFolder: path.resolve(__dirname, '../angularjs-scrum/dist'),
    staticUrl: '/static',
    cookieSecret: 'angular-app'
  }
};
