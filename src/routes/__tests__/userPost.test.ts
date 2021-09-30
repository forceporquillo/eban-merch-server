import request from 'supertest';
import createApp from '../../app';
// define mock database functions
import db from '../../database/mockDatabase';
import HttpException from '../../exceptions/HttpException.class';

import logging from '../../config/logging';
const NAMESPACE = 'User Post Test';

const app = createApp(db);

describe('POST /api/user', () => {
    // should respond with 201 created status code
    // should specify json in content type header
    // should store into database
    // it return json with message string and data containing the user id

    beforeEach(() => {
        db.postUser.mockReset();
        db.emailExists.mockReset();
        db.contactExists.mockReset();
    });
    // test constants
    const testRoute = '/api/user';
    it('should return a message string and data containing the user id', async () => {
        const testData = [
            {
                email: 'john@mail.com',
                name: 'John Smith',
                password: '!Asdf1234',
                address: 'New York',
                contact: '09566121716',
                sex: 0,
                birthdate: '1999-09-01'
            },
            {
                email: 'jack@mail.com',
                name: 'Jack Gordon',
                password: '!Asdf1234',
                address: 'Boston',
                contact: '09566121715',
                sex: 1,
                birthdate: '1999-09-02'
            }
        ];
        const testId = [1, 2];
        for (let i = 0; i < testId.length; i++) {
            const body = testData[i];
            const id = testId[i];
            // mock functions setup
            db.postUser.mockReset();
            db.postUser.mockResolvedValue(id);

            db.emailExists.mockReset();
            db.emailExists.mockResolvedValue(false);

            db.contactExists.mockReset();
            db.contactExists.mockResolvedValue(false);

            // make the request
            const response = await request(app).post(testRoute).send(body);

            // expects
            expect(response.statusCode).toBe(201);
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
            expect(db.postUser.mock.calls.length).toBe(1);
            expect(db.postUser.mock.calls[0][0]).toEqual(body);
            expect(db.emailExists.mock.calls.length).toBe(1);
            expect(db.emailExists.mock.calls[0][0]).toEqual(body.email);
            expect(db.contactExists.mock.calls.length).toBe(1);
            expect(db.contactExists.mock.calls[0][0]).toEqual(body.contact);
            expect(response.body).toEqual({
                message: 'User created successfully.',
                data: {
                    userID: id
                }
            });
        }
    });

    it('should return a message and error object when given an invalid email', async () => {
        // should return a 400 stat
        // should return a message and error object
        const body = {
            email: 'johnsmith',
            name: 'John Smith',
            password: '!Asdf1234',
            address: 'New York',
            contact: '09566121716',
            sex: 0,
            birthdate: '1999-09-01'
        };

        // mock functions not needed

        // make the request
        const response = await request(app).post(testRoute).send(body);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message:
                'Email is invalid please input your email correctly. (eg. abcd.xyz_123@domain.com )',
            error: { status: 400 }
        });
    });

    it('should return a message and error object when given an invalid password', async () => {
        // should return a 400 stat
        // should return a message and error object
        // TODO: improve coverage of test cases
        const body = {
            email: 'john@email.com',
            name: 'John Smith',
            password: 'loremipsum',
            address: 'New York',
            contact: '09566121716',
            sex: 0,
            birthdate: '1999-09-01'
        };

        const testPasswords = ['', '!As12', '!asdf12345'];
        const testMessages = [
            'Password is empty.',
            'Password length must be greater than or equals 8 but less than or equals 32.',
            'Password must be atleast one uppercase letter, one lowercase letter, one number and one special character.'
        ];

        for (let i = 0; i < testPasswords.length; i++) {
            // cycle through passwords
            body.password = testPasswords[i];

            // mock functions not needed

            // make the request
            const response = await request(app).post(testRoute).send(body);

            logging.info(NAMESPACE, 'response: ', response.body);
            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                message: testMessages[i],
                error: { status: 400 }
            });
        }
    });
});
