import colors from '@app/config/colors';
import {StyleSheet} from 'react-native';

const Container = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flexContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
});

const Shadow = StyleSheet.create({
  shadowBox: {
    shadowColor: '#f00',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
});

const ViewStyle = StyleSheet.create({
  flexContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
});

const Texts = StyleSheet.create({
  myText: {
    fontSize: 18,
    fontFamily: 'Oswald-Regular',
  },
});

const HeaderStyle = StyleSheet.create({
  header: {
    height: 70,
    backgroundColor: colors.background,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export {Container, Texts, HeaderStyle, ViewStyle, Shadow};
