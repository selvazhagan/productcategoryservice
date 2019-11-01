const fetchAllProductCategories = require('../src/fetchallproductcategories.js');
const DynamoDBUtils = require('../src/utils/dynamoDBUtils.js');
const FETCHPRODUCTEVENTJSON = require('../__tests__/sampleEvent.json');
jest.mock('../src/utils/dynamoDBUtils.js');

describe('Validate fetch all categories success usecases', () => {
  beforeAll(() => {
    DynamoDBUtils.mockImplementation(() => {
      return {
        fetchAll: () => {
          return {
            productCategories: [
              {
                categoryId: 1,
                categoryName: 'Rice'
              }
            ]
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

  it('fetch product category succcess', async done => {
    const FETCHEVENT = FETCHPRODUCTEVENTJSON;
    const response = await fetchAllProductCategories.fetchallproductcategories(FETCHEVENT);
    done();
    expect(response.statusCode).toEqual(200);
  });
});

describe('fetchAllProductCategories failed', () => {
  beforeAll(() => {
    DynamoDBUtils.mockImplementation(() => {
      return {
        fetchAll: () => {
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

  it('fetchAllProductCategories failed', async done => {
    const FETCHEVENT = FETCHPRODUCTEVENTJSON;
    const response = await fetchAllProductCategories.fetchallproductcategories(FETCHEVENT);
    done();
    expect(response.statusCode).toEqual(500);
  });
});
