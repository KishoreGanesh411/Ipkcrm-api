import { registerEnumType } from '@nestjs/graphql';
import {
  GenderEnum,
  ProfessionEnum,
  ProductEnum,
  ClientTypeEnum,
} from './lead/enums/ipk-leadd.enum';

registerEnumType(GenderEnum, { name: 'Gender' });
registerEnumType(ProfessionEnum, { name: 'Profession' });
registerEnumType(ProductEnum, { name: 'Product' });
registerEnumType(ClientTypeEnum, { name: 'ClientType' });
