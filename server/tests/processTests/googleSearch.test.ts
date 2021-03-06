const request = require('supertest');
import Routes from '../../src/providers/Routes';
import express from 'express'
import Locals from '../../src/providers/Locals';
import session from 'express-session';
import Passport from '../../src/providers/Passport';
import passport from 'passport';

let app: express.Application = express();
app.use(express.json());

const options = {
    resave: true,
    saveUninitialized: true,
    secret: Locals.config().appSecret,
    cookie: {
        maxAge: 1209600000
    }
};

app.use(session(options))

app = Passport.mountPackage(app, passport);

app = Routes.mountApi(app);

describe('Test googleSearch', () => {

    const user = {
        username: "existingadmin@test.com",
        password: "adminPass22"
    }

    const body = {
        text: "google SEO",
        index: 0,
    }

    test('It must show "You are not authenticated!" when the user did not logged in.', async () => {
        const response = await request(app)
            .post('/api/search')
            .send(body)
            .expect('Content-Type', /json/)
            .expect(401);

        expect(response.body.data.message).toStrictEqual("You are not authenticated!");
    });

    test('It must show "The field text is empty." when the field text is empty', async () => {
        const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(user)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(loginResponse.body.data.session).toBeDefined()

        body.text = ""

        const response = await request(app)
            .post('/api/search')
            .set('Cookie', loginResponse.header['set-cookie'])
            .send(body)
            .expect('Content-Type', /json/)
            .expect(200);

        if (response.body.errors !== undefined) {
            expect(response.body.errors[0].message).toStrictEqual("The field text is empty.");
        }

        await request(app)
            .post('/api/auth/logout')
            .set('Cookie', loginResponse.header['set-cookie'])
            .expect('Content-Type', /json/)
            .expect(200);
    });

    test('It must return the first 10 results on search request', async () => {
        const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(user)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(loginResponse.body.data.session).toBeDefined()

        body.text = "google SEO"

        const response = await request(app)
            .post('/api/search')
            .set('Cookie', loginResponse.header['set-cookie'])
            .send(body)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.data.success).toBe(true);
        expect(response.body.data.results.length).toBe(10);

        const logoutresponse = await request(app)
            .post('/api/auth/logout')
            .set('Cookie', loginResponse.header['set-cookie'])
            .expect('Content-Type', /json/)
            .expect(200);

        expect(logoutresponse.body.data.session).toBeUndefined()
    });

    test('It must return the next 10 results when sets the index to 10', async () => {

        const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(user)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(loginResponse.body.data.session).toBeDefined()

        body.text = "google SEO"

        const response = await request(app)
            .post('/api/search')
            .set('Cookie', loginResponse.header['set-cookie'])
            .send(body)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.data.success).toBe(true);

        body.index = 10
        const responseNext = await request(app)
            .post('/api/search')
            .set('Cookie', loginResponse.header['set-cookie'])
            .send(body)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(responseNext.body.data.success).toBe(true);
        expect(responseNext.body.data.results.length).toBe(10);

        const logoutresponse = await request(app)
            .post('/api/auth/logout')
            .set('Cookie', loginResponse.header['set-cookie'])
            .expect('Content-Type', /json/)
            .expect(200);

        expect(logoutresponse.body.data.session).toBeUndefined()

    });

    test('It must return the previews 10 results when sets index to 0', async () => {
        const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(user)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(loginResponse.body.data.session).toBeDefined()

        body.text = "google SEO"

        const _body = {
            text: "google SEO"
        }

        const response = await request(app)
            .post('/api/search')
            .set('Cookie', loginResponse.header['set-cookie'])
            .send(_body)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.data.success).toBe(true);
        expect(response.body.data.results.length).toBe(10);

        body.index = 10

        const responseNext = await request(app)
            .post('/api/search')
            .set('Cookie', loginResponse.header['set-cookie'])
            .send(body)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(responseNext.body.data.success).toBe(true);
        expect(responseNext.body.data.results.length).toBe(10);

        body.index = 0

        const responsePrevious = await request(app)
            .post('/api/search')
            .set('Cookie', loginResponse.header['set-cookie'])
            .send(body)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(responsePrevious.body.data.success).toBe(true);
        expect(responsePrevious.body.data.results.length).toBe(10);
        expect(responsePrevious.body.data.results[0].title).toEqual(response.body.data.results[0].title);

        const logoutresponse = await request(app)
            .post('/api/auth/logout')
            .set('Cookie', loginResponse.header['set-cookie'])
            .expect('Content-Type', /json/)
            .expect(200);

        expect(logoutresponse.body.data.session).toBeUndefined()

    });

})