const AWS = require('aws-sdk');

class DynamoDbUtils {
  constructor() {
    AWS.config.update({
      endpoint: 'http://localhost:8000',
      accessKeyId: 'dummy',
      secretAccessKey: 'dummy'
    });

    this.dynamodbClient = new AWS.DynamoDB.DocumentClient({
      convertEmptyValues: true
    });
  }

  fetchDoc(documentObject) {
    return new Promise((resolve, reject) => {
      this.dynamodbClient.get(documentObject, (err, data) => {
        if (!err) {
          resolve(data);
        }
        reject(err);
      });
    });
  }

  createDoc(documentObject) {
    return new Promise((resolve, reject) => {
      this.dynamodbClient.put(documentObject, (err, data) => {
        if (!err) {
          resolve(data);
        }
        reject(err);
      });
    });
  }

  fetchAll(documentObject) {
    return new Promise((resolve, reject) => {
      this.dynamodbClient.scan(documentObject, (err, data) => {
        if (!err) {
          resolve(data);
        }
        reject(err);
      });
    });
  }
}

module.exports = DynamoDbUtils;
