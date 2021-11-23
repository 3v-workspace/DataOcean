import { asyncBlocks, pepBlocks } from '../pep/pep_detail/const';

export const personBlocks = {
  ...asyncBlocks,
  ...pepBlocks,
  COINCIDENCE_BLOCK: 'COINCIDENCE_BLOCK',
  ADDITIONAL_INFORMATION_BLOCK: 'ADDITIONAL_INFORMATION_BLOCK',
};

export const SOURCE = {
  pep_ukr: 'pepSource',
  sanction_ukr: 'sanctionSource',
};

export const STATUS_BLOCK = {
  inDevelopment: 'informationInDevelopment',
  noInformation: 'noInformation',
  isInformation: 'isInformation',
};
