import ISearchService from "../interfaces/ISearchService";
import { IResponse, ResponseStatus, StatusCode } from "../interfaces/models/IResponse";
import { fetcher } from "../utils/fetch-utils";
import Locals from "../utils/locals";

class searchService implements ISearchService {
    private url: string = Locals.config().server_url;

    async search(text: string, index: number): Promise<IResponse> {
        try {
            const userFetch = await fetcher(this.url + '/api/search', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text, index })
            });
            return await userFetch;
        } catch (error) {
            return new Promise<IResponse>(() => ({
                status: ResponseStatus.INTERNAL_ERROR,
                message: 'Internal Application Error',
                statusCode: StatusCode.FAILURE,
                data: error
            })
            );
        }
    }
}
export default searchService;