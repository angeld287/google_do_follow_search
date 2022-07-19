/**
 * Define interface for Google Search Service
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

export interface IGoogleSearchService {

    getSearch(text: string, index: number): Promise<any>;

    getNextSearch(text: string, nextIndex: number): Promise<any>;

    getPreviewsSearch(text: string, previewsIndex: number): Promise<any>;
}

export default IGoogleSearchService;