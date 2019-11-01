const getproductcategory = require('../src/getproductcategory.js');
const DynamoDBUtils = require('../src/utils/dynamoDBUtils.js');
const GETALLPRODUCTSJSON = require('../__tests__/sampleEvent.json');
jest.mock('../src/utils/dynamoDBUtils.js');

describe('getAllProductCategories success', () => {
  beforeAll(() => {
    DynamoDBUtils.mockImplementation(() => {
      return {
        fetchDoc: () => {
          return {
            categoryId: 1,
            categoryName: 'Rice'
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

  it('getAllProductCategories success', async done => {
    const event = GETALLPRODUCTSJSON;
    const response = await getproductcategory.getproductcategory(event);
    done();
    expect(response.statusCode).toEqual(200);
  });
});

describe('getAllProductCategories failed', () => {
  beforeAll(() => {
    DynamoDBUtils.mockImplementation(() => {
      return {
        fetchDoc: () => {
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

  it('getAllProductCategories failed', async done => {
    const event = GETALLPRODUCTSJSON;
    const response = await getproductcategory.getproductcategory(event);
    done();
    expect(response.statusCode).toEqual(500);
  });
});
