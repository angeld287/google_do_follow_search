/**
 * Define Login Login for the API
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

import Log from '../../../middlewares/Log';
import { IResponse, IRequest, INext } from '../../../interfaces/vendors';
import { InternalErrorResponse, SuccessResponse } from '../../../core/ApiResponse';
import ExpressValidator from '../../../providers/ExpressValidation';
import googleSearchService from '../../../services/googleSearchService';
import IGoogleSearchService from '../../../interfaces/IGoogleSearchService';
import GoogleSearchResult from '../../../interfaces/models/GoogleSearchResult';


class Search {

    /**
     * Execute the action of search a text in google search engine
     * @param {string} req: get the request from the post
     * @param {string} res: the response expected by the post
     * @return {Promise<>} return a promise with the json result
     */
    public static async perform(req: IRequest, res: IResponse, next: INext): Promise<any> {
        try {
            const errors = new ExpressValidator().validator(req);

            if (!errors.isEmpty()) {
                return new SuccessResponse('Success', {
                    errors: errors.array()
                }).send(res);
            }

            let user: IGoogleSearchService = new googleSearchService();

            const text = encodeURIComponent(req.body.text);
            let index = parseInt(req.body.index);

            const search = await user.getSearch(text, index);
            let results: Array<GoogleSearchResult> = [];

            search.forEach(result => {
                results.push({
                    position: index,
                    kind: result.kind,
                    title: result.title,
                    htmlTitle: result.htmlTitle,
                    link: result.link,
                    displayLink: result.displayLink,
                    snippet: result.snippet,
                    htmlSnippet: result.htmlSnippet,
                    cacheId: result.cacheId,
                    formattedUrl: result.formattedUrl,
                    htmlFormattedUrl: result.htmlFormattedUrl,
                })
                index++
            })

            return new SuccessResponse('Success', {
                results
            }).send(res);

        } catch (error) {
            Log.error(`Internal Server Error ` + error);
            return new InternalErrorResponse('Validation Error', {
                error: 'Internal Server Error',
            }).send(res);
        }
    }
}

export default Search;