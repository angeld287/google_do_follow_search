import { IBase } from "../../interfaces/models/IBase"
import { IGoogleSearchResult } from "../../interfaces/models/IGoogleSearchResult";

export interface ISearchProps {
    text: string;
    index: number;
}

export interface ISearchSlice extends IBase {
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    results: Array<IGoogleSearchResult>;
}