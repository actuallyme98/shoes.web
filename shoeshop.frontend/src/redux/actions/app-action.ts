import { createTypeAction, createTypeAsyncAction } from '../type-redux';
import { Store } from 'redux';

// services
import ApiService from '../../services/api-service';

// helpers
import SystemHelper from '../../helpers/system.helper';

export const detectMobile = createTypeAction<string, boolean>(
  'DETECT_MOBILE',
  (userAgent: string) => {
    return SystemHelper.detectMobile(userAgent);
  },
);

export const openCartDrawer = createTypeAction('OPEN_CART_DRAWER', (open: boolean) => open);

export const registerAction = createTypeAsyncAction(
  'REGISTER_ACTION',
  async (args: SHOES_API.RegisterParams) => {
    return await ApiService.register(args);
  },
);

export const loginAction = createTypeAsyncAction(
  'LOGIN_ACTION',
  async (args: SHOES_API.LoginParams) => {
    return await ApiService.login(args);
  },
);

export const getProfileAction = createTypeAsyncAction(
  'GET_PROFILE_ACTION',
  async (cookie?: string) => {
    return await ApiService.getProfile(cookie);
  },
);

export const initializeAuthPage = createTypeAsyncAction<
  REDUX_STORE.InitializeAuthPageArgs,
  REDUX_STORE.InitializeAuthPagePayload,
  Store
>('INIT_AUTHENICATE_PAGE', async (args, { dispatch }) => {
  const { req } = args;
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  const isMobile = dispatch(detectMobile(userAgent)).payload;
  const cookie = req.headers.cookie;
  if (!cookie) {
    return {
      isMobile,
    };
  }
  try {
    await dispatch(getProfileAction(cookie));
    return {
      cookie,
      isMobile,
    };
  } catch (err) {
    throw new Error(err);
  }
});

export const logOutAction = createTypeAsyncAction('LOGOUT_ACTION', async () => {
  return await ApiService.logout();
});

export const updateUserInfoAction = createTypeAsyncAction<SHOES_API.UpdateInfoParams, void, Store>(
  'UPDATE_USER_INFO_ACTION',
  async (args, { dispatch }) => {
    try {
      await ApiService.updateUserInfo(args);
      await dispatch(getProfileAction());
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const updatePasswordAction = createTypeAsyncAction<
  SHOES_API.UpdatePasswordParams,
  void,
  Store
>('UPDATE_USER_INFO_ACTION', async (args, { dispatch }) => {
  try {
    await ApiService.updatePassword(args);
    await dispatch(getProfileAction());
  } catch (err) {
    throw new Error(err);
  }
});
