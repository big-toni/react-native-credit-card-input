import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 10,
  },
  icon: {
    width: 48,
    height: 40,
    resizeMode: 'contain',
  },
  expanded: {
    flex: 1,
  },
  hidden: {
    width: 0,
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
  containerStyle: {
    minWidth: 50,
    paddingHorizontal: 2,
  },
});

export default styles;
