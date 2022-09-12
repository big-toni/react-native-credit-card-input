import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 8,
  },
  expanded: {
    flex: 1,
  },
  hidden: {
    width: 0,
  },
  icon: {
    width: 46,
    height: 44,
    resizeMode: 'contain',
  },
  inputContainer: {
    minWidth: 50,
    paddingHorizontal: 2,
  },
  leftPart: {
    overflow: 'hidden',

    // flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rightPart: {
    overflow: 'hidden',

    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  shortNumber: {
    width: 60,
    overflow: 'hidden',
    marginLeft: 8,
  },
});

export default styles;
