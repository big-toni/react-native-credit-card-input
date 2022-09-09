import PropTypes from 'prop-types';
import React, { useEffect, forwardRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ViewPropTypes,
} from 'react-native';

const Input = forwardRef(
  (
    {
      containerStyle,
      field,
      focused,
      inputStyle,
      invalidColor,
      label,
      labelStyle,
      onBecomeEmpty,
      onBecomeValid,
      onChange,
      onFocus,
      placeholder,
      placeholderColor,
      status,
      validColor,
      value,
      ...other
    },
    ref,
  ) => {
    const [touched, setTouched] = useState(false);

    useEffect(() => {
      // TODO: need logic to switch back to previous field
      if (touched && value === '') onBecomeEmpty(field);
      if (status === 'valid') onBecomeValid(field);
    }, [status, value]);

    const handleOnPress = () => ref.focus();
    const handleOnFocus = () => onFocus(field);
    const handleOnChangeText = (value) => {
      onChange(field, value);
      !touched && setTouched(true);
    };

    return (
      <TouchableOpacity onPress={handleOnPress} activeOpacity={0.99}>
        <View style={containerStyle}>
          {!!label && <Text style={labelStyle}>{label}</Text>}
          <TextInput
            {...other}
            ref={ref}
            style={[
              inputStyle,
              validColor && status === 'valid'
                ? { color: validColor }
                : invalidColor &&
                  (status === 'invalid' ||
                    (status === 'incomplete' && !focused))
                ? { color: invalidColor }
                : {},
            ]}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={placeholderColor}
            placeholder={placeholder}
            value={value}
            onFocus={handleOnFocus}
            onChangeText={handleOnChangeText}
          />
        </View>
      </TouchableOpacity>
    );
  },
);

Input.propTypes = {
  containerStyle: ViewPropTypes.style,
  field: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired,
  inputStyle: Text.propTypes.style,
  invalidColor: PropTypes.string,
  label: PropTypes.string,
  labelStyle: Text.propTypes.style,
  onBecomeEmpty: PropTypes.func,
  onBecomeValid: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  placeholderColor: PropTypes.string,
  status: PropTypes.oneOf(['valid', 'invalid', 'incomplete']),
  validColor: PropTypes.string,
  value: PropTypes.string,
};

Input.defaultProps = {
  containerStyle: {},
  field: '',
  focused: false,
  inputStyle: {},
  label: '',
  labelStyle: {},
  onBecomeEmpty: () => {},
  onBecomeValid: () => {},
  onFocus: () => {},
  onChange: () => {},
  status: 'incomplete',
  value: '',
};

export default Input;
