import { Gender } from 'src/app/enums/common.enum';
import {
  ClientTypeEnum,
  ProductEnum,
  ProfessionEnum,
} from '../enums/ipk-leadd.enum';

export interface IpkLeaddModel {
  id: string;
  leadCode: string;
  location?: string;
  gender?: Gender;
  age?: number;
  profession?: ProfessionEnum;
  companyName?: string;
  designation?: string;
  product?: ProductEnum;
  investmentRange?: string;
  sipAmount?: number;
  clientTypes?: ClientTypeEnum[];
  remark?: string;
  leadSource?: string;
  createdAt: Date;
  updatedAt: Date;
}
