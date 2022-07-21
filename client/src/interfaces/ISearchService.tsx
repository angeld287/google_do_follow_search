import { IResponse } from "./models/IResponse";

export default interface ISearchService {
    search(text: string, index: number): Promise<IResponse>;
}