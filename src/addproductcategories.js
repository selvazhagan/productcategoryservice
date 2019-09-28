"use strict";

const DynamDBConnection = require("./utils/dynamoDBUtils.js");

module.exports.addproductcategory = async event => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.PRODUCT_CATEGORY_TABLE,
    Item: {
      id: data.id,
      productCategoryInfo: data,
      createdAt: timestamp,
      updatedAt: timestamp
    }
  };
  const dynamDBConnection = new DynamDBConnection();
  const response = dynamDBConnection.createDoc(params);
  return {
    statusCode: 200,
    body: JSON.stringify(response, null, 2)
  };
};
