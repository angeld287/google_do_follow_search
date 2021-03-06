/**
 * Enables the CORS
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

import * as cors from 'cors';
import { Application } from 'express';

import Log from './Log';
import Locals from '../providers/Locals';

class CORS {
	public mount(_express: Application): Application {
		Log.info('Booting the \'CORS\' middleware...');

		const options = {
			origin: Locals.config().urls,
			optionsSuccessStatus: 200,		// Some legacy browsers choke on 204
			credentials: true
		};

		_express.use(cors(options));

		return _express;
	}
}

export default new CORS;
