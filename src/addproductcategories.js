const DynamDBConnection = require('./utils/dynamoDBUtils.js');

module.exports.addproductcategory = async event => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.PRODUCT_CATEGORY_TABLE,
    Item: {
      id: data.id,
      productCategoryInfo: data,
      activeInd: data.activeind,
      createdAt: timestamp,
      updatedAt: timestamp
    }
  };
  const dynamDBConnection = new DynamDBConnection();
  try {
    const response = await dynamDBConnection.createDoc(params);
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
