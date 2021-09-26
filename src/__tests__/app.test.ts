import request from 'supertest';
import createApp from '../app';
import mockDatabase from '../database/mockDatabase';

const app = createApp(mockDatabase);

describe('GET / - a simple api endpoint', () => {
    // should respond with json containing success flag, success message and data
    // should respond with 200 status code
    // should specify json in content type header
    it('it should return json with message string', async () => {
        const response = await request(app).get('/').send();

        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.body).toEqual({
            message: 'Welcome to the API!'
        });
    });
});
