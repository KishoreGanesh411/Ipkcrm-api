import { registerEnumType } from '@nestjs/graphql';
import {
  ProfessionEnum,
  ProductEnum,
  ClientTypeEnum,
} from '../lead/enums/ipk-leadd.enum';
import { Gender } from './common.enum';
import { Status, UserRoles } from '../user/enums/user.enums';

registerEnumType(Gender, { name: 'Gender' });
registerEnumType(ProfessionEnum, { name: 'Profession' });
registerEnumType(ProductEnum, { name: 'Product' });
registerEnumType(ClientTypeEnum, { name: 'ClientType' });
registerEnumType(UserRoles, { name: 'UserRole' });
registerEnumType(Status, { name: 'Status' });
