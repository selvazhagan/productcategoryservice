const addproductCategory = require('../src/addproductcategories.js');
const DynamoDBUtils = require('../src/utils/dynamoDBUtils.js');
const ADDPRODUCTEVENT = require('../__tests__/sampleEvent.json');
jest.mock('../src/utils/dynamoDBUtils.js');
describe('When product category added successfully', () => {
  beforeAll(() => {
    DynamoDBUtils.mockImplementation(() => {
      return {
        createDoc: () => {
          return {
            message: 'product category added successfully'
          };
        }
      };
    });
  });

  beforeEach(() => {
    DynamoDBUtils.mockClear();
  });

  it('We can check if the DynamoDBUtils called the class constructor', () => {
    const dynamoDBUtils = new DynamoDBUtils();
    expect(DynamoDBUtils).toHaveBeenCalledTimes(1);
  });

  it('product category added succesfully', async done => {
    const event = ADDPRODUCTEVENT;
    const response = await addproductCategory.addproductcategory(event);
    done();
    expect(DynamoDBUtils).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toEqual(200);
  });
});

describe('When product category added failed', () => {
  beforeAll(() => {
    DynamoDBUtils.mockImplementation(() => {
      return {
        createDoc: () => {
          throw {
            statusCode: 500,
            message: 'Resource not found'
          };
        }
      };
    });
  });

  beforeEach(() => {
    DynamoDBUtils.mockClear();
  });

  it('product category create failed', async done => {
    const event = ADDPRODUCTEVENT;
    const response = await addproductCategory.addproductcategory(event);
    done();
    expect(response.statusCode).toEqual(500);
  });
});
