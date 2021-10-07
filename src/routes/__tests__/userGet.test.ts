import request from 'supertest';
import jwt from 'jsonwebtoken';
import createApp from '../../app';
import config from '../../config/config';
// define mock database functions
import db from '../../database/mockDatabase';

const app = createApp(db);

describe('GET /api/user - get list of all products based on Authorization header', () => {
    // should respond with 200 status code
    // should specify json in content type header
    // should fetch from database
    // it return json with message string and data containing the list

    beforeEach(() => {
        db.getUserById.mockReset();
    });

    // test constants
    const testRoute = '/api/user';
    const testData = [
        {
            email: 'john@mail.com',
            name: 'John Smith',
            address: 'New York',
            contact: '09566121716',
            sex: 0,
            birthdate: '1999-09-01'
        },
        {
            email: 'jack@mail.com',
            name: 'Jack Gordon',
            address: 'Boston',
            contact: '09566121715',
            sex: 1,
            birthdate: '1999-09-02'
        }
    ];

    const ids = [1, 2];

    const tokens: Array<string> = [];

    const signOptions = { expiresIn: 3 * 24 * 60 * 60 };
    // sign test tokens
    for (const id of ids) {
        tokens.push(jwt.sign({ id }, config.key.secret, signOptions));
    }

    it('it should return json with message string and data containing the list', async () => {
        for (let i = 0; i < testData.length; i++) {
            const body = testData[i];
            // mock function setup
            db.getUserById.mockReset();
            db.getUserById.mockResolvedValue(body);

            // make the request
            const response = await request(app)
                .get(testRoute)
                .set('Authorization', `Bearer ${tokens[i]}`)
                .send();

            // expects
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
            expect(db.getUserById.mock.calls.length).toBe(1);
            expect(db.getUserById.mock.calls[0][0]).toBe(ids[i]);
            expect(response.body).toEqual({
                message: 'Query Success.',
                data: testData[i]
            });
        }
    });
});
