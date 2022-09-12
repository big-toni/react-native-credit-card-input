# @big-toni/react-native-credit-card-input

## Features

**DEPENDENCIES**

- "card-validator": "8.1.1",
- "prop-types": "^15.8.1"

## Setup

This library is available on npm, install it with: `npm i @big-toni/react-native-credit-card-input` or `yarn add @big-toni/react-native-credit-card-input`.

## Demo

![Alt Text](https://github.com/big-toni/react-native-credit-card-input/raw/main/react-native-credit-card-input.gif 'react-native-credit-card-input')

## Usage

```js
import { CreditCardInput } from '@big-toni/react-native-credit-card-input';
...

```

```jsx
<CreditCardInput
  onChange={handleOnChange}
  onError={handleOnError}
  inputStyle={styles.cardField}
  requiresZip
  autoFocus
/>
```

## Available props

| **Prop**           | **Type**               | **Default**                                                                                            | **Description**                                                                       |
| ------------------ | ---------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| `autoFocus`        | `PropTypes.bool`       | `false`                                                                                                | Automatically focus 'number' field on render                                          |
| `inputStyle`       | `Text.propTypes.style` | `null`                                                                                                 | Style for credit card's TextInput                                                     |
| `invalidColor`     | `PropTypes.string`     | `red`                                                                                                  | Color that will be applied for text input while in 'invalid' state                    |
| `onChange`         | `PropTypes.func`       | `() => null`                                                                                           | Receives a formData object every time the values change                               |
| `onError`          | `PropTypes.func`       | `() => null`                                                                                           | Receives an errors object every time the values change                                |
| `onFocus`          | `PropTypes.func`       | `() => null`                                                                                           | Receives the name of currently focused field                                          |
| `placeholderColor` | `PropTypes.string`     | `gray`                                                                                                 | Color that will be applied for text input placeholder                                 |
| `placeholders`     | `PropTypes.string`     | `{ number: '1234 5678 1234 5678', expiry: 'MM/YY', cvv: 'CVV', zip: 'ZIP'}`                            | Placeholders object                                                                   |
| `requiresZip`      | `PropTypes.bool`       | `false`                                                                                                | Shows zip input field                                                                 |
| `validateZip`      | `PropTypes.func`       | `(zip = '') => { return zip.match(/^\d{6}$/) ? 'valid' : zip.length > 6 ? 'invalid' : 'incomplete'; }` | Function to validate ZIP, expects 'incomplete', 'valid', or 'invalid' as return value |
