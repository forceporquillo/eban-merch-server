import request from 'supertest';
import createApp from '../../app';
// define mock database functions
import db from '../../database/mockDatabase';

const app = createApp(db);

describe('GET /product/:id - get data of specific product', () => {
    // should respond with 200 status code
    // should specify json in content type header
    // should fetch from database
    // it return json with message string and data containing the list

    beforeEach(() => {
        db.getProduct.mockReset();
    });

    // test constants
    const testRoute = '/api/product';
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

    it('should return json with message string and data containing the product when id exists', async () => {
        for (const param of testProducts) {
            // mock function setup
            db.getProduct.mockReset();
            db.getProduct.mockResolvedValue(param);

            // make the request
            const response = await request(app).get(`${testRoute}/${param.id}`).send();

            // expects
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
            expect(db.getProduct.mock.calls.length).toBe(1);
            expect(db.getProduct.mock.calls[0][0]).toEqual(param.id.toString());
            expect(response.body).toEqual({
                message: 'Query Success.',
                data: param
            });
        }
    });

    it('should return json with message string and error object when product id does not exist', async () => {
        // test id
        const wrongId = 123;
        // mock function setup
        db.getProduct.mockReset();
        db.getProduct.mockResolvedValue(null);

        // make the request
        const response = await request(app).get(`${testRoute}/${wrongId}`).send();

        // expects
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({
            message: 'Product does not exist.',
            error: expect.any(Object)
        });
    });
});
