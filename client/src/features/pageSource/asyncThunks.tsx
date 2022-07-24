import { createAsyncThunk } from "@reduxjs/toolkit";
import PageSourceService from "../../apis/pageSourceService";
import IPageSourceService from "../../interfaces/IPageSourceService";
import Locals from "../../utils/locals";
import { IPageSourceProps } from "./IPageSource";

const pageSourceService: IPageSourceService = new PageSourceService();

export const getPageSourceAsync = createAsyncThunk(
    'pageSource/getPageSource',
    async (args: IPageSourceProps) => {

        const pageSourceResult = await pageSourceService.getPageSource(args.url);
        const a_tags: Array<string> = pageSourceResult.data.response.body.match(Locals.config().a_tags_reg_exp)
        let do_follow = 0, no_follow = 0;

        a_tags.forEach(a_tag => {
            if (a_tag.match(Locals.config().follow_reg_exp) !== null) {
                do_follow = do_follow + 1
            } else if (a_tag.match(Locals.config().no_follow_reg_exp)) {
                no_follow = no_follow + 1
            }
        });

        pageSourceResult.data.response.hasDoFollow = do_follow > 0;
        pageSourceResult.data.response.doFollow = do_follow;
        pageSourceResult.data.response.noFollow = no_follow;

        return pageSourceResult
    }
);