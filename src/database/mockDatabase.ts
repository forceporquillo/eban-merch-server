/**
 * mocked database functions
 * should match database interface
 */

// product functions
const getProducts = jest.fn();
const getProduct = jest.fn();

// user functions
const postUser = jest.fn();

// helper functions
const emailExists = jest.fn();
const contactExists = jest.fn();
// TODO: delete this test query
const mockGetAll = jest.fn();

const mockDatabase = {
    getProducts,
    getProduct,
    postUser,
    emailExists,
    contactExists,
    mockGetAll
};

export default mockDatabase;
