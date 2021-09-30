import request from 'supertest';
import createApp from '../../app';
// define mock database functions
import db from '../../database/mockDatabase';

const app = createApp(db);

describe('GET /api/product/all - get list of all products', () => {
    // should respond with 200 status code
    // should specify json in content type header
    // should fetch from database
    // it return json with message string and data containing the list

    beforeEach(() => {
        db.getProducts.mockReset();
    });

    // test constants
    const testRoute = '/api/product/all';
    const testProducts = [
        {
            id: 1,
            name: 'Hoodie',
            image: 'https://i.imgur.com/uFZgIQf.png',
            category: 'HOODIES',
            description: 'Hoodie for your hood.',
            stocks: 11,
            price: 300
        },
        {
            id: 2,
            name: 'Hat',
            image: 'https://i.imgur.com/DxlTwdN.png',
            category: 'HATS',
            description: 'Hat for your head.',
            stocks: 34,
            price: 350
        }
    ];

    it('it should return json with message string and data containing the list', async () => {
        // mock function setup
        db.getProducts.mockReset();
        db.getProducts.mockResolvedValue(testProducts);

        // make the request
        const response = await request(app).get(testRoute).send();

        // expects
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(db.getProducts.mock.calls.length).toBe(1);
        expect(response.body).toEqual({
            message: 'Query Success.',
            data: testProducts
        });
    });
});
