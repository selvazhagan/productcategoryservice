const DynamDBConnection = require('./utils/dynamoDBUtils.js');

module.exports.getproductcategory = async event => {
  const { id } = event.pathParameters;
  const params = {
    TableName: process.env.PRODUCT_CATEGORY_TABLE,
    Key: {
      id
    }
  };
  const dynamDBConnection = new DynamDBConnection();
  try {
    const response = await dynamDBConnection.fetchDoc(params);
    return {
      statusCode: 200,
      body: JSON.stringify(response, null, 2)
    };
  } catch (err) {
    return {
      statusCode: err.statusCode,
      body: JSON.stringify(err, null, 2)
    };
  }
};
