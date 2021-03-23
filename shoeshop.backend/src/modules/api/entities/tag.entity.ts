import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { BaseModel } from './base-model.entity';

@Entity('tag')
export class Tag extends BaseModel {
  constructor(partial: Partial<Tag>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({
    type: 'char',
    length: 20,
  })
  code: string;

  @Column({
    type: 'nvarchar',
    length: 30,
  })
  name: string;

  @Column({
    type: 'int',
  })
  status: number;
}
