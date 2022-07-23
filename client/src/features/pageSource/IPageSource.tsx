import { IBase } from "../../interfaces/models/IBase"
import { IPageSourceResponse } from "../../interfaces/models/IPageSourceResponse";

export interface IPageSourceProps {
    url: string;
}

export interface IPageSourceSlice extends IBase {
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    results: IPageSourceResponse | null;
}