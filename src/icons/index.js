import AmexIcon from './amex.svg';
import CartesBancairesIcon from './cartes-bancaires.svg';
import DinersIcon from './diners-club.svg';
import DiscoverIcon from './discover.svg';
import EloIcon from './elo.svg';
import HipercardIcon from './hipercard.svg';
import HiperIcon from './hiper.svg';
import JcbIcon from './jcb.svg';
import Maestro from './maestro.svg';
import MastercardIcon from './mastercard.svg';
import MirIcon from './mir.svg';
import UnionpayIcon from './unionpay.svg';
import VisaIcon from './visa.svg';

import CvvIcon from './cvv.svg';
import DefaultIcon from './default.svg';
import ErrorIcon from './error.svg';

export const getIcon = (key) => {
  switch (key) {
    case 'american-express':
      return AmexIcon;
    case 'cartes-bancaires':
      return CartesBancairesIcon;
    case 'diners-club':
      return DinersIcon;
    case 'discover':
      return DiscoverIcon;
    case 'elo':
      return EloIcon;
    case 'hiper':
      return HiperIcon;
    case 'hipercard':
      return HipercardIcon;
    case 'jcb':
      return JcbIcon;
    case 'maestro':
      return Maestro;
    case 'mastercard':
      return MastercardIcon;
    case 'mir':
      return MirIcon;
    case 'unionpay':
      return UnionpayIcon;
    case 'visa':
      return VisaIcon;

    case 'cvv':
      return CvvIcon;
    case 'error':
      return ErrorIcon;

    case 'placeholder':
    default:
      return DefaultIcon;
  }
};
