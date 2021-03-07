import { Mssql } from '../base';
import moment from 'moment';

// modals
import { User } from '../models';

// services
import ClientService from './client-service';

// helpers
import { EncryptHelper } from '../helpers';

// transform
import { toGUser, GUser } from '../transforms';

export class UserService {
  public async findOneByPhone(phoneNumber: string): Promise<GUser | undefined> {
    try {
      const result = await Mssql.Find('users', 'username', phoneNumber);
      if (!result) {
        return;
      }
      return toGUser(result);
    } catch (err) {
      throw new Error(err);
    }
  }
  public async findOneById(id: string): Promise<GUser | undefined> {
    try {
      const result = await Mssql.Find('users', 'id', id);
      if (!result) {
        return;
      }
      return toGUser(result);
    } catch (err) {
      throw new Error(err);
    }
  }
  public async createUser(
    args: User,
  ): Promise<{
    status: boolean;
    message: string;
  }> {
    try {
      const user = await this.findOneByPhone(args.username);
      if (!!user) {
        return {
          status: false,
          message: 'Người dùng đã tồn tại',
        };
      }
    } catch (err) {
      return {
        status: false,
        message: 'Đăng ký thất bại, hãy thử lại.',
      };
    }

    try {
      const createUserArgs: User = {
        username: args.username,
        email: args.email || '',
        password: EncryptHelper.hash(args.password),
        isSupperUser: !!args.isSupperUser ? 1 : 0,
        firstName: args.firstName,
        lastName: args.lastName,
        createdAt: moment().format('YYYY-MM-DD HH:mm'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm'),
      };
      const userId = await Mssql.Insert('users', createUserArgs);
      await ClientService.createClient({ userId });
      return {
        status: true,
        message: 'Đăng ký thành công, xin mời đăng nhập',
      };
    } catch (err) {
      return {
        status: false,
        message: 'Đăng ký thất bại, hãy thử lại.',
      };
    }
  }
}

export default new UserService();
