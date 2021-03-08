import Axios, { AxiosInstance } from 'axios';
import { ApiRouteEnum } from '../enums/api-route.enum';

const SERVER_URL = process.env.SERVER_URL;

const AxiosInterceptors = async (response: any) => {
  const { status, message } = response;
  if (status === false) {
    throw new Error(message);
  }
  return response;
};
export class ApiService {
  private axios: AxiosInstance;

  constructor() {
    if (!SERVER_URL) {
      throw new Error('Server url is missing');
    }
    this.axios = Axios.create({ baseURL: SERVER_URL, withCredentials: true });
    this.axios.interceptors.response.use((res) => {
      if (res.status === 200 || res.status === 201) {
        return res.data;
      }
      return res;
    });
  }
  public async register(payload: SHOES_API.RegisterParams): Promise<SHOES_API.RegisterResponse> {
    const response = await this.axios.post(ApiRouteEnum.REGISTER, payload);
    return await AxiosInterceptors(response);
  }
  public async login(payload: SHOES_API.LoginParams): Promise<SHOES_API.LoginResponse> {
    const response = await this.axios.post(ApiRouteEnum.LOGIN, payload);
    return await AxiosInterceptors(response);
  }
  public async getProfile(cookie?: string): Promise<SHOES_API.GetProfileResponse> {
    return await this.axios.get(ApiRouteEnum.GET_PROFILE, {
      headers: {
        cookie: cookie || '',
      },
      withCredentials: true,
    });
  }
  public async logout(): Promise<SHOES_API.LogoutResponse> {
    return await this.axios.post(ApiRouteEnum.LOGOUT);
  }
}

export default new ApiService();
