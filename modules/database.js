const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'ExodusBot';

module.exports = (client) => {
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    // client.logger.log("Connected successfully to server");
    const db = client.db(dbName);
  });
};
