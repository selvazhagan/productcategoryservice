#ProductCategoryService

1. AWS dynamoDB to store product categories
2. Serverless Aws Lambda function to fetch and add product category
3. Eslint & Airbnb base for linting
4. Prittier for formating
5. Jest for unit testing & code coverage


Create table Query :

aws dynamodb create-table --table-name ProductCategories --attribute-definitions AttributeName=id,AttributeType=S AttributeName=activeInd,AttributeType=S --key-schema AttributeName=id,KeyType=HASH AttributeName=activeInd,KeyType=RANGE --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 --endpoint-url http://localhost:8000