declare module '../..index.js' {
  import * as React from 'react';

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
