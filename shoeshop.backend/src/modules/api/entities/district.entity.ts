import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { BaseModel } from './base-model.entity';

@Entity('district')
export class District extends BaseModel {
  constructor(partial: Partial<District>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'city_id',
    type: 'int',
  })
  cityId: number;

  @Column({
    type: 'int',
    unique: true,
    nullable: false,
  })
  code: number;

  @Column({
    type: 'nvarchar',
    length: 50,
  })
  name: string;

  @Column({
    name: 'is_active',
    type: 'int',
  })
  isActive: number;
}