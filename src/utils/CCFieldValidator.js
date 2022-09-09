import valid from 'card-validator';

import { toStatus, FALLBACK_CARD } from './helpers';

export default class CCFieldValidator {
  constructor(displayedFields, validateZip) {
    this._displayedFields = displayedFields;
    this._validateZip = validateZip;
  }

  validateValues = (formValues) => {
    const numberValidation = valid.number(formValues.number);
    const expiryValidation = valid.expirationDate(formValues.expiry);
    const maxCVVLength = (numberValidation.card || FALLBACK_CARD).code.size;
    const cvvValidation = valid.cvv(formValues.cvv, maxCVVLength);

    const temp = {
      number: toStatus(numberValidation),
      expiry: toStatus(expiryValidation),
      cvv: toStatus(cvvValidation),
      name: !!formValues.name ? 'valid' : 'incomplete',
      zip: this._validateZip(formValues.zip),
    };

    return this._displayedFields.reduce((acc, curr) => {
      acc[curr] = temp[curr];
      return acc;
    }, {});
  };
}
