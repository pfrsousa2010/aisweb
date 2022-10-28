import { ItemInfotemp } from './infotemp-model';
import { ItemNotam } from './notam-model';
import { SupItem } from './suplemento-model';

export interface Localidade {
  idIcao?: string;
  notams?: ItemNotam[];
  suplementos?: SupItem[];
  infoTemp?: ItemInfotemp[];
}

export interface LocalidadeCarregada {
  id?: number;
  icao?: string;
}

export const LOCALIDADES_PADRAO_PESQUISA = [
  'SSAP',
  'SSOG',
  'SSCP',
  'SBLO',
  'SBMG',
  'SSPI',
  'SSSZ',
  'SBXO',
  'SDDZ',
  'SSUW',
  'SNTT',
  'SSJP',
  'SJEL',
  'SSOC',
  'SSHN',
  'SI6B',
  'SWOE',
  'SWES',
  'SJTL',
  'SWMT',
  'SSHL',
  'SIOX',
  'SJHA',
  'SWSA',
  'SI72',
  'SSOK',
  'SSPX',
  'SSFX',
  'SJVB',
  'SSXO',
  'SI2M',
  'SJVS',
  'SWKS',
  'SIMC',
  'SWEP',
];
