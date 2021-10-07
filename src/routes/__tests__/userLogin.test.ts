import request from 'supertest';
import createApp from '../../app';
// define mock database functions
import db from '../../database/mockDatabase';

const app = createApp(db);

describe('POST /api/user/login - login a user', () => {
    // should respond with 200 status code
    // should specify json in content type header
    // should fetch from database
    // it return json with message string and data containing the list

    beforeEach(() => {
        db.loginUser.mockReset();
    });

    // test constants
    const testRoute = '/api/user/login';
    const testData = [
        {
            email: 'john@mail.com',
            password: '!Asdf1234',
            id: 1
        },
        {
            email: 'jack@mail.com',
            password: '!Asdf1234',
            id: 2
        }
    ];

    it('it should return json with message string and data containing the list', async () => {
        for (const body of testData) {
            // mock function setup
            db.loginUser.mockReset();
            db.loginUser.mockResolvedValue(body.id);

            // make the request
            const response = await request(app).post(testRoute).send(body);

            // expects
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
            expect(db.loginUser.mock.calls.length).toBe(1);
            expect(db.loginUser.mock.calls[0][0]).toBe(body.email);
            expect(db.loginUser.mock.calls[0][1]).toBe(body.password);
            // expect(response.body).toEqual({
            //     message: 'Query Success.',
            //     data: testProducts
            // });
        }
    });
});
