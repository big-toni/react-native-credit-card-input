import * as React from 'react';

declare module '@big-toni/react-native-credit-card-input' {
  export interface CreditCardInputProps {
    autoFocus?: boolean;
    inputStyle?: Object;
    invalidColor?: string;
    onChange?: (...args: any[]) => any;
    onError?: (...args: any[]) => any;
    onFocus?: (...args: any[]) => any;
    placeholderColor?: string;
    placeholders?: Object;
    requiresZip?: boolean;
    validateZip?: (...args: any[]) => any;
    validColor?: string;
  }

  const CreditCardInput: React.FC<CreditCardInputProps>;

  export default CreditCardInput;
}
