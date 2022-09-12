import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { CCFieldFormatter, CCFieldValidator } from './utils';
import { getIcon } from './icons';
import Input from './input';

import styles from './styles';

const CreditCardInput = ({
  autoFocus,
  inputStyle,
  invalidColor,
  onChange,
  onError,
  onFocus,
  placeholderColor,
  placeholders,
  requiresZip,
  validateZip,
  validColor,
  ...other
}) => {
  const refs = {
    number: useRef(null),
    expiry: useRef(null),
    cvv: useRef(null),
    zip: useRef(null),
  };

  const displayedFields = ['number', 'expiry', 'cvv'];
  requiresZip && displayedFields.push('zip');

  const [focused, setFocused] = useState('');
  const [values, setValues] = useState({
    number: '',
    expiry: '',
    cvv: '',
    zip: '',
    type: '',
  });
  const [status, setStatus] = useState(
    requiresZip
      ? {
          number: 'incomplete',
          expiry: 'incomplete',
          cvv: 'incomplete',
          zip: 'incomplete',
        }
      : {
          number: 'incomplete',
          expiry: 'incomplete',
          cvv: 'incomplete',
        }
  );

  useEffect(() => {
    autoFocus && focus('number');
  }, []);

  useEffect(() => {
    onChange({ values, status });

    onError &&
      onError(
        Object.entries(status).reduce((acc, [key, value]) => {
          if (value !== 'valid') acc.push(`${key} is ${value}\n`);
          return acc;
        }, [])
      );
  }, [values, status]);

  const focus = (field) => {
    if (!field) return;
    setFocused(field);
    refs[field]?.current?.focus();
  };

  const Icon = (() => {
    let { type: iconName = 'placeholder' } = values;
    if (status.number === 'invalid') iconName = 'error';
    if (focused === 'cvv') iconName = 'cvv';
    return getIcon(iconName);
  })();

  const updateValues = (newValues) => {
    const updatedValues = { ...values, ...newValues };

    const formattedValues = new CCFieldFormatter(displayedFields).formatValues(
      updatedValues
    );

    const status = new CCFieldValidator(
      displayedFields,
      validateZip
    ).validateValues(formattedValues);

    setValues(formattedValues);
    setStatus(status);
  };

  const handleOnChange = (field, value) => {
    updateValues({ [field]: value });
  };

  const handleOnFocus = (field) => {
    focus(field);
    onFocus(field);
  };

  const focusPreviousField = (field) => {
    const fieldIndex = displayedFields.indexOf(field);
    const previousField = displayedFields[fieldIndex - 1];
    if (previousField) focus(previousField);
  };

  const focusNextField = (field) => {
    const fieldIndex = displayedFields.indexOf(field);
    const nextField = displayedFields[fieldIndex + 1];
    if (nextField) focus(nextField);
  };

  const inputProps = (field) => ({
    ...other,
    ref: refs[field],
    containerStyle: styles.inputContainer,
    field,
    focused: focused === field,
    inputStyle,
    invalidColor,
    keyboardType: 'numeric',
    onBecomeEmpty: () => focusPreviousField(field),
    onBecomeValid: () => focusNextField(field),
    onChange: handleOnChange,
    onFocus: handleOnFocus,
    placeholder: placeholders[field],
    placeholderColor,
    status: status[field],
    validColor,
    value: values[field],
  });

  const showRightPart = focused && focused !== 'number';
  const { number } = values;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.leftPart,
          showRightPart ? styles.hidden : styles.expanded,
        ]}
      >
        <Input {...inputProps('number')} />
      </View>
      <TouchableOpacity
        onPress={() => focus(showRightPart ? 'number' : 'expiry')}
      >
        <Icon style={styles.icon} />
      </TouchableOpacity>
      <View
        style={[
          styles.rightPart,
          showRightPart ? styles.expanded : styles.hidden,
        ]}
      >
        <TouchableOpacity onPress={() => focus('number')}>
          <View pointerEvents={'none'}>
            <Input
              {...inputProps('number')}
              // NOTE: Expanded numberInput needs 'number' ref
              ref={null}
              placeholder={'1234'}
              value={number.slice(number.length - 4, number.length)}
              containerStyle={[
                // NOTE: Prevent placeholder spreading
                showRightPart && styles.shortNumber,
              ]}
            />
          </View>
        </TouchableOpacity>
        <Input {...inputProps('expiry')} />
        <Input {...inputProps('cvv')} />
        {requiresZip && (
          <Input
            {...inputProps('zip')}
            containerStyle={[styles.inputContainer, { minWidth: 80 }]}
          />
        )}
      </View>
    </View>
  );
};

CreditCardInput.propTypes = {
  autoFocus: PropTypes.bool,
  inputStyle: Text.propTypes.style,
  invalidColor: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onError: PropTypes.func,
  onFocus: PropTypes.func.isRequired,
  placeholderColor: PropTypes.string,
  placeholders: PropTypes.object,
  requiresZip: PropTypes.bool.isRequired,
  validateZip: PropTypes.func,
  validColor: PropTypes.string,
};

CreditCardInput.defaultProps = {
  autoFocus: false,
  inputStyle: {},
  invalidColor: 'red',
  onChange: () => {},
  onError: null,
  onFocus: () => {},
  placeholderColor: 'gray',
  placeholders: {
    number: '1234 5678 1234 5678',
    expiry: 'MM/YY',
    cvv: 'CVV',
    zip: 'ZIP',
  },
  requiresZip: false,
  validateZip: (zip = '') => {
    return zip.match(/^\d{6}$/)
      ? 'valid'
      : zip.length > 6
      ? 'invalid'
      : 'incomplete';
  },
  validColor: '',
};

export default CreditCardInput;
