import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';
import { User } from '@api/entities';
import { EncryptHelper } from '@base/helpers';
import * as userData from './data/users.json';

export default class CreateEndUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const qb = connection.getRepository(User).createQueryBuilder();
    if (await qb.getOne()) {
      return;
    }
    const arr = await Promise.all(
      userData.map(async item => ({
        ...item,
        password: await EncryptHelper.hash(item.password),
      })),
    );
    await qb
      .insert()
      .values(arr as any)
      .execute();
  }
}
