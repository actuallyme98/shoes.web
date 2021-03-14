declare namespace ADMIN_API {
  interface BaseResponse {
    status?: boolean;
    message?: string;
  }

  interface RegisterParams {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
  }
  interface RegisterResponse extends BaseResponse {}

  interface LoginParams {
    username: string;
    password: string;
  }

  interface LoginResponse extends BaseResponse {
    expires: number;
    refresh_token: string;
    token: string;
    user: REDUX_STORE.Profile;
  }

  interface GetProfileResponse extends BaseResponse {
    me: REDUX_STORE.Profile;
  }

  interface LogoutResponse {
    status: boolean;
  }

  interface GetListSizeResponse extends BaseResponse {
    id: number;
    name: number;
  }

  interface CreateSizeParams {
    name: number;
  }
  interface UpdateSizeParams {
    id: number;
    name: number;
  }

  interface GetListColorResponse extends BaseResponse {
    id: number;
    name: string;
    code: string;
  }

  interface CreateColorParams {
    name: string;
    code: string;
  }

  interface UpdateColorParams {
    id: number;
    name: string;
    code: string;
  }
}