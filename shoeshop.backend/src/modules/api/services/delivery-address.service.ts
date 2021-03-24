import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { classToPlain } from 'class-transformer';

import { ErrorHelper } from '@base/helpers';

import { DeliveryAddressDTO, CreateAddressDTO } from '@api/dtos';

import { DeliveryAddress, City, Ward, District, Client } from '@api/entities';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(DeliveryAddress)
    private readonly addressRepository: Repository<DeliveryAddress>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    @InjectRepository(District)
    private readonly districtRepository: Repository<District>,
    @InjectRepository(Ward)
    private readonly wardRepository: Repository<Ward>,
  ) {}

  async findAll(id: number): Promise<DeliveryAddressDTO[]> {
    return await this.addressRepository
      .createQueryBuilder('address')
      .where('clientId = :id', { id })
      .leftJoinAndSelect('address.clientId', 'client')
      .leftJoinAndSelect('address.cityId', 'city')
      .leftJoinAndSelect('address.districtId', 'district')
      .leftJoinAndSelect('address.wardId', 'ward')
      .getMany();
  }

  async createAddress(args: CreateAddressDTO) {
    const { clientId, cityId, districtId, wardId, phone, address, fullName, isDefault } = args;
    const client = await this.clientRepository.findOne(clientId);
    if (!client) {
      throw ErrorHelper.BadRequestException('Unauthorized');
    }
    const city = await this.cityRepository.findOne(cityId);
    if (!city) {
      throw ErrorHelper.BadRequestException('Unauthorized');
    }
    const district = await this.districtRepository.findOne(districtId);
    if (!district) {
      throw ErrorHelper.BadRequestException('Unauthorized');
    }
    const ward = await this.wardRepository.findOne(wardId);
    if (!ward) {
      throw ErrorHelper.BadRequestException('Unauthorized');
    }
    const newAddress = new DeliveryAddress({
      fullName,
      phone,
      address,
      isDefault,
      city,
      district,
      ward,
      client,
    });
    await newAddress.save();
  }
}
