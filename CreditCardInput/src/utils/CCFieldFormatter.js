import valid from 'card-validator';

import {
  removeNonNumber,
  removeLeadingSpaces,
  limitLength,
  addGaps,
  FALLBACK_CARD,
} from './helpers';

export default class CCFieldFormatter {
  constructor(displayedFields) {
    this._displayedFields = [...displayedFields, 'type'];
  }

  formatValues = (values) => {
    const card = valid.number(values.number).card || FALLBACK_CARD;

    const temp = {
      type: card.type,
      number: this._formatNumber(values.number, card),
      expiry: this._formatExpiry(values.expiry),
      cvv: this._formatCVV(values.cvv, card),
      name: removeLeadingSpaces(values.name),
      zip: removeNonNumber(values.zip),
    };

    return this._displayedFields.reduce((acc, curr) => {
      acc[curr] = temp[curr];
      return acc;
    }, {});
  };

  _formatNumber = (number, card) => {
    const numberSanitized = removeNonNumber(number);
    const maxLength = card.lengths[card.lengths.length - 1];
    const lengthSanitized = limitLength(numberSanitized, maxLength);
    const formatted = addGaps(lengthSanitized, card.gaps);
    return formatted;
  };

  _formatExpiry = (expiry) => {
    const sanitized = limitLength(removeNonNumber(expiry), 4);
    if (sanitized.match(/^[2-9]$/)) {
      return `0${sanitized}`;
    }
    if (sanitized.length > 2) {
      return `${sanitized.slice(0, 2)}/${sanitized.slice(2, sanitized.length)}`;
    }
    return sanitized;
  };

  _formatCVV = (cvv, card) => {
    const maxCVVLength = card.code.size;
    return limitLength(removeNonNumber(cvv), maxCVVLength);
  };
}
