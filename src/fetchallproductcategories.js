const DynamoDbUtils = require('./utils/dynamoDBUtils');

module.exports.fetchallproductcategories = async () => {
  const params = {
    TableName: process.env.PRODUCT_CATEGORY_TABLE
  };

  const dynamoDbUtils = new DynamoDbUtils();
  const response = await dynamoDbUtils.fetchAll(params);
  return {
    statusCode: 200,
    body: JSON.stringify(response, null, 2)
  };
};
