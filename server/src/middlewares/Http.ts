/**
 * Defines all the requisites in HTTP
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

import * as express from 'express';
import * as flash from 'express-flash';
import * as compress from 'compression';
import * as session from 'express-session';
import * as connectRedis from "connect-redis";
import { createClient } from "redis";


import Log from './Log';
import Locals from '../providers/Locals';
import Passport from '../providers/Passport';
import CORS from './CORS';

class Http {
	public static mount(_express: express.Application): express.Application {
		Log.info('Booting the \'HTTP\' middleware...');

		// Enables the request body parser
		_express.use(express.json());

		// Disable the x-powered-by header in response
		_express.disable('x-powered-by');

		// Enables the request flash messages
		_express.use(flash());

		/**
		 * Enables the session store
		 *
		 * Note: You can also add redis-store
		 * into the options object.
		 */

		//Configuring redis store for session 172.18.0.2
		let RedisStore = connectRedis(session)
		let redisClient = createClient({
			socket: {
				host: 'redis',
				port: 6379
			},
			legacyMode: true,
		})
		redisClient.connect().catch(console.error)


		/**
		 * There have been some problems with the implementation of 
		 * express session in production. This causes the session to only work in firefox.
		 * 
		 * - First the sameSite=None (caused by chrome update in 2020)
		 *   doesn't work in production.
		 * 		(https://medium.com/swlh/how-the-new-chrome-80-cookie-rule-samesite-none-secure-affects-web-development-c06380220ced#2410)
		 * 
		 * - Second trying to add a store to save the sessions with 
		 *   redis, it doesn't work either.
		 * 		(https://stackoverflow.com/questions/48073536/express-session-is-not-persisting-in-production)
		 * 
		 *   Note: Since this is a demo project for the React front end, we will disable (temporarily) access control to the APIs necessary for the app to work.
		 */
		const options: session.SessionOptions = {
			resave: true,
			saveUninitialized: true,
			secret: Locals.config().appSecret,
			cookie: {
				maxAge: 6300000, // two weeks (in ms)
				sameSite: 'none',
				secure: true
			},
			store: new RedisStore({ client: redisClient })
		};

		_express.use(session(options));

		// Enables the CORS
		_express = CORS.mount(_express);

		// Enables the "gzip" / "deflate" compression for response
		_express.use(compress());

		// Loads the passport configuration
		_express = Passport.mountPackage(_express);

		return _express;
	}
}

export default Http;
