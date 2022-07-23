import { createAsyncThunk } from "@reduxjs/toolkit";
import PageSourceService from "../../apis/pageSourceService";
import IPageSourceService from "../../interfaces/IPageSourceService";
import { IPageSourceProps } from "./IPageSource";

const pageSourceService: IPageSourceService = new PageSourceService();

export const getPageSourceAsync = createAsyncThunk(
    'googleSearch/search',
    async (args: IPageSourceProps) => {
        return await pageSourceService.getPageSource(args.url);
    }
);