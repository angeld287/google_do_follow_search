/**
 * Define the methods used to search in google S. E.
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

import IGoogleSearchService from '../interfaces/IGoogleSearchService';

class googleSearchService implements IGoogleSearchService {

    /*
    * Execute a request to find the google search
    * @param text: the text to find in google SE
    * @return the google list of results with 10 items
    */
    async getSearch(text: string): Promise<any | ErrorConstructor> {
        let result = null;
        try {
            result = [];
            if (result.rows.length > 0) {
                delete result.rows[0].user_password;
                return result.rows[0];
            } else {
                return false;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /*
    * Execute a request to find the google search of the next 10 results
    * @param text: the text to find in google SE
    * @param nextIndex: the number of the start index of the next 10 google search results
    * @return the google list of results with 10 items
    */
    async getNextSearch(text: string, nextIndex: number): Promise<any | ErrorConstructor> {
        let result = null;
        try {
            result = [];
            if (result.rows.length > 0) {
                delete result.rows[0].user_password;
                return result.rows[0];
            } else {
                return false;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /*
    * Execute a request to find the google search of the previews 10 results
    * @param text: the text to find in google SE
    * @param previewsIndex: the number of the start index of the previews 10 google search results
    * @return the google list of results with 10 items
    */
    async getPreviewsSearch(text: string, previewsIndex: number): Promise<any | ErrorConstructor> {
        let result = null;
        try {
            result = [];
            if (result.rows.length > 0) {
                delete result.rows[0].user_password;
                return result.rows[0];
            } else {
                return false;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default googleSearchService;