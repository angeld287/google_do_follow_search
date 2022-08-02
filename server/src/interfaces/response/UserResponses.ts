import { IBaseResponse } from "./IBaseResponse";

export interface IUserExistenceVerificationResponse extends IBaseResponse {
    exist?: boolean,
}

export interface ISessionResponse extends IBaseResponse {
    session: null | any
}