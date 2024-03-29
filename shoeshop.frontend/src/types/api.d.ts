declare namespace SHOES_API {
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

  interface UpdateInfoParams {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    dob: string;
    gender: EnumGender;
  }

  interface UpdateInfoResponse extends BaseResponse {}

  interface UpdatePasswordParams {
    oldPassword: string;
    newPassword: string;
  }

  interface UpdatePasswordResponse extends BaseResponse {}
}
