export const FALLBACK_CARD = {
  gaps: [4, 8, 12],
  lengths: [16],
  code: { size: 3 },
};

export const removeNonNumber = (string = '') => string.replace(/[^\d]/g, '');

export const removeLeadingSpaces = (string = '') => string.replace(/^\s+/g, '');

export const limitLength = (string = '', maxLength) =>
  string.slice(0, maxLength);

export const addGaps = (string = '', gaps) => {
  const offsets = [0].concat(gaps).concat([string.length]);

  return offsets
    .map((end, index) => {
      if (index === 0) return '';
      const start = offsets[index - 1];
      return string.slice(start, end);
    })
    .filter((part) => part !== '')
    .join(' ');
};

export const toStatus = (validation) => {
  return validation.isValid
    ? 'valid'
    : validation.isPotentiallyValid
    ? 'incomplete'
    : 'invalid';
};
