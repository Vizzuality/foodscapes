import {
  Data as ArgentinaGranChacoData,
  Content as ArgentinaGranChacoContent,
} from './argentina-gran-chaco';
import {
  Data as CentralNewZealandAquacultureData,
  Content as CentralNewZealandAquacultureContent,
} from './central-new-zealand-aquaculture';
import {
  Data as ChesapeakeBayWatershedData,
  Content as ChesapeakeBayWatershedContent,
} from './chesapeake-bay-watershed';
import { Data as PunjabHaryanaData, Content as PunjabHaryanaContent } from './punjab-haryana';
import {
  Data as UpperMississipiRiverBasinData,
  Content as UpperMississipiRiverBasinContent,
} from './upper-mississippi-river-basin';
import {
  Data as UpperTanaRiverBasinData,
  Content as UpperTanaRiverBasinContent,
} from './upper-tana-river-basin';

const CaseStudiesInfo = {
  'argentina-gran-chaco': {
    data: ArgentinaGranChacoData,
    content: ArgentinaGranChacoContent,
  },
  'punjab-haryana': {
    data: PunjabHaryanaData,
    content: PunjabHaryanaContent,
  },
  'upper-tana-river-basin': {
    data: UpperTanaRiverBasinData,
    content: UpperTanaRiverBasinContent,
  },
  'central-new-zealand-aquaculture': {
    data: CentralNewZealandAquacultureData,
    content: CentralNewZealandAquacultureContent,
  },
  'chesapeake-bay-watershed': {
    data: ChesapeakeBayWatershedData,
    content: ChesapeakeBayWatershedContent,
  },
  'upper-mississippi-river-basin': {
    data: UpperMississipiRiverBasinData,
    content: UpperMississipiRiverBasinContent,
  },
};

export default CaseStudiesInfo;
