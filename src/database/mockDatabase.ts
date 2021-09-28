// mocked database functions
// should match database interface
const getProducts = jest.fn();
const getProduct = jest.fn();
// TODO: delete this test query
const mockGetAll = jest.fn();

const mockDatabase = {
    getProducts,
    getProduct,
    mockGetAll
};

export default mockDatabase;
