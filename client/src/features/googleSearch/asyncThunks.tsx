import { createAsyncThunk } from "@reduxjs/toolkit";
import SearchService from "../../apis/searchService";
import ISearchService from "../../interfaces/ISearchService";
import { ISearchProps } from "./ISearch";

const searchService: ISearchService = new SearchService();

export const searchAsync = createAsyncThunk(
    'googleSearch/search',
    async (args: ISearchProps) => {
        return await searchService.search(args.text, args.index);
    }
);