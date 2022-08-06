/**
 * Define App Locals & Configs
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

import { Application } from 'express'

class Locals {

    /**
     * Makes env configs available for your app
     * throughout the app's runtime
     */
    public static config(): any {
        const port = process.env.PORT || 3001;
        const DATABASE_URL = process.env.DATABASE_URL || 'postgres://admin:admin@localhost:5430/db';

        const appSecret = process.env.APP_SECRET || 'secret_key';
        const apiPrefix = process.env.API_PREFIX || 'api';

        //Google Search (GS) Url Configurations
        const GSKey = "AIzaSyBEb-Wfy5wsBZ2lqZR2f4eQ7RPrsTSe4z4"
        const GSCx = "023b4f4fbb0dc9628"
        const GSLimit = "10"

        const GSUrl = "https://www.googleapis.com/customsearch/v1?key=" + GSKey + "&cx=" + GSCx + "&num=" + GSLimit
        const GSStartKeyword = "&start="
        const GSQueryKeyword = "&q="

        //allow origin cors
        const urls = [
            'http://localhost:3000',
            'http://localhost:8081',
            'http://52.70.36.167:8081',
        ];


        return {
            apiPrefix,
            appSecret,
            port,
            dbUrl: DATABASE_URL,
            urls,
            GSUrl,
            GSStartKeyword,
            GSQueryKeyword,
        }
    }

    /**
     * Injects your config to the app's locals
     */
    public static init(_express: Application): Application {
        _express.locals.app = this.config();
        return _express;
    }
}

export default Locals;