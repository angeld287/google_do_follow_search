import IPageSourceService from "../interfaces/IPageSourceService";
import { IResponse, ResponseStatus, StatusCode } from "../interfaces/models/IResponse";
import { fetcher } from "../utils/fetch-utils";
import Locals from "../utils/locals";

class pageSourceService implements IPageSourceService {
    private url: string = Locals.config().server_url;

    async getPageSource(url: string): Promise<IResponse> {
        try {
            const pageSpurceFetch = await fetcher(this.url + '/api/getPageSource', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url })
            });
            return await pageSpurceFetch;
        } catch (error) {
            let errorResult: IResponse = {
                status: ResponseStatus.INTERNAL_ERROR,
                message: 'Internal Application Error',
                statusCode: StatusCode.FAILURE,
                data: {
                    success: false,
                    error
                }
            }
            return errorResult
        }
    }
}
export default pageSourceService;