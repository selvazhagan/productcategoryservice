'use strict';
const DynamDBConnection = require('./utils/dynamoDBUtils.js');


module.exports.getproductcategory = async event => {

  const id = event.pathParameters.id;
  const params = {
    TableName: process.env.PRODUCT_CATEGORY_TABLE,
    Key : {
      id
    }
  }
  const dynamDBConnection = new DynamDBConnection();
  const response = await dynamDBConnection.fetchDoc(params);
  console.log(response);

  return {
    statusCode: 200,
    body: JSON.stringify(
      response,
      null,
      2
    ),
  };

};
