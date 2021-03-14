import Axios from 'axios';
import { ApiRouteEnum } from '../enums/api-route';

const HanleResponse = async (response: any) => {
  console.log(response);
  const { status, message } = response;
  if (status === false) {
    throw new Error(message);
  }
  if (response.data) {
    return response.data;
  }
  return response;
};
export class ApiService {
  public async login(payload: ADMIN_API.LoginParams): Promise<ADMIN_API.LoginResponse> {
    const response = await Axios.post(ApiRouteEnum.LOGIN, payload);
    return await HanleResponse(response);
  }
  public async getProfile(): Promise<ADMIN_API.GetProfileResponse> {
    return await Axios.get(ApiRouteEnum.GET_PROFILE);
  }
  public async logout(): Promise<ADMIN_API.LogoutResponse> {
    return await Axios.post(ApiRouteEnum.LOGOUT);
  }
  public async listSizes(): Promise<ADMIN_API.GetListSizeResponse[]> {
    const response = await Axios.get(ApiRouteEnum.LIST_SIZES);
    return await HanleResponse(response);
  }
  public async createSize(payload: ADMIN_API.CreateSizeParams) {
    const response = await Axios.post(ApiRouteEnum.SIZES, payload);
    return await HanleResponse(response);
  }
  public async updateSize(payload: ADMIN_API.CreateSizeParams) {
    const response = await Axios.post(ApiRouteEnum.UPDATE_SIZE, payload);
    return await HanleResponse(response);
  }
  public async deleteSize(id: number) {
    const response = await Axios.delete(`${ApiRouteEnum.SIZES}/${id}`);
    return await HanleResponse(response);
  }
  public async listColors(): Promise<ADMIN_API.GetListColorResponse[]> {
    const response = await Axios.get(ApiRouteEnum.LIST_COLORS);
    return await HanleResponse(response);
  }
  public async createColor(payload: ADMIN_API.CreateColorParams) {
    const response = await Axios.post(ApiRouteEnum.COLORS, payload);
    return await HanleResponse(response);
  }
  public async updateColor(payload: ADMIN_API.CreateColorParams) {
    const response = await Axios.post(ApiRouteEnum.UPDATE_COLOR, payload);
    return await HanleResponse(response);
  }
  public async deleteColor(id: number) {
    const response = await Axios.delete(`${ApiRouteEnum.COLORS}/${id}`);
    return await HanleResponse(response);
  }
}

export default new ApiService();