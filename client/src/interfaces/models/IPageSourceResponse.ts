export interface IPageSourceResponse {
    statusCode: number,
    body: string;
    hasDoFollow?: boolean;
    doFollowCount: number;
    noFollowCount: number;
}