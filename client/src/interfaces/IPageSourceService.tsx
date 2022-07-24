import { IResponse } from "./models/IResponse";

export default interface IPageSourceService {
    getPageSource(url: string): Promise<IResponse>;
}